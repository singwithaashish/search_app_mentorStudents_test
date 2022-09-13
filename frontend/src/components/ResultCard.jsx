import React from "react";

function ResultCard({ product }) {
  return (
    <div className="product" key={product.name}>
      <p className="primary-text">{product.primaryText}</p>
      <div className="overlap">
        <img src={product.imageUrl} alt={product.name} />
        <p className="info-headline">{product.headline}</p>
      </div>
      <p className="info-description">{product.description}</p>
      <div className="flex">
        <p className="info-name">{product.name}</p>
        <a href={product.url} className="info-cta">
          {product.CTA}
        </a>
      </div>
    </div>
  );
}

export default ResultCard;
