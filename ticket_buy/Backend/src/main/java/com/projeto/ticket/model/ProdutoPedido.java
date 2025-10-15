package com.projeto.ticket.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Produto_Pedido")
public class ProdutoPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // É uma boa prática ter um ID próprio na tabela de ligação

    // Relacionamento: Muitos 'ProdutoPedido' pertencem a um Produto
    @ManyToOne
    @JoinColumn(name = "fk_Produtos_id_produto")
    private Produto produto;

    // Relacionamento: Muitos 'ProdutoPedido' pertencem a um Pedido
    @ManyToOne
    @JoinColumn(name = "fk_Pedido_id_pedido")
    private Pedido pedido;

    @Column(name = "Qntd_produto")
    private Integer quantidadeProduto;

    @Column(name = "Preco_Unidade")
    private BigDecimal precoUnidade;

    // Getters e Setters...
}