import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';

export interface GuestLecture {
  title?: string;
  date?: string;
  venue?: string;
  speaker?: string;
  about?: string;
  talkTitle?: string;
  abstract?: string;
  image?: string;
}

export async function fetchGuestLectureDetails(): Promise<{ chief: GuestLecture; honor: GuestLecture }> {
  console.log('Fetching guest lecture details from Firestore');

  try {
    const guestLectureCollectionRef = collection(db, 'Guest Lecture');
    
    const guestLectureSnapshot: QuerySnapshot<DocumentData> = await getDocs(guestLectureCollectionRef);

    const guestLectures: { [key: string]: GuestLecture } = {};
    
    guestLectureSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      guestLectures[doc.id] = {
        title: data.Title,
        date: data.Date,
        venue: data.Venue,
        speaker: data.Speaker,
        about: data.About,
        talkTitle: data['Talk Title'] || null,
        abstract: data['Abstract'] || null,
        image: data['Image Link'] || null,
      };
    });

    return {
      chief: guestLectures['chief'] || {},
      honor: guestLectures['honor'] || {}
    };
  } catch (error) {
    console.error('Error fetching guest lecture details:', error);
    return {
        chief: {},
        honor: {}
    };
  }
}
