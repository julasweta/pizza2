import {
  setActiveType,
  setActiveSize,
  setItem,
  deleteItem,
  setTotalPrice,
  setTotalCount,
} from "../../redux/slices/pizzasSlice";
import { useSelector, useDispatch } from "react-redux";

function PizzaCart({ id, title, price, sizes, types, imageUrl, item, count }) {

  const { activeSize, activeType} = useSelector(
    (state) => state.pizzas
  );
  const dispatch = useDispatch();

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

    console.log((id))
    dispatch(setTotalPrice(item));
    dispatch(setTotalCount(1));
  };

  const onAddCart = () => {
    addGlobalCount();
  };

  const onDeleteItem = () => {
    dispatch(deleteItem(item));
  };




  return (
    <li className="pizza-block">
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
            <li
            >
              {sizes}
            </li>
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} грн</div>
        <div className="button button--outline button--add">
          <div onClick={() => onAddCart()}>Добавити</div>

          <i>{count}</i>
        </div>

        <div onClick={() => onDeleteItem(item)}>Delete</div>
      </div>
    </li>
  );
}

export default PizzaCart;
