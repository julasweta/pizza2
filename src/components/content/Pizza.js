import React, { useState } from "react";

function Pizza({ id, title, price, sizes, types, imageUrl }) {
  const [activeSize, setActiveSize] = useState();
  const [activeType, setActiveSizeType] = useState(0);

  const onActiveSize = (item) => {
    setActiveSize(item);
  };

  const onActiveType = (item) => {
    console.log(item);
    setActiveSizeType(item);
  };


  return (
    <li className="pizza-block" key={id}>
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item, index) =>
            item === 3 ? (
              <li key={index}></li>
            ) : (
              <li
                className={activeType === item && item !== 3 ? "active" : ""}
                onClick={() => onActiveType(item)}
                key={index}
              >
                {item === 0
                  ? "тонка"
                  : item === 1
                  ? "товста"
                  : item === 4
                  ? "гостра"
                  : item === 5
                  ? "не гостра"
                  : ""}
              </li>
            )
          )}
        </ul>
        <ul>
          {sizes.map((item, index) => (
            <li
              className={activeSize === item ? "active" : ""}
              onClick={() => onActiveSize(item)}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} грн</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>2</i>
        </div>
      </div>
    </li>
  );
}

export default Pizza;
