//itemdetailcontainer.jsx
import { useState ,useEffect} from "react";
import ItemDetail from '../ItemDetail/ItemDetail';
import style from '../ItemDetailContainer/ItemDetailContainer.module.css'
import { useParams } from "react-router-dom";
import {db} from '../../firebase/cliente';
import { getDoc, doc } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const [productos, setProductos] = useState(null)
    const [loading, setLoading] = useState(true)    
    const {itemId} = useParams()

    useEffect(() => {
        setLoading(true)
    
        const docRef = doc(db, 'productos', itemId)
     
        getDoc(docRef)
            .then(response => {
                const data = response.data()
                const productosAdapted = {id: response.id, ...data}
                setProductos(productosAdapted)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    },[itemId])

    return(
    <div className={style.estilocontenedor}>    
        <div className={style.ItemDetailContainer}>
            <ItemDetail {...productos}/>
        </div>
    </div>
    )
}

export default ItemDetailContainer 