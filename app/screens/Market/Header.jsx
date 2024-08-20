import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';

const categories = [
  {
    name: 'E-Cars',
    icon: 'directions-car',
  },
  {
    name: 'E-Bikes',
    icon: 'two-wheeler',
  },
  {
    name: 'E-Cycles',
    icon: 'directions-bike',
  },
  {
    name: 'Vehicle Parts',
    icon: 'build-circle',
  },
  {
    name: 'Accessories',
    icon: 'sports-esports', 
  },
  
];

const Header = ({ onCategoryChanged }) => {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x, y, width, height, pageX) => {
      scrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{ flex:1, }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity>
              <View style={styles.searchBtn}>
                <Ionicons name="search" size={24} />
                <View>
                  <Text style={styles.searchText}>Search</Text>
                  <Text style={styles.searchSubText}>Anything . Electrical</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          className="space-x-3"
          horizontal
          // ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={activeIndex === index ? '#000' : Colors.grey}
              />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    height: 160,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchBtn: {
   
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  searchText: {
    fontFamily: 'mon-sb',
  },
  searchSubText: {
    color: Colors.grey,
    fontFamily: 'mon',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  scrollContainer: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
});

export default Header;
