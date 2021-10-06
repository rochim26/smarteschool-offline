import React, { useEffect, useState } from "react";
import { Combobox } from "react-widgets";
import { axiosInstance } from "../../client/clientAxios";
import { sekolahLokasiForm, sekolahProfilForm } from "../../data/form";

const LokasiSekolahForm = ({ settingList, daftarProvinsi }) => {
  const [daftarKabupaten, setDaftarKabupaten] = useState([]);

  const getKabupaten = async (province_id) => {
    const res = await axiosInstance.get(`/province/${province_id}/regency`);

    setDaftarKabupaten(res.data);
  };

  const [daftarKecamatan, setDaftarKecamatan] = useState([]);

  const getKecamatan = async (regency_id) => {
    const res = await axiosInstance.get(`/regency/${regency_id}/district`);

    setDaftarKecamatan(res.data);
  };

  const [daftarKelurahan, setDaftarKelurahan] = useState([]);

  const getKelurahan = async (district_id) => {
    const res = await axiosInstance.get(`/district/${district_id}/village`);

    setDaftarKelurahan(res.data);
  };

  // useEffect(() => {
  //   getKabupaten();
  // }, []);

  return (
    <>
      <div className="card-header p-4 card-header-ss pb-0">Lokasi Sekolah</div>
      <div className="card-body p-4">
        <div className="row g-4">
          {settingList.map((setting, idx) => {
            if (setting.type == "select") {
              return (
                <div className="col-md-6" key={idx}>
                  <label className="form-label">{setting.label}</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name={setting.name}
                    value={setting.value}
                    onChange={setting.onChange}
                  >
                    {setting.selectOptions.map((option, idx) => {
                      return (
                        <option value={option.value} key={idx}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            } else if (setting.type == "checkbox") {
              return (
                <div className="col-md-6">
                  <label className="form-label">{setting.label}</label>
                  <div>
                    {setting.checkboxOptions.map((option, idx) => {
                      return (
                        <div className="form-check form-check-inline" key={idx}>
                          <input
                            className="form-check-input"
                            type="radio"
                            value={option.value}
                            id={option.value}
                            onChange={setting.onChange}
                            name={setting.name}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={option.value}
                          >
                            {option.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            } else if (setting.type == "combobox") {
              if (setting.name == "province") {
                return (
                  <div className="col-md-6">
                    <label htmlFor={setting.name} className="form-label">
                      {setting.label}
                    </label>
                    <Combobox
                      data={daftarProvinsi}
                      textField="name"
                      value={setting.value?.name}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={(e) => {
                        setting.onChange(e);
                        getKabupaten(e.id);
                      }}
                    />
                  </div>
                );
              } else if (setting.name == "regency") {
                return (
                  <div className="col-md-6">
                    <label htmlFor={setting.name} className="form-label">
                      {setting.label}
                    </label>
                    <Combobox
                      disabled={daftarKabupaten.length ? false : true}
                      data={daftarKabupaten}
                      textField="name"
                      value={setting.value?.name}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={(e) => {
                        setting.onChange(e);
                        getKecamatan(e.id);
                      }}
                    />
                  </div>
                );
              } else if (setting.name == "district") {
                return (
                  <div className="col-md-6">
                    <label htmlFor={setting.name} className="form-label">
                      {setting.label}
                    </label>
                    <Combobox
                      disabled={daftarKecamatan.length ? false : true}
                      data={daftarKecamatan}
                      textField="name"
                      value={setting.value?.name}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={(e) => {
                        setting.onChange(e);
                        getKelurahan(e.id);
                      }}
                    />
                  </div>
                );
              } else if (setting.name == "village") {
                return (
                  <div className="col-md-6">
                    <label htmlFor={setting.name} className="form-label">
                      {setting.label}
                    </label>
                    <Combobox
                      disabled={daftarKelurahan.length ? false : true}
                      data={daftarKelurahan}
                      textField="name"
                      value={setting.value?.name}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={(e) => {
                        setting.onChange(e);
                      }}
                    />
                  </div>
                );
              }
              return (
                <div className="col-md-6">
                  <label htmlFor={setting.name} className="form-label">
                    {setting.label}
                  </label>
                  <Combobox
                    data={[]}
                    defaultValue={[]}
                    textField="name"
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                  />
                </div>
              );
            } else if (setting.type == "textarea") {
              return (
                <div className="col-md-12">
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
            }
            return (
              <div className="col-md-6">
                <label htmlFor={setting.name} className="form-label">
                  {setting.label}
                </label>
                <input
                  className="form-control"
                  autoComplete="off"
                  value={setting.value}
                  id={setting.name}
                  onChange={setting.onChange}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LokasiSekolahForm;
