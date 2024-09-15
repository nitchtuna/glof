// UserProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

export default function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      
      <View style={styles.profileSection}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} placeholder="John Doe" />
        
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} placeholder="john.doe@example.com" keyboardType="email-address" />
        
        <Text style={styles.label}>Phone:</Text>
        <TextInput style={styles.input} placeholder="+1234567890" keyboardType="phone-pad" />
        
        <Text style={styles.label}>Address:</Text>
        <TextInput style={styles.input} placeholder="123 Main St, City, Country" />
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
