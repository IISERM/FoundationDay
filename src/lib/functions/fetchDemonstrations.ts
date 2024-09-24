import { collection, getDocs, QuerySnapshot, CollectionReference } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface Demonstration {
  name: string;
  description: string;
  club: string;
}

export interface ClubDemonstration {
  name: string;
  demonstrations: Demonstration[];
  images: string[];
}

interface DemonstrationDocument {
  name?: unknown;
  description?: unknown;
  club?: unknown;
}

interface ClubImageDocument {
  club?: unknown;
  image?: unknown;
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export async function fetchDemonstrations(): Promise<ClubDemonstration[]> {
  try {
    const [demonstrationSnapshot, clubImagesSnapshot]: [
      QuerySnapshot<DemonstrationDocument>,
      QuerySnapshot<ClubImageDocument>
    ] = await Promise.all([
      getDocs(collection(db, 'Demonstrations') as CollectionReference<DemonstrationDocument>),
      getDocs(collection(db, 'ClubImages') as CollectionReference<ClubImageDocument>),
    ]);

    const groupedDemonstrations: { [key: string]: Demonstration[] } = {};

    demonstrationSnapshot.forEach((doc) => {
      const data = doc.data();

      if (
        typeof data.club !== 'string' ||
        typeof data.name !== 'string' ||
        typeof data.description !== 'string'
      ) {
        console.warn(`Invalid data types in Demonstrations document ID: ${doc.id}`);
        return;
      }

      const clubNameRaw: string = data.club.trim();
      const clubName: string = toTitleCase(clubNameRaw);
      const name: string = data.name.trim();
      const description: string = data.description.trim();

      const demonstration: Demonstration = {
        name,
        description,
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
        demonstrations,
        images: [],
      })
    );

    clubImagesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (typeof data.club !== 'string' || typeof data.image !== 'string') {
        console.warn(`Invalid data types in ClubImages document ID: ${doc.id}`);
        return;
      }

      const clubNameRaw: string = data.club.trim();
      const clubName: string = toTitleCase(clubNameRaw);
      const imageUrl: string = data.image.trim();

      const club = clubDemonstrations.find((c) => c.name === clubName);
      if (club) {
        club.images.push(imageUrl);
      } else {
        console.warn(`No matching club found for image in ClubImages document ID: ${doc.id}`);
      }
    });

    clubDemonstrations.sort((a, b) => a.name.localeCompare(b.name));

    return clubDemonstrations;
  } catch (error) {
    console.error('Error fetching demonstrations:', error);
    throw error;
  }
}
