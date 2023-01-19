import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 8,
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23d37e87f939495a8a5a6ef887ae403e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
  

  async componentDidMount() {
    this.updateNews();
    
  }
  handlePreviousClk = async () => {
    this.setState({page:this.state.page-1})
    this.updateNews();
  };
  handleNextClk = async () => {
  this.setState({page:this.state.page+1})
  this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsGator - Breaking News</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  disc={
                    element.description ? element.description.slice(0, 88) : ""
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
        <div className="containe d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClk}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize))
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClk}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

// GET https://newsapi.org/v2/everything?q=Apple&from=2023-01-16&sortBy=popularity&apiKey=23d37e87f939495a8a5a6ef887ae403e
