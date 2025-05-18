import "./FilterSearch.css";

function FilterSearch({ filters, onChange, onFilter, onSearch }) {
  return (
    <div className="filter-search">
      <h2 className="filter-search-title">Filtrert søk</h2>

      <form className="filter-search-form" onSubmit={onFilter}>
        <label>
          Dato:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={onChange}
            className="filter-search-input"
          />
        </label>

        <label>
          Land:
          <select
            name="country"
            value={filters.country}
            onChange={onChange}
            className="filter-search-select"
          >
            <option value="">Velg et land</option>
            <option value="NO">Norge</option>
            <option value="SE">Sverige</option>
            <option value="DE">Tyskland</option>
            <option value="GB">England</option>
            <option value="FR">Frankrike</option>
          </select>
        </label>

        <label>
          By:
          <select
            name="city"
            value={filters.city}
            onChange={onChange}
            className="filter-search-select"
          >
            <option value="">Velg en by</option>
            <option>Oslo</option>
            <option>Stockholm</option>
            <option>Berlin</option>
            <option>London</option>
            <option>Paris</option>
          </select>
        </label>

        <button type="submit" className="filter-search-button">Filter</button>
      </form>

      <div className="filter-search-bar">
        <h3 className="filter-search-subtitle">Søk</h3>
        <label>
          Søk etter event, attraksjon eller spillested:
          <input
            type="text"
            name="query"
            value={filters.query}
            onChange={onChange}
            className="filter-search-input"
            placeholder="f.eks. Findings"
          />
        </label>
        <button onClick={onSearch} className="filter-search-button">Søk</button>
      </div>
    </div>
  );
}

export default FilterSearch;
