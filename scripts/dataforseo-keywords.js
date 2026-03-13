/**
 * DataForSEO Keyword Research for DropTaxi
 * Analyzes high-demand keywords and route-based keywords
 *
 * Usage: node scripts/dataforseo-keywords.js
 */

const https = require('https');

const LOGIN = process.env.DATAFORSEO_LOGIN || 'enquiry@seorankpro.in';
const PASSWORD = process.env.DATAFORSEO_PASSWORD || '2b8cc7ed8b1e3cf6';
const AUTH = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

function apiRequest(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: 'api.dataforseo.com',
      path: endpoint,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(new Error(`Parse error: ${responseData.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── Seed keywords for DropTaxi business ──
const SEED_KEYWORDS = {
  // Core service keywords
  core: [
    'drop taxi',
    'one way taxi',
    'one way cab',
    'one way cab booking',
    'drop taxi booking',
    'outstation taxi one way',
    'intercity cab',
    'one way outstation cab',
  ],
  // Route-based keywords (major South India routes)
  routes: [
    'chennai to bangalore taxi',
    'bangalore to chennai cab',
    'chennai to coimbatore taxi',
    'chennai to madurai taxi',
    'bangalore to mysore cab',
    'chennai to pondicherry taxi',
    'bangalore to coimbatore taxi',
    'hyderabad to bangalore cab',
    'chennai to trichy taxi',
    'bangalore to ooty cab',
    'chennai to salem taxi',
    'bangalore to tirupati cab',
    'chennai to vellore taxi',
    'madurai to chennai taxi',
    'coimbatore to chennai cab',
    'chennai to tirupati taxi',
    'bangalore to mangalore cab',
    'chennai to bangalore one way taxi',
    'bangalore to chennai one way cab',
    'chennai to coimbatore one way taxi',
  ],
  // Airport keywords
  airport: [
    'chennai airport taxi',
    'bangalore airport cab',
    'chennai airport drop taxi',
    'bangalore airport one way taxi',
    'coimbatore airport taxi',
    'madurai airport cab',
  ],
  // Competitor / comparison keywords
  competitive: [
    'drop taxi alternative',
    'cheapest one way cab',
    'best one way taxi service',
    'one way taxi price',
    'drop taxi rate per km',
  ],
};

async function getKeywordVolumes(keywords) {
  console.log(`\n📊 Fetching search volume for ${keywords.length} keywords...`);

  const body = [{
    keywords: keywords,
    location_code: 2356, // India
    language_code: 'en',
    date_from: '2025-03-01',
    date_to: '2026-03-01',
    sort_by: 'search_volume',
  }];

  const result = await apiRequest('/v3/keywords_data/google_ads/search_volume/live', body);

  if (result.status_code !== 20000) {
    console.error('API Error:', result.status_message || JSON.stringify(result));
    return [];
  }

  const items = result.tasks?.[0]?.result || [];
  return items;
}

async function getKeywordSuggestions(seed) {
  console.log(`\n🔍 Getting keyword suggestions for: "${seed}"`);

  const body = [{
    keyword: seed,
    location_code: 2356, // India
    language_code: 'en',
    include_seed_keyword: true,
    limit: 50,
    sort_by: 'search_volume',
  }];

  const result = await apiRequest('/v3/keywords_data/google_ads/keywords_for_keywords/live', body);

  if (result.status_code !== 20000) {
    console.error('API Error:', result.status_message || JSON.stringify(result));
    return [];
  }

  const items = result.tasks?.[0]?.result || [];
  return items;
}

function formatTable(keywords, title) {
  if (!keywords || keywords.length === 0) {
    console.log(`\n⚠️  No data for: ${title}`);
    return;
  }

  // Sort by search volume descending
  const sorted = [...keywords]
    .filter(k => k && k.search_volume != null)
    .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

  console.log(`\n${'═'.repeat(120)}`);
  console.log(`  ${title}`);
  console.log(`${'═'.repeat(120)}`);
  console.log(
    'Keyword'.padEnd(45) +
    'Volume'.padStart(10) +
    'CPC (₹)'.padStart(12) +
    'Competition'.padStart(15) +
    'Comp. Index'.padStart(14) +
    'Low Bid'.padStart(12) +
    'High Bid'.padStart(12)
  );
  console.log('─'.repeat(120));

  for (const kw of sorted) {
    const keyword = (kw.keyword || '').padEnd(45);
    const volume = String(kw.search_volume || 0).padStart(10);
    const cpc = (kw.cpc != null ? `₹${kw.cpc.toFixed(2)}` : '—').padStart(12);
    const competition = (kw.competition || '—').padStart(15);
    const compIndex = (kw.competition_index != null ? String(kw.competition_index) : '—').padStart(14);
    const lowBid = (kw.low_top_of_page_bid != null ? `₹${kw.low_top_of_page_bid.toFixed(2)}` : '—').padStart(12);
    const highBid = (kw.high_top_of_page_bid != null ? `₹${kw.high_top_of_page_bid.toFixed(2)}` : '—').padStart(12);

    console.log(`${keyword}${volume}${cpc}${competition}${compIndex}${lowBid}${highBid}`);
  }

  console.log('─'.repeat(120));
  console.log(`  Total keywords: ${sorted.length}`);
}

function generateRecommendations(allKeywords) {
  const sorted = [...allKeywords]
    .filter(k => k && k.search_volume != null && k.search_volume > 0)
    .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

  console.log(`\n${'═'.repeat(120)}`);
  console.log('  🎯 TOP RECOMMENDED KEYWORDS FOR GOOGLE ADS');
  console.log(`${'═'.repeat(120)}`);

  // High volume + high intent
  const highValue = sorted.filter(k =>
    k.search_volume >= 1000 &&
    (k.keyword.includes('taxi') || k.keyword.includes('cab') || k.keyword.includes('drop'))
  );

  if (highValue.length > 0) {
    console.log('\n🔥 HIGH VOLUME (1000+ searches/month):');
    highValue.slice(0, 15).forEach(k => {
      const bid = k.high_top_of_page_bid ? `₹${k.high_top_of_page_bid.toFixed(2)}` : 'N/A';
      console.log(`   ✅ ${k.keyword.padEnd(40)} Vol: ${String(k.search_volume).padStart(8)}  |  Top bid: ${bid}`);
    });
  }

  // Route keywords
  const routeKws = sorted.filter(k =>
    k.keyword.includes(' to ') && k.search_volume >= 100
  );

  if (routeKws.length > 0) {
    console.log('\n🛣️  BEST ROUTE KEYWORDS (100+ searches/month):');
    routeKws.slice(0, 20).forEach(k => {
      const bid = k.high_top_of_page_bid ? `₹${k.high_top_of_page_bid.toFixed(2)}` : 'N/A';
      console.log(`   🚕 ${k.keyword.padEnd(40)} Vol: ${String(k.search_volume).padStart(8)}  |  Top bid: ${bid}`);
    });
  }

  // Low competition gems
  const gems = sorted.filter(k =>
    k.search_volume >= 100 &&
    k.competition_index != null &&
    k.competition_index < 50
  );

  if (gems.length > 0) {
    console.log('\n💎 LOW COMPETITION GEMS (search vol 100+, competition < 50):');
    gems.slice(0, 15).forEach(k => {
      console.log(`   💡 ${k.keyword.padEnd(40)} Vol: ${String(k.search_volume).padStart(8)}  |  Comp: ${k.competition_index}`);
    });
  }

  // Negative keyword suggestions
  console.log('\n🚫 SUGGESTED NEGATIVE KEYWORDS:');
  const negatives = ['ola', 'uber', 'auto rickshaw', 'bike taxi', 'rental car', 'self drive', 'buy taxi', 'taxi driver job', 'taxi app download', 'taxi number'];
  negatives.forEach(n => console.log(`   ❌ ${n}`));
}

async function main() {
  console.log('🚀 DataForSEO Keyword Research for DropTaxi');
  console.log('━'.repeat(60));
  console.log(`📅 Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`🌍 Market: India (en)`);
  console.log('━'.repeat(60));

  const allKeywords = [];

  try {
    // 1. Core service keywords
    const allCoreKeywords = [...SEED_KEYWORDS.core, ...SEED_KEYWORDS.competitive];
    const coreResults = await getKeywordVolumes(allCoreKeywords);
    formatTable(coreResults, '🏷️  CORE SERVICE KEYWORDS');
    allKeywords.push(...coreResults);

    // 2. Route-based keywords
    const routeResults = await getKeywordVolumes(SEED_KEYWORDS.routes);
    formatTable(routeResults, '🛣️  ROUTE-BASED KEYWORDS');
    allKeywords.push(...routeResults);

    // 3. Airport keywords
    const airportResults = await getKeywordVolumes(SEED_KEYWORDS.airport);
    formatTable(airportResults, '✈️  AIRPORT KEYWORDS');
    allKeywords.push(...airportResults);

    // 4. Get keyword suggestions for top seeds
    const topSeeds = ['drop taxi', 'one way cab', 'outstation taxi'];
    for (const seed of topSeeds) {
      const suggestions = await getKeywordSuggestions(seed);
      if (suggestions && suggestions.length > 0) {
        formatTable(suggestions, `💡 SUGGESTIONS FOR: "${seed}"`);
        allKeywords.push(...suggestions);
      }
    }

    // 5. Generate recommendations
    // Deduplicate by keyword
    const seen = new Set();
    const unique = allKeywords.filter(k => {
      if (!k || !k.keyword || seen.has(k.keyword)) return false;
      seen.add(k.keyword);
      return true;
    });

    generateRecommendations(unique);

    // Save to JSON
    const fs = require('fs');
    const reportPath = 'reports/keyword-research.json';
    fs.mkdirSync('reports', { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify({
      date: new Date().toISOString(),
      market: 'India',
      total_keywords: unique.length,
      keywords: unique.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
    }, null, 2));
    console.log(`\n📁 Full report saved to: ${reportPath}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('401')) {
      console.error('   Check your DataForSEO credentials.');
    }
  }
}

main();
