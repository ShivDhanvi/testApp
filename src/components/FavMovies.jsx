export default function FavMovies({ searchMovies }) {
  const posterUrl = [
    "https://i.pinimg.com/736x/c7/da/c6/c7dac6248ffffd942a19f4dfc0ab337e.jpg",
    "https://i.pinimg.com/736x/d7/b6/09/d7b6097eeee7f71f91c46988b1ff108a.jpg",
    "https://i.pinimg.com/474x/96/c3/99/96c3996e5e7364d6d186f7c0eb48be91.jpg",
    "https://wallpapercave.com/wp/wp8751605.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/411/820/desktop-wallpaper-tamil-movie-poster-backgrounds.jpg",
    "https://i.pinimg.com/736x/6b/89/11/6b8911eefaf7ab13700f037ad41e7f2b.jpg",
    "https://media-cache.cinematerial.com/p/500x/meoi4570/ayan-indian-movie-poster.jpg?v=1456800451",
    "https://motivatevalmorgan.com/wp-content/uploads/2018/02/Hero-Tamil-Movie-Poster.jpg",
    "https://www.tallengestore.com/cdn/shop/files/Naayakan-KamalHaasan-ManiRatnamTamilMoviePoster_813f6329-9386-4cc9-9026-8c847ad55667.jpg?v=1714521308",
    "https://onlookersmedia.in/wp-content/uploads/2015/02/Ajiths-Vedhalam-Poster-Tamil-Movie-2015.jpg",
  ];

  const filteredPosters = posterUrl.filter((url, index) => {
    const movieName = `Movie ${index + 1}`.toLowerCase();
    return movieName.includes(searchMovies.toLowerCase());
  });

  console.log("Search Movies Term:", filteredPosters);

  return (
    <div className="relative">
      <div className="overflow-x-scroll scrollbar-hide flex space-x-4 py-2">
        {filteredPosters.map((url, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-72 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-gray-500 font-bold text-lg"
              style={{
                backgroundImage: `url(${url})`,
              }}
            >
              <div className="w-full h-full flex items-end justify-start p-4 text-white bg-gradient-to-t from-black to-transparent">
                <span className="truncate">Movie {index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
