package com.projeto.ticket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProdutoPedidoId implements Serializable {
    @Column(name = "fk_Produtos_id_produto")
    private Integer produtoId;

    @Column(name = "fk_Pedido_id_pedido")
    private Integer pedidoId;

    // Construtores
    public ProdutoPedidoId() {}

    public ProdutoPedidoId(Integer produtoId, Integer pedidoId) {
        this.produtoId = produtoId;
        this.pedidoId = pedidoId;
    }

    // Getters, Setters, equals e hashCode...
    public Integer getProdutoId() { return produtoId; }
    public void setProdutoId(Integer produtoId) { this.produtoId = produtoId; }
    public Integer getPedidoId() { return pedidoId; }
    public void setPedidoId(Integer pedidoId) { this.pedidoId = pedidoId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProdutoPedidoId that = (ProdutoPedidoId) o;
        return Objects.equals(produtoId, that.produtoId) &&
                Objects.equals(pedidoId, that.pedidoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(produtoId, pedidoId);
    }
}