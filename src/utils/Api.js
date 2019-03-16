
export const Api = {
  getMsgs(){
    return new Promise(next => {
      setTimeout(() => next(['test msg']),500);
    });
  },

  putMsg(msg) {
    return new Promise(next => {
      setTimeout(() => next('formated: ' + msg),500)
    });
  }
}