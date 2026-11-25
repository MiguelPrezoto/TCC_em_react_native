import { Text, View } from 'react-native';
import { Tela, Card, s, DESTAQUE } from '../componentes';

const valores = [
  ['Missão', 'Oferecer serviços automotivos de alta qualidade, com peças originais e mão de obra especializada, garantindo segurança, confiança e satisfação para cada cliente.'],
  ['Visão', 'Ser referência regional em serviços automotivos especializados, reconhecida pela excelência técnica e pela confiança dos clientes.'],
  ['Valores', 'Honestidade e transparência em cada orçamento, compromisso com prazos, respeito ao cliente e paixão pelo trabalho bem feito.'],
];

export default function Sobre(props) {
  return (
    <Tela {...props}>
      <View style={{ backgroundColor: '#b30000', borderRadius: 14, padding: 50, alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold' }}>Sobre Nós</Text>
        <Text style={{ color: '#fff', fontSize: 18, opacity: 0.9, marginTop: 12, textAlign: 'center' }}>
          Conheça um pouco mais sobre a nossa empresa
        </Text>
      </View>

      <Text style={{ color: DESTAQUE, fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Quem Somos?</Text>
      <Text style={{ color: '#4b5563', fontSize: 16, lineHeight: 27, maxWidth: 900, alignSelf: 'center', marginBottom: 40 }}>
        Nós da Oficina SHOWMOTORS, fundada em meados de 2006 como RK Dias, começamos com serviços básicos de auto center e
        mecânica geral. Com o tempo, passamos a oferecer serviços técnicos e especializados para atender a um mercado
        automotivo cada vez mais exigente.
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
        {valores.map(([titulo, texto]) => (
          <Card key={titulo} style={{ flexGrow: 1, flexBasis: 280, borderTopWidth: 4, borderTopColor: DESTAQUE, alignItems: 'center' }}>
            <Text style={[s.h3, { marginBottom: 14 }]}>{titulo}</Text>
            <Text style={{ color: '#6b7280', textAlign: 'center', lineHeight: 24 }}>{texto}</Text>
          </Card>
        ))}
      </View>

      <View style={{ backgroundColor: '#1a1a1a', borderRadius: 14, padding: 40, alignItems: 'center' }}>
        <Text style={{ color: '#eb2525', fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Contatos</Text>
        <Text style={{ color: '#d1d5db' }}>Whatsapp: (11) 4677-6357</Text>
        <Text style={{ color: '#d1d5db', textAlign: 'center', marginTop: 6 }}>Estr. de Poá, 1278 - Jardim Soares, São Paulo - SP</Text>
      </View>
    </Tela>
  );
}
