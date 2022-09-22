import React from 'react';
import classes from './AvailableProducts.module.css';
import data from '../../product_data.json';
import ProductItem from './ProductItem/ProductItem';

const AvailableProducts = (props) => {
  const productList = data.map((item) => (
    <ProductItem key={item.title} id={item.title} item={item} />
  ));

  return <section className={classes.products}>{productList}</section>;
};

export default AvailableProducts;
