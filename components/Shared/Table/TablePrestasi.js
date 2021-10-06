import { useEffect, useRef, useState } from "react";
import { FaPen, FaTrash, FaTrashAlt } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import ModalTambahPrestasi from "../ModalTambahPrestasi/ModalTambahPrestasi";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { deletePrestasi, getPrestasi } from "../../../client/PrestasiClient";
import { Pagination } from "antd";
import { ssURL } from "../../../client/clientAxios";

const TablePrestasi = ({ editData, setEditData, tingkatProps }) => {
  const router = useRouter();

  const { page = 1 } = router.query;

  const [loading, setLoading] = useState(false);

  const [prestasiData, setPrestasiData] = useState({
    prestasi: [],
    tingkat: [],
  });
  const { prestasi: listPrestasi, tingkat: tingkatPrestasi } =
    prestasiData || {};

  const [searchPrestasi, setSearchPrestasi] = useState(
    router.query.search || ""
  );
  const [searchSiswa, setSearchSiswa] = useState(router.query.namaSiswa || "");

  const [debounceSearchPrestasi] = useDebounce(searchPrestasi, 600);
  const [debounceSearchSiswa] = useDebounce(searchSiswa, 600);

  const [tingkat, setTingkat] = useState(tingkatProps || "");

  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const firstRender = useRef(true);

  const _getPrestasi = async () => {
    setLoading(true);
    const params = {
      ...router.query,
      page: page,
    };

    const { data } = await getPrestasi(params);
    if (data) {
      setPrestasiData({
        ...prestasiData,
        tingkat: data.tingkat,
        prestasi: data.prestasi.data,
        total: data.prestasi.total,
      });
      setHasMore(data?.prestasi?.length > 0);
    }
    setLoading(false);
  };

  const _deletePrestasi = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deletePrestasi(id);
        if (data) {
          toast.success(data.message);
          _getPrestasi();
        } else {
          toast.error(error.message);
        }
      }
    });
  };

  const handleChangeDropdown = (e) => {
    setTingkat(e.value);
  };

  const onClickEdit = (data) => {
    setEditData(data);
  };

  const setFilter = () => {
    const queryParams = {
      search: searchPrestasi,
      namaSiswa: searchSiswa,
      tingkat: tingkat,
    };

    // delete queryParams if value is null
    Object.keys(queryParams).map((query) => {
      !queryParams[query] && delete queryParams[query];
    });

    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    _getPrestasi();
  }, [page]);

  useEffect(() => {
    if (!isEmpty(router.query)) {
      _getPrestasi();
    }
  }, [router.query]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setFilter();
    }
  }, [debounceSearchPrestasi, debounceSearchSiswa, tingkat]);

  return (
    <div className="card card-ss mt-4">
      <div className="card-header card-header-ss p-0 pt-4">
        <div className="d-flex justify-content-between align-items-sm-center flex-md-row flex-column px-4">
          <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
            Daftar Prestasi
          </h4>
          <section className="d-flex flex-md-row flex-column">
            <input
              type="text"
              className="form-control form-search form-search-mutasi rounded-pill fw-semibold border-secondary-ss w-100 mb-3 mb-md-0  me-0 me-md-4"
              style={{ height: "42px", width: "100%" }}
              id="exampleFormControlInput1"
              placeholder="Cari"
              value={searchSiswa}
              onChange={(e) => setSearchSiswa(e.target.value)}
              data-joyride="cari-siswa"
            />
            {tingkatPrestasi?.length && (
              <Dropdown
                listValue={tingkatPrestasi}
                defaultValue={
                  tingkatPrestasi?.find((d) => d.value == tingkat)?.label
                }
                onChange={handleChangeDropdown}
                isDropdownMutasi
                dataJoyride="tingkat-prestasi"
              />
            )}
          </section>
        </div>
      </div>

      <div className="table-responsive mt-3">
        {loading && <Skeleton count={3} height={50} />}
        {!loading && (
          <table className="table-ss" data-joyride="table-prestasi">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Nama Prestasi</th>
                <th className="text-center">Tingkat</th>
                <th className="text-center">Peringkat</th>
                {!router.pathname.includes("web") && <th></th>}
              </tr>
            </thead>
            <tbody>
              {listPrestasi?.map((prestasi, index) => (
                <tr key={index}>
                  <td data-th="No">{index + 1}</td>
                  <td data-th="Nama">{prestasi.nama}</td>
                  <td data-th="Nama Prestasi">{prestasi?.user?.nama}</td>
                  <td data-th="Tingkat" className="text-center">
                    {prestasi.tingkat}
                  </td>
                  <td
                    data-th="Peringkat"
                    className="fw-extrabold text-center color-dark"
                  >
                    {prestasi.peringkat}
                  </td>
                  {!router.pathname.includes("web") && (
                    <td data-th="Aksi" className="actions">
                      {/* Dropdown Option Start */}

                      <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                        <div
                          role="button"
                          id="dropdownOption"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={`/img/icon-dropdown-option.svg`}
                            alt="icon-option"
                          />
                        </div>
                        <ul
                          className="dropdown-menu dropdown-menu-ss my-1"
                          aria-labelledby="dropdownOption"
                        >
                          <li
                            data-bs-toggle="modal"
                            data-bs-target="#modalTambahPrestasi"
                            onClick={() => onClickEdit(prestasi)}
                          >
                            <a className="dropdown-item">
                              <FaPen className="me-2" />
                              <span>Edit</span>
                            </a>
                          </li>
                          <li onClick={() => _deletePrestasi(prestasi.id)}>
                            <a className="dropdown-item color-danger">
                              <FaTrashAlt className="me-2" />
                              <span>Hapus</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* Dropdown Option End */}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex align-items-center justify-content-center mt-5 pb-5">
          <Pagination
            total={prestasiData?.total}
            showSizeChanger={false}
            current={page || 1}
            pageSize={20}
            onChange={(e) => router.push(`${ssURL}/prestasi?page=${e}`)}
          />
        </div>
      </div>

      {!router.pathname.includes("web") && (
        <ModalTambahPrestasi
          tingkatPrestasi={tingkatPrestasi}
          _getPrestasi={_getPrestasi}
          editData={editData}
          setHasMore={setHasMore}
        />
      )}
    </div>
  );
};

export default TablePrestasi;
