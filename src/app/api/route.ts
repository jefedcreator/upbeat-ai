import { NextResponse, NextRequest } from "next/server";
import { Server } from "socket.io";
import { Configuration, OpenAIApi } from "openai";
// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET() {
  return new Response("Hello tomorrow");
}

