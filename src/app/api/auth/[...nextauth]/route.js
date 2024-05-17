import NextAuth from "next-auth/next";

import GoogleProvidere from "next-auth/providers/google";

const handeler = NextAuth({
  providers: [
    GoogleProvidere({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
        session.user.username = session.user.name.split(' ').join(' ').toLocaleLowerCase();
        session.user.uid = token.sub;
        console.log(session);
        return session;
    },
  },
});

export { handeler as GET, handeler as POST };
