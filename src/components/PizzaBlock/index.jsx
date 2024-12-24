import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import CartItem from '../components/CartItem';

const typeNames = ["тонкое", "традиционное"];

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.items.find(obj => obj.id == id));
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = CartItem ? CartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  }

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
          <div onClick={onClickAdd} className="button button--outline button--add">
            
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
    </div>
  )
}

export default PizzaBlock;


