import { dbConnect } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import Payment from '@/models/payment';

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the JSON body of the request
        const { name, email, amount, catagory } = body;
        await dbConnect();
        await Payment.create({ name, email, amount, catagory });
        return NextResponse.json({ message: 'Payment Successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Payment Failed' }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        await dbConnect();
        const payments = await Payment.find();
        return NextResponse.json(payments, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Payment Failed' }, { status: 500 });
    }
}
