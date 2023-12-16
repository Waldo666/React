// Order.jsx
import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from '../../context/CartContext';
import styles from './Order.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; 
import { db } from '../../firebase/cliente';
import { addDoc, collection, serverTimestamp, getDoc, doc, updateDoc } from 'firebase/firestore';

const MySwal = withReactContent(Swal);

const Order = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simula una carga asíncrona al inicio 
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleBuyClick = async () => {
    if (cart.length === 0) {
      MySwal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No hay productos en el carrito. Agregue productos antes de comprar.',
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
      MySwal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, complete todos los campos antes de comprar.',
      });
      return;
    }

    try {
      // Crear la orden en la colección 'orders'
      const order = {
        buyer: customerInfo,
        items: cart.map((item) => ({
          id: item.item.id,
          nombre: item.item.nombre,
          cantidad: item.cantidad,
          precio: item.item.precio,
        })),
        total: cart.reduce((acc, curr) => acc + curr.item.precio * curr.cantidad, 0),
      };

      const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        createdAt: serverTimestamp(),
      });

      // Reducir la cantidad de productos en stock
      for (const item of cart) {
        const productDocRef = doc(db, 'productos', item.item.id);

        // Obtener el valor actual del stock
        const productSnap = await getDoc(productDocRef);
        const currentStock = productSnap.data().stock;

        // Verificar que hay suficiente stock antes de actualizar
        if (currentStock >= item.cantidad) {
          await updateDoc(productDocRef, {
            stock: currentStock - item.cantidad,
          });
        } else {
          console.error(`Error al reducir el stock para el producto ${item.item.id}. Stock actual: ${currentStock}, Cantidad comprada: ${item.cantidad}`);
        }
      }

      // Limpiar el carrito después de realizar la compra
      clearCart();

      MySwal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        text: `Número de Orden: ${docRef.id}`,
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      MySwal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al procesar la compra. Intente nuevamente más tarde.',
      });
    } finally {
      setLoading(false); // Desactiva el spinner después de hacer la compra 
    }
  };

  return (
    <div className={styles.contenedor}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.orden}>
          <div className={styles.product}>
            <h1>Productos</h1>
            {cart.map((item, index) => (
              <div key={index}>
                <h6>• {item.item.nombre}</h6>
              </div>
            ))}
          </div>
          <div className={styles.formcontainer}>
            <h1 className={styles.formtitle}>Información del Cliente</h1>
            <form>
              <label className={styles.formlabel}>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className={styles.forminput}
                />
              </label>
              <br />
              <label className={styles.formlabel}>
                Teléfono:
                <input
                  type="text"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className={styles.forminput}
                />
              </label>
              <br />
              <label className={styles.formlabel}>
                Email:
                <input
                  type="text"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className={styles.forminput}
                />
              </label>
              <br />
              <button type="button" onClick={handleBuyClick} className={styles.formbutton}>
                Comprar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
