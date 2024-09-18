import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data
const mockLakes = [
  { id: '1', 
    name: 'Chandra Tal', 
    region: 'Western Himalayas', 
    Mountain: 'Himalaya',
    Country: 'India',
    River: 'Chandra River',
    OutburstMechanism: 'Shyok',
    OutburstProbability: '5-10% (Low Risk)',
    image: require('./assets/pictures/Chandratal.jpg') 
  },

  { id: '2', name: 'Homkund', 
    region: 'South Eastern Himalayas', 
    image: require('./assets/pictures/homkund.png') ,
    Mountain: 'Himalaya',
    Country: 'India',
    River: 'Kailash River',
    OutburstMechanism: 'Shyok',
    OutburstProbability: '10-20% (Moderate Risk)'
  },
  
  { id: '3', name: 'Kedartal', region: 'South Eastern Himalayas', image: require('./assets/pictures/kedartal.jpeg') ,
    Mountain: 'Himalaya',
        Country: 'India',
        River: 'Kedar Ganga river',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '10-20% (Moderate Risk)'
  },
  
  { id: '4', name: 'Roopkund', region: 'South Eastern Himalayas', image: require('./assets/pictures/roopkund.jpg') ,
  Mountain: 'Himalaya',
        Country: 'India',
        River: 'Pindar River',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '10-20% (Moderate Risk)'},

  { id: '5', name: 'Satopanth Tal', region: 'South Eastern Himalayas', image: require('./assets/pictures/satopanth.jpg') ,
    Mountain: 'Himalaya',
        Country: 'India',
        River: 'Pindar River',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '10-20% (Moderate Risk)'


  },
  { id: '6', name: 'South Lhonak Lake', region: 'Sikkim Himalaya Region', image: require('./assets/pictures/lhonak.jpg') ,
    Mountain: 'Himalaya',
        Country: 'India',
        River: 'Teesta River',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '20-30%(High Risk)'


  },
  { id: '7', name: 'Suraj Tal', region: 'Northern Himalayas', image: require('./assets/pictures/suraj.jpeg') ,
    Mountain: 'Himalaya',
        Country: 'India',
        River: 'Bhaga River',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '10-20% (Moderate Risk)'
  },
  { id: '8', name: 'Lake Tsomgo', region: 'Eastern Himalayas', image: require('./assets/pictures/tsomgo.jpg'),
    Mountain: 'Himalaya',
        Country: 'India',
        River: 'Tsomgo River',
        OutburstMechanism: 'Shyok',
        OutburstProbability: '10-20% (Moderate Risk)'
   },
];

const PredictScreen = () => {
  const navigation = useNavigation();
  
  // Handle lake press event
  const handleLakePress = (lake) => {
    navigation.navigate('LakeDetail', { lake });
  };

  // Calculate screen width to manage tile layout
  const screenWidth = Dimensions.get('window').width;
  const tileSize = (screenWidth / 2) - 24; // Adjust for padding/margins

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {mockLakes.map((lake) => (
          <TouchableOpacity key={lake.id} style={[styles.box, { width: tileSize }]} onPress={() => handleLakePress(lake)}>
            <Image source={lake.image} style={styles.image} />
            <Text style={styles.name}>{lake.name}</Text>
            <Text style={styles.region}>{lake.region}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensure tiles are spaced evenly
  },
  box: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  region: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default PredictScreen;
