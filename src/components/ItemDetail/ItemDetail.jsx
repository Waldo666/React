// ItemDetail.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Ajusta la ruta según tu estructura
import styles from '../ItemDetail/ItemDetail.module.css';

const ItemDetail = ({ id, nombre, img, precio, stock, category, descripcion }) => {
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const [loading, setLoading] = useState(true); 

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    // Simula una carga asíncrona
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
 
    return () => clearTimeout(timer);
  }, []);

  const handleOnAdd = (cantidad) => {
    setCantidadAgregada(cantidad);
    const item = {
      id,
      nombre,
      precio,
      img,
    };
    addItem(item, cantidad);
  };

  return (
    <div className={styles.divcard}>
      {loading ? ( 
        <LoadingSpinner />
      ) : (
        <article className={styles.CardItem}>
            <header className={styles.Header}>
                <h2 className={styles.ItemHeader}>
                    {nombre}
                </h2>
            </header>
            <picture>
                <img src={img} alt={nombre} className={styles.ItemImg} />
            </picture>
            <section>
                <p className={styles.Info}>
                    Categoria: { category}
                </p>
                <p className={styles.Info}>
                    Descripcion: {descripcion}
                </p>
                <p className={styles.Info}>
                    Precio: ${precio}
                </p>
            </section>
            <div className={styles.ItemFooter}>
                    {cantidadAgregada > 0 ? (
                        <>
                            <Link to='/cart' className={styles.boton}>Terminar mi compra</Link>
                            <NavLink to='/' className={styles.boton}>Seguir comprando</NavLink>
                        </>
                    ) : (
                        <ItemCount inicial={1} stock={stock} onAdd={handleOnAdd} />
                    )}
                </div>
            </article>
      )}
    </div>
  );
};

export default ItemDetail;



