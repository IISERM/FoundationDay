import { collection, getDocs, QuerySnapshot} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

interface CarouselImage {
  title: string;
  description: string;
  image: string;
}

export default async function fetchCarouselImages(): Promise<CarouselImage[]> {
  console.log('Fetching carousel images from Firestore');

  try {
    const imagesCollectionRef = collection(db, 'Carousel Images');

    const imagesSnapshot: QuerySnapshot<DocumentData> = await getDocs(imagesCollectionRef);

    const images: CarouselImage[] = imagesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.Title,
        description: data.Description,
        image: data['Image Link'],
      };
    });

    return images;
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
}