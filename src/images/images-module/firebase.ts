import { FirebaseApp, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAxsg0HmhFqN6gVwJg5v0i5EpY1qGgCmVo',
	authDomain: 'art-gallery-back-end.firebaseapp.com',
	projectId: 'art-gallery-back-end',
	storageBucket: 'art-gallery-back-end.appspot.com',
	messagingSenderId: '266551935532',
	appId: '1:266551935532:web:d1a0015709f898d86b8789',
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const storage: FirebaseStorage = getStorage(app);
