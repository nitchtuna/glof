// EvacuationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EvacuationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>This model is still under development.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
