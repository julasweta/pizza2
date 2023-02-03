import "./scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Cart from "./components/cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const { sort, categories } = useSelector((state) => state.filter);


  const [pizzas, setPizas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const arrSort = ["популярність", "ціна", "алфавіт"];
  const arrCategories = [
    "Всі",
    "Мясні ",
    "Вегетаріанські",
    "Гострі",
    "Закриті",
  ];
  const pages = [];
  for (let i = 1; i < pizzas.length / 3 + 1; i++) {
    pages.push(i);
  }

  useEffect(() => {
    onFilterPizzas(categories, sort);
  }, [categories, sort, page]);

  const onFilterPizzas = () => {
    // виягуємо всі піци
    // setTimeout(() => setIsLoading(true));
    // setTimeout(() => setIsLoading(false), 2000);

    fetch(
      categories === "Всі"
        ? `https://my-json-server.typicode.com/julasweta/repo/pizzas`
        : `https://my-json-server.typicode.com/julasweta/repo/pizzas?category=${categories}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        arr.sort(function (a, b) {
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

        setPizas(arr);
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
                setPage={setPage}
                page={page}
                pages={pages}
                arrSort={arrSort}
                pizzas={pizzas}
                isLoading={isLoading}
              />
            }
          >
            {" "}
          </Route>
          <Route path="cart" element={<Cart />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
