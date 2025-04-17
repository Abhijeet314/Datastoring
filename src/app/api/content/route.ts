// pages/api/content/index.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Content from '../../../models/content';

export async function GET() {
  await dbConnect();
  try {
    const contents = await Content.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contents });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const content = await Content.create(body);
    return NextResponse.json({ success: true, data: content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
