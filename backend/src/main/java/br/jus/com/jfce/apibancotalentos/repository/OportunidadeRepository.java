package br.jus.com.jfce.apibancotalentos.repository;

import br.jus.com.jfce.apibancotalentos.model.Oportunidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OportunidadeRepository extends JpaRepository<Oportunidade, String>{
}
