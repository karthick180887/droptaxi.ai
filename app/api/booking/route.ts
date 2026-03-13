import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface BookingRequest {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  carType: string;
  phone: string;
}

async function sendTelegramNotification(
  booking: BookingRequest
): Promise<boolean> {
  // Strip spaces from phone for the tel link
  const cleanPhone = booking.phone.replace(/\s/g, "");
  const fullPhone = cleanPhone.startsWith("+91")
    ? cleanPhone
    : `+91${cleanPhone}`;

  const message = `🚖 *New Booking Request\\!*

📍 *Pickup:* ${escapeMarkdown(booking.pickup)}
📍 *Drop:* ${escapeMarkdown(booking.drop)}
📅 *Date:* ${escapeMarkdown(booking.date)}
⏰ *Time:* ${escapeMarkdown(booking.time)}
🚗 *Car Type:* ${escapeMarkdown(booking.carType)}
📞 *Phone:* [${escapeMarkdown(fullPhone)}](tel:${fullPhone})

_via DropTaxi\\.ai_`;

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Telegram API error:", errorText);
    return false;
  }

  return true;
}

// MarkdownV2 requires escaping these characters
function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function POST(request: NextRequest) {
  try {
    const booking: BookingRequest = await request.json();

    if (!booking.pickup || !booking.drop || !booking.date || !booking.phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const sent = await sendTelegramNotification(booking);

    if (!sent) {
      return NextResponse.json(
        { success: false, message: "Failed to send notification" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
