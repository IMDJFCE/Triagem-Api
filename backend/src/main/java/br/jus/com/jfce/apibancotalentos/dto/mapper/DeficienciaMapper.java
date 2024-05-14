package br.jus.com.jfce.apibancotalentos.dto.mapper;

import br.jus.com.jfce.apibancotalentos.dto.DeficienciaRequestDTO;
import br.jus.com.jfce.apibancotalentos.model.Deficiencia;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DeficienciaMapper {
    private final ModelMapper mapper;

    public DeficienciaMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Deficiencia toDeficiencia(DeficienciaRequestDTO dto){
        return this.mapper.map(dto, Deficiencia.class);
    }
}
