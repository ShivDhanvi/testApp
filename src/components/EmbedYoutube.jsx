function EmbedYoutube({ searchTerm }) {
  // Function to extract YouTube video ID and return embed URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      // youtu.be/abcd1234
      if (parsedUrl.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }

      // youtube.com/watch?v=abcd1234
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        console.log("Video ID:", videoId);
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const embedUrl = searchTerm ? getYouTubeEmbedUrl(searchTerm) : null;

  return (
    <div className="md:col-span-2 flex flex-col space-y-6">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-96 md:h-[500px] rounded-2xl border-4 border-[#28a79a]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      ) : (
        <p className="text-gray-300 text-center">
          Enter a valid YouTube URL to play
        </p>
      )}
    </div>
  );
}

export default EmbedYoutube;
