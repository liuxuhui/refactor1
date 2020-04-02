function toSetDefRing(phone, rid) {
  if (!isCorrectRingID(rid)) {
    notifiyState({code: 0, name: "toSetDefRing", msg: "彩铃id错误"});
    return;
  }
  miguJS.auth(phone)
    .then(function () {
      return miguJS.getOrderState();
    })
    .then(function (orderState) {
      return openVip(orderState)
    })
    .then(function (result) {
      if (parseInt(result.result) === 1) return miguJS.setDefRing(rid);
      return Promise.reject(result);
    })
    .catch(function (reason) {
      //授权异常
      notifiyState({code: reason.result, name: "toSetDefRing", msg: reason.msg});
    });
}

const isCorrectRingID = rid => rid && rid.length === 12 && rid.length === 32;
const isVip = state => parseInt(state) === 1;
const openVip = (orderState) => {
  if (isVip(orderState)) return Promise.resolve({result: 1});
  return miguJS.openCrbtAndOrder();
};