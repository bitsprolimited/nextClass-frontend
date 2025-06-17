import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { ARTICLES } from "@/lib/constants";

interface ArticleData {
  date: {
    month: string;
    day: string;
  };
  title: string;
  description: string;
  author: string;
  likes: number;
  shares: number;
}

const ArticleCard = ({
  article,
}: {
  article: ArticleData;
}): React.JSX.Element => {
  return (
    <Card className="group hover:bg-primary w-full max-w-[380px] bg-background3 rounded-none shadow-none transition-colors">
      <CardContent className="px-10 py-20 relative">
        <div className="flex items-center justify-between gap-8">
          <p className="w-20 h-20 flex flex-col items-center justify-center bg-primary rounded-sm group-hover:bg-white ease-in-out transition-all">
            <span className="font-bold text-secondary text-xl">
              {article.date.day}
            </span>
            <span className="text-white text-xs group-hover:text-[#9b9ea1]">
              {article.date.month}
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="text-sm text-[#9b9ea1] group-hover:text-secondary ease-in-out transition-all">
                By:
              </span>
              <span className="text-zeus ml-2 group-hover:text-white ease-in-out transition-all">
                {article.author}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#ffa300] group-group-hover:text-zeus ease-in-out transition-all w-full">
              <span>{article.likes} Likes</span>
              <div className="w-1 h-1 rounded-full bg-[#0a4d3c] group-hover:bg-white ease-in-out transition-all" />
              <span>{article.shares} Shares</span>
            </div>
          </div>
        </div>

        <h2 className="text-zeus text-2xl whitespace-pre-line mt-8 group-hover:text-white ease-in-out transition-all">
          {article.title}
        </h2>

        <p className="text-[#52565b] text-sm whitespace-pre-line mt-4 group-hover:text-white ease-in-out transition-all">
          {article.description}
        </p>
      </CardContent>
    </Card>
  );
};

function ArticlesSection(): React.JSX.Element {
  return (
    <section className="flex items-center justify-center py-14">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-8 mb-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative">
            <Image
              width={100}
              height={100}
              src="/images/book-img.png"
              alt=""
              className="place-self-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <p className="text-primary text-sm font-semibold uppercase mb-2">
              Our Blog Post
            </p>
            <h2 className="text-zeus text-5xl font-medium ">Latest Articles</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTICLES.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArticlesSection;
