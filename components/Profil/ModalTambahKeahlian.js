import React, { useEffect, useRef, useState } from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";
import { hideModal } from "../../utilities/ModalUtils";

const ModalTambahKeahlian = () => {

  const { user, setUser } = useUser();

  const [tags, setTags] = useState(user?.profil?.keahlian || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [buttonState, setButtonState] = useState("idle")

  const saveInputRef = useRef();

  const handleClose = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  }

  const showInput = () => {
    setInputVisible(true);
  }

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags = [];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue("");
    }
    setInputVisible(false);
  };

  const handleSubmit = async () => {
    setButtonState("loading")
    const { data, error } = await postProfilUser({ keahlian: tags });
    if (data) {
      setButtonState("success")
      hideModal("modalTambahKeahlian")
      toast.success(data?.message);
      setUser({ ...user, profil: { 
        ...user.profil,
        keahlian: tags
      } });
    } else {
      setButtonState("error")
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    if (inputVisible) {
      saveInputRef.current.focus();
    }
  }, [inputVisible])

  return (
    <>
      <NewModal
        modalId="modalTambahKeahlian"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Keahlian</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambahkan keahlian
            </span>
          </>
        }
        content={
          <>
            <div className="mb-2">
              <label className="form-label">Keahlian</label>
            </div>
            <div style={{ marginBottom: 16 }}>
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: 'from',
                  duration: 100,
                  onComplete: e => {
                    e.target.style = '';
                  },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
                style={{ display: "inline-flex", width: "100%", flexWrap: "wrap", gap: 8 }}
              >
                { tags.length > 0 ? tags.map(tag => (
                  <span key={tag} style={{ display: 'inline-block' }}>
                    <Tag
                      closable
                      onClose={e => {
                        e.preventDefault();
                        handleClose(tag);
                      }}
                      className="d-flex align-items-center"
                    >
                      {tag}
                    </Tag>
                  </span>
                )) : "Belum ada data"}
              </TweenOneGroup>
            </div>
            {inputVisible && (
              <Input
                ref={saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <div style={{ display: "inline-flex" }}>
                <Tag onClick={showInput} className="site-tag-plus d-flex align-items-center">
                  <PlusOutlined className="me-2" /> Tambah Keahlian
                </Tag>
              </div>
            )}
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={"Tambah"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          />
        }
      />
    </>
  );
};

export default ModalTambahKeahlian;
