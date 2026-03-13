import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import https from "https";
import { z } from "zod";

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;

if (!LOGIN || !PASSWORD) {
  console.error("Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD env vars");
  process.exit(1);
}

const AUTH = Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64");

// ── HTTP helper ──────────────────────────────────────────────
function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : "";
    const options = {
      hostname: "api.dataforseo.com",
      path: endpoint,
      method,
      headers: {
        Authorization: `Basic ${AUTH}`,
        "Content-Type": "application/json",
        ...(data && { "Content-Length": Buffer.byteLength(data) }),
      },
    };
    const req = https.request(options, (res) => {
      let buf = "";
      res.on("data", (c) => (buf += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(buf));
        } catch {
          reject(new Error(`Non-JSON response: ${buf.substring(0, 300)}`));
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

function formatError(result) {
  if (result.status_code !== 20000) {
    return `API Error ${result.status_code}: ${result.status_message || "Unknown error"}`;
  }
  const task = result.tasks?.[0];
  if (task && task.status_code !== 20000) {
    return `Task Error ${task.status_code}: ${task.status_message || "Unknown error"}`;
  }
  return null;
}

// ── MCP Server ───────────────────────────────────────────────
const server = new McpServer({
  name: "dataforseo",
  version: "1.0.0",
  description: "DataForSEO API — keyword research, SERP analysis, competitor insights, and more",
});

// ── Tool 1: Keyword Search Volume ────────────────────────────
server.tool(
  "keyword_search_volume",
  "Get Google Ads search volume, CPC, competition data for a list of keywords. Returns monthly volumes, cost-per-click, competition index, and bid ranges.",
  {
    keywords: z.array(z.string()).min(1).max(700).describe("List of keywords to check (max 700)"),
    location_code: z.number().optional().default(2356).describe("Location code (default 2356 = India). US=2840, UK=2826"),
    language_code: z.string().optional().default("en").describe("Language code (default 'en')"),
    sort_by: z.enum(["search_volume", "cpc", "competition"]).optional().default("search_volume"),
  },
  async ({ keywords, location_code, language_code, sort_by }) => {
    const body = [{ keywords, location_code, language_code, sort_by }];
    const result = await apiRequest("POST", "/v3/keywords_data/google_ads/search_volume/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result || [];
    const rows = items
      .filter((k) => k && k.keyword)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      .map((k) => ({
        keyword: k.keyword,
        search_volume: k.search_volume,
        cpc: k.cpc,
        competition: k.competition,
        competition_index: k.competition_index,
        low_bid: k.low_top_of_page_bid,
        high_bid: k.high_top_of_page_bid,
        monthly_searches: k.monthly_searches?.slice(0, 6),
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ total: rows.length, keywords: rows }, null, 2) }],
    };
  }
);

// ── Tool 2: Keyword Suggestions ──────────────────────────────
server.tool(
  "keyword_suggestions",
  "Get keyword suggestions/ideas based on a seed keyword from Google Ads. Returns related keywords with volume, CPC, and competition data.",
  {
    keyword: z.string().describe("Seed keyword to get suggestions for"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
    limit: z.number().optional().default(50).describe("Max results (default 50, max 700)"),
    sort_by: z.enum(["search_volume", "cpc", "competition", "relevance"]).optional().default("search_volume"),
  },
  async ({ keyword, location_code, language_code, limit, sort_by }) => {
    const body = [{ keyword, location_code, language_code, limit, sort_by, include_seed_keyword: true }];
    const result = await apiRequest("POST", "/v3/keywords_data/google_ads/keywords_for_keywords/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result || [];
    const rows = items
      .filter((k) => k && k.keyword)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      .map((k) => ({
        keyword: k.keyword,
        search_volume: k.search_volume,
        cpc: k.cpc,
        competition: k.competition,
        competition_index: k.competition_index,
        low_bid: k.low_top_of_page_bid,
        high_bid: k.high_top_of_page_bid,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ seed: keyword, total: rows.length, suggestions: rows }, null, 2) }],
    };
  }
);

// ── Tool 3: SERP Analysis ────────────────────────────────────
server.tool(
  "serp_google_organic",
  "Get Google organic search results (SERP) for a keyword. See who's ranking, their positions, snippets, and URLs.",
  {
    keyword: z.string().describe("Keyword to check SERP for"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
    depth: z.number().optional().default(20).describe("Number of results (default 20, max 100)"),
  },
  async ({ keyword, location_code, language_code, depth }) => {
    const body = [{ keyword, location_code, language_code, depth }];
    const result = await apiRequest("POST", "/v3/serp/google/organic/live/regular", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result?.[0]?.items || [];
    const rows = items
      .filter((item) => item.type === "organic")
      .map((item) => ({
        position: item.rank_absolute,
        title: item.title,
        url: item.url,
        domain: item.domain,
        description: item.description?.substring(0, 150),
      }));

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          keyword,
          total_results: result.tasks[0].result?.[0]?.se_results_count,
          organic_results: rows,
        }, null, 2),
      }],
    };
  }
);

// ── Tool 4: Competitor Domain Keywords ───────────────────────
server.tool(
  "competitor_domain_keywords",
  "Get keywords that a competitor domain ranks for in Google organic search. Great for competitive analysis.",
  {
    target: z.string().describe("Domain to analyze (e.g. 'competitor.com')"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
    limit: z.number().optional().default(50).describe("Max results (default 50)"),
  },
  async ({ target, location_code, language_code, limit }) => {
    const body = [{ target, location_code, language_code, limit, order_by: ["keyword_data.keyword_info.search_volume,desc"] }];
    const result = await apiRequest("POST", "/v3/dataforseo_labs/google/ranked_keywords/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result?.[0]?.items || [];
    const rows = items.map((item) => ({
      keyword: item.keyword_data?.keyword,
      position: item.ranked_serp_element?.serp_item?.rank_absolute,
      search_volume: item.keyword_data?.keyword_info?.search_volume,
      cpc: item.keyword_data?.keyword_info?.cpc,
      competition: item.keyword_data?.keyword_info?.competition,
      url: item.ranked_serp_element?.serp_item?.url,
    }));

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          domain: target,
          total_ranking_keywords: result.tasks[0].result?.[0]?.total_count,
          top_keywords: rows,
        }, null, 2),
      }],
    };
  }
);

// ── Tool 5: Domain Overview ──────────────────────────────────
server.tool(
  "domain_overview",
  "Get a high-level overview of a domain's SEO metrics — organic traffic, keywords count, backlinks estimate, and top pages.",
  {
    target: z.string().describe("Domain to analyze (e.g. 'droptaxi.ai')"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
  },
  async ({ target, location_code, language_code }) => {
    const body = [{ target, location_code, language_code }];
    const result = await apiRequest("POST", "/v3/dataforseo_labs/google/domain_rank_overview/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result?.[0]?.items || [];
    return {
      content: [{ type: "text", text: JSON.stringify({ domain: target, metrics: items }, null, 2) }],
    };
  }
);

// ── Tool 6: Keywords for Site ────────────────────────────────
server.tool(
  "keywords_for_site",
  "Get keyword ideas relevant to a website URL or domain. DataForSEO analyzes the site content and returns related keywords with volume data.",
  {
    target: z.string().describe("Website URL or domain (e.g. 'droptaxi.ai')"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
    limit: z.number().optional().default(50),
  },
  async ({ target, location_code, language_code, limit }) => {
    const body = [{ target, location_code, language_code }];
    const result = await apiRequest("POST", "/v3/keywords_data/google_ads/keywords_for_site/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = (result.tasks[0].result || [])
      .filter((k) => k && k.keyword)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      .slice(0, limit)
      .map((k) => ({
        keyword: k.keyword,
        search_volume: k.search_volume,
        cpc: k.cpc,
        competition: k.competition,
        competition_index: k.competition_index,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ target, total: items.length, keywords: items }, null, 2) }],
    };
  }
);

// ── Tool 7: Google Ads Ad History ────────────────────────────
server.tool(
  "google_ads_ad_history",
  "Get historical Google Ads data for keywords — see which advertisers have been bidding and their ad copy.",
  {
    keywords: z.array(z.string()).min(1).max(10).describe("Keywords to check ad history for (max 10)"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
  },
  async ({ keywords, location_code, language_code }) => {
    const body = [{ keywords, location_code, language_code }];
    const result = await apiRequest("POST", "/v3/keywords_data/google_ads/ad_traffic_by_keywords/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = result.tasks[0].result || [];
    return {
      content: [{ type: "text", text: JSON.stringify({ keywords, results: items }, null, 2) }],
    };
  }
);

// ── Tool 8: Keyword Difficulty / SERP Competitors ────────────
server.tool(
  "serp_competitors",
  "Analyze SERP competitors for a keyword — get domains competing for top positions and their intersection with your domain.",
  {
    keywords: z.array(z.string()).min(1).max(20).describe("Keywords to analyze"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
  },
  async ({ keywords, location_code, language_code }) => {
    const body = [{ keywords, location_code, language_code }];
    const result = await apiRequest("POST", "/v3/dataforseo_labs/google/competitors_domain/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = (result.tasks[0].result?.[0]?.items || []).slice(0, 20).map((item) => ({
      domain: item.domain,
      avg_position: item.avg_position,
      keywords_count: item.se_keywords,
      intersections: item.intersections,
      estimated_traffic: item.estimated_paid_traffic_cost,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ keywords, competitors: items }, null, 2) }],
    };
  }
);

// ── Tool 9: Bulk Keyword Difficulty ──────────────────────────
server.tool(
  "keyword_difficulty",
  "Get keyword difficulty scores for a batch of keywords. Helps prioritize which keywords to target based on ranking difficulty.",
  {
    keywords: z.array(z.string()).min(1).max(1000).describe("Keywords to check difficulty for"),
    location_code: z.number().optional().default(2356),
    language_code: z.string().optional().default("en"),
  },
  async ({ keywords, location_code, language_code }) => {
    const body = [{ keywords, location_code, language_code }];
    const result = await apiRequest("POST", "/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", body);
    const err = formatError(result);
    if (err) return { content: [{ type: "text", text: err }] };

    const items = (result.tasks[0].result || [])
      .filter((k) => k && k.keyword)
      .sort((a, b) => (a.keyword_difficulty || 0) - (b.keyword_difficulty || 0))
      .map((k) => ({
        keyword: k.keyword,
        difficulty: k.keyword_difficulty,
        search_volume: k.search_volume,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ total: items.length, keywords: items }, null, 2) }],
    };
  }
);

// ── Tool 10: Account Balance ─────────────────────────────────
server.tool(
  "account_balance",
  "Check your DataForSEO account balance and API credits remaining.",
  {},
  async () => {
    const result = await apiRequest("GET", "/v3/appendix/user_data", null);
    if (result.status_code !== 20000) {
      return { content: [{ type: "text", text: `Error: ${result.status_message}` }] };
    }
    const data = result.tasks?.[0]?.result?.[0] || {};
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          login: data.login,
          balance: data.money?.balance,
          currency: data.money?.currency,
          total_spent: data.money?.total,
          rate_limit: data.rate_limit,
        }, null, 2),
      }],
    };
  }
);

// ── Start server ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
