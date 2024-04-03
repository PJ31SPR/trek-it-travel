import { getDoc, getDocs, doc, collection, addDoc } from 'firebase/firestore'
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
        await addDoc(itinerariesCollectionRef, {
            name: name,
            city: city,
            startDate: startDate,
            endDate: endDate,
            userId: userId,
        });
        console.log('Itinerary added successfully');
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