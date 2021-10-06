import { useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { baseURL } from "../../../client/clientAxios";
import useUser from "../../../hooks/useUser";
import Avatar from "../Avatar/Avatar";

const KomenInput = ({ postKomen = () => {} }) => {
  const [input, setInput] = useState("");

  const { user } = useUser();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handlePostKomen = () => {
    postKomen(input);
    setInput("");
  };

  return (
    <div className="row justify-content-end mt-3 comment-input">
      <div className="col-md-12">
        <div className="comment-items d-flex">
          <div className="ava me-3 d-md-inline d-none">
            <Avatar name={user?.nama} src={user?.avatar} />
          </div>
          <div className="flex-grow-1 rounded-ss border border-secondary border-light-secondary-ss position-relative p-2 pe-5">
            <TextareaAutosize
              className="textarea-auto"
              style={{
                resize: "none",
                width: "100%",
                border: "none",
              }}
              placeholder="Tuliskan komentar..."
              onChange={handleChange}
              value={input}
            />
            <button
              className="border-0 btn position-absolute pe-2"
              style={{
                bottom: "5%",
                right: "0",
                transform: "translateY(5%)",
              }}
              onClick={handlePostKomen}
            >
              <img
                src={`/img/btn-submit-comment.svg`}
                alt="button-submit-comment"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomenInput;
