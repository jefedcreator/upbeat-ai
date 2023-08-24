import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token: any) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "";

  const authString = `${clientId}:${clientSecret}`;
  const buffer = Buffer.from(authString, "utf-8");
  const base64Auth = buffer.toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + base64Auth,
    },
    body: params,
    cache: "no-cache",
  });
  const data = await response.json();

  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public&redirect_uri=https://upbeatai.vercel.app/api/auth/callback/spotify",
      // accessTokenUrl: "https://accounts.spotify.com/api/token",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt(params) {
      const { token, account } = params;

      if (account) {
        token.accessToken = account.access_token; // Use 'access_token' instead of 'refresh_token'
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      // access token has not expired
      if (
        (token.expires_at as number) &&
        Date.now() < Number(token.expires_at) * 1000
      ) {
        return token;
      }

      // access token has expired
      return await refreshAccessToken(token);
    },
    async session(params) {
      const { session, user, token } = params as any;
      session.user = user;
      session.name = token.name;
      session.accessToken = token.accessToken;
      session.user = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
