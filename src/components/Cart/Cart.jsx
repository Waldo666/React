// Cart.jsx
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; 
import styles from '../Cart/Cart.module.css';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // Simula una carga asíncrona
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (cart.length === 0 | null) {
    return ( 
      <div className={styles.container}>
        <h2 className="text-center">No hay productos en el carrito</h2>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className={styles.contenedorcart} >
      {cart.map((item) => <CartItem key={item.item.id} item={item} />)}
      <h3 className={styles.total}>Total: $ {cart.reduce((acc, curr) => acc + curr.item.precio * curr.cantidad, 0)}</h3>
      <div className={styles.button}>
      <button onClick={() => clearCart()} className='btn btn-primary'>Vaciar carrito</button>
      <Link to='/checkout' className='btn btn-primary'>Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;


