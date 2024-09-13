// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const Dashboard = () => {
//   const [LostReports, setLostItems] = useState([]);

//   useEffect(() => {
//     // Retrieve lost items from Firestore
//   const fetchLostItems = async () => {
//       const lostItemsCollection = firebase.firestore().collection('LostReports');
//       const snapshot = await lostItemsCollection.get();
//       const itemsList = snapshot.docs.map(doc => doc.data());
//       setLostItems(itemsList);
//     };

//     fetchLostItems();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemName}>{item.name}</Text>
//       <Button title="View" onPress={() => handleView(item)} />
//     </View>
//   );

//   const handleView = (item) => {
//     // Handle the view button press, e.g., navigate to item details screen
//     console.log('View button pressed for item:', item);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Lost Items</Text>
//       <FlatList
//         data={LostReports}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   itemName: {
//     fontSize: 18,
//   },
// });

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Dashboard = () => {
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp({
            // Your Firebase configuration
          apiKey: "AIzaSyAdzgVkxNzvKEV1nb9Brj77f4W_t1nozY0",
          authDomain: "tracequest-eead6.firebaseapp.com",
          projectId: "tracequest-eead6",
          storageBucket: "tracequest-eead6.appspot.com",
          messagingSenderId: "913373248358",
          appId: "1:913373248358:web:93feaf70c65f24df51a6a7"
          });
        }

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const Username = currentUser.uid;
          const myItemsCollection = firebase.firestore().collection('Users').doc(Username).collection('LostReports');
          const snapshot = await myItemsCollection.get();
          const itemsList = snapshot.docs.map(doc => doc.data().ItemLost);
          setMyItems(itemsList);
        } else {
          console.error('No user is signed in.');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchMyItems();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item}</Text>
      <Button title="View" onPress={() => handleView(item)} />
    </View>
  );

  const handleView = (item) => {
    console.log('View button pressed for item:', item);
    // Implement navigation logic if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Items</Text>
      {myItems.length > 0 ? (
        <FlatList
          data={myItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No items reported</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
});

export default Dashboard;
