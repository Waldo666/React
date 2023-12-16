// CartItem.jsx
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2'; 
import style from '../CartItem/CartItem.module.css'

const CartItem = ({ item }) => {
    const { removeItem } = useContext(CartContext);

    const handleRemoveItem = () => {
        // Muestra SweetAlert antes de eliminar el producto
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false, 
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: 'success',
            title: 'Producto eliminado'
        });

        // Llama a la función para eliminar el producto después de mostrar SweetAlert
        removeItem(item.item.id);
    };

    return (
        <div className={`card mb-3 ${style.carditem2}`}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.item.img} className="img-fluid rounded-start" alt={item.item.nombre} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Producto: {item.item.nombre}</h5>
                        <p className="card-text">Cantidad: {item.cantidad}</p>
                        <p className="card-text">Precio: $ {item.item.precio}</p>
                        <button className="btn btn-primary" onClick={handleRemoveItem}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
