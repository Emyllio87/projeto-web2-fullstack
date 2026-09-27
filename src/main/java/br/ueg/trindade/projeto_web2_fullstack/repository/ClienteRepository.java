package br.ueg.trindade.projeto_web2_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.projeto_web2_fullstack.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
