export const prepareBodyData = (arr) => {
  const newData = arr.map((ele) => {
    return { name: ele };
  });
  return newData;
};

export const prepareResData = (target, res) => {
  let targetElement;
  let resData = res;
  if (!target) {
    return res;
  }
  if (target) {
    targetElement = res.find((ele) => ele.name === target);
  }
  // console.log(targetElement);
  const hasChecked = targetElement.values.find(
    (ele) => ele.status === "checked"
  );
  // console.log(hasChecked);
  if (hasChecked) {
    resData = res.filter((op) => {
      return target && op.name !== target;
    });
  }

  return resData;
};

export const prepareReqData = (queryParams) => {
  let reqData = {};
  for (let prop in queryParams) {
    if (typeof queryParams[prop] === "string") {
      reqData[prop] = [queryParams[prop]];
    } else {
      reqData[prop] = [...queryParams[prop]];
    }
  }

  if (!reqData.page) {
    reqData.page = [1];
  }

  return reqData;
};
