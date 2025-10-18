import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ConnectionStatus = () => {
  const netInfo = useNetInfo();
  if (netInfo.isConnected === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sem conexão com a internet</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c0392b', // A red warning color
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});