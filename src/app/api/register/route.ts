//@ts-nocheck
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/user';  // Ensure you import your User model

export async function POST(req) {
  try {
    const { name, surname, email, address, aadhar, mobile, family, pan, dob, password, location } = await req.json();

    await dbConnect();

    await User.create({ name, surname, email, address, aadhar, mobile, family, pan, dob, password, location });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: 'User creation failed', error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json({ message: 'Error getting users', error: error.message }, { status: 500 });
  }
}