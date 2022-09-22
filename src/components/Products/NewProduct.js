import React from 'react';
import classes from './NewProduct.module.css';
import AddProductForm from './AddProductForm';

const NewProduct = () => {
  return (
    <div className={classes.container}>
      <AddProductForm />
    </div>
  );
};

export default NewProduct;
