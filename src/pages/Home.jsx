import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../components/redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filterSlice);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    

    // fetch(
    //   `https://684672cd7dbda7ee7aaf0e63.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     if (Array.isArray(arr)) {
    //       setItems(arr);
    //     } else {
    //       setItems([]);
    //     }
    //     setIsLoading(false);
    //   });

    axios.get(
     `https://684672cd7dbda7ee7aaf0e63.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}${search}&order=${order}`
    )
    .then(res=>{
      setItems(res.data);
        setIsLoading(false)
    })
    .catch(err => {
      console.error("Axios error:", err);
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
