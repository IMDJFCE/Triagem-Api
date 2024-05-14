package br.jus.com.jfce.apibancotalentos.repository;

import br.jus.com.jfce.apibancotalentos.model.Habilidade;
import br.jus.com.jfce.apibancotalentos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
    UserDetails findByEmail(String email);
    List<Usuario> findByTipo(String tipo);

    @Query(value = "SELECT id FROM usuario WHERE email = :email", nativeQuery = true)
    String findIdByEmail(@Param("email") String email);

    @Query("SELECT DISTINCT u FROM Usuario u JOIN u.habilidades h WHERE h IN :habilidades")
    List<Usuario> findByHabilidades(List<Habilidade> habilidades);
}
