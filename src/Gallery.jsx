import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

function Gallery() {
  const { searchQuery } = useGlobalContext();
  const {
    data: imagesData,
    isLoading: imagesLoading,
    isError: imagesError,
  } = useQuery({
    queryKey: ["images", searchQuery],
    queryFn: async () => {
      const result = await axios.get(`${url}&&query=${searchQuery}`);
      const data = await result.data;

      return data;
    },
  });

  // Loading case
  if (imagesLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  // Error case
  if (imagesError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  console.log(imagesData);

  const results = imagesData?.results;
  // No data found case
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  // IF everything is ok
  return (
    <section className="image-container">
      {results.map((item) => {
        const imageUrl = item?.urls?.regular;
        return (
          <img
            src={imageUrl}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
}
export default Gallery;
