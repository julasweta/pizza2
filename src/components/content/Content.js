import Categories from "./Categories";
import Sort from "./Sort";
import Pizza from "./Pizza";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";

//фільтрація по пошуковому запиті і розподіл по сторінках
function Content({
  arrCategories,
  page,
  setPage,
  arrSort,
  pizzas,
  pages,
  isLoading,
}) {
  const searchValue = useSelector((state) => state.filter.searchValue);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            arrCategories={arrCategories}
            page={page}
            setPage={setPage}
          ></Categories>
          <Sort arrSort={arrSort}></Sort>
        </div>

        <h2 className="content__title">Всі піци</h2>
        <div className="content__items">
          {pizzas

            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter((item, index) => index < page * 3 && index > page * 3 - 4)
            .map((item) =>
              isLoading ? (
                <Skeleton
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  sizes={item.sizes}
                  types={item.types}
                  imageUrl={item.imageUrl}
                ></Skeleton>
              ) : (
                <Pizza
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  sizes={item.sizes}
                  types={item.types}
                  imageUrl={item.imageUrl}
                ></Pizza>
              )
            )}
        </div>
        <Pagination pages={pages} setPage={setPage} page={page}></Pagination>
      </div>
    </div>
  );
}

export default Content;
