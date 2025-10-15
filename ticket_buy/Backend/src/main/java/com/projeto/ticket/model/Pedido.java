package com.projeto.ticket.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;

    @Column(name = "preco_total")
    private BigDecimal precoTotal;

    private String status;

    @Column(name = "data_pedido")
    private LocalDateTime dataPedido;

    // Relacionamento: Um Pedido tem muitos 'ProdutoPedido' (itens do carrinho)
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdutoPedido> itens;

    // Getters e Setters...
}