import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, width }) => {
  return (
    <header className='Header'>
      {title}
      {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </header>
  )
}

export default Header