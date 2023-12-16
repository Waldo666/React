//item.jsx
import { Link } from 'react-router-dom';
import styles from '../Item/Item.module.css';

const Item = ({ id, nombre, img, precio, stock }) => {
    const isStockAvailable = stock > 0;

    return (
        <article className={styles.CardItem}>
            <div className={styles.Header}>
                <h2 className={styles.ItemHeader}>
                    {nombre}
                </h2>
            </div>
            <picture>
                <img src={img} alt={nombre} className={styles.ItemImg} />
            </picture>
            <section> 
                <p className={styles.Info}>
                    Precio: ${precio} 
                </p>
                <p className={styles.Info}>
                    Stock disponible: {stock}
                </p>
            </section>
            <footer className={styles.ItemFooter}>
                {isStockAvailable ? (
                    <Link to={`/item/${id}`} className={styles.Option}>
                        Ver detalle
                    </Link>
                ) : (
                    <button className={styles.OptionDisabled} disabled>
                        Sin stock
                    </button>
                )}
            </footer>
        </article>
    );
};

export default Item;
