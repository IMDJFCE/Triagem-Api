package br.jus.com.jfce.apibancotalentos.config;

import br.jus.com.jfce.apibancotalentos.model.CustomMigrationStatus;
import br.jus.com.jfce.apibancotalentos.model.Usuario;
import br.jus.com.jfce.apibancotalentos.repository.CustomMigrationStatusRepository;
import br.jus.com.jfce.apibancotalentos.repository.UsuarioRepository;
import org.flywaydb.core.Flyway;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(1)
public class PasswordMigration implements CommandLineRunner {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final Flyway flyway;
    private final CustomMigrationStatusRepository customMigrationStatusRepository;

    public PasswordMigration(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, Flyway flyway, CustomMigrationStatusRepository customMigrationStatusRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.flyway = flyway;
        this.customMigrationStatusRepository = customMigrationStatusRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        CustomMigrationStatus migrationStatus = customMigrationStatusRepository.findById(1L).orElse(null);
        if (migrationStatus != null && migrationStatus.isMigrated()) {
            return;
        }

        List<Usuario> users = usuarioRepository.findByTipo("Recrutador");

        for (Usuario user : users) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setSenha(encodedPassword);
        }

        usuarioRepository.saveAll(users);

        flyway.migrate();

        if (migrationStatus == null) {
            migrationStatus = new CustomMigrationStatus();
            migrationStatus.setId(1L);
        }
        migrationStatus.setMigrated(true);
        customMigrationStatusRepository.save(migrationStatus);
    }
}
