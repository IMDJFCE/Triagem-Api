package br.jus.com.jfce.apibancotalentos.service;

import br.jus.com.jfce.apibancotalentos.dto.DeficienciaRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.HabilidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.UsuarioRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.UsuarioResponseDTO;
import br.jus.com.jfce.apibancotalentos.dto.mapper.DeficienciaMapper;
import br.jus.com.jfce.apibancotalentos.dto.mapper.HabilidadeMapper;
import br.jus.com.jfce.apibancotalentos.dto.mapper.UsuarioMapper;
import br.jus.com.jfce.apibancotalentos.model.*;
import br.jus.com.jfce.apibancotalentos.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;
    private final AuthorizationService authorizationService;
    private final UsuarioMapper usuarioMapper;
    private final RacaRepository racaRepository;
    private final GeneroRepository generoRepository;
    private final HabilidadeRepository habilidadeRepository;
    private final HabilidadeMapper habilidadeMapper;
    private final DeficienciaRepository deficienciaRepository;
    private final DeficienciaMapper deficienciaMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, AuthorizationService authorizationService, UsuarioMapper usuarioMapper, RacaRepository racaRepository, GeneroRepository generoRepository, HabilidadeRepository habilidadeRepository, HabilidadeMapper habilidadeMapper, DeficienciaRepository deficienciaRepository, DeficienciaMapper deficienciaMapper) {
        this.usuarioRepository = usuarioRepository;
        this.authorizationService = authorizationService;
        this.usuarioMapper = usuarioMapper;
        this.racaRepository = racaRepository;
        this.generoRepository = generoRepository;
        this.habilidadeRepository = habilidadeRepository;
        this.habilidadeMapper = habilidadeMapper;
        this.deficienciaRepository = deficienciaRepository;
        this.deficienciaMapper = deficienciaMapper;
    }

    public List<UsuarioResponseDTO> findAll(){
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toUsuarioResponseDTO)
                .toList();
    }

    public UsuarioResponseDTO getById(String id){
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if(usuario.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        return usuarioMapper.toUsuarioResponseDTO(usuario.get());
    }

    public String pegarIdPorEmail(String email) {
        return usuarioRepository.findIdByEmail(email);
    }

    public UsuarioResponseDTO create(UsuarioRequestDTO usuarioRequest){
        if(this.verificarData(usuarioRequest.getDataNascimento())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data de nascimento inválida!");
        }

        UserDetails userDetails;
        try {
            userDetails = authorizationService.loadUserByUsername(usuarioRequest.getEmail());
        } catch (UsernameNotFoundException ex) {
            userDetails = null;
        }

        if (userDetails != null) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "E-mail já cadastrado!");
        }

        this.obterAtributosExistentes(usuarioRequest);
        Usuario created = usuarioMapper.toUsuario(usuarioRequest);
        created.setTipo("Candidato");
        created.setHabilidades(this.manipularHabilidades(usuarioRequest.getHabilidades()));
        created.setDeficiencias(this.manipularDeficiencias(usuarioRequest.getDeficiencias()));
        String encryptedPassword = new BCryptPasswordEncoder().encode(created.getSenha());
        created.setSenha(encryptedPassword);
        created = usuarioRepository.save(created);
        return usuarioMapper.toUsuarioResponseDTO(created);
    }

    public UsuarioResponseDTO update(String id, UsuarioRequestDTO usuarioRequest){
        if(this.verificarData(usuarioRequest.getDataNascimento())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data de nascimento inválida!");
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if(usuarioOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        this.obterAtributosExistentes(usuarioRequest);
        Usuario usuario = usuarioMapper.toUsuario(usuarioRequest);
        usuario.setCreatedAt(usuarioOptional.get().getCreatedAt());
        usuario.setDeletedAt(usuarioOptional.get().getDeletedAt());
        usuario.setHabilidades(this.manipularHabilidades(usuarioRequest.getHabilidades()));
        usuario.setDeficiencias(this.manipularDeficiencias(usuarioRequest.getDeficiencias()));
        usuario.setTipo(usuarioOptional.get().getTipo());
        String encryptedPassword = new BCryptPasswordEncoder().encode(usuario.getSenha());
        usuario.setSenha(encryptedPassword);
        usuario.setId(id);
        usuario = usuarioRepository.save(usuario);
        return usuarioMapper.toUsuarioResponseDTO(usuario);
    }

    public void delete(String id){
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if(usuarioOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        Usuario usuario = usuarioOptional.get();
        usuarioRepository.delete(usuario);
    }

    private void obterAtributosExistentes(UsuarioRequestDTO usuario){
        Optional<Raca> racaOptional = racaRepository.findByDescricao(usuario.getRaca().getDescricao());
        if(racaOptional.isPresent()){
            usuario.setRaca(racaOptional.get());
        }else{
            usuario.setRaca(racaRepository.save(usuario.getRaca()));
        }

        Optional<Genero> generoOptional = generoRepository.findByDescricao(usuario.getGenero().getDescricao());
        if(generoOptional.isPresent()){
            usuario.setGenero(generoOptional.get());
        }else{
            usuario.setGenero(generoRepository.save(usuario.getGenero()));
        }
    }

    private Set<Habilidade> manipularHabilidades(Set<HabilidadeRequestDTO> habilidadeRequestDTOS){
        Set<Habilidade> habilidadesExistentes = new HashSet<>();
        for(HabilidadeRequestDTO habilidade : habilidadeRequestDTOS) {
            Optional<Habilidade> habilidadeOptional = habilidadeRepository.findByNome(habilidade.getNome());
            if (habilidadeOptional.isPresent()) {
                habilidadesExistentes.add(habilidadeOptional.get());
            }else{
                Habilidade habilidadeCriada = habilidadeMapper.toHabilidade(habilidade);
                habilidadeCriada = habilidadeRepository.save(habilidadeCriada);
                habilidadesExistentes.add(habilidadeCriada);
            }
        }
        return habilidadesExistentes;
    }

    private Set<Deficiencia> manipularDeficiencias(Set<DeficienciaRequestDTO> deficienciaRequestDTOS){
        Set<Deficiencia> deficienciasExistentes = new HashSet<>();
        for(DeficienciaRequestDTO deficiencia : deficienciaRequestDTOS) {
            Optional<Deficiencia> deficienciaOptional = deficienciaRepository.findByDescricao(deficiencia.getDescricao());
            if (deficienciaOptional.isPresent()) {
                deficienciasExistentes.add(deficienciaOptional.get());
            }else{
                Deficiencia deficienciaCriada = deficienciaMapper.toDeficiencia(deficiencia);
                deficienciaCriada = deficienciaRepository.save(deficienciaCriada);
                deficienciasExistentes.add(deficienciaCriada);
            }
        }
        return deficienciasExistentes;
    }

    private boolean verificarData(LocalDate dataNascimentoUsuario){
        LocalDate dataAtual = LocalDate.now();
        return dataAtual.isBefore(dataNascimentoUsuario);
    }
}