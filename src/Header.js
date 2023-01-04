import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Header = ({ title /*, width*/ }) => {
  const { width } = useContext(DataContext);
  
  return (
    <header className='Header'>
      {title}
      {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </header>
  )
}

export default Header