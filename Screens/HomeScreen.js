import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//import { DrawerActions } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleReportLost = () => {
    navigation.navigate('LostItemReport');
  };

  const handleReportFound = () => {
    navigation.navigate('ReportFoundItems');
  };

  const handleMyItems = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleReportLost}>
        <Text style={styles.buttonText}>Report Lost Items</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReportFound}>
        <Text style={styles.buttonText}>Report Found Items</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMyItems}>
        <Text style={styles.buttonText}>My Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 100,
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  menuButtonText: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;