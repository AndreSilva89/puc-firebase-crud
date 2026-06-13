import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, ActivityIndicator, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário já tem uma sessão salva no aparelho/navegador (F5 não desloga)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.role === 'supervisor' || user.role === 'admin') {
            navigation.replace('CoordinatorDashboard');
          } else if (user.role === 'professional' || user.role === 'evaluator') {
            navigation.replace('StudentDashboard');
          }
        }
      } catch (e) {
        console.error('Erro ao ler AsyncStorage:', e);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    // Usuários de exemplo do protótipo (sem backend integrado ainda)
    const users = [
      { email: 'admin@qualimed.com', matricula: '0000', cpf: '00000000000', password: 'admin123', role: 'admin', name: 'Administrador TI' },
      { email: 'supervisor@qualimed.com', matricula: '1111', cpf: '11111111111', password: 'super123', role: 'supervisor', name: 'Supervisão', period: 'N/A', score: 'N/A' },
      { email: 'evaluator@qualimed.com', matricula: '2222', cpf: '22222222222', password: 'eval123', role: 'evaluator', name: 'Avaliador', period: 'N/A', score: 'N/A' },
      { email: 'drahelena@qualimed.com', matricula: '3333', cpf: '33333333333', password: 'helena123', role: 'supervisor', name: 'Dra. Helena', period: 'Coordenação Médica', score: 'N/A' },
      { email: 'amanda@qualimed.com', matricula: '4444', cpf: '44444444444', password: 'costa123', role: 'professional', name: 'Amanda Costa', period: '8º Período', score: '4.3' },
      { email: 'ana@qualimed.com', matricula: '5555', cpf: '55555555555', password: 'dasilva123', role: 'professional', name: 'Ana da Silva', period: '9º Período', score: '5.0' },
      { email: 'lucas@qualimed.com', matricula: '6666', cpf: '66666666666', password: 'oliveira123', role: 'professional', name: 'Lucas Oliveira', period: '9º Período', score: '4.5' },
      { email: 'felipe@qualimed.com', matricula: '7777', cpf: '77777777777', password: 'santos123', role: 'professional', name: 'Felipe Santos', period: '9º Período', score: '2.8' }
    ];

    const inputLower = loginId.toLowerCase().trim();

    const user = users.find(
      (u) => 
        (u.email.toLowerCase() === inputLower || 
         u.matricula === inputLower || 
         u.cpf === inputLower) && 
        u.password === password
    );

    if (!user) {
      alert('Credenciais inválidas. Use exemplo: supervisor@qualimed.com (ou matrícula 1111) / super123');
      return;
    }

    if (user.role === 'supervisor' || user.role === 'admin') {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      navigation.replace('CoordinatorDashboard');
      return;
    }

    if (user.role === 'professional' || user.role === 'evaluator') {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      navigation.replace('StudentDashboard');
      return;
    }

    alert('Role desconhecido.');
  };

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0D2B5D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />
      
      {/* HEADER AZUL */}
      <View style={styles.header}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
            <Text style={styles.navButtonText}>⬅️ Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
            <Text style={styles.navButtonText}>🏠 Início</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CORPO CINZA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/brasao-pucminas.png')}
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#1B5EA8',
  },
  header: {
    backgroundColor: '#1B5EA8',
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  navButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  body: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    padding: 28,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0D2B5D',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 5,
    textAlign: 'center'
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 16,
    color: '#2D3748',
  },
  button: {
    backgroundColor: '#0D2B5D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0D2B5D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0D2B5D',
  },
  registerButtonText: {
    color: '#0D2B5D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
