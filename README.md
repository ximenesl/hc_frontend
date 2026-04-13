# Senac HC - Gestão de Horas Complementares

Este é um PWA (Progressive Web App) desenvolvido para facilitar a gestão de horas complementares dos alunos do Senac. O projeto foca em uma interface intuitiva, moderna e rápida, seguindo a identidade visual da instituição.

## 🚀 Tecnologias Utilizadas

Para este projeto, escolhemos as seguintes bibliotecas e ferramentas:

### [React](https://reactjs.org/)
*   **Por que?** É a biblioteca líder para criação de interfaces dinâmicas. Permite criar componentes reutilizáveis, facilitando a manutenção e escala do projeto.

### [Ant Design (antd)](https://ant.design/)
*   **Por que?** É uma das bibliotecas de UI mais robustas do mercado. 
*   **Uso:** Utilizamos para os campos de entrada (Inputs), formulários e botões da tela de login. Ela garante que os componentes funcionem perfeitamente em qualquer dispositivo e seguem padrões de acessibilidade.

### [React Router Dom](https://reactrouter.com/)
*   **Por que?** Essencial para a navegação entre as diferentes telas do aplicativo (Splash, Login, Dashboard) sem que a página precise ser recarregada.

### PWA (Progressive Web App)
*   **Por que?** Permite que o site seja "instalado" no celular do aluno como se fosse um aplicativo nativo, funcionando offline e ocupando pouco espaço.

---

## 📂 Estrutura de Pastas

*   `src/assets/imgs`: Armazena as imagens e logos oficiais (como a logo do Senac).
*   `src/components`: Contém os componentes visuais (SplashScreen, LoginScreen).
*   `public/`: Contém os arquivos de configuração do PWA (`manifest.json` e ícones).

---

## 🛠️ Como rodar o projeto

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
4.  O projeto estará disponível em `http://localhost:3000`.

---

## 🎨 Identidade Visual

O projeto utiliza as cores oficiais do Senac:
*   **Azul Senac:** `#004587` (Fundo principal)
*   **Laranja Senac:** `#F59120` (Botões de ação)
*   **Tipografia:** Outfit (Google Fonts) para uma leitura clara e moderna.