import { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { extractYouTubeID } from "@/lib/youtubeUtils";

interface Video {
  title: string;
  url: string;
}

const MutualFundsLearning = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      console.log("📌 Fetching Mutual Funds videos from Firestore...");

      try {
        const querySnapshot = await getDocs(collection(db, "learn", "Mutual funds", "videos"));
        const fetchedVideos: Video[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("📂 Video Document:", doc.id, "=>", data);
          return {
            title: data.title || "Untitled Video",
            url: data.url || "#",
          };
        });

        if (fetchedVideos.length === 0) {
          console.warn("⚠️ No videos found in Firestore for Mutual Funds!");
        }

        setVideos(fetchedVideos);
      } catch (err) {
        console.error("❌ Error fetching Mutual Funds videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      {/* Title Section - Stays Fixed at the Top */}
      <div className="w-full flex justify-center items-center py-4 bg-white shadow-md sticky top-0 z-10">
        <h2 className="text-2xl font-bold mr-2">Mutual Funds Learning</h2>
        <p className="text-lg font-medium text-gray-600">Videos</p>
      </div>

      {/* Scrollable Video List */}
      <div className="w-full max-w-3xl overflow-y-auto flex flex-col gap-6 p-4 h-full">
        {videos.length === 0 ? (
          <p className="text-center">No videos available.</p>
        ) : (
          videos.map((video, index) => (
            <div key={index} className="p-4 border rounded shadow bg-white">
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${extractYouTubeID(video.url)}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="text-lg font-semibold mt-2 text-center">{video.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MutualFundsLearning;
