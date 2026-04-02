import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/lead-schema';

export const runtime = 'nodejs';

const SHEET_RANGE = 'Leads!A:E';

function getEnv(name: 'GOOGLE_CLIENT_EMAIL' | 'GOOGLE_PRIVATE_KEY' | 'GOOGLE_SHEET_ID'): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid lead payload',
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const clientEmail = getEnv('GOOGLE_CLIENT_EMAIL');
    const privateKey = getEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
    const spreadsheetId = getEnv('GOOGLE_SHEET_ID');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();
    const { name, businessEmail, companySize, inquiryType } = parsed.data;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, businessEmail, companySize, inquiryType]],
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Google Sheets append failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to store lead data',
      },
      { status: 500 },
    );
  }
}
