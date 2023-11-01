import prisma from '@/app/_libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'



export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Type your username.."
                },
                password: {
                    label: "Password",
                    type: 'password',
                },

            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    throw new Error('Invalid username or password')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        name: credentials.username
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid email or password')
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isPasswordCorrect) {
                    throw new Error('Invalid email or password')
                }

                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

