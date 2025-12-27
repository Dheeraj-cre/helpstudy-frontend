import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // ✅ DEMO / FALLBACK AUTH (DummyJSON limitation)
        if (
          credentials.username === "kminchelle" &&
          credentials.password === "0lelplR"
        ) {
          return {
            id: 15,
            name: "kminchelle",
            email: "kminchelle@dummyjson.com",
            accessToken: "demo-token",
          };
        }

        // ❌ Any other credentials → fail
        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { authHandler as GET, authHandler as POST };
