import NextAuth from "next-auth/next";

import GoogleProvidere from "next-auth/providers/google";

const handeler = NextAuth({
    providers: [
        GoogleProvidere({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
})

export { handeler as GET, handeler as POST };