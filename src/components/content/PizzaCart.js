import {
  setItem,
  deleteItem,
  setTotalPrice,
  setTotalCount,
} from "../../redux/slices/pizzasSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function PizzaCart({
  id,
  title,
  price,
  sizes,
  types,
  imageUrl,
  item,
  index,
  count,
}) {
  const { activeSize, activeType } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState(false);

  //визначамо парний індекс піц, щоб кожна друга була іншого кольору з іншим класом
  const whatActiveColor = () => {
    if ((index + 2) % 2 === 0) {
      setActiveColor(true);
    }
  };

  useEffect(() => {
    whatActiveColor();
  }, []);


  //додавання піц в кошик з самого кошика
  const addGlobalCount = () => {
    dispatch(
      setItem({
        id: id,
        title: title,
        price: price,
        sizes: sizes,
        types: [activeType],
        imageUrl: imageUrl,
        count: count,
      })
    );

    dispatch(setTotalPrice(item));
    dispatch(setTotalCount(1));
  };

  const onAddCart = () => {
    addGlobalCount();
  };

  //обєднюємо дані для передачі в delete
  const deletePositions = [item, sizes, price];
  const onDeleteItem = () => {
    dispatch(deleteItem(deletePositions));
  };

  return (
    <li className="pizza-block cart-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          <li>
            {types === 0
              ? "тонка"
              : types === 1
              ? "товста"
              : types === 4
              ? "гостра"
              : types === 5
              ? "не гостра"
              : ""}
          </li>
        </ul>
        <ul>
          <li className={activeColor ? "active" : ""}>{sizes}</li>
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} грн</div>
        <div className="button button--outline button--add">
          <div onClick={() => onAddCart()}>Добавити</div>

          <i>{count}</i>
        </div>

        <div className="delete" onClick={() => onDeleteItem(item)}>
          Delete
        </div>
      </div>
    </li>
  );
}

export default PizzaCart;
