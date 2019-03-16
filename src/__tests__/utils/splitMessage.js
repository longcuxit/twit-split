import { splitMessage } from '../../utils';

it('splitMessage function length messages and time', () => {
  const longerMsg = Array(50).fill("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.").join(' ');
  const begin = Date.now();
  const msgs = splitMessage(longerMsg);
  expect(Date.now() - begin).toBeLessThan(10)
  expect(msgs.filter(msg => msg.length > 50)).toEqual([]);
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

it('splitMessage function', () => {
  expect(splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."))
    .toEqual(["1/2 I can't believe Tweeter now supports chunking", "2/2 my messages, so I don't have to do it myself."])
});