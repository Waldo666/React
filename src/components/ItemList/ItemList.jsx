//itemlist.jsx
import Item from '../Item/Item';
import styles from '../ItemList/ItemList.module.css';
const ItemList = ({ productos }) => {
    return (
      <div className={`ListaGrupo ${styles.ListaGrupo}`}> 
        {productos.map((prod) => (
          <div key={prod.id} className={`CardItem ${styles.CardItem}`}>
            <Item {...prod} />
          </div>
        ))}
      </div>
    );
  }; 
  
  export default ItemList; 