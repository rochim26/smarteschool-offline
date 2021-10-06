import ReactAvatar, { ConfigProvider } from "react-avatar";

const Avatar = ({
  name = "",
  src = "",
  size = 50,
  className = "",
  style = {},
}) => {
  const colors = ["#2680eb", "#f9ac50", "#63ed7a"];

  return src ? (
    <ReactAvatar
      name={name}
      src={src}
      size={size}
      className={className}
      // style={style}
      round={true}
      maxInitials={2}
    />
  ) : name ? (
    <ReactAvatar
      name={name}
      size={size}
      className={className}
      // style={style}
      round={true}
      maxInitials={2}
    />
  ) : null;
};

export default Avatar;
