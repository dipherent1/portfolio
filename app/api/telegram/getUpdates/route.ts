import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { botToken } = data;
    
    // Validate required fields
    if (!botToken) {
      return NextResponse.json(
        { success: false, error: 'Bot token is required' },
        { status: 400 }
      );
    }

    // Call Telegram API to get updates
    const telegramUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const telegramResponse = await fetch(telegramUrl);

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error('Telegram API error:', errorText);
      return NextResponse.json(
        { success: false, error: errorText },
        { status: telegramResponse.status }
      );
    }

    const telegramResult = await telegramResponse.json();
    return NextResponse.json({ success: true, result: telegramResult.result });
  } catch (error) {
    console.error('Error getting updates from Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
