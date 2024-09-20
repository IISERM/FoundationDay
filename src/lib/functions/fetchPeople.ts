import { collection, getDocs, QuerySnapshot} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface People {
    name: string;
    club: string;
    position: string;
    image: string;
}

export interface ClubPeople {
    name: string;
    people: People[];
}

export async function fetchPeople(): Promise<ClubPeople[]> {
    const peopleCollectionRef = collection(db, 'People');
    const peopleSnapshot: QuerySnapshot<DocumentData> = await getDocs(peopleCollectionRef);

    const groupedPeople: { [key: string]: People[] } = {};

    peopleSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const clubName = data.club;
        const person: People = {
            name: data.name,
            club: data.club,
            position: data.position,
            image: data.image
        };
        if (!groupedPeople[clubName]) {
            groupedPeople[clubName] = [];
        }
        groupedPeople[clubName].push(person);
    });

    const clubPeople: ClubPeople[] = Object.entries(groupedPeople).map(
        ([clubName, people]) => ({
            name: clubName,
            people: people,
        })
    );

    return clubPeople;
}