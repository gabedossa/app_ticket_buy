package com.projeto.ticket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer idProduto;

    @Column(name = "nome", length = 150)
    private String nome;

    @Column(name = "preco", precision = 6, scale = 2)
    private BigDecimal preco;

    @Column(name = "tipo", length = 150)
    private String tipo;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("produto")
    private List<ImagemProduto> imagens;

    @OneToMany(mappedBy = "produto")
    @JsonIgnoreProperties("produto")
    private List<ProdutoPedido> pedidos;


    // Getters e Setters
    public Integer getIdProduto() { return idProduto; }
    public void setIdProduto(Integer idProduto) { this.idProduto = idProduto; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public List<ImagemProduto> getImagens() { return imagens; }
    public void setImagens(List<ImagemProduto> imagens) { this.imagens = imagens; }

    public List<ProdutoPedido> getPedidos() { return pedidos; }
    public void setPedidos(List<ProdutoPedido> pedidos) { this.pedidos = pedidos; }
}