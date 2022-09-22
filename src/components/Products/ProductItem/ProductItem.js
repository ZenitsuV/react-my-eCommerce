import React from 'react';
import Card from '../../UI/Card';
import classes from './ProductItem.module.css';
import ProductForm from './ProductForm';
import HeartButton from '../../UI/HeartButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../store/cart';
import { favActions } from '../../../store/favourite';

const ProductItem = (props) => {
  const disPatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourite.favouriteItems);

  const isItemFavourite = (items, id) => {
    if (items.length > 0) return items.some((item) => item.id === id);
    else return false;
  };
  const itemIsFavourite = isItemFavourite(favouriteItems, props.item.id);

  let cssClass;
  if (itemIsFavourite) cssClass = 'heart_selected';
  else cssClass = 'heart_nonselected';

  const toggleFavouriteItem = () => {
    if (itemIsFavourite) {
      disPatch(favActions.removeFavouriteItem(props.item.id));
    } else {
      disPatch(favActions.addFavouriteItem(props.item.id));
    }
  };

  const price = `₹ ${props.item.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    disPatch(
      cartActions.addItem({
        id: props.item.id,
        name: props.item.title,
        amount: amount,
        price: props.item.price,
      })
    );
  };

  return (
    <Card key={props.item.title}>
      <div>
        <HeartButton onHeartClick={toggleFavouriteItem} cssClass={cssClass} />
      </div>
      <div>
        <Link to={`/product-detail/${props.item.id}`}>
          <img
            src="https://thumbs.dreamstime.com/b/shopping-basket-grocery-food-32542097.jpg"
            alt=""
            className={classes.image}
          />
        </Link>
      </div>
      <div className={classes.details}>
        <span>{props.item.title}</span>
        <span>{price}</span>
      </div>
      <div>
        <ProductForm id={props.item.id} onAddToCart={addToCartHandler} />
      </div>
    </Card>
  );
};

export default ProductItem;
