"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function News({ searchQuery }) {
  const [news, setNews] = useState([]);
  const [resultNum, setresultNum] = useState(3);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const query = "台灣";
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

    if (!apiKey) {
      console.error("API key is missing");
      return;
    }

    // 計算日期
    const today = new Date();
    const to = today.toISOString().split("T")[0];
    const from = new Date(today.setDate(today.getDate() - 1))
      .toISOString()
      .split("T")[0];

    axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => {
        console.log(response.data.articles);
        setNews(response.data.articles);
        setFilteredNews(response.data.articles);
      })
      .catch((error) => {
        console.error("錯誤資訊:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredNews(news);
      return;
    }

    const filtered = news.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchQuery, news]);

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="font-bold text-xl px-4">Breaking News</h4>
      {filteredNews.slice(0, resultNum).map((result, idx) => (
        <div key={result.url}>
          <a href={result.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{result.title}</h6>
                <p className="text-xs font-meduium text-gray-500">
                  <span key={idx}>{result.author}</span>
                </p>
              </div>
              <img src={result.urlToImage} width={100} className="rounded-xl" />
            </div>
          </a>
        </div>
      ))}
      {!searchQuery ? (
        <button
          onClick={() => setresultNum(resultNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400 text-sm"
        >
          Load More
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
