// LoadingSpinner.js
import style from '../LoadingSpinner/LoadingSpinner.module.css'
import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  return (
    <div className={style.loading}>
      <Spinner color="primary" className={style.spinner}/>
    </div>
  );
};

export default LoadingSpinner;
 