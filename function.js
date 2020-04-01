function toSetDefRing(phone, rid) {
    if (rid.length == 12 || rid.length == 32) {
      miguJS.auth(phone).then(function () {
        miguJS.getOrderState().then(function (orderState) {
          var setDefRing = function () {
            miguJS.setDefRing(rid).then(function (r) {
              notifiyState({code: r.result, name: "toSetDefRing", msg: r.msg});
            }).catch(function (reason) {
              notifiyState({code: reason.result, name: "toSetDefRing", msg: reason.msg});
            })
          }
          if(orderState == 1){
            setDefRing();
          }
          else{
            miguJS.openCrbtAndOrder().then(function (r) {
              if (r.result == 1) {
                setDefRing();
              }
              else {
                //走队列时
                notifiyState({code: r.result, name: "toSetDefRing", msg: r.msg});
              }
            }).catch(function (reason) {
              //开会员异常
              notifiyState({code: reason.result, name: "toSetDefRing", msg: reason.msg});
            })
          }
        }).catch(function (reason) {
          notifiyState({code: reason.result, name: "toSetDefRing", msg: reason.msg});
        })
      }).catch(function (reason) {
        //授权异常
        notifiyState({code: reason.result, name: "toSetDefRing", msg: reason.msg});
      })
    } else {
      notifiyState({code: 0, name: "toSetDefRing", msg: "彩铃id错误"});
    }
  }

