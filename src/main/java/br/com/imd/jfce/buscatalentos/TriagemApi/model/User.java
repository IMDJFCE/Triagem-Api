package br.com.imd.jfce.buscatalentos.TriagemApi.model;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;

    private String username;

    private String password;

    // Construtores

    public User() {
    }

    public User(String role, String username, String password) {
        this.role = role;
        this.username = username;
        this.password = password;
    }

    // Métodos adicionais, se necessário

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    public boolean verificarPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, this.password);
    }
}
