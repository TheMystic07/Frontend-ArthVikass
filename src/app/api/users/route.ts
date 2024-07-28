//@ts-nocheck

import connectMongoDB from '@/lib/dbConnect';
import User from '@/models/user';
import { NextResponse } from 'next/server';


export async function POST(req) {
  const { name , email , password } = await req.json();
  await connectMongoDB();
  User.create({ name , email , password });
  return NextResponse.json({message: 'User created successfully'} , {status: 201});
//   const user = await createUser(body);
//   res.json(user);
}