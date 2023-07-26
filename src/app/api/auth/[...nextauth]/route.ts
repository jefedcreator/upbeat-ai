import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import JWT from "next-auth/providers/spotify";
import Account from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public",
      // accessTokenUrl: "https://accounts.spotify.com/api/token",
    }),
  ],
  callbacks: {
    async jwt(params) {
      const { token, account } = params;

      if (account) {
        token.accessToken = account.access_token; // Use 'access_token' instead of 'refresh_token'
      }

      return token;
    },
    async session(params) {
      const { session, user, token } = params as any;
      session.user = user;
      session.name = token.name;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
