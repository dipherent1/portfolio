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

    // Validate token format
    if (!botToken.match(/^\d+:[A-Za-z0-9_-]+$/)) {
      console.error('Invalid bot token format');
      return NextResponse.json(
        { success: false, error: 'Invalid bot token format' },
        { status: 400 }
      );
    }

    // Call Telegram API to get updates
    const telegramUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    console.log(`Calling Telegram API at: ${telegramUrl.replace(botToken, '[REDACTED]')}`);

    try {
      const telegramResponse = await fetch(telegramUrl);
      console.log("Telegram API response status:", telegramResponse.status);

      // Get the response text for debugging
      const responseText = await telegramResponse.text();
      console.log("Telegram API raw response:", responseText);

      // Try to parse the response
      let telegramResult;
      try {
        telegramResult = JSON.parse(responseText);
      } catch (error) {
        console.error('Failed to parse Telegram API response:', error);
        return NextResponse.json(
          { success: false, error: 'Invalid response from Telegram API' },
          { status: 500 }
        );
      }

      if (!telegramResponse.ok || !telegramResult.ok) {
        console.error("Telegram API returned error:", telegramResult);
        return NextResponse.json(
          {
            success: false,
            error: telegramResult.description || 'Telegram API error',
            details: telegramResult
          },
          { status: telegramResponse.status || 400 }
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
