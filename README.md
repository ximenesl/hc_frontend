# SENAC HC: Gestao de Horas Complementares

Uma plataforma web para gerenciamento e validacao de horas complementares de alunos de graduacao, conectando discentes, coordenadores e administradores em tempo real. Desenvolvido como Projeto Integrador para o Curso de Tecnologia em Analise e Desenvolvimento de Sistemas do Centro Universitario Senac.

[Licenca](https://img.shields.io/badge/licenca-MIT-green)
[Instituicao](https://img.shields.io/badge/Instituicao-Senac-blue)
[Conformidade LGPD](https://img.shields.io/badge/Conformidade-LGPD%20Ready-blueviolet)

---

## Visao Geral do Projeto

O SENAC HC e um ecossistema digital projetado para otimizar o fluxo de envio, validacao e controle de horas complementares (atividades academico-cientifico-culturais). A plataforma permite que os alunos enviem certificados digitalizados, escolhendo as categorias adequadas, e acompanhem seu progresso em tempo real em relacao a carga horaria exigida pelo seu curso. Coordenadores e administradores dispoem de um painel de validacao centralizado para avaliar, deferir ou indeferir certificados, inserindo a carga horaria final computada.

### Funcionalidades Principais

* Dashboard do Aluno: Exibicao grafica do progresso de horas concluidas e pendentes com barra de progresso dinamica.
* Envio de Certificados: Formulario para upload de arquivos (PDF/imagens) com selecao de categoria e carga horaria solicitada.
* Painel de Validacao do Coordenador: Interface para analise dos certificados pendentes, visualizacao do arquivo enviado e registro da decisao com as horas validadas.
* Gerenciamento do Sistema: Cadastro e manutencao de alunos, coordenadores, cursos, turmas e regras de computo de horas por curso.

---

## LGPD e Privacidade de Dados (Lei Geral de Protecao de Dados)

Por processar dados pessoais cadastrais (como nome, registro academico/RA, e-mail e vinculo de curso) e documentos contendo dados de terceiros e dos proprios discentes (certificados), o desenvolvimento do SENAC HC pautou-se pelas diretrizes de privacidade por design, em conformidade com a Lei Federal n. 13.709/2018 (LGPD).

### Padroes de Privacidade Implementados:

* Base Legal para Tratamento (Art. 7, V & XI): O tratamento dos dados cadastrais e o armazenamento de certificados sao fundamentados na execucao de contrato ou procedimentos preliminares (relacao educacional entre o aluno e a instituicao de ensino), sendo indispensaveis para a expedicao do diploma e comprovacao academica.
* Minimizacao e Seguranca dos Dados: Apenas as informacoes estritamente necessarias para a validacao da carga horaria sao solicitadas. Os arquivos de certificados enviados sao armazenados de forma restrita e protegida, de modo que apenas os coordenadores e administradores autorizados possam acessa-los para auditoria e conferencia.
* Direitos do Titular (Art. 18): O sistema dispoe de recursos que garantem ao estudante:
  * Confirmacao da existencia de tratamento e acesso aos seus dados de progresso e cadastro.
  * Correcao de dados incompletos, inexatos ou desatualizados.
  * Portabilidade dos dados por meio de consultas e acompanhamento direto na interface.
* Seguranca da Informacao (Art. 46): Toda a comunicacao com a API e protegida por tokens de autenticacao JWT (JSON Web Tokens). As senhas dos usuarios sao criptografadas no banco de dados utilizando algoritmos de hash seguros (bcrypt), impedindo a visualizacao em plaintext mesmo por administradores do banco.

---

## Tecnologias Utilizadas

### Frontend
* React.js (v19.2.5) - Biblioteca principal para criacao de interfaces declarativas e baseadas em componentes.
* Ant Design (antd v6.3.5) - Biblioteca de componentes visuais utilizada para o design system, formularios e tabelas.
* React Router DOM (v7.14.0) - Gerenciador de rotas para navegacao SPA.
* Axios (v1.15.1) - Cliente HTTP para integracao e consumo dos endpoints da API.
* Recharts (v3.8.1) - Biblioteca de graficos usada para visualizacao estatistica e progresso de horas do aluno.

### Backend
* Java 17 - Linguagem de programacao principal do ecossistema backend.
* Spring Boot (v3.2.4) - Framework base para desenvolvimento da API RESTful.
* Spring Security & JWT - Mecanismo de autenticacao robusta e autorizacao baseada em perfis (ADMIN, COORDENADOR, ALUNO).
* Spring Data JPA & Hibernate - Abstracao de banco de dados e mapeamento objeto-relacional.
* Spring Boot Mail & Resend Java (v3.1.0) - Servicos de envio de e-mails para recuperacao de senha.

### Banco de Dados e Testes
* PostgreSQL - Banco de dados relacional para persistencia em producao.
* H2 Database - Banco de dados em memoria para execucao rapida em ambiente de desenvolvimento e testes.
* React Testing Library & Jest - Validacao de componentes no frontend.
* Spring Boot Test & Spring Security Test - Testes de integracao e seguranca dos endpoints.

---

## Identidade Visual

O projeto utiliza as cores oficiais do Senac:
* Azul Senac: #004587 (Fundo principal)
* Laranja Senac: #F59120 (Botoes de acao)
* Tipografia: Outfit (Google Fonts) para uma leitura clara e moderna.

---

## Configuracao e Execucao Local (Desenvolvimento)

Siga os passos abaixo para configurar e executar os ambientes de frontend e backend localmente.

### 1. Pre-requisitos
Certifique-se de possuir instalado em sua maquina:
* Git
* Node.js (v18.0.0 ou superior)
* Java JDK 17
* Maven (ou uso do wrapper do Maven incluso no backend)
* PostgreSQL rodando localmente (opcional, caso nao queira utilizar o H2 em memoria)

### 2. Configuracao de Variaveis de Ambiente

#### Backend (hc_backend)
O backend pode ser configurado atraves do arquivo `src/main/resources/application.yml`. Por padrao, se nenhuma variavel for fornecida, ele rodara com banco H2 em memoria e porta 8080. Para customizacoes, voce pode configurar as seguintes variaveis de ambiente:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/nome_do_banco
SPRING_DATASOURCE_USERNAME=usuario_postgres
SPRING_DATASOURCE_PASSWORD=senha_postgres
RESEND_API_KEY=sua_chave_resend_para_envio_de_emails
```

#### Frontend (hc_frontend)
Crie um arquivo `.env` na raiz do diretorio do frontend para apontar para o servidor da API:
```env
REACT_APP_API_URL=http://localhost:8080
```

### 3. Instalacao e Execucao

#### Executando o Backend
Abra um terminal na pasta do backend:
```bash
cd hc_backend
mvn clean install
mvn spring-boot:run
```
O console do H2 estara disponivel em `http://localhost:8080/h2-console` (com URL JDBC `jdbc:h2:mem:certificado_db` e usuario `sa`).

#### Executando o Frontend (Abra um novo terminal)
Navegue ate a pasta do frontend:
```bash
cd hc_frontend
npm install
npm start
```
O frontend estara acessivel em seu navegador no endereço `http://localhost:3000`.

---

## Endpoints Principais da API

| Metodo | Endpoint | Descricao | Escopo LGPD / Controle |
|---|---|---|---|
| POST | /api/auth/login | Realiza a autenticacao de usuarios e gera o token JWT | Controle de Acesso Seguro |
| POST | /api/auth/forgot-password | Envia e-mail com token para recuperacao de senha | Recuperacao de Credenciais |
| POST | /api/auth/change-password | Efetua a alteracao de senha de forma segura | Seguranca de Dados (Art. 46) |
| POST | /api/certificates | Realiza o envio de um novo certificado (multipart/form-data) | Tratamento de Dados Pessoais |
| GET | /api/certificates/me/{alunoId} | Retorna todos os certificados enviados por um aluno especifico | Direito de Acesso (Art. 18, II) |
| PUT | /api/certificates/{id}/status | Altera o status e valida a carga horaria de um certificado | Auditoria e Retificacao |
| GET | /api/certificates/{id}/file | Realiza o download/visualizacao do arquivo de certificado | Direito de Acesso aos Documentos |
| GET | /api/users/me | Retorna os dados do perfil do usuario logado | Direito de Acesso aos Dados |
| PUT | /api/users/{id} | Atualiza os dados cadastrais do usuario | Direito de Correcao (Art. 18, III) |
| DELETE | /api/users/{id} | Remove permanentemente o usuario e todos os dados associados | Direito a Eliminacao (Art. 18, VI) |
| GET | /api/cursos | Lista todos os cursos cadastrados na instituicao | Informacao Institucional |
| GET | /api/regras/curso/{cursoId} | Lista as regras e limites de aproveitamento de horas do curso | Transparencia de Regras |

---

## Melhorias Futuras

* Integracao de OCR (Reconhecimento Optico de Caracteres): Extracao automatica do nome da instituicao emissora, aluno, carga horaria e data a partir do upload do PDF do certificado, agilizando a validacao.
* Painel de Auditoria de Modificacoes: Registro de log detalhado de todas as acoes de aprovacao/rejeicao de certificados por coordenadores para maior transparencia.
* Notificacoes Push e In-App: Alertas em tempo real no dashboard do aluno quando um certificado mudar de status (aprovado, reprovado ou necessitando de revisao).
* Relatorios Consolidados: Exportacao automatica da ficha de atividades complementares assinada digitalmente em formato PDF contendo todo o historico validado do aluno.

---

## Autores e Equipe do Projeto

* Homero Flavio
* Joelson Jose
* Kallyne Melo
* Lucas Ximenes
* Marcelly Arcanjo
* Nicollas Abrao
* Thayanne Rodrigues
