import React from "react";
import { Category } from "../types/finance";

interface Props {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect: React.FC<Props> = ({ categories, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select category</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
