package br.jus.com.jfce.apibancotalentos.service;

import br.jus.com.jfce.apibancotalentos.dto.UsuarioResponseDTO;
import br.jus.com.jfce.apibancotalentos.dto.mapper.UsuarioMapper;
import br.jus.com.jfce.apibancotalentos.model.Habilidade;
import br.jus.com.jfce.apibancotalentos.model.Oportunidade;
import br.jus.com.jfce.apibancotalentos.model.Usuario;
import br.jus.com.jfce.apibancotalentos.repository.OportunidadeRepository;
import br.jus.com.jfce.apibancotalentos.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TriagemService {
    private final UsuarioRepository usuarioRepository;
    private final OportunidadeRepository oportunidadeRepository;
    private final UsuarioMapper usuarioMapper;

    public TriagemService(UsuarioRepository usuarioRepository, OportunidadeRepository oportunidadeRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.oportunidadeRepository = oportunidadeRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public List<UsuarioResponseDTO> triarUsuariosParaOportunidade(String oportunidadeId) {
        Oportunidade oportunidade = oportunidadeRepository.findById(oportunidadeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found"));

        Set<Habilidade> habilidadesOportunidade = oportunidade.getHabilidades();

        List<Usuario> usuariosTriados = usuarioRepository.findByHabilidades(new ArrayList<>(habilidadesOportunidade));

        return usuariosTriados.stream()
                .map(usuarioMapper::toUsuarioResponseDTO)
                .collect(Collectors.toList());
    }
}
