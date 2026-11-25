import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usuario = (id_usuario, nome_cliente, nome_usuario, email, telefone, celular, cpf, nivel_acesso, senha = '123') =>
  ({ id_usuario, nome_cliente, nome_usuario, email, telefone, celular, cpf, nivel_acesso, senha });

const carro = (id_carro, id_usuario, marca, modelo, placa) => ({ id_carro, id_usuario, marca, modelo, placa });

const agendamento = (id_agendamento, id_usuario, id_carro, data, status, descricao, itens) =>
  ({ id_agendamento, id_usuario, id_carro, data, status, descricao, itens: itens.map(([id_servico, preco]) => ({ id_servico, preco })) });

const inicial = {
  usuarios: [
    usuario(1, 'admin', 'admin', 'admin@email.com', '(11) 4002-0652', '', '', 'ADM', 'admin'),
    usuario(2, 'funcionario', 'funcionario', 'funcionario@email.com', '(11) 4002-0652', '', '', 'FUNCIONARIO'),
    usuario(3, 'cliente', 'cliente', 'cliente@email.com', '(11) 4002-0652', '', '', 'CLIENTE'),
    usuario(18, 'henrique bonato', 'henrique.bonato', 'henrique@gmail.com', '(11) 4444-4444', '(11) 99999-9999', '103.230.539-80', 'ADM'),
    usuario(19, 'Mariana Souza Lima', 'mariana.lima', 'mariana.lima@example.com', '(11) 3427-9233', '', '399.869.879-54', 'FUNCIONARIO'),
    usuario(21, 'Ana Beatriz Costa', 'ana.costa', 'ana.costa@example.com', '(11) 4924-7166', '(11) 99414-2250', '518.844.729-07', 'CLIENTE'),
    usuario(22, 'João Pedro Almeida', 'joao.almeida', 'joao.almeida@example.com', '(11) 4125-7043', '', '169.871.689-38', 'CLIENTE'),
    usuario(23, 'Fernanda Oliveira', 'fernanda.oliveira', 'fernanda.oliveira@example.com', '(11) 4507-9595', '(11) 95237-7880', '788.093.208-91', 'CLIENTE'),
    usuario(24, 'Ricardo Menezes', 'ricardo.menezes', 'ricardo.menezes@example.com', '(11) 3834-8035', '(11) 98701-3333', '317.784.864-52', 'CLIENTE'),
    usuario(25, 'Patrícia Gomes', 'patricia.gomes', 'patricia.gomes@example.com', '(11) 4924-7585', '', '400.297.875-30', 'CLIENTE'),
  ],
  carros: [
    carro(1, 3, 'ford', 'ka', 'FOX4470'),
    carro(2, 21, 'fiat', 'uno', 'LYV9S98'),
    carro(3, 22, 'volkswagen', 'gol', 'CBM5A13'),
    carro(4, 23, 'chevrolet', 'onix', 'GXF0X79'),
    carro(5, 24, 'honda', 'civic', 'RSP4R32'),
    carro(6, 25, 'toyota', 'corolla', 'WZJ8V37'),
  ],
  servicos: [
    { id_servico: 13, nome: 'Troca de óleo e filtro', preco: 189.9, descricao: 'Óleo sintético 5W30 e filtro de óleo' },
    { id_servico: 14, nome: 'Revisão completa', preco: 450, descricao: 'Revisão de 30 pontos com relatório' },
    { id_servico: 15, nome: 'Alinhamento e balanceamento', preco: 140, descricao: 'Alinhamento 3D e balanceamento das 4 rodas' },
    { id_servico: 16, nome: 'Troca de bateria', preco: 520, descricao: 'Bateria 60Ah com garantia de 18 meses' },
    { id_servico: 17, nome: 'Pastilhas e discos de freio', preco: 380, descricao: 'Troca do conjunto dianteiro' },
    { id_servico: 18, nome: 'Diagnóstico eletrônico', preco: 120, descricao: 'Leitura de falhas via scanner OBD2' },
  ],
  agendamentos: [
    agendamento(2, 3, 1, '2026-10-14 14:00', 'AGENDADO', 'real', [[13, 189.9]]),
    agendamento(3, 21, 2, '2026-10-07 10:00', 'CONCLUIDO', 'Barulho ao frear', [[17, 380], [14, 450]]),
    agendamento(4, 22, 3, '2026-10-06 13:00', 'CONCLUIDO', 'Revisão dos 40 mil km', [[15, 140], [17, 380]]),
    agendamento(5, 23, 4, '2026-10-16 16:00', 'CONCLUIDO', 'Luz do motor acesa', [[15, 140]]),
    agendamento(6, 24, 5, '2026-10-19 14:00', 'EM_ANDAMENTO', 'Carro puxando para a direita', [[16, 520], [15, 140]]),
    agendamento(7, 25, 6, '2026-10-19 08:00', 'EM_ANDAMENTO', 'Troca de óleo programada', [[13, 189.9]]),
    agendamento(13, 21, 2, '2026-10-26 14:00', 'AGENDADO', 'Manutenção preventiva', [[18, 120], [15, 140]]),
    agendamento(1, 3, 1, '2026-10-14 17:00', 'CANCELADO', 'Troca de pastilhas', [[17, 380]]),
  ],
};

const Contexto = createContext(null);
const CHAVE = 'showmotors_simples';

export function DadosProvider({ children }) {
  const [dados, setDados] = useState(null);
  const [sessao, setSessao] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE).then((j) => setDados(j ? JSON.parse(j) : inicial));
  }, []);

  useEffect(() => {
    if (dados) AsyncStorage.setItem(CHAVE, JSON.stringify(dados));
  }, [dados]);

  const salvar = (lista, campo, registro) =>
    setDados((d) => {
      if (registro[campo]) return { ...d, [lista]: d[lista].map((x) => (x[campo] === registro[campo] ? { ...x, ...registro } : x)) };
      const id = Math.max(0, ...d[lista].map((x) => x[campo])) + 1;
      return { ...d, [lista]: [...d[lista], { ...registro, [campo]: id }] };
    });

  const excluir = (lista, campo, id) => setDados((d) => ({ ...d, [lista]: d[lista].filter((x) => x[campo] !== id) }));

  return <Contexto.Provider value={{ dados, sessao, setSessao, salvar, excluir }}>{children}</Contexto.Provider>;
}

export const useDados = () => useContext(Contexto);

export function listarAgendamentos(dados) {
  return dados.agendamentos
    .map((a) => {
      const u = dados.usuarios.find((x) => x.id_usuario === a.id_usuario);
      const c = dados.carros.find((x) => x.id_carro === a.id_carro);
      const itens = a.itens.map((i) => ({
        nome: dados.servicos.find((s) => s.id_servico === i.id_servico)?.nome ?? 'Serviço removido',
        preco: i.preco,
      }));
      return {
        ...a,
        cliente: u?.nome_cliente ?? 'Usuário removido',
        veiculo: c ? `${c.marca} ${c.modelo} (${c.placa})` : 'Veículo removido',
        itens,
        total: itens.reduce((t, i) => t + i.preco, 0),
      };
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}

export const status = { AGENDADO: 'Agendado', EM_ANDAMENTO: 'Em andamento', CONCLUIDO: 'Concluído', CANCELADO: 'Cancelado' };

export const dinheiro = (v) => 'R$ ' + Number(v).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const dataHora = (d) => `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)} às ${d.slice(11, 16)}`;

export const mascaraTelefone = (t) => {
  const v = t.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (v.length > 6) return v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  if (v.length > 2) return v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  return v ? '(' + v : '';
};

export const mascaraCpf = (t) =>
  t.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
