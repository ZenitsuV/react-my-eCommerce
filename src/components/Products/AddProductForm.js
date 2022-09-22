import React, { useRef, useCallback } from 'react';
import classes from './AddProductForm.module.css';
import useHttp from '../../hooks/use-http';

const AddProductForm = () => {
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifer, clear } =
    useHttp();

  const nameInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const typeInputRef = useRef();
  const descriptionInputRef = useRef();

  let productID = Date.now();

  const submitHandler = (e) => {
    e.preventDefault();
    addProductHandler({
      id: productID,
      title: nameInputRef.current.value,
      image:
        'https://thumbs.dreamstime.com/b/shopping-basket-grocery-food-32542097.jpg',
      price: priceInputRef.current.value,
      type: typeInputRef.current.value,
      description: descriptionInputRef.current.value,
    });

    nameInputRef.current.value = '';
    imageInputRef.current.value = '';
    priceInputRef.current.value = '';
    typeInputRef.current.value = '';
    descriptionInputRef.current.value = '';
  };

  const addProductHandler = useCallback(
    (productObj) => {
      sendRequest(
        'https://react-ecommerce-e7c65-default-rtdb.firebaseio.com/ecommerce/products.json',
        'POST',
        JSON.stringify(productObj),
        productObj,
        'ADD_PRODUCT'
      );
    },
    [sendRequest]
  );

  return (
    <div className={classes.card}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="id">Product ID</label>
          <input type="text" value={productID} required id="id" disabled />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Product Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Product Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Product Price</label>
          <input type="text" required id="price" ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="type">Product Type</label>
          <input type="text" required id="type" ref={typeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
