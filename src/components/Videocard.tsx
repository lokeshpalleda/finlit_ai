import React from "react";

interface VideoCardProps {
  title: string;
  url: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url }) => {
  const embedUrl = url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;

  return (
    <div className="border rounded-lg p-4 shadow-md w-full bg-white">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <iframe
        className="w-full h-56 rounded-lg"
        src={embedUrl}
        title={title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoCard;
