const express = require('express');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc
} = require('firebase/firestore');
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require('firebase/storage');
const admin = require('firebase-admin')

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCATu4rYbBXr7ZrqyxBiYN1a27Z27jQrGM",
    authDomain: "mandai-4d99d.firebaseapp.com",
    databaseURL: "https://mandai-4d99d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mandai-4d99d",
    storageBucket: "mandai-4d99d.appspot.com",
    messagingSenderId: "60044607099",
    appId: "1:60044607099:web:11210154be0e6494a96cde",
    measurementId: "G-W5BML6XL7M"
  };

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const appExpress = express();
const port = 8060;
const upload = multer({ storage: multer.memoryStorage() });
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');


appExpress.use(express.json());

// Endpoint to add a car
appExpress.post('/addCar', upload.single('image'), async (req, res) => {
  try {
    const { make, model, year, state, transmission, fuel, plates, type} = req.body;

    // Add car details to Firestore
    const carsCollection = collection(db, 'cars');
    const carDocRef = await addDoc(carsCollection, {
      make,
      model,
      year,
      state,
      transmission,
      plates,
      fuel,
      type,
    });

    // Upload image to Firebase Storage
    const imageBuffer = req.file.buffer;
    const imageName = `images/${carDocRef.id}.jpg`;
    const imageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(imageRef, imageBuffer);

    // Get image download URL
    await uploadTask;

    const imageUrl = await getDownloadURL(imageRef);

    // Update car document with image URL
    await updateDoc(carDocRef, {
      imageUrl,
    });

    res.status(201).json({ message: 'Car added successfully' });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getAllCarsFromFirestore = async () => {
  try {
    const carsCollection = collection(db, 'cars',  );
    const querySnapshot = await getDocs(carsCollection);

    const cars = [];
    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      cars.push(carData);
    });

    return cars;
  } catch (error) {
    console.error('Error fetching cars: ', error);
    throw error;
  }
};

appExpress.get('/getcars', async (req, res) => {
  try {
    const cars = await getAllCarsFromFirestore();
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error getting cars: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

appExpress.post('/shikandai', async (req, res) => {
  try {
    const { name, email, phone, whip, location, reason, date, state } = req.body;

    // Add booking details to Firestore
    const bookingsCollection = collection(db, 'bookings');
    await addDoc(bookingsCollection, {
      name,
      email,
      phone,
      whip,
      location,
      reason,
      date,
      state,
    });

    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Error making a booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appExpress.post('/makeunvailable', async (req, res) => {

});

const getAllusersFromFirestore = async () => {
  try {
    const bookCollection = collection(db, 'bookings',  );
    const querySnapshot = await getDocs(bookCollection);

    const Users = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      Users.push(userData);
    });

    return Users;
  } catch (error) {
    console.error('Error fetching cars: ', error);
    throw error;
  }
};

appExpress.get('/people', async (req, res) => {
  try {
    const Users = await getAllusersFromFirestore();
    res.status(200).json(Users);
  } catch (error) {
    console.error('Error getting booking data: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

appExpress.post('/makeunavailable', async (req, res) => {
  try {
    const { plates } = req.body;

    // Check if plates is provided in the request
    if (!plates) {
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'cars');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.plates === plates) {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Update the car document to set the state to "unavailable"
    await updateDoc(carDocRef, {
      state: 'unavailable',
    });

    res.status(200).json({ message: 'Car marked as unavailable' });
  } catch (error) {
    console.error('Error marking car as unavailable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appExpress.post('/ital', async (req, res) => {
  try {
    const { plates } = req.body;

    // Check if plates is provided in the request
    if (!plates) {
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'cars');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.plates === plates) {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Update the car document to set the state to "unavailable"
    await updateDoc(carDocRef, {
      state: 'available',
    });

    res.status(200).json({ message: 'Car marked as unavailable' });
  } catch (error) {
    console.error('Error marking car as unavailable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appExpress.post('/nare', async (req, res) => {
  try {
    const { plates } = req.body;

    // Check if plates is provided in the request
    if (!plates) {
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'cars');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.plates === plates) {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Update the car document to set the state to "unavailable"
    await updateDoc(carDocRef, {
      state: 'Waiting',
    });

    res.status(200).json({ message: 'Car marked as unavailable' });
  } catch (error) {
    console.error('Error marking car as unavailable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ...

appExpress.delete('/deleteCar', async (req, res) => {
  try {
    const { plates } = req.body;

    // Check if plates is provided in the request
    if (!plates) {
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'cars');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.plates === plates) {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Delete the car document
    await deleteDoc(carDocRef);

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appExpress.post('/samosa', async (req, res) => {
  try {
    const { whip, name, location, date,  } = req.body;

    // Check if plates is provided in the request
    if (!whip || !name || !location || !date ){
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'bookings');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.whip  === whip && carData.name === name && carData.location === location && carData.date === date )
 {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Update the car document to set the state to "unavailable"
    await updateDoc(carDocRef, {
      state: 'approved',
    });

    res.status(200).json({ message: 'Car marked as unavailable' });
  } catch (error) {
    console.error('Error marking car as unavailable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...


appExpress.post('/morio', async (req, res) => {
  try {
    const { whip, name, location, date,  } = req.body;

    // Check if plates is provided in the request
    if (!whip || !name || !location || !date ){
      return res.status(400).json({ error: 'Missing plates in the request body' });
    }

    // Get the car document based on the plates
    const carsCollection = collection(db, 'bookings');
    const querySnapshot = await getDocs(carsCollection);
    let carDocRef;

    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      if (carData.whip  === whip && carData.name === name && carData.location === location && carData.date === date )
 {
        carDocRef = doc.ref;
      }
    });

    // Check if a car with the specified plates was found
    if (!carDocRef) {
      return res.status(404).json({ error: 'Car not found with the specified plates' });
    }

    // Update the car document to set the state to "unavailable"
    await updateDoc(carDocRef, {
      state: 'rejected',
    });

    res.status(200).json({ message: 'Car marked as unavailable' });
  } catch (error) {
    console.error('Error marking car as unavailable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});;
appExpress.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = getAuth(appFirebase);
    await signInWithEmailAndPassword(auth, email, password);

    res.status(200).send('Authentication successful');
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send('Authentication failed');
  }
});


appExpress.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
