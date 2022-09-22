import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Cart.module.css';
import { cartActions } from '../../store/cart';

const Cart = (props) => {
  const dispatch = useDispatch();
  let totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  totalAmount = `₹${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const orderClickHandler = () => {
    setIsCheckOut(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://react-ecommerce-e7c65-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orders: items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          items={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const ModalItems = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && ModalItems}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
