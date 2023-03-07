import Categories from "./Categories";
import Sort from "./Sort";
import Pizza from "./Pizza";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Content({ arrCategories, arrSort }) {

  const { searchValue, sort, categories } = useSelector(
    (state) => state.filter
  );

  const { page } = useSelector((state) => state.pagination);
  const { pizzas, lang } = useSelector((state) => state.pizzas);
//console.log(pizzas);
  const navigate = useNavigate();

  //переводимо назви категорій в латинь
  const catogoriesLatino = () => {
   
    if (categories === "Всі") {
      return "Vsi";
    }
    if (categories === "Мясні") {
      return "Meat";
    }
    if (categories === "Вегетаріанські") {
      return "Vega";
    }
    if (categories === "Гострі") {
      return "Hot";
    }
    if (categories === "Закриті") {
      return "Close";
    }
    if (categories === "Гриль") {
      return "Gril";
    }
    if (categories === "Vsi") {
      return "Vsi";
    }
    if (categories === "Meat") {
      return "Meat";
    }
    if (categories === "Vega") {
      return "Vega";
    }
    if (categories === "Hot") {
      return "Hot";
    }
    if (categories === "Close") {
      return "Close";
    }
    if (categories === "Gril") {
      return "Gril";
    }
  };


  /*записуємо категорію, сортування і номер сторінки в пошукову графу браузера */
  useEffect(() => {
    navigate(`?${page}=${catogoriesLatino()}=${sort}`);
  }, [page, sort, categories, lang]);

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

        <h2 className="content__title">{lang? 'Всі піци' :'All Pizzas'}</h2>
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
