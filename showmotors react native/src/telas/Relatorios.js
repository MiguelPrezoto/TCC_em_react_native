import { Text, View } from 'react-native';
import { Tela, Cabecalho, Card, Icone, s, DESTAQUE } from '../componentes';
import { useDados, listarAgendamentos, dinheiro } from '../dados';

const contar = (lista) => {
  const total = {};
  lista.forEach((nome) => (total[nome] = (total[nome] || 0) + 1));
  return Object.entries(total).sort((a, b) => b[1] - a[1]).slice(0, 5);
};

export default function Relatorios(props) {
  const { dados } = useDados();
  const lista = listarAgendamentos(dados);
  const concluidos = lista.filter((a) => a.status === 'CONCLUIDO');
  const faturamento = concluidos.reduce((t, a) => t + a.total, 0);

  const indicadores = [
    ['calendar-days', lista.length, 'Agendamentos'],
    ['calendar-check', concluidos.length, 'Concluídos'],
    ['money-bill-wave', dinheiro(faturamento), 'Faturamento'],
    ['chart-line', dinheiro(concluidos.length ? faturamento / concluidos.length : 0), 'Ticket médio'],
  ];

  return (
    <Tela {...props}>
      <Cabecalho icone="chart-column" titulo="Relatórios" />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
        {indicadores.map(([icone, valor, legenda]) => (
          <Card key={legenda} style={{ flexGrow: 1, flexBasis: 200, alignItems: 'center' }}>
            <Icone nome={icone} tamanho={24} cor={DESTAQUE} />
            <Text style={{ fontSize: 26, fontWeight: '800', marginTop: 8 }}>{valor}</Text>
            <Text style={s.cinza}>{legenda}</Text>
          </Card>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        <Ranking titulo="Serviços mais solicitados" itens={contar(lista.flatMap((a) => a.itens.map((i) => i.nome)))} />
        <Ranking titulo="Clientes com mais agendamentos" itens={contar(lista.map((a) => a.cliente))} />
      </View>
    </Tela>
  );
}

const Ranking = ({ titulo, itens }) => (
  <Card style={{ flexGrow: 1, flexBasis: 320 }}>
    <Text style={[s.h3, { marginBottom: 14 }]}>{titulo}</Text>
    {itens.map(([nome, total]) => (
      <View key={nome} style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: '#f3f4f6' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{nome}</Text>
          <Text style={{ fontWeight: 'bold' }}>{total}</Text>
        </View>
        <View style={{ height: 8, backgroundColor: '#fecaca', borderRadius: 4, marginTop: 6 }}>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: DESTAQUE, width: `${(total / itens[0][1]) * 100}%` }} />
        </View>
      </View>
    ))}
  </Card>
);
