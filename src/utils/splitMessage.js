import { ErrorHandle } from './ErrorHandle';

const whiteSpace = [
  9, 10, 11, 12, 13, 32, 133, 160,
  5760, 8192, 8193, 8194, 8195, 8196,
  8197, 8198, 8199, 8200, 8201, 8202,
  8232, 8233, 8239, 8287, 12288 ].map(num => String.fromCharCode(num));

function findIndex(msg) {
  for (let i = 50; i > -1; i--) {
    if (whiteSpace.includes(msg[i])) return i;
  }
  return -1;
}

function split(msg) {
  msg = msg.trim();
  if (msg.length < 1) {
    throw new ErrorHandle('msg.required', 'Message is required!');
  }
  if (msg.length < 51) {
    return [msg];
  }
  const index = findIndex(msg);
  if (index < 1) {
    throw new ErrorHandle('msg.wordsLonger', 'Words longer than 50 characters!');
  }
  return [msg.slice(0, index)]
    .concat(split(msg.slice(index + 1)));
}

export function splitMessage(msg) {
  const msgs = split(msg);
  if (msgs.length === 1) return msgs;
  return msgs.map((msg, index) => `${index + 1}/${msgs.length} ${msg}`);
}
splitMessage.calculate = split;