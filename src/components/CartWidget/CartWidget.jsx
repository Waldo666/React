// cartwidget.jsx
import styles from '../CartWidget/CartWidget.module.css'
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import carritoImg from '../../assets/img/carrito.png'

const CartWidget = () => {
  const { cart, getTotalItems } = useContext(CartContext);

  return (
    <Link 
      to="/cart"
      className={cart.length > 0 ? styles.cartWidgetVisible : styles.cartWidgetHidden}
    >
      <img src={carritoImg} alt="" className={styles.img} />
      {getTotalItems()} 
    </Link>
  );
}; 

export default CartWidget;


