import { useState, useEffect } from "react";

const Dropdown = ({
  listValue = [],
  defaultValue,
  onChange = () => {},
  dataJoyride,
  isDropdownMutasi,
}) => {
  const [value, setValue] = useState(defaultValue || listValue?.[0]?.label);

  const handleChangeDropdown = (value) => {
    setValue(value?.label);
    onChange(value);
  };

  useEffect(() => {
    if (listValue && defaultValue) {
      setValue(defaultValue);
    }
  }, [listValue, defaultValue]);

  return (
    <div
      className="dropdown dropdown-ss d-flex flex-lg-row flex-column"
      data-joyride={dataJoyride}
    >
      <button
        className={`dropdown-toggle dropdown-search-perpustakaan-toggle dropdown-sort-perpus-toggle btn py-2 px-4 btn-link rounded-pill border bg-white text-decoration-none color-dark fw-bold ${
          isDropdownMutasi && "w-100"
        } ${false && "active"}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {listValue?.length > 0 &&
          listValue?.map((value) => (
            <li onClick={() => handleChangeDropdown(value)}>
              <a className="dropdown-item" href="#">
                {value.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
