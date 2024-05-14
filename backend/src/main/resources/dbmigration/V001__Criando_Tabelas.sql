CREATE TABLE convite (
    data_envio timestamp(6),
    convite_id varchar(255) NOT NULL,
    oportunidade_id varchar(255),
    status varchar(255) NOT NULL CHECK (status IN ('PENDENTE','ENVIADO')),
    usuario_id varchar(255),
    PRIMARY KEY (convite_id)
);

CREATE TABLE deficiencia (
    deficiencia_id varchar(255) NOT NULL,
    descricao varchar(255),
    PRIMARY KEY (deficiencia_id)
);

CREATE TABLE genero (
    descricao varchar(255) CHECK (descricao IN ('MASCULINO','FEMININO','OUTROS')),
    genero_id varchar(255) NOT NULL,
    PRIMARY KEY (genero_id)
);

CREATE TABLE habilidade (
    habilidade_id bigserial NOT NULL,
    nome varchar(50),
    tipo varchar(255) NOT NULL CHECK (tipo IN ('TECNICA','COMPORTAMENTAL')),
    PRIMARY KEY (habilidade_id)
);

CREATE TABLE oportunidade (
    data_final date NOT NULL,
    data_inicial date NOT NULL,
    created_at timestamp(6),
    deleted_at timestamp(6),
    updated_at timestamp(6),
    email varchar(70),
    titulo varchar(100),
    descricao varchar(255),
    id varchar(255) NOT NULL,
    informacoes varchar(255),
    triagem varchar(255) NOT NULL CHECK (triagem IN ('CEGA','GENERO','RACA','DEFICIENCIA','NENHUMA')),
    PRIMARY KEY (id)
);

CREATE TABLE oportunidade_habilidade (
    id_habilidade bigint NOT NULL,
    id_oportunidade varchar(255) NOT NULL,
    PRIMARY KEY (id_habilidade, id_oportunidade)
);

CREATE TABLE raca (
    descricao varchar(255) CHECK (descricao IN ('AMARELO','INDIGENA','BRANCO','PARDO','PRETO')),
    raca_id varchar(255) NOT NULL,
    PRIMARY KEY (raca_id)
);

CREATE TABLE usuario (
    data_nascimento date NOT NULL,
    created_at timestamp(6),
    deleted_at timestamp(6),
    updated_at timestamp(6),
    tipo varchar(15),
    matricula varchar(50),
    senha TEXT NOT NULL,
    email varchar(70),
    nome varchar(100),
    genero_id varchar(255),
    id varchar(255) NOT NULL,
    raca_id varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE usuario_deficiencia (
    id_deficiencia varchar(255) NOT NULL,
    id_usuario varchar(255) NOT NULL,
    PRIMARY KEY (id_deficiencia, id_usuario)
);

CREATE TABLE usuario_habilidade (
    id_habilidade bigint NOT NULL,
    id_usuario varchar(255) NOT NULL,
    PRIMARY KEY (id_habilidade, id_usuario)
);

ALTER TABLE convite ADD CONSTRAINT FKk9se3gsyomi1ht98kdd2nj5dd FOREIGN KEY (oportunidade_id) REFERENCES oportunidade;
ALTER TABLE convite ADD CONSTRAINT FK9l2kriqxvqvvsl0xe39e9uu98 FOREIGN KEY (usuario_id) REFERENCES usuario;

ALTER TABLE oportunidade_habilidade ADD CONSTRAINT FKisutn448yo9f64n7m2ous7bgb FOREIGN KEY (id_habilidade) REFERENCES habilidade;
ALTER TABLE oportunidade_habilidade ADD CONSTRAINT FKacrlkraktctermq591lmu94ap FOREIGN KEY (id_oportunidade) REFERENCES oportunidade;

ALTER TABLE usuario ADD CONSTRAINT FK3ww4fyvyctas314maygwlt62s FOREIGN KEY (genero_id) REFERENCES genero;
ALTER TABLE usuario ADD CONSTRAINT FK1wbwamg1hxnbvd9w2iiga6r5a FOREIGN KEY (raca_id) REFERENCES raca;

ALTER TABLE usuario_deficiencia ADD CONSTRAINT FKqnrsuccjpxfa2qw1adpyaxdrk FOREIGN KEY (id_deficiencia) REFERENCES deficiencia;
ALTER TABLE usuario_deficiencia ADD CONSTRAINT FKa6938ujmk63g1osy2j60selua FOREIGN KEY (id_usuario) REFERENCES usuario;

ALTER TABLE usuario_habilidade ADD CONSTRAINT FKqm23rheajcnf11gmicx7lyofs FOREIGN KEY (id_habilidade) REFERENCES habilidade;
ALTER TABLE usuario_habilidade ADD CONSTRAINT FK7ymmkw4w5wm8wqymneov4oqad FOREIGN KEY (id_usuario) REFERENCES usuario;