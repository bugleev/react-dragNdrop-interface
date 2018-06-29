const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
};
const isMobile = () => {
  return (
    (typeof window.orientation !== "undefined" &&
      window.screen.availWidth <= 520) ||
    (navigator.userAgent.indexOf("IEMobile") !== -1 &&
      window.screen.availWidth < 520)
  );
};
export { clamp, reinsert, isMobile };
