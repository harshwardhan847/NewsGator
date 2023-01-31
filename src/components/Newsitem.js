import React from "react";

export default function Newsitem(props) {
  let { title, disc, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="card my-3">
      <span
        className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
        style={{ left: "80%", zIndex: "1" }}
      >
        {source}
      </span>
      <img src={imageUrl} className="card-img-top" alt="pic" />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{disc}...</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : "unknown"} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          rel="noreferrer"
          target="_blank"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
