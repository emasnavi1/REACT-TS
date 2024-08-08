interface Props {
  categories: string[];
  onSelect: (filterVlaue: string) => void;
}

export default function ExpenseFilter({ categories, onSelect }: Props) {
  return (
    <div className="mt-5">
      <label htmlFor="categoryFilter" className="form-label">
        Category Filter:
      </label>
      <select
        id="categoryFilter"
        className="form-select"
        onChange={(event) => onSelect(event.target.value)}
      >
        <option>All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
