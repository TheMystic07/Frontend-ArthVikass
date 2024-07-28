//@ts-nocheck

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/user';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await dbConnect();
                    const user =await User.findOne({email});
                    if (!user) {
                        return null;
                    }
                const passwordMatch=password === user.password;
                if (!passwordMatch) {
                    return null;
                }
                return  user;
                } catch (error) {
                    console.log('Error authorizing user:', error);
                    
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
