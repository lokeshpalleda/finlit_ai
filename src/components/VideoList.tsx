import { useEffect, useState } from "react";
import { fetchVideosFromFirestore } from "@/services/firestoreUtils";

const VideoList = ({ category }: { category: string }) => {
  const [videos, setVideos] = useState<{ id: string; title: string; url: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const fetchedVideos = await fetchVideosFromFirestore(category);
      console.log("📌 Videos in component:", fetchedVideos);
      setVideos(fetchedVideos);
      setLoading(false);
    };

    loadVideos();
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{category} Videos</h2>

      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <ul className="space-y-2">
          {videos.map((video) => (
            <li key={video.id} className="border p-2 rounded-lg">
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoList;
