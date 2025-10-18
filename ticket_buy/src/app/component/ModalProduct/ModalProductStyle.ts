import { StyleSheet } from "react-native";
import { Colors } from "../../app/constants/Colors";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        width: "100%",
        maxWidth: 360,
        borderWidth: 1,
        borderColor: Colors.text,
        overflow: "hidden",
    },
    modalImage: {
        width: "100%",
        height: 200,
    },
    modalBody: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.text,
        textAlign: "center",
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 15,
        color: Colors.text,
        lineHeight: 22,
        textAlign: "center",
    },
    modalFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: "#3a3a3a",
    },
    modalPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.secondary,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        minWidth: 100,
    },
    modalButtonText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
    },
    modalSecondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        minWidth: 80,
    },
    modalSecondaryButtonText: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 20,
        marginTop: 2,
        textAlign:'center',
        color: "#ffffff",
        lineHeight: 22
    },
});