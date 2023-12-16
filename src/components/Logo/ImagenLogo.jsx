
import logo from '../../assets/img/logo.png';
import style from './ImagenLogo.module.css';
const Logo = () => {
    return (
        <div className={style.ContenedorImagen}>
           
           <a href="#"><img src={logo} alt="W3D" className={logo}/></a>
           <h1>W3D</h1>
        </div>
    );
  };
  export default Logo   