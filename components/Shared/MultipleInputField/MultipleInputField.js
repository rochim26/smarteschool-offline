import { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const MultipleInputField = ({
  label = "label",
  placeholder = "placeholder",
  onChange = () => {},
  value = []
}) => {

  const [inputData, setInputData] = useState([""]);

  const onClickTambah = () => {
    setInputData([...inputData, ""]);
  }
  
  const onclickDelete = () => {
    let newInputData = [...inputData];
    newInputData.pop();
    setInputData(newInputData);
    onChange(newInputData);
  }

  const handleChangeForm = (e, index) => {
    let newInputData = [...inputData];
    newInputData[index] = e.target.value;
    setInputData(newInputData);
    onChange(newInputData);
  }

  useEffect(() => {
    setInputData(value || [""]);
  }, [value.length])

  return (
    <div>
      {
        inputData.map((input, idx) => {
          return (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2" key={idx}>
                <label className="form-label mb-0">
                  {label}
                </label>
              </div>
              <div className="jawaban-list d-flex flex-lg-nowrap flex-lg-row flex-column flex-wrap justify-content-between mb-3">
                <div className="w-100 text-break order-lg-2 order-3 mt-lg-0 mt-2">
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder={placeholder}
                    type="text"
                    name="penulis"
                    // id={d}
                    value={input}
                    onChange={(e) => handleChangeForm(e, idx)}
                  />
                </div>
                {
                  (inputData.length - 1 === idx) && inputData.length !== 1 && (
                    <button
                      className="btn btn-danger btn-danger-ss rounded-circle shadow-danger-ss d-lg-flex justify-content-center align-items-center fs-6 ms-3 order-lg-3 order-2 d-none"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={onclickDelete}
                    >
                      <FaTrashAlt />
                    </button>
                  )
                }
              </div>
            </>
          )
        })
      }
      <button className="btn btn-ss btn-primary btn-primary-ss fs-14-ss fw-bold rounded-pill shadow-primary-ss mt-2" onClick={onClickTambah}>
        <FaPlus className="me-2" />
        Tambah {label}
      </button>
    </div>
  )
}


export default MultipleInputField;