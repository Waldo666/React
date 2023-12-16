// Footer.jsx
import style from './Footer.module.css';
import whatsapp from '../../assets/img/whatsapp.png';
import insta from '../../assets/img/insta.png';
import facebook from '../../assets/img/face.png';

const Footer = () => {
  return (
    <div className={style.footer}>
      
      <img src={whatsapp} alt="whatsapp" style={{ width: '40px', height: '40px' }} />
      <img src={facebook} alt="facebook" style={{ width: '40px', height: '40px' }} />
      <img src={insta} alt="insta" style={{ width: '35px', height: '35px' }} />
      <p>Waldo Touceda</p>
    </div>
  );
};

export default Footer; 