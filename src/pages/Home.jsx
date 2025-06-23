import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({searchValue}) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const skeletons= [...new Array(10)].map((_, index) => <Skeleton key={index} />)
    const pizzas =items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  
React.useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

  fetch(
      `https://684672cd7dbda7ee7aaf0e63.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        if (Array.isArray(arr)) {
          setItems(arr);
        } else {
          setItems([]);
        }
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType,searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ?skeletons
          : pizzas}
      </div>
    </div>
  );
};

export default Home;
