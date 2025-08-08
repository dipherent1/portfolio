import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log("Telegram API route called");
    console.log("Running on Vercel:", process.env.VERCEL ? "Yes" : "No");

    const data = await request.json();
    const { name, email, subject, message, botToken, chatId } = data;

    console.log("Received data:", {
      name,
      email,
      subject,
      message: message?.substring(0, 20) + "...", // Log just the beginning of the message
      botToken: botToken ? `${botToken.substring(0, 5)}...${botToken.substring(botToken.length - 5)}` : undefined,
      chatId
    });

    // Validate required fields
    if (!botToken || !chatId) {
      console.error("Missing required fields:", {
        hasBotToken: !!botToken,
        hasChatId: !!chatId
      });
      return NextResponse.json(
        { success: false, error: 'Bot token and chat ID are required' },
        { status: 400 }
      );
    }

    // Format the message for Telegram
    const text = `
📬 New Contact Form Submission

👤 Name: ${name || 'Not provided'}
📧 Email: ${email || 'Not provided'}
📝 Subject: ${subject || 'No Subject'}
📄 Message:

${message || 'No message content'}
    `;

    // Send to Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    console.log(`Calling Telegram API at: ${telegramUrl.replace(botToken, '[REDACTED]')}`);

    try {
      // Validate the bot token format
      if (!botToken.match(/^\d+:[A-Za-z0-9_-]+$/)) {
        console.error('Invalid bot token format');
        return NextResponse.json(
          { success: false, error: 'Invalid bot token format' },
          { status: 400 }
        );
      }

      // Validate the chat ID format
      if (!chatId.toString().match(/^-?\d+$/)) {
        console.error('Invalid chat ID format');
        return NextResponse.json(
          { success: false, error: 'Invalid chat ID format' },
          { status: 400 }
        );
      }

      // Make the API call with proper error handling
      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });

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

      // Check if the response was successful
      if (!telegramResponse.ok || !telegramResult.ok) {
        console.error('Telegram API error:', telegramResult);
        return NextResponse.json(
          {
            success: false,
            error: telegramResult.description || 'Unknown error from Telegram API',
            details: telegramResult
          },
          { status: telegramResponse.status }
        );
      }

      return NextResponse.json({ success: true, result: telegramResult });
    } catch (error) {
      console.error("Error during Telegram API call:", error);
      return NextResponse.json(
        { success: false, error: error.message || 'Network error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
