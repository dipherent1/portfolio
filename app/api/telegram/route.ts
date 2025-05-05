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
