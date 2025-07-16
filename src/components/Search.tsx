type Prop = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Search = ({ searchTerm, setSearchTerm }: Prop) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search Icon" />
        <input
          type="text"
          placeholder="Search throught thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
