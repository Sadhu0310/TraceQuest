import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Updated import
import { storage } from '../firebase'; // Import Firebase Storage instance
import { db } from '../firebase'; // Import Firebase Firestore instance
import * as ImagePicker from 'expo-image-picker';

const LostItemReport = () => {
  const [Username, setUsername] = useState('');
  const [Branch, setBranch] = useState('');
  const [Year, setYear] = useState('');
  const [Contact, setContact] = useState('');
  const [Email, setEmail] = useState('');
  const [ItemLost, setItemLost] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [LostLocation, setLostLocation] = useState('');
  const [DateofLost, setDateofLost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Updated state variable name

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Camera roll permissions not granted');
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image picker result:', result);
  
      if (result.cancelled) {
        throw new Error('Image selection cancelled');
      }
  
      if (!result.assets || !result.assets.length || !result.assets[0].uri) {
        throw new Error('Selected image URI is undefined');
      }
  
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri);
      setSelectedImage(selectedImageUri); // Updated state variable name
    } catch (error) {
      console.error('Error selecting image: ', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };
  
  const handleReport = async () => {
    try {
      const userDocRef = doc(db, 'Users', Email);
      await setDoc(userDocRef, {
        Username,
        Branch,
        Year,
        Contact,
        Email
      });
  
      const lostReportsCollectionRef = collection(userDocRef, 'LostReports');
      
      let imageUrl = ''; // Initialize imageUrl variable
  
      if (selectedImage) {
        console.log('Uploading image:', selectedImage);
        //const imageRef = ref(storage, ${Email}/${Date.now()}_${selectedImage.split('/').pop()}); // Use ref() function from Firebase storage
        await uploadBytes(imageRef, selectedImage); // Use uploadBytes() function from Firebase storage
        imageUrl = await getDownloadURL(imageRef); // Use getDownloadURL() function from Firebase storage
        console.log('Image uploaded. URL:', imageUrl);
      }
  
      await addDoc(lostReportsCollectionRef, {
        ItemLost,
        Category,
        Description,
        LostLocation,
        DateofLost,
        ImageUrl: imageUrl // Save image URL in Firestore
      });
  
      console.log("Successfully submitted your report");
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to report lost item. Please try again later.');
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Username"
            value={Username}
            onChangeText={setUsername}
            style={[styles.input, { width: '47%' }]}
          />
          <TextInput
            placeholder="Branch"
            value={Branch}
            onChangeText={setBranch}
            style={[styles.input, { width: '47%' }]}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Year"
            value={Year}
            onChangeText={setYear}
            style={[styles.input, { width: '47%' }]}
          />
          <TextInput
            placeholder="Contact"
            value={Contact}
            onChangeText={setContact}
            style={[styles.input, { width: '47%' }]}
          />
        </View>
        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <View style={styles.horizontalLine}></View>
        <TextInput
          placeholder="Lost Item"
          value={ItemLost}
          onChangeText={setItemLost}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={Category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Lost Location"
          value={LostLocation}
          onChangeText={setLostLocation}
          style={styles.input}
        />
        <TextInput
          placeholder="Date of Lost"
          value={DateofLost}
          onChangeText={setDateofLost}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={Description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline
        />
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        <TouchableOpacity onPress={handleReport} style={styles.button}>
          <Text style={styles.buttonText}>Report Lost Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LostItemReport;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
    width: '90%',
  },
  horizontalLine: {
    width: '90%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 20,
  },
  descriptionInput: {
    height: 100,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});