import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);

  return (
    <>
      <form>
        <input
          value={value || ""}
          type="text"
          placeholder="Search"
          className="modalHeader__search"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </form>
    </>
  );
}

export default GlobalFilter;
