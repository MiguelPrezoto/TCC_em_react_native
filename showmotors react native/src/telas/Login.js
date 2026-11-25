import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tela, Campo, Botao, avisar, DESTAQUE } from '../componentes';
import { useDados } from '../dados';

export default function Login(props) {
  const { dados, setSessao } = useDados();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = () => {
    const u = dados.usuarios.find((x) => x.nome_usuario === usuario.trim() && x.senha === senha);
    if (!u) return avisar('Nome de usuário ou senha incorretos.');
    if (u.nivel_acesso !== 'ADM') return avisar('Por enquanto apenas o administrador tem acesso.');
    setSessao(u);
    props.ir('home');
  };

  return (
    <Tela {...props}>
      <View style={s.caixa}>
        <Campo label="Nome de Usuário" value={usuario} onChangeText={setUsuario} autoCapitalize="none" />
        <Campo label="Senha" value={senha} onChangeText={setSenha} secureTextEntry onSubmitEditing={entrar} />
        <Botao texto="Confirmar" onPress={entrar} style={{ alignSelf: 'stretch', justifyContent: 'center', borderRadius: 8 }} />
        <Text style={s.dica}>Teste: admin / admin</Text>
      </View>
    </Tela>
  );
}

const s = StyleSheet.create({
  caixa: {
    backgroundColor: '#fff', borderWidth: 3.5, borderColor: DESTAQUE, borderRadius: 12, padding: 28,
    width: '100%', maxWidth: 420, alignSelf: 'center', marginTop: 20,
  },
  dica: { textAlign: 'center', color: '#9ca3af', marginTop: 16 },
});
