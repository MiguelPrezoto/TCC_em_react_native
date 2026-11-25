import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useDados } from './dados';

export const VERMELHO = '#eb2525';
export const DESTAQUE = '#eb0404';

const menu = [
  ['Agendamentos', 'agendamentos', 'calendar-days'],
  ['Relatórios', 'relatorios', 'chart-column'],
  ['Usuários', 'usuarios', 'users'],
  ['Serviços', 'servicos', 'gear'],
  ['Sobre', 'sobre', 'circle-info'],
];

export const Icone = ({ nome, tamanho = 16, cor = '#1f2937' }) => <FontAwesome6 name={nome} size={tamanho} color={cor} solid />;

export const avisar = (texto) => (Platform.OS === 'web' ? window.alert(texto) : Alert.alert('Show Motors', texto));

export const confirmar = (texto, aoConfirmar) =>
  Platform.OS === 'web'
    ? window.confirm(texto) && aoConfirmar()
    : Alert.alert('Confirmar', texto, [{ text: 'Cancelar' }, { text: 'Excluir', style: 'destructive', onPress: aoConfirmar }]);

export function Tela({ tela, ir, children }) {
  const { sessao, setSessao } = useDados();
  const itens = sessao ? menu : [['Login', 'login', 'right-to-bracket'], ['Sobre', 'sobre', 'circle-info']];

  return (
    <View style={s.tela}>
      <View style={s.topo}>
        <Text style={s.titulo} onPress={() => sessao && ir('home')}>ShowMotors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.nav}>
          {itens.map(([texto, destino, icone]) => (
            <Pressable key={destino} onPress={() => ir(destino)} style={[s.link, tela === destino && s.linkAtivo]}>
              <Icone nome={icone} tamanho={13} cor="#fff" />
              <Text style={[s.linkTexto, tela === destino && { opacity: 1 }]}>{texto}</Text>
            </Pressable>
          ))}
        </ScrollView>
        {sessao && (
          <Pressable style={s.usuario} onPress={() => { setSessao(null); ir('login'); }}>
            <Text style={s.nomeUsuario}>{sessao.nome_usuario}</Text>
            <Icone nome="right-from-bracket" cor="#fff" />
          </Pressable>
        )}
      </View>
      <ScrollView contentContainerStyle={s.conteudo} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </View>
  );
}

export const Cabecalho = ({ icone, titulo, children }) => (
  <View style={s.cabecalho}>
    <Text style={s.h2}><Icone nome={icone} tamanho={22} />  {titulo}</Text>
    {children}
  </View>
);

export const Botao = ({ texto, icone, onPress, style }) => (
  <Pressable onPress={onPress} style={[s.botao, style]}>
    {icone && <Icone nome={icone} tamanho={14} cor="#fff" />}
    <Text style={s.botaoTexto}>{texto}</Text>
  </Pressable>
);

export const Card = ({ children, style }) => <View style={[s.card, style]}>{children}</View>;

export const Vazio = ({ icone, texto }) => (
  <Card style={{ alignItems: 'center', paddingVertical: 40 }}>
    <Icone nome={icone} tamanho={34} cor={DESTAQUE} />
    <Text style={{ color: '#6b7280', marginTop: 12 }}>{texto}</Text>
  </Card>
);

const coresStatus = {
  AGENDADO: ['#dbeafe', '#1d4ed8'],
  EM_ANDAMENTO: ['#fef3c7', '#b45309'],
  CONCLUIDO: ['#dcfce7', '#16a34a'],
  CANCELADO: ['#f3f4f6', '#6b7280'],
};

export const Badge = ({ status, texto }) => (
  <Text style={[s.badge, { backgroundColor: coresStatus[status][0], color: coresStatus[status][1] }]}>{texto}</Text>
);

export const Pilulas = ({ opcoes, valor, onChange }) => (
  <View style={s.pilulas}>
    {opcoes.map(([v, texto]) => (
      <Pressable key={v} onPress={() => onChange(v)} style={[s.pilula, v === valor && s.pilulaAtiva]}>
        <Text style={{ fontWeight: '600', color: v === valor ? '#fff' : '#1f2937' }}>{texto}</Text>
      </Pressable>
    ))}
  </View>
);

export const Campo = ({ label, ...props }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={s.label}>{label}</Text>
    <TextInput style={[s.input, props.multiline && { minHeight: 80 }]} placeholderTextColor="#9ca3af" {...props} />
  </View>
);

export const Janela = ({ aberta, titulo, onFechar, children }) =>
  aberta && (
    <Modal transparent animationType="fade" onRequestClose={onFechar}>
      <View style={s.fundoModal}>
        <View style={s.modal}>
          <ScrollView contentContainerStyle={{ padding: 28 }} keyboardShouldPersistTaps="handled">
            <View style={s.cabecalho}>
              <Text style={s.h2}>{titulo}</Text>
              <Text style={{ fontSize: 28, color: '#6b7280' }} onPress={onFechar}>×</Text>
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

export const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f5f6fa' },
  topo: {
    backgroundColor: VERMELHO, flexDirection: 'row', alignItems: 'center', gap: 20,
    paddingHorizontal: 24, paddingTop: Platform.OS === 'web' ? 0 : 40, height: Platform.OS === 'web' ? 90 : 120,
    boxShadow: '0px 3px 12px rgba(0,0,0,0.15)', zIndex: 1,
  },
  titulo: { color: '#fff', fontSize: 24, fontWeight: '700' },
  nav: { alignItems: 'center', gap: 28, paddingLeft: 15, borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.25)' },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  linkAtivo: { borderBottomColor: '#fff' },
  linkTexto: { color: '#fff', opacity: 0.8, fontSize: 13, fontWeight: '600', letterSpacing: 0.8, textTransform: 'uppercase' },
  usuario: { flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto' },
  nomeUsuario: { color: '#fff', fontWeight: '600' },
  conteudo: { width: '100%', maxWidth: 1250, alignSelf: 'center', padding: 20, paddingTop: 35 },
  cabecalho: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  h2: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  h3: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  cinza: { color: '#6b7280', marginTop: 4 },
  botao: {
    flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: DESTAQUE,
    paddingVertical: 12, paddingHorizontal: 24, borderRadius: 999, boxShadow: '0px 4px 12px rgba(235,4,4,0.35)',
  },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 24, boxShadow: '0px 2px 10px rgba(0,0,0,0.08)' },
  badge: { borderRadius: 30, paddingVertical: 6, paddingHorizontal: 12, fontSize: 12, fontWeight: '700', alignSelf: 'flex-start', overflow: 'hidden' },
  pilulas: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  pilula: { borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999 },
  pilulaAtiva: { backgroundColor: DESTAQUE, borderColor: '#b30000' },
  label: { fontWeight: '600', color: '#1f2937', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, fontSize: 14, backgroundColor: '#fff' },
  fundoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modal: { backgroundColor: '#fff', borderRadius: 12, width: '100%', maxWidth: 480, maxHeight: '90%' },
});
