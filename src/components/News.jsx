"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function News({ searchQuery }) {
  const [news, setNews] = useState([]);
  const [resultNum, setresultNum] = useState(3);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        // "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
        "https://newsdata.io/api/1/latest?apikey=pub_44995dd50daff2cc4007b7627523e2913d3f7&q=台灣"
      )
      .then((response) => {
        console.log(response.data.results);
        setNews(response.data.results);
        setFilteredNews(response.data.results);
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
      <h4 className="font-bold text-xl px-4">Whats happening</h4>
      {filteredNews.slice(0, resultNum).map((result) => (
        <div key={result.link}>
          <a href={result.link} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{result.title}</h6>
                <p className="text-xs font-meduium text-gray-500">
                  {result.keywords &&
                    result.keywords.map((keyword, index) => (
                      <span key={index}>
                        {index > 0 && " "}#{keyword}
                      </span>
                    ))}
                </p>
              </div>
              <img
                src={result.image_url}
                width={100}
                className="rounded-xl"
                alt={result.article_id}
              />
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
