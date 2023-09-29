import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

export const getFileFromFirebase = async (URL: string) => {
  const fileRef = ref(storage, URL);
  return getDownloadURL(fileRef)
}