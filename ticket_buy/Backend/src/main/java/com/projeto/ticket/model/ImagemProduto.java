package com.projeto.ticket.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Imagem_Produto")
public class ImagemProduto {
    @Id
    @Column(name = "id_imagem_produto")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idImagemProduto;

    @Column(name = "url_imagem", length = 500)
    private String urlImagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_Produtos_id_produto", nullable = false)
    private Produto produto;

    // Getters e Setters
    public Integer getIdImagemProduto() { return idImagemProduto; }
    public void setIdImagemProduto(Integer idImagemProduto) { this.idImagemProduto = idImagemProduto; }

    public String getUrlImagem() { return urlImagem; }
    public void setUrlImagem(String urlImagem) { this.urlImagem = urlImagem; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }
}