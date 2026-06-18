# puc-firebase-crud
Trabalho 4 - Engenharia de Aplicações Móveis

## 👥 Equipe

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/AndreSilva89">
        <img src="https://github.com/AndreSilva89.png" width="80px" style="border-radius:50%" /><br/>
        <sub><b>André Henrique</b></sub>
      </a>
    </td>
       <td align="center">
      <a href="https://github.com/LeonardoeliasF">
        <img src="https://github.com/LeonardoeliasF.png" width="80px" style="border-radius:50%" /><br/>
        <sub><b>Leonardo Elias</b></sub>
      </a>
    </td>
  </tr>
</table>

### Orientador

- Will Machado


# Projeto Mobile com React Native e Expo

Aplicação móvel desenvolvida com React Native e Expo para gerenciamento de usuários com autenticação via Firebase.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na máquina 
- npm (Node Package Manager)
- Expo Go instalado no seu smartphone (Android ou iOS)

## 🚀 Como Compilar e Executar

### 1. Clonar Repositório

Abra o VScode e clone o repositório:

```bash
https://github.com/AndreSilva89/puc-firebase-crud.git
```

### 2. Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Esse comando irá instalar todas as dependências necessárias do projeto.

### 3. Iniciar o Servidor de Desenvolvimento

Após instalar as dependências, execute:

```bash
npm start
```

Isso iniciará o servidor local do Expo. Você verá um QR code no terminal.

## 📱 Acessar no Seu Smartphone

### Opção 1: Usar o QR Code (Recomendado)

1. **Baixe o Expo Go** no seu dispositivo:
   - 🤖 **Android**: [Play Store]
   - 🍎 **iOS**: [App Store]

2. Abra o **Expo Go** no seu smartphone
3. Aponte a **câmera para o QR code** que aparece no terminal
4. O app será carregado automaticamente no seu dispositivo

### Opção 2: Se o QR Code não funcionar

Se o código QR não funcionar e o Expo não conectar:

1. Certifique-se de que seu smartphone e computador estão **na mesma rede WiFi**
2. Abra o **Expo Go**
3. Toque em **"Scan QR Code"** (ou ícone de câmera)
4. Aponte a câmera para o QR code exibido no terminal
5. Se ainda assim não funcionar, tente:
   - Desconectar e reconectar o WiFi
   - Reiniciar o servidor (`npm start` novamente)
   - Verificar se há firewall bloqueando a conexão

## 📂 Estrutura do Projeto

- `App.js` - Componente principal da aplicação
- `firebaseConfig.js` - Configuração do Firebase
- `LoginScreen.js` - Tela de login
- `ProfileScreen.js` - Tela de perfil do usuário
- `CadastroScreen.js` - Tela de cadastro
- `ConsultaScreen.js` - Tela de consulta
- `package.json` - Dependências do projeto

## 🔗 Links Úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)

## ❓ Problemas Comuns

**O QR code não funciona:**
- Verifique se está na mesma rede WiFi
- Reinicie o aplicativo Expo Go
- Tente escanear o QR code novamente

**O app não carrega:**
- Verifique a conexão de internet
- Certifique-se que o servidor (`npm start`) está rodando
- Verifique os erros no terminal do VS Code

---

