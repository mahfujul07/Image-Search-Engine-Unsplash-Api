import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const fetchItems = async (page, query) => {
  try {
    const response = await axios({
      url: `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=bmv-0hJ4YP_tcQFqmpfjaMB75MNzd-8N9xCIBvm5QS0`,
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results.map((r) => r.urls.small);
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const images = useSelector((state) => state.search.images);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setCurrentPage(1);
    dispatch({
      type: "RESET",
    });

    const items = await fetchItems(currentPage, searchInput);

    dispatch({
      type: "SEARCH",
      payload: items,
    });
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setCurrentPage((p) => p + 1);

    const items = await fetchItems(currentPage + 1, searchInput);

    dispatch({
      type: "SEARCH",
      payload: items,
    });

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "7rem" }}>
        <div className="col-10">
          <input
            className="form-control p-3"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Search for photos"
          />
        </div>
        <div className="col-2">
          <button className="btn btn-dark" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="text-center">
          {images.map((i) => (
            <img className="thumbnail" src={i} alt="Search" />
          ))}
        </div>
      </div>
      {images.length > 0 && (
        <div className="row mt-4">
          <button
            disabled={isLoading}
            className="btn btn-dark m-auto"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
