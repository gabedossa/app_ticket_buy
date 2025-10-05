package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.Cliente;
import com.projeto.ticket.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> buscarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Integer id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado com id: " + id));
    }

    public Cliente criar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Integer id, Cliente clienteDetalhes) {
        Cliente cliente = buscarPorId(id);
        cliente.setNome(clienteDetalhes.getNome());
        cliente.setTelefone(clienteDetalhes.getTelefone());
        cliente.setEmail(clienteDetalhes.getEmail());
        cliente.setSenha(clienteDetalhes.getSenha());
        return clienteRepository.save(cliente);
    }

    public void deletar(Integer id) {
        Cliente cliente = buscarPorId(id);
        clienteRepository.delete(cliente);
    }
}