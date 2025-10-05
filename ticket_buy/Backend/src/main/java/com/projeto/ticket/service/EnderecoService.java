package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.Endereco;
import com.projeto.ticket.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<Endereco> buscarTodos() {
        return enderecoRepository.findAll();
    }

    public Endereco buscarPorId(Integer id) {
        return enderecoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado com id: " + id));
    }

    public Endereco criar(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Endereco atualizar(Integer id, Endereco enderecoDetalhes) {
        Endereco endereco = buscarPorId(id);
        endereco.setRua(enderecoDetalhes.getRua());
        endereco.setBairro(enderecoDetalhes.getBairro());
        endereco.setNumero(enderecoDetalhes.getNumero());
        endereco.setComplemento(enderecoDetalhes.getComplemento());
        endereco.setCep(enderecoDetalhes.getCep());
        endereco.setUf(enderecoDetalhes.getUf());
        endereco.setCidade(enderecoDetalhes.getCidade());
        endereco.setCliente(enderecoDetalhes.getCliente());
        return enderecoRepository.save(endereco);
    }

    public void deletar(Integer id) {
        Endereco endereco = buscarPorId(id);
        enderecoRepository.delete(endereco);
    }
}
