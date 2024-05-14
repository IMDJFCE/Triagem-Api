package br.jus.com.jfce.apibancotalentos.service;

import br.jus.com.jfce.apibancotalentos.dto.HabilidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.OportunidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.OportunidadeResponseDTO;
import br.jus.com.jfce.apibancotalentos.dto.mapper.HabilidadeMapper;
import br.jus.com.jfce.apibancotalentos.dto.mapper.OportunidadeMapper;
import br.jus.com.jfce.apibancotalentos.model.Habilidade;
import br.jus.com.jfce.apibancotalentos.model.Oportunidade;
import br.jus.com.jfce.apibancotalentos.repository.HabilidadeRepository;
import br.jus.com.jfce.apibancotalentos.repository.OportunidadeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OportunidadeService{
    private final OportunidadeRepository oportunidadeRepository;
    private final OportunidadeMapper oportunidadeMapper;
    private final HabilidadeRepository habilidadeRepository;
    private final HabilidadeMapper habilidadeMapper;

    public OportunidadeService(OportunidadeRepository oportunidadeRepository, OportunidadeMapper oportunidadeMapper, HabilidadeRepository habilidadeRepository, HabilidadeMapper habilidadeMapper) {
        this.oportunidadeRepository = oportunidadeRepository;
        this.oportunidadeMapper = oportunidadeMapper;
        this.habilidadeRepository = habilidadeRepository;
        this.habilidadeMapper = habilidadeMapper;
    }

    public List<OportunidadeResponseDTO> findAll(){
        return oportunidadeRepository.findAll()
                .stream()
                .map(oportunidadeMapper::toOportunidadeResponseDTO)
                .toList();
    }

    public OportunidadeResponseDTO getById(String id){
        Optional<Oportunidade> oportunidade = oportunidadeRepository.findById(id);
        if(oportunidade.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        return oportunidadeMapper.toOportunidadeResponseDTO(oportunidade.get());
    }

    public OportunidadeResponseDTO create(OportunidadeRequestDTO oportunidadeRequest){
        if(this.verificarDatas(oportunidadeRequest.getDataInicial(), oportunidadeRequest.getDataFinal())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data inválida!");
        }

        Oportunidade created = oportunidadeMapper.toOportunidade(oportunidadeRequest);
        created.setHabilidades(this.manipularHabilidades(oportunidadeRequest.getHabilidades()));
        created = oportunidadeRepository.save(created);
        return oportunidadeMapper.toOportunidadeResponseDTO(created);
    }

    public OportunidadeResponseDTO update(String id, OportunidadeRequestDTO oportunidadeRequest){
        if(this.verificarDatas(oportunidadeRequest.getDataInicial(), oportunidadeRequest.getDataFinal())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data inválida!");
        }

        Optional<Oportunidade> oportunidadeOptional = oportunidadeRepository.findById(id);
        if(oportunidadeOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        Oportunidade oportunidade = oportunidadeMapper.toOportunidade(oportunidadeRequest);
        oportunidade.setCreatedAt(oportunidadeOptional.get().getCreatedAt());
        oportunidade.setDeletedAt(oportunidadeOptional.get().getDeletedAt());
        oportunidade.setHabilidades(this.manipularHabilidades(oportunidadeRequest.getHabilidades()));
        oportunidade.setId(id);
        oportunidade = oportunidadeRepository.save(oportunidade);
        return oportunidadeMapper.toOportunidadeResponseDTO(oportunidade);
    }

    public void delete(String id){
        Optional<Oportunidade> oportunidade = oportunidadeRepository.findById(id);
        if(oportunidade.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        oportunidadeRepository.delete(oportunidade.get());
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

    private boolean verificarDatas(LocalDate dataInicial, LocalDate dataFinal){
        LocalDate dataAtual = LocalDate.now();
        return dataAtual.isAfter(dataInicial) || dataAtual.isAfter(dataFinal) || dataInicial.isAfter(dataFinal);
    }
}