import React from 'react';
function PizzaBlock({title, price, imageUrl, sizes, types }) {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const typeNames = ["тонкое", "традиционное"];

  return (
    <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) =>
            <li 
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? "active" : ""}
            >
              {typeNames[typeId]}
            </li>
            )}
          </ul>
          <ul>
              {sizes.map((sizes, i) =>(
                <li
                  key={sizes}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {sizes} см.
                </li>
              ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add">
            
            <span>Добавить</span>
            <i>0</i>
          </div>
        </div>
    </div>
  )
}

export default PizzaBlock;


