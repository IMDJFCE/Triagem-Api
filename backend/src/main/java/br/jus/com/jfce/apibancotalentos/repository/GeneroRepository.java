package br.jus.com.jfce.apibancotalentos.repository;

import br.jus.com.jfce.apibancotalentos.model.Genero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GeneroRepository extends JpaRepository<Genero, String> {
    Optional<Genero> findByDescricao(Genero.Descricao descricao);
}
