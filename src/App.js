import "./scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Cart from "./components/cart/Cart";
import Pay from "./components/pay/Pay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPizas } from "./redux/slices/pizzasSlice";

function App() {
  const { sort, categories, searchValue } = useSelector(
    (state) => state.filter
  );
  const { page } = useSelector((state) => state.pagination);
  const { pizzas } = useSelector((state) => state.pizzas);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  //const [page, setPage] = useState(1);

  const arrSort = ["популярність", "ціна", "алфавіт"];
  const arrCategories = ["Всі", "Мясні", "Вегетаріанські", "Гострі", "Закриті", "Гриль"];



  useEffect(() => {
    onFilterPizzas(categories, sort);
  }, [categories, sort, page, searchValue]);

  /* витягуємо всі піци  */
  const onFilterPizzas = () => {

    axios
      .get(`https://my-json-server.typicode.com/julasweta/repo/pizzas`)
      .then((arr) => {
        arr.data.sort(function (a, b) {
          if (sort === "price") {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            } else {
              return 0;
            }
          }
          if (sort === "rating") {
            if (a.rating > b.rating) {
              return 1;
            }
            if (a.rating < b.rating) {
              return -1;
            } else {
              return 0;
            }
          } else {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            } else {
              return 0;
            }
          }
        });

        dispatch(setPizas(arr.data));
      });
  };

  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={
              <Content
                onFilterPizzas={onFilterPizzas}
                arrCategories={arrCategories}
                arrSort={arrSort}
                isLoading={isLoading}
              />
            }
          >
            {" "}
          </Route>
          <Route path="cart" element={<Cart />}>
            {" "}
          </Route>
          <Route path="pay" element={<Pay />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
