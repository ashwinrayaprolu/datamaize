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


/**
 * Clones / deep copies an object.
 *
 * @param Object obj
 *   Any object.
 *
 * @return Object
 *   obj--cloned.
 */
function clone(obj) {
    if (obj === null || typeof(obj) !== 'object') {
      return obj;
    }

    var temp = new Object();

    for (var key in obj) {
      temp[key] = clone(obj[key]);
    }
    return temp;
}

describe('addOne Exemplary Tests', function() {
  var AddOne;

  /**
   * Instead of requiring add-one in each test--making each test async,
   * require it in beforeEach, clone it, and sneak it into a global
   * so that no test can (permanently) mess with / mutate it.
   */
  beforeEach(function(done) {
    require([
      'add-one'
    ], function(_AddOne) {
      AddOne = clone(_AddOne);
      done();
    });
  });

  it('Should be 2.', function() {
    chai.assert.equal(AddOne.addOne(1), 2);
  });

  it('Should be 42; Sinon stub.', function() {
    // Stub addOne to return 42--no matter what.
    sinon.stub(AddOne, "addOne").returns(42);

    chai.assert.equal(AddOne.addOne(1), 42);

    // Don't forget to restore (not necessary with clone, but good practice).
    AddOne.addOne.restore();
  });

  it('Should be 2 (again); unstubbed.', function() {
    chai.assert.equal(AddOne.addOne(1), 2);
  });
});