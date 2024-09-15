import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Login or Register</Text>

        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6eeff', // Light cream background
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a0000', // Muted gray border color
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#1a0000', // Muted gray text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a0000', // Darker text color
  },
  subtitle: {
    fontSize: 18,
    color: '#1a0000', // Subtle gray text color
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4d0000', // Muted gray background color
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
