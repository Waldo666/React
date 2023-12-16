//NavBar.jsx
import React, { useState } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const closeSubMenu = () => {
    setSubMenuOpen(false);
  };

  return (
    <nav className={style.NavBar}>
      <ul className={`${style.boton} ${isOpen ? style.open : ''}`}>
        <li className={style.li}>
          <NavLink to="/" end className={style.ActiveOptions}>  Todos los productos
          </NavLink>
        </li>
        <li className={style.li}>
          <button onClick={toggleSubMenu} className={style.subMenuButton}>Categorias</button>
          <ul className={`${style.subMenu} ${isSubMenuOpen ? style.open : ''}`}>
            <li className={style.li}>
              <NavLink to="/category/juguetes" className={style.ActiveOption} onClick={closeSubMenu}>
                Juguetes
              </NavLink>
            </li>
            <li className={style.li}>
              <NavLink to="/category/soportes" className={style.ActiveOption} onClick={closeSubMenu}>
                Soportes
              </NavLink>
            </li>
            <li className={style.li}>
              <NavLink to="/category/varios" className={style.ActiveOption} onClick={closeSubMenu}>
                Varios
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      <div id="carrito" className="carrito">
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar; 