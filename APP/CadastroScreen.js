import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('Aluno');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !matricula || !cpf || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const usuariosRef = collection(db, 'usuarios');
      
      // Persistência remota dos dados informados no Firestore
      await addDoc(usuariosRef, {
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        matricula: matricula.trim(),
        cpf: cpf.trim(),
        endereco: endereco.trim(),
        cidade: cidade.trim(),
        tipo: tipo.trim(),
        senha: senha,
        dataCadastro: new Date().toISOString()
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
      
      // Limpar campos
      setNome('');
      setEmail('');
      setMatricula('');
      setCpf('');
      setEndereco('');
      setCidade('');
      setTipo('Aluno');
      setSenha('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro ao Cadastrar', `${error.message || 'Não foi possível salvar os dados no banco.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />
      
      {/* HEADER AZUL - VOLTAR PARA O LOGIN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <Text style={styles.navButtonText}>⬅️ Voltar</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Novo Cadastro</Text>
            <Text style={styles.subtitle}>Crie a sua conta para acessar o sistema</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
            <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
            <TextInput style={styles.input} placeholder="Professor ou Aluno" value={tipo} onChangeText={setTipo} />
            <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonConsulta} onPress={() => navigation.navigate('Consulta')}>
              <Text style={styles.buttonText}>Ir para Consulta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1B5EA8' },
  header: { backgroundColor: '#1B5EA8', paddingTop: Platform.OS === 'android' ? 20 : 10, paddingBottom: 30, paddingHorizontal: 20 },
  navButton: { alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
  navButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  body: { flex: 1, backgroundColor: '#F4F6F9', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -16, padding: 28 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  titleContainer: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0D2B5D' },
  subtitle: { fontSize: 14, color: '#718096', marginTop: 5, textAlign: 'center' },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 14, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 16, color: '#2D3748' },
  button: { backgroundColor: '#0D2B5D', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonConsulta: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
