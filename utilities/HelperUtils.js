import currency from "currency-formatter";
import DatePicker from "react-datepicker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Select } from "antd";
import { Combobox } from "react-widgets";
import { storage } from "../config/config";

const { Option } = Select;

const momentPackage = require("moment");
require("moment/locale/id");
momentPackage.locale("id");

export { momentPackage };

export const getTimeFromNow = (date) => {
  return momentPackage(date).fromNow();
};

export const getFormatDate = (date) => {
  return momentPackage(date).format("DD MMMM YYYY");
};

export const getYear = (date) => {
  return momentPackage(date).format("YYYY");
};

// .match(/<img [^>]*src="[^"]*"[^>]*>/gm)
//                   .match(/<img [^>]*src="[^"]*"[^>]*>/gm)
//                           .map(x => x.replace(/.*src="([^"]*)".*/, '$1'));

export const currencyFormatter = (value) => {
  return currency.format(value, {
    thousand: ".",
    precision: 0,
    locale: "id_ID",
  });
};

export const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
];

export const renderJamMengajar = (jamMulai, jamSelesai) => {
  return `${jamMulai?.substring(0, 5)} - ${jamSelesai?.substring(0, 5)}`;
};

export const kodeHariIni =
  new Date().getDay() > 0 && new Date().getDay() < 6 ? new Date().getDay() : 1;

export const renderFormInput = (settingList, state) => {
  return settingList.map((setting, index) => {
    if (setting.type == "select-antd") {
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{setting.label}</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            name={setting.name}
            value={setting.value}
            onChange={setting.onChange}
            placeholder={setting.placeholder}
          >
            {setting.selectOptions?.map((option) => (
              <Option value={option?.value || option?.id || option}>
                {option?.label || option?.nama || option?.kode || option}
              </Option>
            ))}
          </Select>
        </div>
      );
    } else if (setting.type == "select") {
      return (
        <div className="mb-3" key={index}>
          <label className="form-label">{setting.label}</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name={setting.name}
            value={setting.value}
            onChange={setting.onChange}
          >
            {setting.selectOptions?.map((option) => {
              return (
                <option value={option.value ?? option}>
                  {option.label ?? option}
                </option>
              );
            })}
          </select>
        </div>
      );
    } else if (setting.type == "checkbox") {
      return (
        <div className="mb-3">
          <label className="form-label">{setting.label}</label>
          <div>
            {setting.checkboxOptions.map((option) => {
              return (
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={option.value}
                    id={option.value}
                    onChange={setting.onChange}
                    name={setting.name}
                  />
                  <label className="form-check-label" htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (setting.type == "combobox") {
      return (
        <div className="mb-3">
          {setting.label && (
            <label htmlFor={setting.name} className="form-label">
              {setting.label}
            </label>
          )}
          <Combobox
            data={setting.data}
            defaultValue={setting.defaultValue}
            textField={setting.textField}
            valueField={setting.valueField}
            caseSensitive={false}
            value={setting.value}
            minLength={3}
            filter="contains"
            placeholder={setting.placeHolder}
            onChange={setting.onChange}
            onSelect={setting.onSelect}
          />
        </div>
      );
    } else if (setting.type == "new-combobox") {
      return (
        <div className="mb-3">
          {setting.label && (
            <label htmlFor={setting.name} className="form-label">
              {setting.label}
            </label>
          )}
          <Combobox
            data={setting.data}
            textField={setting.textField}
            filter="contains"
            placeholder={setting.placeHolder}
            onChange={setting.onChange}
            onSelect={setting.onSelect}
            defaultValue={state?.value}
          />
        </div>
      );
    } else if (setting.type == "textarea") {
      return (
        <div className="mb-3">
          <label htmlFor={setting.name} className="form-label">
            {setting.label}
          </label>
          <textarea
            className="form-control"
            autoComplete="off"
            id={setting.name}
            value={setting.value}
            onChange={setting.onChange}
            rows="3"
          ></textarea>
        </div>
      );
    } else if (setting.type === "time") {
      return (
        <div className="mb-3">
          <div>
            <label htmlFor={`${setting.name}-${index}`} className="form-label">
              {setting.label}
            </label>
          </div>
          <DatePicker
            selected={setting.value}
            onChange={setting.onChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control width-100"
            // id={`${setting.name}-${index}`}
          />
        </div>
      );
    } else if (setting.type === "radio") {
      return (
        <div className="mb-3">
          <label htmlFor={`${setting.name}-${index}`} className="form-label">
            {setting.label}
          </label>
          <div className="d-flex align-items-center">
            <div className="form-check-ss col-md-6 position-relative me-3">
              <input
                className="form-check-input form-check-radio position-absolute"
                type="radio"
                name="tesAkademik"
                id="radioYa"
                style={{
                  top: "36%",
                  left: "2em",
                  // height: "20px",
                }}
                name="tesAkademik"
                value={1}
                checked={setting?.value === 1}
                onChange={() => setting.onChange(1)}
              />
              <label
                className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                htmlFor="radioYa"
              >
                <span className="ms-4 ps-2">Ya</span>
              </label>
            </div>
            <div className="form-check-ss col-md-6 position-relative">
              <input
                className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                type="radio"
                name="tesAkademik"
                id="radioTidak"
                style={{
                  top: "36%",
                  left: "2em",
                  // height: "20px",
                }}
                name="tesAkademik"
                value={0}
                checked={setting?.value === 0}
                onChange={() => setting.onChange(0)}
              />
              <label
                className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                htmlFor="radioTidak"
              >
                <span className="ms-4 ps-2">Tidak</span>
              </label>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="mb-3">
        <label htmlFor={`${setting.name}-${index}`} className="form-label">
          {setting.label}
        </label>
        <input
          className="form-control"
          autoComplete="off"
          value={setting.value}
          // id={`${setting.name}-${index}`}
          onChange={setting.onChange}
          type={setting.type || "text"}
          readOnly={setting.readOnly}
        />
      </div>
    );
  });
};

export const optionHari = [
  {
    value: 0,
    label: "Minggu",
  },
  {
    value: 1,
    label: "Senin",
  },
  {
    value: 2,
    label: "Selasa",
  },
  {
    value: 3,
    label: "Rabu",
  },
  {
    value: 4,
    label: "Kamis",
  },
  {
    value: 5,
    label: "Jumat",
  },
  {
    value: 6,
    label: "Sabtu",
  },
];

export const renderGuruPengampu = (nama, mapel) => {
  return `${nama} - ${mapel}`;
};

export const renderDisembunyikan = (dihapus) => {
  if (dihapus) {
    return <FaEyeSlash />;
  }

  return <FaEye />;
};

export const isValidUrl = (string) => {
  var res = string.indexOf("http");
  return res !== -1;
};

export const isValidGmeetUrl = (string) => {
  if (
    string?.indexOf("meet.google.com") !== -1 ||
    string?.indexOf("zoom.us") !== -1
  ) {
    return string;
  } else {
    return "#!";
  }
};

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export const getFileUrlFromUri = async (uri) => {
  const fileName = new Date().toDateString();
  const blob = dataURItoBlob(uri);
  const image = await storage.child(`${fileName}.jpeg`).put(blob);
  const url = await storage.child(`${fileName}.jpeg`).getDownloadURL();

  return url;
};
