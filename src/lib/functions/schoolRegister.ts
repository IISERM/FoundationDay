import {collection, addDoc} from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface SchoolRegistration {
    schoolName: string;
    schoolEmail: string;
    teacherName: string;
    teacherEmail: string
    teacherPhone: string
    totalStudents: string
    studentsGrade1to5: string;
    studentsGrade6to8: string;
    studentsGrade9to12: string;
}

export async function schoolRegister(data: SchoolRegistration): Promise<void> {
    console.log('Registering school entry in Firestore');

    try {
        const schoolRegistrationRef = collection(db, 'School Registrations');
        await addDoc(schoolRegistrationRef, data);
    } catch (error) {
        console.error('Error registering school entry:', error);
    }
}