import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/components/firebaseConfig"; // Ensure this is correct

// Function to add videos to Firestore
export const addVideoToFirestore = async (category: string, title: string, url: string) => {
  try {
    console.log("Adding video:", title, url);
    const videoRef = doc(db, "learn", category, "videos", title);
    await setDoc(videoRef, { title, url });
    console.log("✅ Video added successfully!");
  } catch (error) {
    console.error("🔥 Error adding video:", error);
  }
};

// Function to fetch videos from Firestore
export const fetchVideosFromFirestore = async (category: string) => {
  try {
    console.log(`📌 Fetching videos from Firestore for category: ${category}`);

    const videosCollectionRef = collection(db, `learn/${category}/videos`);
    const querySnapshot = await getDocs(videosCollectionRef);

    if (querySnapshot.empty) {
      console.warn(`⚠️ No videos found in category: ${category}`);
    }

    const videos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { title: string; url: string }), // Ensure correct typing
    }));

    console.log(`✅ Successfully fetched videos:`, videos);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return [];
  }
};


export const getVideos = async (category: string) => {
  try {
    console.log(`Fetching videos for category: ${category}`);
    const videosRef = collection(db, "learn", category, "videos");
    const querySnapshot = await getDocs(videosRef);

    const videos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      url: doc.data().url,
    }));

    console.log("Fetched videos:", videos);
    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
export interface Video {
  id: string;
  title: string;
  url: string;
}

// ✅ Function to fetch stock videos
export const fetchStockVideos = async () => {
  try {
    console.log("Fetching stock investment videos...");
    const videosCollectionRef = collection(db, "learn", "stocks", "videos");
    const querySnapshot = await getDocs(videosCollectionRef);

    const videos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { title: string; url: string }),
    }));

    console.log(`✅ Fetched ${videos.length} stock investment videos.`);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching stock videos:", error);
    return [];
  }
};