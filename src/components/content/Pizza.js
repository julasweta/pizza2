import {
  setActiveType,
  setActiveSize,
  setItem,
  deleteItem,
  setTotalPrice,
  setTotalCount,
} from "../../redux/slices/pizzasSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Pizza({ id, title, price, sizes, types, imageUrl, item, count }) {
  const [activeSize, setActiveSize] = useState([0]);
  const { activeType, items } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  const pizzaLength = items.filter((item) => item.id === id);

  useEffect(() => {
    setActiveSize(sizes[0]);
  }, []);

  // кількість піц одноманітної піци
  let countPizzas = 0;
  pizzaLength.map((item) => (countPizzas += item.count));

  //додавання піц в кошик
  const addGlobalCount = () => {
    dispatch(
      setItem({
        id: id,
        title: title,
        price: sizePrice(),
        sizes: +activeSize,
        types: [activeType],
        imageUrl: imageUrl,
        count: count + 1,
      })
    );

    dispatch(setTotalPrice(sizePrice()));
    dispatch(setTotalCount(1));
  };

  const onAddCart = () => {
    addGlobalCount();
  };


  //ціна в залежності від розміру
  const sizePrice = () => {
    if(activeSize === 26){
      return price;
    }
    if(activeSize === 30){
      return price+20 ;
    }
    if(activeSize === 40){
      return price+40 ;
    }
  };

    //обєднюємо дані для передачі в delete
    const deletePositions = [item, activeSize, sizePrice()];
    const onDeleteItem = () => {
      dispatch(deleteItem(deletePositions));
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
              onClick={() => setActiveSize(item)}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{sizePrice()} грн</div>
        <div className="button button--outline button--add">
          <div onClick={() => onAddCart()}>Добавити</div>

          <i>{countPizzas}</i>
        </div>

        <div className="delete" onClick={() => onDeleteItem(item)}>
          Delete
        </div>
      </div>
    </li>
  );
}

export default Pizza;
