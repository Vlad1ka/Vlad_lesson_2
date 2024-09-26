import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

 const Home = () => {
    const [items, setItems]=React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
    <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [... new Array(6)].map((_, index) => <Skeleton key={index}/>)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
          </div>
    </>
  )
}

export default Home;