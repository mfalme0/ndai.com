// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} = require("firebase/firestore");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const express = require('express');
const multer = require("multer");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const appExpress = express();
const port = 8060;
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

appExpress.use(express.json());

// Function to add car data to Firestore
const addCarToFirestored = async (formData) => {
  try {
    const docRef = await setDoc(doc(collection(db, 'Fleet'), formData.vehicleplates), formData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error('Error writing document: ', error);
    throw error; // Propagate the error for handling in the calling code
  }
};

const addCarToFirestore = async (formData) => {
  try {
    // Use Firestore's automatic document ID generation
    const docRef = await addDoc(collection(db, 'Fleet'), {
      plates: formData.plates,
      carname: formData.carname,
      model: formData.model,
      year: formData.year,
      state: formData.state,
      transmission: formData.transmission,
      fuel: formData.fuel,
      imageUrl: formData.imageUrl, // Include the imageUrl property
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error('Error writing document: ', error);
    throw error; // Propagate the error for handling in the calling code
  }
};



// Function to upload image to Firebase Storage and get download URL

// Function to book a vehicle
const bookVehicle = async (vehicleId, userId) => {
  try {
    const vehicleRef = doc(db, 'Fleet', vehicleId);
    await updateDoc(vehicleRef, { availability: false });

    const userRef = doc(collection(db, 'Users'), userId);
    await set(userRef, { bookedVehicle: vehicleId });

    console.log('Vehicle booked successfully!');
  } catch (error) {
    console.error('Error booking vehicle: ', error);
    throw error;
  }
};

const uploadImageAndGets = async (imageBuffer, fileName) => {
  try {
    const filePath = `images/${fileName}`;
    const file = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(file, imageBuffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};

function generateUniqueID() {
  // Implement your logic to generate a unique ID here
  // You can use a library like uuid or create your own logic
  // For simplicity, you might use a timestamp or any other unique identifier
  return Date.now().toString();
}


appExpress.post('/addcars', upload.single('image'), async (req, res) => {
  const formData = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  try {
    // Use Firestore's automatic document ID generation
    const carsCollection = collection(db, 'Fleet');
    const docRef = await addDoc(carsCollection, {
      ...formData,
      imageUrl: imageBuffer ? await uploadImageAndGetURL(imageBuffer, 'images/' + generateUniqueID() + '.jpg') : null,
    });

    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ message: 'Car added successfully!' });
  } catch (error) {
    console.error('Error adding car: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





appExpress.post('/bookvehicle', async (req, res) => {
  const { vehicleId, userId } = req.body;

  try {
    await bookVehicle(vehicleId, userId);
    res.status(200).json({ message: 'Vehicle booked successfully!' });
  } catch (error) {
    console.error('Error booking vehicle: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to fetch all cars from Firestore
const getAllCarsFromFirestore = async () => {
  try {
    const carsCollection = collection(db, 'Fleet',  );
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









// Function to generate a unique ID using the plates property
function generateUniqueIDs(plates) {
  // Implement your logic to generate a unique ID using the plates property
  // For example, you can concatenate plates with a timestamp
  return `${plates.replace(/\s+/g, '')}_${Date.now()}`;
}

// ...

appExpress.post('/addcard', upload.single('image'), async (req, res) => {
  const formData = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  try {
    if (!formData || !formData.plates) {
      throw new Error('Missing or invalid data in the request.');
    }

    const carsCollection = collection(db, 'Fleet');

    // Use generateUniqueID with the plates property
    const uniqueFileName = generateUniqueID(formData.plates) + '.jpg';

    // Update the file path without the 'images/' prefix here
    const filePath = `images/${uniqueFileName}`;

    const docRef = await addDoc(carsCollection, {
      ...formData,
      imageUrl: imageBuffer ? await uploadImageAndGetURL(imageBuffer, filePath) : null,
    });

    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ message: 'Car added successfully!' });
  } catch (error) {
    console.error('Error adding car: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Function to upload image to Firebase Storage and get download URL
async function uploadImageAndGetURLs(imageBuffer) {
  try {
    
    const fileName = + generateUniqueID()`.jpg`;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageBuffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
}

// Function to generate a unique ID





//adding users

const addUserToFirestore = async (formData) => {
  try {
    // Use Firestore's automatic document ID generation
    const docRef = await addDoc(collection(db, 'Fleet'), {
      plates: formData.plates,
      carname: formData.carname,
      model: formData.model,
      year: formData.year,
      state: formData.state,
      transmission: formData.transmission,
      fuel: formData.fuel,
      imageUrl: imageBuffer ? await uploadImageAndGetURL(imageBuffer, fileName) : null,

    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error('Error writing document: ', error);
    throw error; // Propagate the error for handling in the calling code
  }
};



//firebase instance 3

function generateUniqueID(plates) {
  // Implement your logic to generate a unique ID using the plates property
  // For example, you can concatenate plates with a timestamp
  return `${plates.replace(/\s+/g, '')}_${Date.now()}`;
}

// ...

appExpress.post('/addcar', upload.single('image'), async (req, res) => {
  const formData = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  try {
    if (!formData || !formData.plates) {
      throw new Error('Missing or invalid data in the request.');
    }

    const carsCollection = collection(db, 'Fleet');

    // Use generateUniqueID with the plates property
    const uniqueFileName = generateUniqueID(formData.plates) + '.jpg';

    // Update the file path without the 'images/' prefix here
    const filePath = `images/${uniqueFileName}`;

    const imageUrl = imageBuffer ? await uploadImageAndGetURL(imageBuffer, filePath) : null;

    const docRef = await addDoc(carsCollection, {
      ...formData,
      imageUrl,
    });

    console.log("Document written with ID: ", docRef.id);

    res.status(200).json({ message: 'Car added successfully!' });
  } catch (error) {
    console.error('Error adding car: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to upload image to Firebase Storage and get download URL
async function uploadImageAndGetURL(imageBuffer, fileName) {
  try {
    const filePath = `images/${fileName}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, imageBuffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
}


appExpress.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
