// ItemCount.jsx
import React, { useState } from 'react';
import styles from '../ItemCount/ItemCount.module.css';
import Swal from 'sweetalert2';

const ItemCount = ({ stock, inicial, onAdd }) => {
  const [cantidad, setCantidad] = useState(inicial);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const quitar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
 
  const showAddToCartAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
    });
  };

  const handleOnAddClick = () => {
    onAdd && onAdd(cantidad);
    showAddToCartAlert();
  };

  return (
    <div className={styles.contador}>
      <div className={styles.control}>
        <button className={styles.boton} onClick={quitar}>
          -
        </button>
        <h4 className={styles.numero}>{cantidad}</h4>
        <button className={styles.boton} onClick={incrementar}>
          +
        </button>
      </div>
      <div>
        <button
          className={styles.boton}
          onClick={handleOnAddClick}
          disabled={stock < 1}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;
