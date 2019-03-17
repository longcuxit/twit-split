import { splitMessage } from '../../utils';
const LIMIT = parseInt(process.env.REACT_APP_MSG_LIMIT) || 50;
const BIG_CHARS = parseInt(process.env.TEST_MSG_BIG_CHARS) || 500;
const BIG_CHARS_TIME = parseInt(process.env.TEST_MSG_BIG_CHARS_TIME) || 3;

const bigMsg = (function makeid(length) {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.;'!@#@$%^&*()_+=`~|";
  const range = (from, to) => (Math.random() * (to - from) + from);
  const word = () => {
    let text = '', i = ~~range(1,6);
    while(i--) {
      text += possible.charAt(~~range(0,possible.length-1))
    }
    return text;
  }

  let text = '';
  while(text.length < BIG_CHARS) text += word() + ' ';
  return text;
})();

it('splitMessage function time performance', () => {
  const begin = Date.now();
  splitMessage(bigMsg);
  expect(Date.now() - begin).toBeLessThan(BIG_CHARS_TIME)
})

it('splitMessage function check length big message', () => {
  const bigMsgs = splitMessage(bigMsg);
  expect(bigMsgs.filter(msg => msg.length > LIMIT)).toEqual([]);
})

it('splitMessage function throw error empty', () => {
  try {
    splitMessage('')
  } catch (e) {
    expect(e.name).toEqual('msg.required');
  }
})

it('splitMessage function throw error words longer', () => {
  try {
    splitMessage('IcantbelieveTweeternowsupportschunkingmymessagessoI');
  } catch (e) {
    expect(e.name).toEqual('msg.wordsLonger');
  }
})

it('splitMessage function fixed message', () => {
  expect(splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."))
    .toEqual(["1/2 I can't believe Tweeter now supports chunking", "2/2 my messages, so I don't have to do it myself."])
});

it('splitMessage function try test custom message', () => {
  splitMessage(process.env.TEST_MSG_CUSTOM);
})