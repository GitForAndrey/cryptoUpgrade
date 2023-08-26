//add data to firestore storage
import firestore from '@react-native-firebase/firestore';

export const accessCollectionDb = async (userId, collection, docId, data) => {
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

export const fetchAccessCollection = async (userId, collection) => {
  const snapshot = await firestore()
    .collection('users')
    .doc(userId)
    .collection(collection)
    .get();
  const assets = [];
  snapshot.forEach(doc => {
    assets.push(doc.data());
  });
  return assets;
};
