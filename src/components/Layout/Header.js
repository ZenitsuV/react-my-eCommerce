import React, { Fragment } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/" className={classes.logo}>
          <h1>Online Shopping</h1>
        </Link>
        <div className={classes.links}>
          <div className={classes.dropdown}>
            <Link to="/new-product" className={classes.nav}>
              <h1>New Product</h1>
            </Link>
            <div className={classes.dropdowncontent}>
              <Link to="/view-product" className={classes.nav}>
                <h1>View</h1>
              </Link>
            </div>
          </div>

          <Link to="/favourite-products" className={classes.nav}>
            <h1>Favourites</h1>
          </Link>
        </div>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;

/*
 <div className={classes['main-image']}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/805/189/original/paper-art-online-shopping-on-smart-phone-buy-sell-on-mobile-technology-marketing-illustration-for-cover-page-design-on-website-free-vector.jpg"
          alt="A table fullx of delicious food!"
        />
      </div> 
*/
