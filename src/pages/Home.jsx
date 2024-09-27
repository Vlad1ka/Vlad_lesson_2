import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/PizzaBlock/Sort';

 const Home = () => {
    const [items, setItems]=React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
      name: "популярности",
      sortProperty: "rating",
    });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://66f121e741537919154fa987.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`)

      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  },[categoryId, sortType]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories 
          value={categoryId}
          onChangeCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} onChangeSort={(index) => setSortType (index)} />
      </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading
              ? [... new Array(6)].map((_, index) => <Skeleton key={index}/>)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
        </div>
    </div>
  )
}

export default Home;