import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ currentView, onViewChange, cartItemsCount }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Ticketeria</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, currentView === 'menu' && styles.activeButton]}
          onPress={() => onViewChange('menu')}
        >
          <Text style={[styles.buttonText, currentView === 'menu' && styles.activeButtonText]}>
            Cardápio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, currentView === 'cart' && styles.activeButton]}
          onPress={() => onViewChange('cart')}
        >
          <Text style={styles.buttonText}>Carrinho</Text>
          {cartItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, currentView === 'admin' && styles.activeButton]}
          onPress={() => onViewChange('admin')}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4a90e2',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  actions: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8
  },
  activeButton: {
    backgroundColor: '#357abd'
  },
  buttonText: {
    color: '#4a90e2',
    fontWeight: 'bold'
  },
  activeButtonText: {
    color: 'white'
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default Header;