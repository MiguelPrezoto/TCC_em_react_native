import { useState } from 'react';
import { Text, View } from 'react-native';
import { Tela, Cabecalho, Card, Badge, Pilulas, Vazio, s, DESTAQUE } from '../componentes';
import { useDados, listarAgendamentos, status, dinheiro, dataHora } from '../dados';

export default function Agendamentos(props) {
  const { dados } = useDados();
  const [filtro, setFiltro] = useState('todos');
  const lista = listarAgendamentos(dados).filter((a) => filtro === 'todos' || a.status === filtro);

  return (
    <Tela {...props}>
      <Cabecalho icone="calendar-days" titulo="Todos os Agendamentos" />
      <Pilulas valor={filtro} onChange={setFiltro} opcoes={[['todos', 'Todos'], ...Object.entries(status)]} />

      {lista.length === 0 && <Vazio icone="calendar-xmark" texto="Nenhum agendamento encontrado." />}

      <View style={{ gap: 18 }}>
        {lista.map((a) => (
          <Card key={a.id_agendamento}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
              <View>
                <Text style={{ color: '#888', fontSize: 12 }}>{a.cliente}</Text>
                <Text style={s.h3}>{dataHora(a.data)}</Text>
                <Text style={s.cinza}>{a.veiculo}</Text>
              </View>
              <Badge status={a.status} texto={status[a.status]} />
            </View>
            {a.itens.map((i, n) => (
              <View key={n} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 1, borderColor: '#ececec' }}>
                <Text>{i.nome}</Text>
                <Text style={{ color: '#6b7280' }}>{dinheiro(i.preco)}</Text>
              </View>
            ))}
            {!!a.descricao && <Text style={[s.cinza, { marginTop: 12 }]}>{a.descricao}</Text>}
            <Text style={{ marginTop: 16 }}>
              Total: <Text style={{ color: DESTAQUE, fontSize: 22, fontWeight: 'bold' }}>{dinheiro(a.total)}</Text>
            </Text>
          </Card>
        ))}
      </View>
    </Tela>
  );
}
