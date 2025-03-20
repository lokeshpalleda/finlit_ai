import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // ✅ Correct path
import { collection, getDocs } from "firebase/firestore";

interface Video {
  title: string;
  url: string;
}

interface Category {
  name: string;
  videos: Video[];
}

const LearnAll: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const learnCollection = collection(db, "learn");
      const categorySnapshot = await getDocs(learnCollection);
      
      const allCategories: Category[] = [];

      for (const categoryDoc of categorySnapshot.docs) {
        const categoryName = categoryDoc.id; // Banking, Insurance, etc.
        const videosCollection = collection(db, "learn", categoryName, "videos");
        const videosSnapshot = await getDocs(videosCollection);

        const videos: Video[] = videosSnapshot.docs.map((doc) => doc.data() as Video);

        allCategories.push({ name: categoryName, videos });
      }

      setCategories(allCategories);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Learn Section</h2>
      {categories.map((category) => (
        <div key={category.name}>
          <h3>{category.name}</h3>
          {category.videos.map((video, index) => (
            <div key={index}>
              <h4>{video.title}</h4>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://img.youtube.com/vi/${new URL(video.url).searchParams.get("v")}/0.jpg`}
                  alt={video.title}
                  width="200"
                />
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LearnAll;
