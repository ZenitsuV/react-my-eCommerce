import React from 'react';
import classes from './FavouriteItem.module.css';
import { useDispatch } from 'react-redux';
import { favActions } from '../../../store/favourite';

const FavouriteItem = (props) => {
  const disPatch = useDispatch();
  const price = `$${props.item.price.toFixed(2)}`;

  const removeFavouriteHandler = (id) => {
    disPatch(favActions.removeFavouriteItem(id));
  };

  return (
    <li className={classes.favourite}>
      <div>
        <h3>{props.item.title}</h3>
        <div className={classes.description}>{props.item.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <button onClick={removeFavouriteHandler.bind(null, props.item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default FavouriteItem;
