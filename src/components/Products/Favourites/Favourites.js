import React from 'react';
import { useSelector } from 'react-redux';
import data from '../../../product_data.json';
import FavouriteItem from './FavouriteItem';
import classes from './Favourites.module.css';

const Favourites = (props) => {
  const favouriteItems = useSelector((state) => state.favourite.favouriteItems);

  console.log(data);

  const favItemsID = favouriteItems.map((item) => item.id);
  const favItemList = data.filter((e) => favItemsID.includes(e.id));

  let content;
  if (favItemList.length > 0) {
    content = favItemList.map((item) => (
      <FavouriteItem key={item.id} id={item.id} item={item} />
    ));
  } else {
    content = <p>No Items...</p>;
  }

  return (
    <section className={classes.meals}>
      <div className={classes.card}>
        <ul>{content}</ul>
      </div>
    </section>
  );
};

export default Favourites;
