import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsGator`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        NewsGator - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        hasMore={articles.length !== totalResults}
        next={fetchMoreData}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              if (element === undefined) return "";
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    disc={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
// GET https://newsapi.org/v2/everything?q=Apple&from=2023-01-16&sortBy=popularity&apiKey=23d37e87f939495a8a5a6ef887ae403e
