package br.jus.com.jfce.apibancotalentos.repository;

import br.jus.com.jfce.apibancotalentos.model.Raca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RacaRepository extends JpaRepository<Raca, String> {
    Optional<Raca> findByDescricao(Raca.Descricao descricao);
}
