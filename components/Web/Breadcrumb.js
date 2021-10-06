import Link from "next/link";

const Breadcrumb = ({ children }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">
            <a className="text-white text-decoration-none">Home</a>
          </Link>
        </li>
        {children}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
