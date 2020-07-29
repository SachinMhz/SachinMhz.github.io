import React from "react";
import "./card.css";

function Card() {
  return (
    <div className="card">
      <img className="card__image" src="https://picsum.photos/100/75" />
      <div className="card__content">
        <h2 className="card__title">The Sunset</h2>
        <p className="card__detail">Beautiful sunsets need cloudy skies.</p>
        <a href="#" className="card__btn" title="share">
          SHARE
        </a>
        <a href="#" className="card__btn" title="explore">
          EXPLORE
        </a>
      </div>
    </div>
  );
}

export default Card;
