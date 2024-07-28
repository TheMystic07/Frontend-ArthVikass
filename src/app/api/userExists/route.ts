//@ts-nocheck
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/user';  // Ensure you import your User model
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { email } = await req.json();
        const user = await  User.findOne ({ email }).select("_id");    // Find user by email   
        console.log(user);

        if (user) {
            return NextResponse.json({ message: 'User exists', exists: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User does not exist', exists: false }, { status: 200 });
        }
        } catch (error) {
        console.error("Error checking user:", error);
        return NextResponse.json({ message: 'User check failed', error: error.message }, { status: 500 });
    }
}