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
    })

  React.useEffect(() => {
    fetch("https://66f121e741537919154fa987.mockapi.io/Items")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
      setIsLoading(false);
    });
  },[]);

  return (
    <div className='container'>
      <div className='content-top'>
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