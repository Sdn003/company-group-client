import React, { Fragment } from "react";
import "./ModalSearch.css";

function ModalSearch({ id, text, selectOption, optionArr, search, reset }) {
  
  return (
    <div id="modalSearchWrapper" className="modalSearchWrapper_class">
      <form className="modalSearchWrapper_form">
        <input
          className="modalSearch__input"
          type="number"
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          placeholder="Company Group Id"
          onChange={(e) => {
            id(e.target.value);
          }}
        />
        <input
          className="modalSearch__input"
          type="text"
          placeholder="Company Group Name"
          onChange={(e) => text(e.target.value)}
        />
        <select
          type="dropdown"
          className="modalSearch__input"
          onChange={(e) => selectOption(e.target.value)}
        >
          <option>Business Type</option>
          {optionArr.map((val, i) => {
            return (
              <Fragment key={i}>
                <option value={val}>{val}</option>
              </Fragment>
            );
          })}
        </select>
      </form>

      <div id="searchBtn" className="searchBtn">
        <button type="submit" onClick={(e) => search(e)}>
          Search
        </button>
      </div>
      <div id="searchBtn" className="searchBtn">
        <button type="submit" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default ModalSearch;
