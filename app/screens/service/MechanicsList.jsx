import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '../../../constants/images';

export const mechanics = [
  { id: '1', name: 'Mechanic A', address: '123 Main St, City A', review: 4.6, image: images.mechanic1, about: 'About Mechanic A...' },
  { id: '2', name: 'Mechanic B', address: '456 Elm St, City B', review: 4.2, image: images.mechanic2, about: 'About Mechanic B...' },
  { id: '3', name: 'Mechanic C', address: '456 Elm St, City C', review: 4.3, image: images.mechanic3, about: 'About Mechanic C...' },
  { id: '4', name: 'Mechanic D', address: '456 Elm St, City D', review: 4.5, image: images.mechanic4, about: 'About Mechanic D...' },
  { id: '5', name: 'Mechanic E', address: '456 Elm St, City E', review: 4.1, image: images.mechanic5, about: 'About Mechanic E...' },
  { id: '6', name: 'Mechanic F', address: '456 Elm St, City F', review: 4.8, image: images.mechanic6, about: 'About Mechanic F...' },
  { id: '7', name: 'Mechanic G', address: '456 Elm St, City G', review: 4.4, image: images.mechanic7, about: 'About Mechanic G...' },
  
];

const MechanicsList = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={mechanics}
      style={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Profile',  { id: item.id, type: 'mechanic' })}
        >
          <Image source={item.image} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.reviewContainer}>
              <Text style={styles.review}>⭐ {item.review}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#E9E9E9', padding: 5, height: 610, borderRadius: 10 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  image: { width: 100, height: 100, resizeMode: 'contain', marginRight: 15, borderRadius: 20},
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  address: { fontSize: 14, color: '#333', marginVertical: 5 },
  reviewContainer: { flexDirection: 'row', alignItems: 'center' },
  review: { fontSize: 14, color: '#FFD700' },
});

export default MechanicsList;
