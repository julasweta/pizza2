import Categories from "./Categories";
import Sort from "./Sort";
import Pizza from "./Pizza";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Content({ arrCategories, arrSort,   isLoading }) {

  const { searchValue, sort, categories } = useSelector(
    (state) => state.filter
  );

  const { page } = useSelector((state) => state.pagination);
  const { pizzas, items } = useSelector((state) => state.pizzas);

  const navigate = useNavigate();

  //переводимо назви категорій в латинь
  const catogoriesLatino = () => {
    if (categories === "Всі") {
      return "vsi";
    }
    if (categories === "Мясні") {
      return "meat";
    }
    if (categories === "Вегетаріанські") {
      return "vega";
    }
    if (categories === "Гострі") {
      return "hot";
    }
    if (categories === "Закриті") {
      return "close";
    }
    if (categories === "Гриль") {
      return "gril";
    }
  };

  /*записуємо категорію, сортування і номер сторінки в пошукову графу браузера */
  useEffect(() => {
    navigate(`?${page}=${catogoriesLatino()}=${sort}`);
  }, [page, sort, categories]);

   /*  рахуємо скільки в нас сторінок  */
   const countPizzas = pizzas
   .filter((item) =>
     item.name.toLowerCase().includes(searchValue.toLowerCase())
   )
   .filter((item) =>
     categories === "Закриті" ||
     categories === "Мясні" ||
     categories === "Гострі" ||
     categories === "Вегетаріанські" ||
     categories === "Гриль"
       ? item.category === categories
       : item.category !== categories
   )
   const pages = [];
   for (let i = 1; i < countPizzas.length / 3 + 1; i++) {
     pages.push(i);
   }

 

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories arrCategories={arrCategories}></Categories>
          <Sort arrSort={arrSort}></Sort>
        </div>

        <h2 className="content__title">Всі піци</h2>
        <div className="content__items">
          {pizzas
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter((item) =>
              categories === "Закриті" ||
              categories === "Мясні" ||
              categories === "Гострі" ||
              categories === "Вегетаріанські" ||
              categories === "Гриль"
                ? item.category === categories
                : item.category !== categories
            )
            .filter((item, index) => index < page * 3 && index > page * 3 - 4)
            .map((item) => (
              <Pizza
                key={item.id}
                item={item}
                id={item.id}
                title={item.name}
                price={item.price}
                sizes={item.sizes}
                types={item.types}
                imageUrl={item.imageUrl}
                count={item.count}
              ></Pizza>
            ))}
        </div>
        <Pagination pages={pages}></Pagination>
      </div>
    </div>
  );
}

export default Content;
