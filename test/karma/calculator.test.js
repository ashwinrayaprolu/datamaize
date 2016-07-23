/* 
 * The MIT License
 *
 * Copyright 2016 ashwinrayaprolu.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('Calculator', function() {

  // API for interacting with the page.
  var controls =  {
    get result() {
      return document.getElementById('result').innerHTML;
    },
    get x() {
      return document.getElementById('x').value;
    },
    set x(val) {
      document.getElementById('x').value = val;
    },
    get y() {
      return document.getElementById('y').value;
    },
    set y(val) {
      document.getElementById('y').value = val;
    },
    clickAdd: function() {
      document.getElementById('add').click();
    }
  };

  // inject the HTML fixture for the tests
  beforeEach(function() {
    // Why this line? See: https://github.com/billtrik/karma-fixture/issues/3
    fixture.base = 'test/karma';
    fixture.load('calculator.fixture.htm');

    // init js lib
    window.calculator.init();
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    fixture.cleanup();
  });

  it('should calculate 3 for 1 + 2', function() {
    controls.x = 1;
    controls.y = 2;
    controls.clickAdd();
    controls.result.should.equal('3');
  });

  it('should calculate zero for invalid x value', function() {
    controls.x = 'hello';
    controls.y = 2;
    controls.clickAdd();
    controls.result.should.equal('0');
  });

  it('should calculate zero for invalid y value', function() {
    controls.x = 1;
    controls.y = 'goodbye';
    controls.clickAdd();
    controls.result.should.equal('0');
  });

});
