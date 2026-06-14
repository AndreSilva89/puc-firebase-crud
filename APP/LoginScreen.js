import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginId || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const inputLower = loginId.toLowerCase().trim();

    try {
      const usuariosRef = collection(db, 'usuarios');
      const querySnapshot = await getDocs(usuariosRef);
      let usuarioEncontrado = null;

      querySnapshot.forEach((doc) => {
        const u = { id: doc.id, ...doc.data() };
        if (
          (u.email?.toLowerCase().trim() === inputLower || u.matricula?.trim() === inputLower || u.cpf?.trim() === inputLower) &&
          u.senha === password
        ) {
          usuarioEncontrado = u;
        }
      });

      if (usuarioEncontrado) {
        Alert.alert('Sucesso', `Bem-vindo, ${usuarioEncontrado.nome || usuarioEncontrado.email}!`);
        navigation.replace('Profile', { usuario: usuarioEncontrado });
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Verifique os dados ou crie um novo cadastro.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor Firebase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/brasao-pucminas.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Área Administrativa</Text>
            <Text style={styles.subtitle}>Sistema de Avaliações Médicas da PUC</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail, Matrícula ou CPF"
              value={loginId}
              onChangeText={setLoginId}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.registerButtonText}>Criar novo cadastro</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1B5EA8' },
  body: { flex: 1, backgroundColor: '#F4F6F9', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: 40, padding: 28 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoImage: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0D2B5D' },
  subtitle: { fontSize: 14, color: '#718096', marginTop: 5, textAlign: 'center' },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 14, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 16, color: '#2D3748' },
  button: { backgroundColor: '#0D2B5D', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  registerButton: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#0D2B5D' },
  registerButtonText: { color: '#0D2B5D', fontSize: 16, fontWeight: 'bold' },
});