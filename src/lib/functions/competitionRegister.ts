import {collection, addDoc} from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface CompetitionRegistration {
    competitionName: string;
    candidateNames: string;
    institution: string;
    grade: string;
    contactEmail: string;
    contactPhone: string;
}

export async function competitionRegister(data: CompetitionRegistration): Promise<void> {
    console.log('Registering competition entry in Firestore');

    try {
        const competitionRegistrationRef = collection(db, 'Competition Registrations');
        await addDoc(competitionRegistrationRef, data);
    } catch (error) {
        console.error('Error registering competition entry:', error);
    }
}