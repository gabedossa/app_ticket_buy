package com.projeto.ticket.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Produto_Pedido")
@IdClass(ProdutoPedidoId.class)
public class ProdutoPedido {
    @Id
    @Column(name = "fk_produtos_id_produto")
    private Integer fkProdutosIdProduto;

    @Id
    @Column(name = "fk_pedido_id_pedido")
    private Integer fkPedidoIdPedido;

    @Column(name = "qntd_produto")
    private Integer qntdProduto;

    @Column(name = "preco_unidade")
    private BigDecimal precoUnidade;

    @ManyToOne
    @JoinColumn(name = "fk_produtos_id_produto", insertable = false, updatable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "fk_pedido_id_pedido", insertable = false, updatable = false)
    private Pedido pedido;

    // Getters e Setters
    public Integer getFkProdutosIdProduto() { return fkProdutosIdProduto; }
    public void setFkProdutosIdProduto(Integer fkProdutosIdProduto) { this.fkProdutosIdProduto = fkProdutosIdProduto; }

    public Integer getFkPedidoIdPedido() { return fkPedidoIdPedido; }
    public void setFkPedidoIdPedido(Integer fkPedidoIdPedido) { this.fkPedidoIdPedido = fkPedidoIdPedido; }

    public Integer getQntdProduto() { return qntdProduto; }
    public void setQntdProduto(Integer qntdProduto) { this.qntdProduto = qntdProduto; }

    public BigDecimal getPrecoUnidade() { return precoUnidade; }
    public void setPrecoUnidade(BigDecimal precoUnidade) { this.precoUnidade = precoUnidade; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
}