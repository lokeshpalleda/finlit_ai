import { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig"; // Adjust import if needed
import { collection, getDocs } from "firebase/firestore";
import { extractYouTubeID } from "@/lib/youtubeUtils";

interface Video {
  title: string;
  url: string;
}

const BankingLearning = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "learn", "Banking", "videos")
        );
        const fetchedVideos: Video[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            title: data.title || "Untitled Video",
            url: data.url || "#",
          };
        });

        setVideos(fetchedVideos);
      } catch (err) {
        console.error("Error fetching Banking videos:", err);
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
    <div className="h-screen flex flex-col items-center bg-gray-100 overflow-hidden">
      {/* Title section with proper layout */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Banking Learning</h2>
        <p className="text-lg font-medium text-gray-600">Videos</p>
      </div>

      {/* Video list with controlled scrolling */}
      <div className="w-full max-w-3xl overflow-y-auto flex flex-col gap-6 p-4">
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
              <p className="text-lg font-semibold mt-2 text-center">
                {video.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BankingLearning;