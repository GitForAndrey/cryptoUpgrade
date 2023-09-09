//add data to firestore storage
import firestore from '@react-native-firebase/firestore';

export const accessCollectionDb = async (userId: string | undefined, collection:string, docId:string, data?:{}) => {
  const docRef = firestore()
    .collection('users')
    .doc(userId)
    .collection(collection)
    .doc(docId);

  if (data) {
    await docRef.set(data);
  } else {
    await docRef.delete();
  }
};

export const fetchAccessCollection = async (userId: string | undefined, collection:string) => {
  const snapshot = await firestore()
    .collection('users')
    .doc(userId)
    .collection(collection)
    .get();
  const assets:any = [];
  snapshot.forEach(doc => {
    assets.push(doc.data());
  });
  return assets;
};
