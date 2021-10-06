import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const CardBerita = ({ judul, createdAt, banner, id }) => {
  const router = useRouter();

  return (
    <div className="card my-3">
      <img src={banner} className="card-img" alt={banner} height={180} />
      <div className="card-img-overlay">
        <div className="btn btn-primary rounded-pill py-1 px-4">Berita</div>
      </div>
      <div className="card-body">
        <p className="card-text">{createdAt}</p>
        <h5 className="card-title fw-bold color-dark mb-4">
          <div dangerouslySetInnerHTML={{ __html: judul }} />
        </h5>
        <div className="d-flex justify-content-end">
          <Link
            href={`${router.route}/blog/[id]`}
            as={`${router.route}/blog/${id}`}
          >
            <a className="btn btn-outline-primary rounded-pill">Lihat Detail</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;
