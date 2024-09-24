import React from 'react';
import PizzaBlock from '../components/PizzaBlock';

 const Home = () => {
    const [items, setItems]=React.useState([]);

  React.useEffect(() => {
    fetch("https://66f121e741537919154fa987.mockapi.io/Items")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
    });
  },[]);
  return (
    <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj)=><PizzaBlock key={obj.id}{...obj}/>)};
          </div>
    </>
  )
}

export default Home;