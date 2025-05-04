import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log("getUpdates API route called");
    const data = await request.json();
    const { botToken } = data;

    console.log("Received token length:", botToken?.length);

    // Validate required fields
    if (!botToken) {
      console.error("Missing bot token");
      return NextResponse.json(
        { success: false, error: 'Bot token is required' },
        { status: 400 }
      );
    }

    // Call Telegram API to get updates
    const telegramUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    console.log(`Calling Telegram API at: ${telegramUrl.replace(botToken, '[REDACTED]')}`);

    try {
      const telegramResponse = await fetch(telegramUrl);
      console.log("Telegram API response status:", telegramResponse.status);

      if (!telegramResponse.ok) {
        const errorText = await telegramResponse.text();
        console.error('Telegram API error:', errorText);
        return NextResponse.json(
          { success: false, error: errorText },
          { status: telegramResponse.status }
        );
      }

      // Log the full response for debugging
      const responseText = await telegramResponse.text();
      console.log("Telegram API response:", responseText);

      // Parse the response again since we consumed it with text()
      const telegramResult = JSON.parse(responseText);

      if (!telegramResult.ok) {
        console.error("Telegram API returned error:", telegramResult);
        return NextResponse.json(
          { success: false, error: telegramResult.description || 'Telegram API error' },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, result: telegramResult.result });
    } catch (error) {
      console.error("Error during Telegram API call:", error);
      return NextResponse.json(
        { success: false, error: error.message || 'Network error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error getting updates from Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
