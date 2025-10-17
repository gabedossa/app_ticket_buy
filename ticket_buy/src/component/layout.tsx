// src/components/layout.tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
  style?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor="#4a90e2" />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    flex: 1,
  },
});

export default Layout;