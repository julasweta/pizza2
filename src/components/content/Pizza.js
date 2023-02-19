import {
  setActiveType,
  setActiveSize,
  setItem,
  deleteItem,
  setTotalPrice,
  setTotalCount,
} from "../../redux/slices/pizzasSlice";
import { useSelector, useDispatch } from "react-redux";

function Pizza({ id, title, price, sizes, types, imageUrl, item, count }) {
  const { activeSize, activeType, items} = useSelector( (state) => state.pizzas);
  const dispatch = useDispatch();

  const pizzaLength = items.filter(item =>
    item.id === id
  );

  let sum = 0;
  pizzaLength.map(item => sum += item.count);

  const addGlobalCount = () => {
    dispatch(
      setItem({
        id: id,
        title: title,
        price: price,
        sizes: +(activeSize),
        types: [activeType],
        imageUrl: imageUrl,
        count: count+1,
      })
    );

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
          {types.map((item, index) =>
            item === 3 ? (
              <li key={index}></li>
            ) : (
              <li
                className={activeType === item && item !== 3 ? "active" : ""}
                onClick={() => dispatch(setActiveType(item))}
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
              onClick={() => dispatch(setActiveSize(item))}
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
          <div onClick={() => onAddCart()}>Добавити</div>

          <i>{sum}</i>
        </div>

        <div onClick={() => onDeleteItem(item)}>Delete</div>
      </div>
    </li>
  );
}

export default Pizza;
