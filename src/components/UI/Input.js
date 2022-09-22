import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const [counter, setCounter] = useState(1);

  const increment = () => {
    setCounter((c) => c + 1);
  };

  const decrement = () => {
    setCounter((c) => c - 1);
  };

  return (
    <>
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <div onClick={decrement} className={classes.decrement}>
          -
        </div>
        <input ref={ref} {...props.input} />
        <div onClick={increment} className={classes.increment}>
          +
        </div>
        <button>+ Add</button>
      </div>
    </>
  );
});

export default Input;
