import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const { usuario } = route.params || {};

  if (!usuario) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />
        <View style={styles.body}>
          <Text style={styles.errorText}>Nenhum usuário carregado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil Completo</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Nome completo</Text>
        <Text style={styles.value}>{usuario.nome}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{usuario.email}</Text>

        <Text style={styles.label}>Matrícula</Text>
        <Text style={styles.value}>{usuario.matricula}</Text>

        <Text style={styles.label}>CPF</Text>
        <Text style={styles.value}>{usuario.cpf}</Text>

        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.value}>{usuario.endereco || 'Não informado'}</Text>

        <Text style={styles.label}>Cidade</Text>
        <Text style={styles.value}>{usuario.cidade || 'Não informado'}</Text>

        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.value}>{usuario.tipo || 'Não informado'}</Text>

        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.value}>{usuario.tipo || 'Não informado'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1B5EA8' },
  header: { backgroundColor: '#1B5EA8', paddingTop: 20, paddingBottom: 20, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  logoutButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
  logoutButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  body: { backgroundColor: '#F4F6F9', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, minHeight: '100%' },
  label: { color: '#4A5568', fontSize: 14, marginTop: 20, marginBottom: 6 },
  value: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, fontSize: 16, color: '#0D2B5D', borderWidth: 1, borderColor: '#E2E8F0' },
  errorText: { color: '#E53E3E', fontSize: 18, textAlign: 'center', marginTop: 40 },
});
