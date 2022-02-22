import { assert, expect } from 'chai';
import createUI from './createUI.js';

let SearchFormView;
const X = TEST_PREFIX;
try {
  SearchFormView = require('../src/views/' + X + 'searchFormView.js').default;
} catch (e) {}

const { render, h } = require('vue');

describe('TW2.3 SearchFormView', function () {
  this.timeout(200000); // increase to allow debugging during the test run

  before(function () {
    if (!SearchFormView) this.skip();
  });

  it('SearchFormView renders required DOM tree with dishTypeOptions props', function () {
    let div = createUI();
    window.React = { createElement: h };
    render(
      <SearchFormView
        dishTypeOptions={['starter', 'main course', 'dessert']}
      />,
      div
    );

    assert.equal(div.querySelectorAll('input').length, 1);
    assert.equal(div.querySelectorAll('select').length, 1);
    assert.equal(
      div.querySelectorAll('input')[0].nextSibling.firstChild.textContent,
      'Choose:'
    );
    assert.equal(div.querySelectorAll('option').length, 4);
    assert.equal(
      div.querySelectorAll('option')[0].firstChild.textContent,
      'Choose:'
    );
    assert.equal(
      div.querySelectorAll('option')[1].firstChild.textContent,
      'starter'
    );
    assert.equal(
      div.querySelectorAll('option')[2].firstChild.textContent,
      'main course'
    );
    assert.equal(
      div.querySelectorAll('option')[3].firstChild.textContent,
      'dessert'
    );
    expect(div.querySelectorAll('button').length).to.be.gte(1, "there should be at least one button"); 
    assert.equal(
      div.querySelectorAll('button')[0].firstChild.textContent,
      'Search!'
    );
  });
});
