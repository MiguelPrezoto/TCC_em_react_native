import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Tela, Cabecalho, Botao, Card, Campo, Janela, Pilulas, Icone, avisar, confirmar, s as base, DESTAQUE } from '../componentes';
import { useDados, mascaraTelefone, mascaraCpf } from '../dados';

const colunas = [['Nome', 180], ['Usuário', 140], ['E-mail', 220], ['Celular', 140], ['CPF', 130], ['Nível', 125], ['Ações', 90]];
const vazio = { nome_cliente: '', email: '', celular: '', cpf: '', senha: '', nivel_acesso: 'CLIENTE' };

export default function Usuarios(props) {
  const { dados, sessao, salvar, excluir } = useDados();
  const [form, setForm] = useState(null);
  const lista = [...dados.usuarios].sort((a, b) => a.nome_cliente.localeCompare(b.nome_cliente));
  const novo = form && !form.id_usuario;

  const gravar = () => {
    if (!form.nome_cliente.trim() || !form.email.trim()) return avisar('Informe nome e e-mail.');
    if (novo && !form.senha) return avisar('Informe a senha.');
    if (dados.usuarios.some((u) => u.email === form.email.trim() && u.id_usuario !== form.id_usuario)) return avisar('Este e-mail já está cadastrado.');
    if (form.id_usuario === sessao.id_usuario && form.nivel_acesso !== 'ADM') return avisar('Você não pode alterar o seu próprio nível.');

    const registro = { ...form, nome_cliente: form.nome_cliente.trim(), email: form.email.trim() };
    if (novo) registro.nome_usuario = registro.email.split('@')[0];
    salvar('usuarios', 'id_usuario', registro);
    setForm(null);
    if (novo) avisar(`Usuário criado. Nome de usuário: ${registro.nome_usuario}`);
  };

  const remover = (u) => {
    if (u.id_usuario === sessao.id_usuario) return avisar('Você não pode excluir o seu próprio usuário.');
    confirmar(`Excluir o usuário "${u.nome_cliente}"?`, () => excluir('usuarios', 'id_usuario', u.id_usuario));
  };

  return (
    <Tela {...props}>
      <Cabecalho icone="users-gear" titulo="Controle de Usuários">
        <Botao icone="plus" texto="Adicionar" onPress={() => setForm(vazio)} />
      </Cabecalho>

      <Card>
        <ScrollView horizontal>
          <View>
            <View style={s.linha}>
              {colunas.map(([titulo, largura]) => (
                <Text key={titulo} style={[s.celula, s.th, { width: largura }]}>{titulo}</Text>
              ))}
            </View>
            {lista.map((u) => (
              <View key={u.id_usuario} style={s.linha}>
                {[u.nome_cliente, u.nome_usuario, u.email, u.celular || '—', u.cpf || '—', u.nivel_acesso].map((valor, i) => (
                  <Text key={i} style={[s.celula, { width: colunas[i][1] }]}>{valor}</Text>
                ))}
                <View style={[s.celula, { width: 90, flexDirection: 'row', gap: 6 }]}>
                  <Pressable style={[s.acao, { backgroundColor: DESTAQUE }]} onPress={() => remover(u)}>
                    <Icone nome="trash" tamanho={12} cor="#fff" />
                  </Pressable>
                  <Pressable style={s.acao} onPress={() => setForm({ ...u })}>
                    <Icone nome="pen" tamanho={12} cor={DESTAQUE} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Card>

      <Janela aberta={!!form} titulo={novo ? 'Novo usuário' : 'Editar usuário'} onFechar={() => setForm(null)}>
        {form && (
          <>
            <Campo label="Nome Completo" value={form.nome_cliente} onChangeText={(v) => setForm({ ...form, nome_cliente: v })} />
            <Campo label="E-mail" value={form.email} autoCapitalize="none" keyboardType="email-address" onChangeText={(v) => setForm({ ...form, email: v })} />
            <Campo label="Celular" value={form.celular} placeholder="(00) 00000-0000" onChangeText={(v) => setForm({ ...form, celular: mascaraTelefone(v) })} />
            <Campo label="CPF" value={form.cpf} placeholder="000.000.000-00" onChangeText={(v) => setForm({ ...form, cpf: mascaraCpf(v) })} />
            {novo && <Campo label="Senha" value={form.senha} secureTextEntry onChangeText={(v) => setForm({ ...form, senha: v })} />}
            <Text style={base.label}>Nível</Text>
            <Pilulas valor={form.nivel_acesso} onChange={(v) => setForm({ ...form, nivel_acesso: v })}
              opcoes={[['ADM', 'ADM'], ['FUNCIONARIO', 'FUNCIONÁRIO'], ['CLIENTE', 'CLIENTE']]} />
            <Botao texto={novo ? 'Criar' : 'Salvar'} onPress={gravar} style={{ alignSelf: 'center' }} />
          </>
        )}
      </Janela>
    </Tela>
  );
}

const s = StyleSheet.create({
  linha: { flexDirection: 'row' },
  celula: { padding: 10, fontSize: 13, borderWidth: 1, borderColor: '#d1d5db', marginLeft: -1, marginTop: -1 },
  th: { backgroundColor: '#f5f6fa', fontWeight: 'bold' },
  acao: { borderWidth: 2, borderColor: DESTAQUE, borderRadius: 6, paddingVertical: 5, paddingHorizontal: 8 },
});
