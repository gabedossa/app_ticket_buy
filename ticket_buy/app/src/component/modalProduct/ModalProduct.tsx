import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../types";
import { styles } from "../ModalProduct/ModalProductStyle";

interface ModalProductProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  visible,
  product,
  onClose,
  onAddToCart,
}) => {

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product);
    onClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          {/* O resto do seu JSX continua exatamente o mesmo... */}
          <Image
            source={{
              uri:
                product.images?.[0] ||
                "https://placehold.co/300x300?text=Produto",
            }}
            style={styles.modalImage}
          />
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{product.name}</Text>
            <Text style={styles.modalDescription}>{product.description}</Text>
          </View>
          <View style={styles.modalFooter}>
            <Text style={styles.modalPrice}>
              R$ {product.price?.toFixed(2) ?? "0.00"}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddToCart}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalProduct;