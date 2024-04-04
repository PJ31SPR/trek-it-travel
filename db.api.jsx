import { getDoc, getDocs, doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
export const readUserDocument = async (userId) => {
    try {
        const userDocSnapshot = await getDoc(doc(db, 'users', userId))
        return userDocSnapshot.data()
    } catch (error) {
        console.error("Error reading document data:", error.mmessage)
        throw error
    }
}
export const addItinerary = async (userId, name, city, startDate, endDate) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const itinerariesCollectionRef = collection(userDocRef, 'itineraries');
        // Add the itinerary document with user ID reference
        const docRef = await addDoc(itinerariesCollectionRef, {
            itineraryName: name,
            city: city,
            startDate: startDate,
            endDate: endDate,
            userId: userId,
        });

        console.log('Itinerary added successfully');
        return docRef.id;
      } catch (error) {
        console.error('Error adding itinerary:', error);
        throw error;
      }
      };

      export const readItineraries = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId); 
            const userDocSnapshot = await getDoc(userDocRef); 
    
            if (userDocSnapshot.exists()) {
                const userDocData = userDocSnapshot.data();
                const itinerariesRef = collection(userDocRef, 'itineraries');
                const itinerariesSnapshot = await getDocs(itinerariesRef);
    
                const itinerariesData = itinerariesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                console.log('Itineraries Data:', itinerariesData);
                return itinerariesData;
            } else {
                console.log('User document not found');
                return null; 
            }
        } catch (error) {
            console.error('Error reading user document:', error);
            throw error;
        }
    };

    export const addItemToItinerary = async (userId, itineraryId, propertyName, newItem) => {
        try {

            const userDocRef = doc(db, 'users', userId);
            const itineraryDocRef = doc(collection(userDocRef, 'itineraries'), itineraryId);
    
            const itineraryDocSnapshot = await getDoc(itineraryDocRef);
            if (!itineraryDocSnapshot.exists()) {
                throw new Error('Itinerary document not found');
            }
    
            const currentArray = itineraryDocSnapshot.data()[propertyName] || [];
            const newArray = [...currentArray, newItem];
    
            await updateDoc(itineraryDocRef, { [propertyName]: newArray });
    
            console.log(`Item added to ${propertyName} array successfully`);
        } catch (error) {
            console.error(`Error adding item to ${propertyName} array:`, error);
            throw error;
        }
    };

    export const removeItemFromItinerary = async (userId, itineraryId, propertyName, itemIdToRemove) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const itineraryDocRef = doc(collection(userDocRef, 'itineraries'), itineraryId);
    
            const itineraryDocSnapshot = await getDoc(itineraryDocRef);
            if (!itineraryDocSnapshot.exists()) {
                throw new Error('Itinerary document not found');
            }
    
            const currentArray = itineraryDocSnapshot.data()[propertyName] || [];
            const newArray = currentArray.filter(item => item.id !== itemIdToRemove);
    
            await updateDoc(itineraryDocRef, { [propertyName]: newArray });
    
            console.log(`Item removed from ${propertyName} array successfully`);
        } catch (error) {
            console.error(`Error removing item from ${propertyName} array:`, error);
            throw error;
        }
    };


    export const deleteItinerary = async (userId, itineraryId) => {
        try {
            const itineraryDocRef = doc(db, 'users', userId, 'itineraries', itineraryId);
            await deleteDoc(itineraryDocRef);
            console.log('Itinerary deleted successfully');
        } catch (error) {
            console.error('Error deleting itinerary:', error);
            throw new Error('Error deleting itinerary');
        }
    };