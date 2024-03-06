
import dayjs from "dayjs";
export function formatTimeToDay(str, Modifier="") {
  return dayjs(str).format(`YYYY${Modifier}MM${Modifier}DD`);
}
export function formatDate(str) {
  return dayjs(str).format("YYYYMMDDHHmmss");
}
export function formatTimeToMin(str) {
  return dayjs(str).format("YYYY-MM-DD HH:mm");
}
export function formatTimeToSec(str) {
  return dayjs(str).format("YYYY-MM-DD HH:mm:ss");
}
export function base64ToBlob (base64){
  let arr = base64.split(",");
  let mime = arr[0].match(/:(.*?);/)[1] || "image/png";
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime,
  });
};

