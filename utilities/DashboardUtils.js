import moment from "moment";

export const ternaryAbsen = (
  data,
  absenRombel,
  isGuru,
  primary,
  danger,
  secondary
) => {
  if (
    moment(`${moment().format("YYYY-MM-DD")} ${data?.jamMengajar?.jamMulai}`) <
    moment()
  ) {
    if (isGuru) {
      if (absenRombel?.find((absen) => absen.mRombelId == data.mRombelId)) {
        return primary;
      } else {
        return danger;
      }
    } else {
      if (
        absenRombel?.find(
          (absen) => absen.mMataPelajaranId == data.mMataPelajaranId
        )
      ) {
        if (
          absenRombel?.find(
            (absen) => absen.mMataPelajaranId == data.mMataPelajaranId
          )?.tkTimeline?.[0]?.absen
        ) {
          return primary;
        } else {
          return danger;
        }
      } else {
        return secondary;
      }
    }
  } else {
    return secondary;
  }
};
