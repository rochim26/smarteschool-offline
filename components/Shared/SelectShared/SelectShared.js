import React from "react";
import Select, { components } from "react-select";

const SelectShared = ({
  handleChangeSelect,
  name,
  value,
  options,
  isDisabled = false,
  placeholder = "Pilih",
  isImg = false,
  customSelect
}) => {
  const Option = (props) => {
    return isImg ? (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {props.data.img && (
            <img
              src={props.data.img}
              alt={props.data.label}
              style={{ height: 50, width: 50, objectFit: "contain" }}
            />
          )}
          <div className="ms-4">
            <div className="text-capitalize">{props.data.label}</div>
            <div style={{ fontSize: 12 }}>{props.data.value}</div>
          </div>
        </div>
      </components.Option>
    ) : customSelect ? customSelect(props) : (
      <components.Option {...props}>
        <div className="text-capitalize">{props.data.label}</div>
      </components.Option>
    );
  };

  return (
    <Select
      components={{ Option }}
      options={options}
      placeholder={placeholder}
      onChange={(e) => handleChangeSelect(e, name)}
      value={options?.filter((d) => d.value === value)}
      isDisabled={isDisabled}
      name={name}
    />
  );
};

export default SelectShared;
