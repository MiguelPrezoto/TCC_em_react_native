import { Text, View } from 'react-native';
import { Tela, Card, Icone, s, DESTAQUE } from '../componentes';
import { useDados } from '../dados';

export default function Home(props) {
  const { dados, sessao } = useDados();
  const resumo = [
    ['calendar-days', 'Agendamentos', dados.agendamentos.length, 'agendamentos'],
    ['users', 'Usuários', dados.usuarios.length, 'usuarios'],
    ['gear', 'Serviços', dados.servicos.length, 'servicos'],
  ];

  return (
    <Tela {...props}>
      <Text style={s.h2}>Olá, {sessao.nome_cliente}!</Text>
      <Text style={[s.cinza, { marginBottom: 24 }]}>Você está logado como Administrador.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
        {resumo.map(([icone, titulo, total, destino]) => (
          <Card key={destino} style={{ flexGrow: 1, flexBasis: 220 }}>
            <Text onPress={() => props.ir(destino)}>
              <Icone nome={icone} tamanho={26} cor={DESTAQUE} />
            </Text>
            <Text style={[s.h3, { marginTop: 14 }]} onPress={() => props.ir(destino)}>{titulo}</Text>
            <Text style={s.cinza}>{total} cadastrados</Text>
          </Card>
        ))}
      </View>
    </Tela>
  );
}
