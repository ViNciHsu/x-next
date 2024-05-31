import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  let query = "台灣";
  var apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  if (!apiKey) {
    console.error("API key is missing");
    return NextResponse.error("API key is missing", { status: 500 });
  }

  let today = new Date();
  let to = today.toISOString().split("T")[0];
  let from = new Date(today.setDate(today.getDate() - 1))
    .toISOString()
    .split("T")[0];
  let sortBy = "publishedAt";

  let url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    // console.log("news/route.js: ", response.data.articles);
    return NextResponse.json({
      articles: response.data.articles,
    });
  } catch (error) {
    console.error("錯誤資訊:", error);
    return NextResponse.error("API 請求失敗", { status: 500 });
  }
}
