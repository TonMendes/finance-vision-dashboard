import PropTypes from 'prop-types';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './Header.module.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className={styles.header}>
      <h1>FinanceVision</h1>
      <button onClick={() => setDarkMode(!darkMode)} className={styles.toggleBtn}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
};

export default Header;
