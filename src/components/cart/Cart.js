import React from "react";
import { useSelector } from "react-redux";
import PizzaCart from "../content/PizzaCart";
import { Link } from "react-router-dom";

function Cart() {
  const { items } = useSelector((state) => state.pizzas);

  console.log(items);

  return (
    <div className="cart">
      <div className="content__items">
        {items &&
          items.map((item, index) => (
            <PizzaCart
              key={index}
              item={item}
              id={item.id}
              title={item.title}
              price={item.price}
              sizes={item.sizes}
              types={item.types}
              imageUrl={item.imageUrl}
              count={item.count}
              index={index}
            ></PizzaCart>
          ))}
      </div>
      <div className="pay-wraper">
        <Link to="/pay" className="btn-pay">Перейти до оплати</Link>
      </div>
    </div>
  );
}

export default Cart;
