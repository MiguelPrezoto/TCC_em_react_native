# Show Motors — React Native (Expo)

Área do administrador da Oficina Show Motors, sem banco de dados (os dados ficam salvos no aparelho/navegador).

Login de teste: **admin / admin**

## Estrutura
- `App.js` — escolhe qual tela mostrar
- `src/dados.js` — dados iniciais, salvar/excluir e funções de formatação
- `src/componentes.js` — topo com menu, botões, cards e janela de formulário
- `src/telas/` — Login, Home, Agendamentos, Relatórios, Usuários, Serviços e Sobre

## Bibliotecas
- expo, react, react-native, expo-status-bar
- @react-native-async-storage/async-storage
- @expo/vector-icons + expo-font (ícones)
- react-dom, react-native-web, @expo/metro-runtime (rodar no navegador)

## Como rodar
```powershell
npm install
npx expo start --web --offline
```
