export function checkOveLapAndNotInclude(array) {
  const counter = new Array(21).fill(0);

  array.forEach((range) => {
    if (range.length === 1) {
      counter[range[0]] += 1;
    } else {
      for (let i = range[0]; i <= range[1]; i++) {
        counter[i] += 1;
      }
    }
  });

  let overlapList = [];
  let notIncludeList = [];
  let start = -1;
  let currtype = "INIT";

  for (let i = 0; i <= 20; i++) {
    if (type(counter[i]) !== currtype) {
      if (start !== -1) {
        if (currtype === "notInclude") {
          notIncludeList.push([start, i - 1]);
        } else if (currtype === "OverLap") {
          overlapList.push([start, i - 1]);
        }
      }
      start = i;
      currtype = type(counter[i]);
    }
  }

  if (start !== -1) {
    if (currtype === "notInclude") {
      notIncludeList.push([start, 20]);
    } else if (currtype === "OverLap") {
      overlapList.push([start, 20]);
    }
  }

  return { overlap: overlapList, notInclude: notIncludeList };
}

export function checkIfOverlap(targetAge, overlap) {
  for (let i = 0; i < overlap.length; i++) {
    if (
      (overlap[i][0] <= targetAge[0] && targetAge[0] <= overlap[i][1]) ||
      (overlap[i][0] <= targetAge[1] && targetAge[1] <= overlap[i][1])
    ) {
      return true;
    }
  }
  return false;
}

export function thousandSeparator(num) {
  const addCommas = (num) =>
    num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); //加上千分位
  const removeCommas = (num) => num.replace(/[^0-9.]/g, ""); //移除千分位，變回純數字
  return addCommas(removeCommas(num));
}

function type(num) {
  if (num === 0) {
    return "notInclude";
  } else if (num === 1) {
    return "ExactOne";
  } else {
    return "OverLap";
  }
}
