package br.jus.com.jfce.apibancotalentos.repository;

import br.jus.com.jfce.apibancotalentos.model.CustomMigrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomMigrationStatusRepository extends JpaRepository<CustomMigrationStatus, Long> {
}
