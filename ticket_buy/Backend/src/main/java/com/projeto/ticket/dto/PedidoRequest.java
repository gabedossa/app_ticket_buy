package com.projeto.ticket.dto;

import java.util.List;

public class PedidoRequest {

    private List<CartItemRequest> itens;

    // Getters e Setters
    public List<CartItemRequest> getItens() {
        return itens;
    }

    public void setItens(List<CartItemRequest> itens) {
        this.itens = itens;
    }
}