package com.projeto.ticket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Produto_Pedido")
public class ProdutoPedido {

    @EmbeddedId
    private ProdutoPedidoId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("produtoId")
    @JoinColumn(name = "fk_Produtos_id_produto")
    @JsonIgnoreProperties("pedidos")
    private Produto produto;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("pedidoId")
    @JoinColumn(name = "fk_Pedido_id_pedido")
    @JsonIgnoreProperties("itens")
    private Pedido pedido;

    @Column(name = "Qntd_produto")
    private Integer quantidadeProduto;

    @Column(name = "Preco_Unidade", precision = 10, scale = 2)
    private BigDecimal precoUnidade;

    // Getters e Setters
    public ProdutoPedidoId getId() { return id; }
    public void setId(ProdutoPedidoId id) { this.id = id; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Integer getQuantidadeProduto() { return quantidadeProduto; }
    public void setQuantidadeProduto(Integer quantidadeProduto) { this.quantidadeProduto = quantidadeProduto; }

    public BigDecimal getPrecoUnidade() { return precoUnidade; }
    public void setPrecoUnidade(BigDecimal precoUnidade) { this.precoUnidade = precoUnidade; }
}