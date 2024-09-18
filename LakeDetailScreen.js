import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// LakeDetailScreen will receive the selected lake data via route
const LakeDetailScreen = ({ route }) => {
  const { lake } = route.params; // Get lake data passed from PredictScreen

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={lake.image} style={styles.image} />
      <Text style={styles.name}>{lake.name}</Text>
      <Text style={styles.region}>Region: {lake.region}</Text>
      {/* Example lake details below, modify as per the data structure */}
      <Text style={styles.detailText}>Mountain: {lake.Mountain}</Text>
      <Text style={styles.detailText}>Country: {lake.Country}</Text>
      <Text style={styles.detailText}>River: {lake.River}</Text>
      <Text style={styles.detailText}>Outburst Mechanism: {lake.OutburstMechanism}</Text>
      <Text style={styles.detailText}>Outburst Probablity: {lake.OutburstProbability}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  region: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
});

export default LakeDetailScreen;
