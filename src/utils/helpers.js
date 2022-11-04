import { performance } from "perf_hooks";

export const sendRes = (data) => ({
  total: data.length,
  data,
});

const formatTime = (ms) => {
  let time;
  const sec = ms / 1000;
  const min = sec / 60;
  const hr = min / 60;

  if (Math.floor(hr)) return `${hr} hr`;
  if (Math.floor(min)) return `${min} min`;
  if (Math.floor(sec)) return `${sec} sec`;
  return `${ms} ms`;
};

export const analyzeFunc = ({
  func,
  args = [],
  funcName = "This function",
} = {}) => {
  var startTime = performance.now();
  const res = func(...args);
  var endTime = performance.now();

  console.log(`${funcName} took ${formatTime(endTime - startTime)}`);
  return res;
};
