// Menu.jsx ou seu componente principal
import React, { useEffect, useState } from 'react';
import { ProductService } from '../src/service/ProductService';

type Product = {
  idProduto: number;
  home?: string;
  nome?: string;
  preco: number;
  tipo: string;
  imagens?: string[];
};

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await ProductService.getProducts();
      console.log('Produtos recebidos:', productsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Erro:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtra produtos por categoria
  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(product => product.tipo === categoryFilter);

  // Obtém categorias únicas
  const categories = ['all', ...new Set(products.map(product => product.tipo))];

  console.log('Products state:', products);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitleContainer}>
          <svg height="24" width="24" viewBox="0 0 24 24" style={styles.logo}>
            <g transform="rotate(-20 12 12)">
              <rect x="9.5" y="2" width="5" height="20" fill="white" rx="1.5" />
              <rect x="9.5" y="7" width="5" height="2.5" fill="#4a90e2" />
              <rect x="9.5" y="12" width="5" height="2.5" fill="#4a90e2" />
            </g>
          </svg>
          <span style={styles.headerTitle}>Ticketeria</span>
        </div>
        <div style={styles.serverStatus}>
          Conectado ao servidor • {products.length} produtos carregados
        </div>
      </div>

      {/* Categorias */}
      <div style={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            style={{
              ...styles.categoryBtn,
              ...(categoryFilter === category ? styles.categoryBtnActive : {})
            }}
            onClick={() => setCategoryFilter(category)}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div style={styles.content}>
        <h2 style={styles.sectionTitle}>Cardápio</h2>
        
        {products && products.length > 0 ? (
          <div style={styles.productsGrid}>
            {filteredProducts.map(product => (
              <div key={product.idProduto} style={styles.productCard}>
                {/* Imagem do produto */}
                {product.imagens && product.imagens.length > 0 ? (
                  <img 
                    src={product.imagens[0]} 
                    alt={product.home || product.nome} 
                    style={styles.productImage}
                  />
                ) : (
                  <div style={styles.productImagePlaceholder}>
                    <span style={styles.placeholderText}>
                      {(product.home || product.nome)?.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Informações do produto */}
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>
                    {product.home || product.nome || 'Produto sem nome'}
                  </h3>
                  <p style={styles.productType}>{product.tipo}</p>
                  <p style={styles.productPrice}>R$ {product.preco.toFixed(2)}</p>
                </div>

                {/* Galeria de imagens */}
                {product.imagens && product.imagens.length > 1 && (
                  <div style={styles.imageGallery}>
                    {product.imagens.slice(1).map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt="" 
                        style={styles.thumbnail}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <p style={styles.emptyText}>Nenhum produto disponível no servidor</p>
            <button 
              onClick={loadProducts}
              style={styles.reloadButton}
            >
              Recarregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    background: 'white',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: '16px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: '8px',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
  },
  serverStatus: {
    fontSize: '12px',
    opacity: 0.8,
    marginTop: '4px',
    width: '100%',
  },
  categories: {
    display: 'flex',
    gap: '10px',
    padding: '16px',
    overflowX: 'auto' as const,
    borderBottom: '1px solid #f0f2f5',
  },
  categoryBtn: {
    padding: '8px 16px',
    background: '#e0e0e0',
    border: 'none',
    borderRadius: '20px',
    whiteSpace: 'nowrap' as const,
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    transition: 'all 0.2s ease',
  },
  categoryBtnActive: {
    background: '#4a90e2',
    color: 'white',
  },
  content: {
    padding: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
  },
  productCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #f0f2f5',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  productCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  productImage: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
    marginBottom: '8px',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  placeholderText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#666',
  },
  productInfo: {
    textAlign: 'center' as const,
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#333',
  },
  productType: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 4px 0',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0',
  },
  imageGallery: {
    display: 'flex',
    gap: '4px',
    marginTop: '8px',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    objectFit: 'cover' as const,
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  reloadButton: {
    padding: '12px 24px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f0f2f5',
    borderTop: '4px solid #4a90e2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#666',
    fontSize: '16px',
  },
};

// Adicione isso ao seu CSS global ou styled-components
const globalStyles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default Menu;