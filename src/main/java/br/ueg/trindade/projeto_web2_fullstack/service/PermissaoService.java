package br.ueg.trindade.projeto_web2_fullstack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.projeto_web2_fullstack.model.Permissao;
import br.ueg.trindade.projeto_web2_fullstack.repository.PermissaoRepository;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao atualizada) {
        Permissao permissao = buscarPorId(id);
        permissao.setNome(atualizada.getNome());
        permissao.setDescricao(atualizada.getDescricao());
        return permissaoRepository.save(permissao);
    }

    public void excluir(Long id) {
        permissaoRepository.deleteById(id);
    }
}
