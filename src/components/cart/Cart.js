import React from "react";
import { useSelector} from "react-redux";
import PizzaCart from "../content/PizzaCart";

function Cart() {
  const { items } = useSelector((state) => state.pizzas);
  console.log(items)

  return (
    <div>
      <div className="content__items">
        { items &&
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
      ></PizzaCart>
    ))}
      </div>
    </div>
  );
}

export default Cart;
