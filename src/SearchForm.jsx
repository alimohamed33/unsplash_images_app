import { useGlobalContext } from "./context";

function SearchForm() {
  const { setSearchQuery } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;

    setSearchQuery(searchValue);
  };

  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="cat"
          name="search"
          className="form-input search-input"
        />

        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
}
export default SearchForm;
