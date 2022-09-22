import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './ProductDetail.module.css';
import data from '../../../product_data.json';
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart';

const ProductDetail = (props) => {
  const disPatch = useDispatch();
  const params = useParams();

  const productData = data.filter((item) => item.id === params.productId);
  const { id, title, type, description, price } = productData[0];

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  const addToCartHandler = (amount) => {
    disPatch(
      cartActions.addItem({
        id: id,
        name: title,
        amount: amount,
        price: price,
      })
    );
  };

  let content = (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.image}>
          <img
            className={classes.img}
            src="https://thumbs.dreamstime.com/b/shopping-basket-grocery-food-32542097.jpg"
          />
        </div>
        <div className={classes.details}>
          <div>
            <p className={classes.title}>{title}</p>
            <p className={classes.type}>{capitalize(type)}</p>
            <p className={classes.description}>{description}</p>
            <p className={classes.price}>₹{price}</p>
          </div>
          <div className={classes.form}>
            <ProductForm id={id} onAddToCart={addToCartHandler} />
          </div>
        </div>
      </div>
    </div>
  );

  return <section>{content}</section>;
};

export default ProductDetail;
