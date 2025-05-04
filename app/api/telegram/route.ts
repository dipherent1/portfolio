import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, subject, message, botToken, chatId } = data;
    
    // Validate required fields
    if (!botToken || !chatId) {
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

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error('Telegram API error:', errorText);
      return NextResponse.json(
        { success: false, error: errorText },
        { status: telegramResponse.status }
      );
    }

    const telegramResult = await telegramResponse.json();
    return NextResponse.json({ success: true, result: telegramResult });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
