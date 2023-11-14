import { useState, useEffect } from "react";
import { copy, linkIcon, deleteIcon } from "../assets";
import { LineWave } from "react-loader-spinner";

import { useLazyGetSummaryQuery } from "../services/article";

const Content = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      // console.log(newArticle)
      setAllArticles(updatedArticles);
      console.log(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }

    setArticle({
      url: "",
      summary: data.summary
    });
  
  };

  const handleRemoveArticle = (index) => {
    let newArticlesList = allArticles.filter((article, ind) => ind !== index)
    setAllArticles(newArticlesList)
    localStorage.setItem("articles", JSON.stringify(newArticlesList));
    setArticle({
      url: "",
      summary: ""
    });
  }

  return (
    <section className="mt-16 w-full max-w-3xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justif-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ➤
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
              <div className="delete_btn">
                <button
                  type="submit"
                  className="click_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                  onClick={() => handleRemoveArticle(index)}
                >
                  <img
                      src={deleteIcon}
                      alt="delete_icon"
                      className="w-[40%] h-[40%] object-contain"
                    /> 
                </button>
              </div>
              
            </div>
            
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <LineWave
            ariaLabel="line-wave"
            firstLineColor="#22d3ee"
            middleLineColor="#0891b2"
            lastLineColor="#155e75"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black">
            Something went wrong. Try again...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Here&apos;s a <span className="blue_gradient">brief</span> overview:
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-600">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Content;
