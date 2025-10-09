import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Order } from '../types';

// Mapeamento de status para cores e texto
const statusDetails = {
  'em preparo': {
    backgroundColor: Colors.warning,
    text: 'Em Preparo',
  },
  pronto: {
    backgroundColor: Colors.success,
    text: 'Pronto para Retirada',
  },
  entregue: {
    backgroundColor: Colors.info,
    text: 'Entregue',
  },
};

type OrderListItemProps = {
  order: Order;
  onStatusChange: (orderId: string, currentStatus: Order['status']) => void;
};

const OrderListItem = ({ order, onStatusChange }: OrderListItemProps) => {
  const currentStatusDetails = statusDetails[order.status];

  return (
    <View style={styles.container}>
      {/* Cabeçalho do Pedido */}
      <View style={styles.header}>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
        <Text style={styles.timestamp}>
          {new Date(order.timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {/* Detalhes de Itens (simplificado) */}
      <Text style={styles.itemSummary}>
        {order.items.reduce((acc, item) => acc + item.quantity, 0)} ite{order.items.reduce((acc, item) => acc + item.quantity, 0) > 1 ? 'ns' : 'm'}
      </Text>

      {/* Rodapé com Total, Status e Ação */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {order.total.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: currentStatusDetails.backgroundColor }]}>
          <Text style={styles.statusText}>{currentStatusDetails.text}</Text>
        </View>
      </View>

      <Pressable 
        style={styles.statusButton} 
        onPress={() => onStatusChange(order.id, order.status)}
      >
        <Text style={styles.statusButtonText}>Mudar Status</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  itemSummary: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderListItem;