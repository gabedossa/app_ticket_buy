package com.projeto.ticket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProdutoPedidoId implements Serializable {
    @Column(name = "fk_produtos_id_produto")
    private Integer fkProdutosIdProduto;

    @Column(name = "fk_pedido_id_pedido")
    private Integer fkPedidoIdPedido;

    // Construtores
    public ProdutoPedidoId() {}

    public ProdutoPedidoId(Integer fkProdutosIdProduto, Integer fkPedidoIdPedido) {
        this.fkProdutosIdProduto = fkProdutosIdProduto;
        this.fkPedidoIdPedido = fkPedidoIdPedido;
    }

    // Getters
    public Integer getFkProdutosIdProduto() { return fkProdutosIdProduto; }
    public Integer getFkPedidoIdPedido() { return fkPedidoIdPedido; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProdutoPedidoId that = (ProdutoPedidoId) o;
        return Objects.equals(fkProdutosIdProduto, that.fkProdutosIdProduto) &&
                Objects.equals(fkPedidoIdPedido, that.fkPedidoIdPedido);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fkProdutosIdProduto, fkPedidoIdPedido);
    }
}