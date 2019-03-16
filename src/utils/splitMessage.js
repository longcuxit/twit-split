import { ErrorHandle } from './ErrorHandle';

const LIMIT = parseInt(process.env.REACT_APP_MSG_LIMIT || 50);
const NUM_TEMP = String.fromCharCode(0);
const SPACE_EXP = /\s/;

function lastIndexOf(msg, at) {
  let i = msg.length;
  while(i-- > at) {
    if (SPACE_EXP.test(msg[i])) {
      return i;
    }
  }
  return -1;
}

function calculate(msg, part = 1) {
  const maxCount = Math.pow(10, part) - 1;
  const minCount = Math.pow(10, part - 1);
  let minLength = msg.length + 1 + (part + 1) * minCount ;
  let i = part - 1;
  while(i--) { minLength += (Math.pow(10,i) - Math.pow(10, i-1) - 1) * i; }
  if (minLength/LIMIT > maxCount) return calculate(msg, part + 1);
  let count = 1;
  let p = '/' + Array(part).fill(NUM_TEMP);
  let cloneMsg = msg, result = [];

  while(cloneMsg.length) {
    if (count > maxCount) return calculate(msg, part + 1);
    const nP = count + p + ' ';
    cloneMsg = nP + cloneMsg;
    if (cloneMsg.length < LIMIT) {
      result.push(cloneMsg);
      break;
    } else {
      const sub = cloneMsg.slice(0, LIMIT);
      const length = lastIndexOf(sub, nP.length);
      if (length === -1) {
        throw new ErrorHandle('msg.wordsLonger', 'Words longer than 50 characters!');
      }
      result.push(sub.slice(0, length));
      cloneMsg = cloneMsg.slice(length + 1).trim();
      count++;
    }
  }

  return result.map(msg => msg.replace(p, '/' + result.length));
}

export function splitMessage(msg) {
  msg = msg.trim();
  if (msg.length === 0) {
    throw new ErrorHandle('msg.required', 'Message is required!');
  }
  if (msg.length <= LIMIT) {
    return [msg];
  }
  return calculate(msg);
}