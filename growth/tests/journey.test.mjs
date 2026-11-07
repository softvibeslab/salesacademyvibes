import assert from 'node:assert/strict';
import test from 'node:test';
import {journeyState} from '../site/assets/journey-math.mjs';

const chapters = ['start', 'method', 'practice', 'coaching', 'scale'].map((id, index) => ({id, top: 100 + index * 1000, height: 1000}));

test('before the journey remains at the first frame', () => {
  assert.deepEqual(journeyState(-800, 800, chapters), {index: 0, id: 'start', progress: 0, chapterProgress: 0});
});
test('the viewport reading line selects the chapter and its continuous progress', () => {
  const state = journeyState(2200, 800, chapters);
  assert.deepEqual(state, {index: 2, id: 'practice', progress: 0.5, chapterProgress: 0.5});
});
test('chapter boundaries select the next scene without overshoot', () => {
  assert.equal(journeyState(700, 800, chapters).id, 'method');
  assert.equal(journeyState(700, 800, chapters).chapterProgress, 0);
  assert.equal(journeyState(699, 800, chapters).id, 'start');
});
test('scrolling backwards recovers the same state', () => {
  const forward = journeyState(1700, 800, chapters);
  journeyState(4300, 800, chapters);
  assert.deepEqual(journeyState(1700, 800, chapters), forward);
  assert.equal(forward.id, 'practice');
});
test('after the last chapter clamps every value', () => {
  assert.deepEqual(journeyState(100000, 800, chapters), {index: 4, id: 'scale', progress: 1, chapterProgress: 1});
});
test('unequal chapter sizes use measured geometry', () => {
  const uneven = [{id:'a',top:0,height:600},{id:'b',top:600,height:1400}];
  assert.deepEqual(journeyState(600,800,uneven), {index:1,id:'b',progress:0.5,chapterProgress:400/1400});
});
test('empty or invalid geometry does not produce NaN or unsafe state', () => {
  for (const list of [[], [{id:'bad',top:NaN,height:0}]]) {
    assert.deepEqual(journeyState(0,0,list), {index:0,id:'',progress:0,chapterProgress:0});
  }
  assert.deepEqual(journeyState(NaN, 800, chapters), {index:0,id:'start',progress:0,chapterProgress:0});
});
