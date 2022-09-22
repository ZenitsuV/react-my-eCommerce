import React, { useState, useEffect } from 'react';
import classes from './ViewProducts.module.css';
import data from '../../product_data.json';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        'https://react-ecommerce-e7c65-default-rtdb.firebaseio.com/ecommerce/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
          type: responseData[key].type,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.ProductsLoading}>
        <div className={classes.card}>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.ProductsError}>
        <div className={classes.card}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  let content;
  if (products.length > 0) {
    content = products.map((item) => (
      <li className={classes['products-list']} key={item.id}>
        <div>
          <img
            src="https://thumbs.dreamstime.com/b/shopping-basket-grocery-food-32542097.jpg"
            alt=""
            className={classes.image}
          />
        </div>
        <div>
          <h3>{item.title}</h3>
          <div className={classes.description}>{item.description}</div>
          <div className={classes.price}>₹{item.price}</div>
        </div>
      </li>
    ));
  } else {
    content = <p>No Items...</p>;
  }

  return (
    <section className={classes.products}>
      <div className={classes.card}>
        <ul>{content}</ul>
      </div>
    </section>
  );
};

export default ViewProducts;
