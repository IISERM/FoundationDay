import { collection, getDocs, QuerySnapshot} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface Competition {
    name: string;
    organiser: string;
    schedule: string;
    short_description: string;
    long_description: string;
    image: string;
}

export async function fetchCompetitions(): Promise<Competition[]> {
    const competitionsCollectionRef = collection(db, 'Competitions');
    const compeititionSnapshot: QuerySnapshot<DocumentData> = await getDocs(competitionsCollectionRef);
    const competitions: Competition[] = compeititionSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            name: data.name,
            organiser: data.organiser,
            schedule: data.schedule,
            short_description: data.short_description,
            long_description: data.long_description,
            image: data.image,
        };
    });
    return competitions;
}