
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
  const { lang } = useSelector((state) => state.pizzas);

  const dispatch = useDispatch();

  const [isLoading] = useState(false);
  //const [page, setPage] = useState(1);

  const arrSort = ["популярність", "ціна", "алфавіт"];
  const arrCategories = ["Всі", "Мясні", "Вегетаріанські", "Гострі", "Закриті", "Гриль"];
  const arrCategoriesEng = ["Vsi", "Meat", "Vega", "Hot", "Close", "Gril"];


  useEffect(() => {
    onFilterPizzas(categories, sort);
  }, [categories, sort, page, searchValue, lang]);
  

  /* витягуємо всі піци  */
  const onFilterPizzas = () => {

    axios
  
      .get( lang? `https://my-json-server.typicode.com/julasweta/repo/pizzas` : `https://api.jsonbin.io/v3/b/640776d5c0e7653a0583f972`)
      .then((arr) => {
        
       const arrLang = lang? arr.data : arr.data.record;
       arrLang.sort(function (a, b) {
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

      
        dispatch(setPizas(arrLang));
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
                arrCategories={lang? arrCategories : arrCategoriesEng}
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
