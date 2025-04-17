// pages/api/content/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Content from '../../../../models/content';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
  }

  await dbConnect();
  try {
    const content = await Content.findById(id);
    if (!content) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
  }

  await dbConnect();
  try {
    const content = await Content.findByIdAndUpdate(id, await request.json(), {
      new: true,
      runValidators: true
    });
    if (!content) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
  }

  await dbConnect();
  try {
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}