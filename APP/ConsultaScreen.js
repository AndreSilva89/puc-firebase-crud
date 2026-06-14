import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export default function ConsultaScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuariosRef = collection(db, 'usuarios');
    
    // Escuta modificações no banco de dados em tempo real (Sincronização Ativa)
    const unsubscribe = onSnapshot(usuariosRef, (snapshot) => {
      const listaFormatada = [];
      snapshot.forEach((doc) => {
        listaFormatada.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsuarios(listaFormatada);
      setLoading(false);
    }, (error) => {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', 'Não foi possível obter a listagem do banco remoto.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleExcluir = (id, nome) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza de que deseja apagar o cadastro de ${nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Executa a operação de exclusão (Delete) no documento específico do Firestore
              const usuarioRef = doc(db, 'usuarios', id);
              await deleteDoc(usuarioRef);
              Alert.alert('Sucesso', 'Registro removido com sucesso!');
            } catch (error) {
              console.error('Erro ao deletar:', error);
              Alert.alert('Erro', 'Falha ao deletar o registro.');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.nome}</Text>
        <Text style={styles.cardText}>📧 {item.email}</Text>
        <Text style={styles.cardText}>🪪 Matrícula: {item.matricula} | CPF: {item.cpf}</Text>
        <Text style={styles.cardText}>🏠 {item.endereco || 'Sem endereço'}</Text>
        <Text style={styles.cardText}>📍 {item.cidade || 'Sem cidade'}</Text>
        <Text style={styles.cardText}>🎓 {item.tipo || 'Não definido'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleExcluir(item.id, item.nome)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

          return (
            <SafeAreaView style={styles.safeArea}>
              <StatusBar barStyle="light-content" backgroundColor="#1B5EA8" />
              
              {/* HEADER DA TELA DE CONSULTA */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Consulta de Usuários</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutButton}>
                  <Text style={styles.logoutButtonText}>Sair 🚪</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.body}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0D2B5D" style={{ flex: 1 }} />
                ) : usuarios.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum usuário cadastrado no banco de dados.</Text>
                  </View>
                ) : (
                  <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
                )}
              </View>
            </SafeAreaView>
          );
        }

        const styles = StyleSheet.create({
          safeArea: { flex: 1, backgroundColor: '#1B5EA8' },
          header: { backgroundColor: '#1B5EA8', paddingTop: 20, paddingBottom: 20, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
          headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
          logoutButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
          logoutButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
          body: { flex: 1, backgroundColor: '#F4F6F9', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 },
          card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
          cardInfo: { flex: 1, paddingRight: 10 },
          cardName: { fontSize: 16, fontWeight: 'bold', color: '#0D2B5D', marginBottom: 4 },
          cardText: { fontSize: 13, color: '#4A5568', marginBottom: 2 },
          deleteButton: { backgroundColor: '#FED7D7', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
          deleteButtonText: { fontSize: 18 },
          emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
          emptyText: { color: '#718096', fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }
        });