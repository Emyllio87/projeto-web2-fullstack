package br.ueg.trindade.projeto_web2_fullstack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.projeto_web2_fullstack.model.Cliente;
import br.ueg.trindade.projeto_web2_fullstack.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public Cliente criar(Cliente cliente) {
        boolean emailExiste = clienteRepository.findAll().stream()
                .anyMatch(c -> c.getEmail().equalsIgnoreCase(cliente.getEmail()));
        if (emailExiste) {
            throw new RuntimeException("Já existe um cliente com esse e-mail");
        }
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente atualizado) {
        Cliente cliente = buscarPorId(id);
        cliente.setNome(atualizado.getNome());
        cliente.setEmail(atualizado.getEmail());
        cliente.setTelefone(atualizado.getTelefone());
        return clienteRepository.save(cliente);
    }

    public void excluir(Long id) {
        clienteRepository.deleteById(id);
    }
}
