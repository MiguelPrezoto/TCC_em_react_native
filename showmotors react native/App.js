import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DadosProvider, useDados } from './src/dados';
import Login from './src/telas/Login';
import Home from './src/telas/Home';
import Agendamentos from './src/telas/Agendamentos';
import Relatorios from './src/telas/Relatorios';
import Usuarios from './src/telas/Usuarios';
import Servicos from './src/telas/Servicos';
import Sobre from './src/telas/Sobre';

const telas = { login: Login, home: Home, agendamentos: Agendamentos, relatorios: Relatorios, usuarios: Usuarios, servicos: Servicos, sobre: Sobre };

function Navegacao() {
  const { dados, sessao } = useDados();
  const [tela, setTela] = useState('login');
  if (!dados) return null;

  const atual = sessao || tela === 'sobre' ? tela : 'login';
  const Tela = telas[atual];
  return <Tela tela={atual} ir={setTela} />;
}

export default function App() {
  return (
    <DadosProvider>
      <StatusBar style="light" />
      <Navegacao />
    </DadosProvider>
  );
}
