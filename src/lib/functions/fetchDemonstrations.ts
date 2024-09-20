import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface Demonstration {
  name: string;
  description: string;
  image_link?: string;
  club: string;
}

export interface ClubDemonstration {
  name: string;
  demonstrations: Demonstration[];
}

export async function fetchDemonstrations(): Promise<ClubDemonstration[]> {
  const demonstrationsCollectionRef = collection(db, 'Demonstrations');
  const demonstrationSnapshot: QuerySnapshot<DocumentData> = await getDocs(demonstrationsCollectionRef);

  const groupedDemonstrations: { [key: string]: Demonstration[] } = {};

  demonstrationSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const clubName = data.club;
    const demonstration: Demonstration = {
      name: data.name,
      description: data.description,
      image_link: data.image_link,
      club: clubName,
    };
    if (!groupedDemonstrations[clubName]) {
      groupedDemonstrations[clubName] = [];
    }
    groupedDemonstrations[clubName].push(demonstration);
  });
  
  const clubDemonstrations: ClubDemonstration[] = Object.entries(groupedDemonstrations).map(
    ([clubName, demonstrations]) => ({
      name: clubName,
      demonstrations: demonstrations,
    })
  );

  return clubDemonstrations;
}
