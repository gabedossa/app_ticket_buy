import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#1a1a1a",
        borderRadius: 16,
        width: "100%",
        maxWidth: 360,
        borderWidth: 1,
        borderColor: "#2a2a2a",
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
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 15,
        color: "#ccc",
        lineHeight: 22,
        textAlign: "center",
    },
    modalFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#222",
        borderTopWidth: 1,
        borderTopColor: "#3a3a3a",
    },
    modalPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ff6b35",
    },
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "#ff6b35",
        borderRadius: 8,
        minWidth: 100,
    },
    modalButtonText: {
        color: "white",
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
        borderColor: '#666',
        minWidth: 80,
    },
    modalSecondaryButtonText: {
        color: '#ccc',
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 20,
        color: "#ffffff",
        lineHeight: 22
    },
});