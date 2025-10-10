// src/components/Header.jsx
import React from 'react';

// Reutilize os estilos do seu componente Menu.jsx ou defina-os aqui
const styles = {
  header: {
    backgroundColor: '#4a90e2',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    marginLeft: '8px',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  btnTab: {
    background: 'white',
    color: '#4a90e2',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    position: 'relative' as 'relative',
  },
  btnTabActive: {
    background: '#357abd', // Cor mais escura para o botão ativo
    color: 'white',
  },
  cartCount: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    background: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Header = ({ screen, setScreen, cartItemCount }) => (
  <div style={styles.header}>
    <div style={styles.headerTitleContainer}>
      <svg height="24" width="24" viewBox="0 0 24 24">
        <g transform="rotate(-20 12 12)">
          <rect x="9.5" y="2" width="5" height="20" fill="white" rx="1.5" />
          <rect x="9.5" y="7" width="5" height="2.5" fill="#4a90e2" />
          <rect x="9.5" y="12" width="5" height="2.5" fill="#4a90e2" />
        </g>
      </svg>
      <span style={styles.headerTitle}>Ticketeria</span>
    </div>
    <div style={styles.headerActions}>
      <button
        style={{ ...styles.btnTab, ...(screen === 'menu' ? styles.btnTabActive : {}) }}
        onClick={() => setScreen('menu')}
      >
        Cardápio
      </button>
      <button
        style={{ ...styles.btnTab, ...(screen === 'cart' ? styles.btnTabActive : {}) }}
        onClick={() => setScreen('cart')}
      >
        Carrinho
        {cartItemCount > 0 && <span style={styles.cartCount}>{cartItemCount}</span>}
      </button>
      <button
        style={{ ...styles.btnTab, ...(screen === 'admin' ? styles.btnTabActive : {}) }}
        onClick={() => setScreen('admin')}
      >
        Admin
      </button>
    </div>
  </div>
);

export default Header;