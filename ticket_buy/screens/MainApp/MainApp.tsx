import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AdminScreen from '../AdminScreen/adminScreen';
import CartScreen from '../CartScreen/CartScreen';
import Header from '../components/header/Headet';
import MenuScreen from '../menuScreen/MenuScreen';

const MainApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const switchView = (viewName: React.SetStateAction<string>) => {
    setCurrentView(viewName);
  };

  const renderView = () => {
    switch(currentView) {
      case 'menu':
        return (
          <MenuScreen
            products={products}
            cart={cart}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductSelect={/* ... */}
            onAddToCart={/* ... */}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cart={cart}
            onUpdateCart={setCart}
            onCheckout={/* ... */}
          />
        );
      case 'admin':
        return (
          <AdminScreen
            products={products}
            orders={orders}
            onAddProduct={/* ... */}
            onUpdateOrder={/* ... */}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        currentView={currentView}
        onViewChange={switchView}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      {renderView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});

export default App;