package com.projeto.ticket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(name = "preco_total", precision = 10, scale = 2)
    private BigDecimal precoTotal;

    @Column(length = 50)
    private String status;

    @Column(name = "data_pedido")
    private LocalDateTime dataPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_Cliente_id_cliente", nullable = false)
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("pedido")
    private List<ProdutoPedido> itens;

    // Getters e Setters
    public Integer getIdPedido() { return idPedido; }
    public void setIdPedido(Integer idPedido) { this.idPedido = idPedido; }

    public BigDecimal getPrecoTotal() { return precoTotal; }
    public void setPrecoTotal(BigDecimal precoTotal) { this.precoTotal = precoTotal; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getDataPedido() { return dataPedido; }
    public void setDataPedido(LocalDateTime dataPedido) { this.dataPedido = dataPedido; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public List<ProdutoPedido> getItens() { return itens; }
    public void setItens(List<ProdutoPedido> itens) { this.itens = itens; }
}