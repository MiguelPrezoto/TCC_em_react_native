import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Tela, Cabecalho, Botao, Card, Campo, Janela, Icone, avisar, confirmar, s, DESTAQUE } from '../componentes';
import { useDados, dinheiro } from '../dados';

const vazio = { nome: '', preco: '', descricao: '' };

export default function Servicos(props) {
  const { dados, salvar, excluir } = useDados();
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState(null);

  const lista = dados.servicos
    .filter((x) => x.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const gravar = () => {
    const preco = parseFloat(String(form.preco).replace(',', '.'));
    if (!form.nome.trim()) return avisar('Informe o nome do serviço.');
    if (!(preco > 0)) return avisar('Informe um preço válido.');
    salvar('servicos', 'id_servico', { ...form, nome: form.nome.trim(), preco });
    setForm(null);
  };

  return (
    <Tela {...props}>
      <Cabecalho icone="wrench" titulo="Gerenciamento de Serviços">
        <Botao icone="plus" texto="Novo Serviço" onPress={() => setForm(vazio)} />
      </Cabecalho>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 15, maxWidth: 350, marginBottom: 25 }}>
        <Icone nome="magnifying-glass" />
        <TextInput style={{ flex: 1, paddingVertical: 12 }} placeholder="Pesquisar serviço" value={busca} onChangeText={setBusca} />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
        {lista.map((sv) => (
          <Card key={sv.id_servico} style={{ flexGrow: 1, flexBasis: 300 }}>
            <Text style={s.h3}>{sv.nome}</Text>
            <Text style={[s.cinza, { marginVertical: 12 }]}>{sv.descricao}</Text>
            <Text style={{ color: DESTAQUE, fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>{dinheiro(sv.preco)}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => setForm({ ...sv, preco: String(sv.preco) })} style={{ backgroundColor: '#eff6ff', borderRadius: 8, padding: 10 }}>
                <Text style={{ color: DESTAQUE }}><Icone nome="pen" tamanho={13} cor={DESTAQUE} /> Editar</Text>
              </Pressable>
              <Pressable onPress={() => confirmar(`Excluir o serviço "${sv.nome}"?`, () => excluir('servicos', 'id_servico', sv.id_servico))}
                style={{ backgroundColor: '#fef2f2', borderRadius: 8, padding: 10 }}>
                <Icone nome="trash" tamanho={13} cor="#dc2626" />
              </Pressable>
            </View>
          </Card>
        ))}
      </View>

      <Janela aberta={!!form} titulo={form?.id_servico ? 'Editar Serviço' : 'Novo Serviço'} onFechar={() => setForm(null)}>
        {form && (
          <>
            <Campo label="Nome do Serviço" value={form.nome} onChangeText={(nome) => setForm({ ...form, nome })} />
            <Campo label="Preço (R$)" value={form.preco} keyboardType="decimal-pad" onChangeText={(preco) => setForm({ ...form, preco })} />
            <Campo label="Descrição" value={form.descricao} multiline onChangeText={(descricao) => setForm({ ...form, descricao })} />
            <Botao texto={form.id_servico ? 'Salvar' : 'Criar'} onPress={gravar} style={{ alignSelf: 'center' }} />
          </>
        )}
      </Janela>
    </Tela>
  );
}
