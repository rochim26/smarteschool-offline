import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

const Tag = ({ listTag = [], onChange = () => {} }) => {
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState([]);

  const handleChangeTag = (tag) => {
    if (selectedTag.includes(tag)) return;

    setSelectedTag([...selectedTag, tag]);
    onChange([...selectedTag, tag]);
  };

  const removeAll = () => {
    setSelectedTag([]);
    onChange([]);
  };

  const removeTag = (deleteTag) => {
    setSelectedTag(selectedTag?.filter((tag) => tag !== deleteTag));
    onChange(selectedTag?.filter((tag) => tag !== deleteTag));
  };

  useEffect(() => {
    if (router.query.tag && selectedTag?.length === 0) {
      if (Array.isArray(router.query.tag)) {
        setSelectedTag(router.query.tag);
      } else {
        setSelectedTag(router.query.tag ? [router.query.tag] : []);
      }
    }
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-center overflow-hidden"
        style={{ whiteSpace: "nowrap" }}
      >
        <h5 className="fs-18-ss color-primary fw-bold pointer me-3 mb-0">
          Semua
        </h5>
        <Swiper
          spaceBetween={0}
          slidesPerView={3}
        >
        {listTag?.map((tag) => {
          return (
            <SwiperSlide>
              <h5
                className="fs-18-ss fw-bold pointer me-3 mb-0"
                onClick={() => handleChangeTag(tag.nama)}
              >
                {tag?.nama}
              </h5>
            </SwiperSlide>
          );
        })}
        </Swiper>
      </div>

      {/* Kalo Udah Milih Filter Tampilin Ini  */}

          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            className={` ${selectedTag?.length == 0 ? "d-none" : "d-flex"} justify-content-center align-items-center overflow-hidden mt-3`}
            style={{ maxWidth: "80%", height: "40px" }}
          >
            {selectedTag?.map((tag) => (
              <SwiperSlide className="rounded-pill border border-secondary py-2 px-3 fw-bold me-3 pointer w-auto">
                <div className="d-flex justify-content-between align-items-center h-100">
                  <span className="text-nowrap">{tag}</span>
                  <img
                    src="/img/tag-x.svg"
                    alt="tag-x"
                    className="ms-4"
                    onClick={() => removeTag(tag)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

      {selectedTag?.length > 0 && (
        <div className="d-flex justify-content-center align-items-center">
          <h6
            className="color-primary fw-bold pointer mb-0 mt-3"
            onClick={removeAll}
          >
            Hapus Semua
          </h6>
        </div>
      )}
    </>
  );
};

export default Tag;
