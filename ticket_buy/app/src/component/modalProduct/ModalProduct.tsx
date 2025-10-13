import React from "react";
import {
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { useCart } from "../../context/CartContext";
import { Product } from "../../types";
import { styles } from './ModalProductStyle';

interface ModalProductProps {
    visible: boolean;
    product: Product | null;
    onClose: () => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({ 
    visible, 
    product, 
    onClose 
}) => {
    const { addToCart } = useCart();

    // DEBUG
    console.log("🟣 ModalProduct - visible:", visible);
    console.log("🟣 ModalProduct - product:", product?.name);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        onClose();
    };

    if (!product) {
        console.log('⚫ ModalProduct - sem produto, retornando null');
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
                    <Image
                        source={{
                            uri: product.images?.[0] || "https://placehold.co/300x300?text=Produto"
                        }}
                        style={styles.modalImage}
                    />

                    <View style={styles.modalBody}>
                        <Text style={styles.modalTitle}>{product.name}</Text>
                        <Text style={styles.modalDescription}>
                            {product.description}
                        </Text>
                    </View>
                    
                    <View style={styles.modalFooter}>
                        <Text style={styles.modalPrice}>
                            R$ {product.price?.toFixed(2) ?? '0.00'}
                        </Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalSecondaryButton}
                                onPress={onClose}
                            >
                                <Text style={styles.modalSecondaryButtonText}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleAddToCart}
                            >
                                <Text style={styles.modalButtonText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalProduct;