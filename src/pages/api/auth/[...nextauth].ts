import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { SignIn, loginWithGoogle } from '@/lib/firebase/service';
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password",  type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as unknown as { email: string, password: string };
                const user: any = await SignIn(email);
                if (user) {
                    const passwordConfirm = await compare(password, user.password);

                    if (passwordConfirm) {
                        return Promise.resolve(user);
                    }
                    return Promise.resolve(null);
                } else {
                    return Promise.resolve(null);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OATH_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_OATH_CLIENT_SECRET || '',
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.fullname = user.fullname;
                token.phone = user.phone;
                token.role = user.role;
            }

            if (account?.provider === 'google') {
                const data = {
                    fullname : user.name,
                    email : user.email,
                    type : 'google', 
                }

                await loginWithGoogle(data, (data: any) => {
                    token.email = data.email;
                    token.fullname = data.fullname;
                    token.role = data.role;
                })
            }

            return token;
        },

        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("phone" in token) {
                session.user.phone = token.phone;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    }
};

export default NextAuth(authOptions);
