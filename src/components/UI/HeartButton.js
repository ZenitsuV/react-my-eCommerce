import React from 'react';
import classes from './HeartButton.module.css';

const HeartButton = (props) => {
  const cssClassName = props.cssClass;

  return (
    <div className={classes.container}>
      <div
        className={`${classes.heart} ${classes[cssClassName]}`}
        onClick={props.onHeartClick}
      ></div>
    </div>
  );
};

export default HeartButton;
