import {collection, addDoc} from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface IndividualRegistration {
    name: string,
    school: string,
    grade: string,
    email: string,
    phone: string,
}

export async function individualRegister(data: IndividualRegistration): Promise<void> {
    console.log('Registering individual entry in Firestore');

    try {
        const individualRegistrationRef = collection(db, 'Individual Registrations');
        await addDoc(individualRegistrationRef, data);
    } catch (error) {
        console.error('Error registering individual entry:', error);
    }
}