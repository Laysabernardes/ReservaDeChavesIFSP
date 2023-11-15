# Sistema de Reservas por Chave 🗝️

Bem-vindo ao repositório do projeto Sistema de Reservas por Chave! Aqui você encontrará informações importantes sobre o projeto, os integrantes do grupo e os prazos estabelecidos para o desenvolvimento.

## Integrantes do Grupo 👩‍💻
- Beatriz Bastos Borges
- Eduardo Miranda Silva Sousa
- Laysa Bernardes Campos da Rocha
- Lucas Lopes Cruz
- Maria Eduarda Fodor
- Miguel Luizatto Alves

## Proposta 💡
Desenvolver um sistema de reservas por chave para o campus, permitindo a catalogação das chaves presentes e implementando um sistema de permissões. A liberação da chave ocorrerá mediante a identificação do solicitante, seja por meio de QR Code, código de barras ou digitação manual da matrícula.

## Funcionalidades do Módulo de Administração 🛠️
- Verificação dos dados cadastrados do solicitante antes de confirmar a reserva.
- Entrega da chave ao solicitante após confirmação.
- Baixa na reserva no momento da devolução.
- Definição do tempo de expiração da solicitação em casos de atraso ou não comparecimento.
- Tomada de providências pela instituição em casos de perda, entrega em mal estado ou atraso.

## Funcionalidades do Módulo de Solicitação 📝
- Apresentação dos tipos de chave disponíveis após o login.
- Indicação da disponibilidade das chaves.
- Reserva das chaves disponíveis.
- Autorização por um funcionário de nível superior em casos de solicitação por alunos (individual ou em grupo).
- Notificação em casos de perda, entrega em mal estado ou atraso.


## Link Figma 👨‍💻
[Clique aqui](https://www.figma.com/file/9Tv6VRPZciiEMYh1am0cpL/Reserva-de-Chaves?type=design&node-id=0-1&mode=design&t=1NGAws6fL6hmiK0f-0) para acessar o design no Figma.

## Datas Importantes 📅
### Front-end
- **Parte lógica:** 15/11
- **Modelo final:** A combinar

### Back-end
- **Prazo:** 22/11

### Banco de Dados
- **Indeterminado** (Depende da resposta da instituição)

## Comando git 🚀

- Clonar o repositório: `git clone https://github.com/Laysabernardes/ReservaDeChavesIFSP.git`
- Inicializar um repositório git: `git init`
#
- Adiciona o Remote: `git remote add origin https://github.com/Laysabernardes/ReservaDeChavesIFSP.git`
- Verificar se o repositorio remoto foi adicionado: `git remote -v` 
#
- Verificar o Status do Repositório: `git status`
- Adicionar mudanças: `git add nome-do-arquivo` ou `git add .` para adicionar todas as mudanças
- Commitar Mudanças Locais: `git commit -m 'Descrição da alteração'`
- Atualizar o Repositório Local com Alterações do Remoto (Pull): `git pull origin nome-da-sua-branch`
- Enviar Mudanças para o Repositório Remoto (Push): `git push origin nome-da-sua-branch`
#
- Crie uma branch: `git checkout -b nome-da-sua-branch`
- Ver o Histórico de Commits: `git log`
- Trocar de Branch: `git checkout nome-da-outra-branch`
 
A princípio, estamos trabalhando na branch "main". O desenvolvimento principal do projeto está nessa branch. 


### Comando do MySQL
CREATE TABLE Estudante (
    cd_estudante VARCHAR(9) PRIMARY KEY,
    nm_estudante VARCHAR(255),
    email_estudante VARCHAR(100)
);

CREATE TABLE Funcionario (
    cd_funcionario INT PRIMARY KEY,
    nm_funcionario VARCHAR(255),
    email_funcionario VARCHAR(100)
);

CREATE TABLE Chave (
    cd_chave VARCHAR(9) PRIMARY KEY,
    mn_sala VARCHAR(255),
    status VARCHAR(15)
);

CREATE TABLE ReservaEstudante (
    cd_reserva_estudante VARCHAR(9) PRIMARY KEY,
    cd_estudante VARCHAR(9),
    cd_chave VARCHAR(9),
    data_reserva DATETIME,
    data_devolucao DATETIME,
    status VARCHAR(15),
    FOREIGN KEY (cd_estudante) REFERENCES Estudante(cd_estudante),
    FOREIGN KEY (cd_chave) REFERENCES Chave(cd_chave)
);

CREATE TABLE ReservaFuncionario (
    cd_reserva_funcionario VARCHAR(9) PRIMARY KEY,
    cd_funcionario VARCHAR(9),
    cd_chave VARCHAR(9),
    data_reserva DATETIME,
    data_devolucao DATETIME,
    status VARCHAR(15),
    FOREIGN KEY (cd_funcionario) REFERENCES Funcionario(cd_funcionario),
    FOREIGN KEY (cd_chave) REFERENCES Chave(cd_chave)
);

CREATE TABLE PermissaoReserva (
    cd_permissao VARCHAR(9) PRIMARY KEY,
    cd_funcionario VARCHAR(9),
  	cd_estudante VARCHAR(9),
    cd_chave INT VARCHAR(9),
    FOREIGN KEY (cd_funcionario) REFERENCES Funcionario(cd_funcionario),
  	FOREIGN KEY (cd_estudante) REFERENCES Estudante(cd_estudante),
    FOREIGN KEY (cd_chave) REFERENCES Chave(cd_chave)
);
