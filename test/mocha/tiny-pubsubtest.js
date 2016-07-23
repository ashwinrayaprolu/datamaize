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
(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/
    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery Tiny Pub/Sub', {
    setup: function() {
      var result = this.result = [];
      this.createHandler = function(id) {
        return function() {
          result.push([id].concat([].slice.call(arguments, 1)));
        };
      };
    }
  });

  test('order', function() {
    $.subscribe('order', this.createHandler('order1'));
    $.subscribe('order', this.createHandler('order2'));
    $.subscribe('order.xyz', this.createHandler('order3'));
    $.subscribe('order.abc', this.createHandler('order4'));
    $.publish('order');
    deepEqual(this.result, [
      ['order1'],
      ['order2'],
      ['order3'],
      ['order4']
    ], 'handlers should fire in the order in which they were bound.');
  });

  test('arguments', function() {
    $.subscribe('arguments', this.createHandler('arguments1'));
    $.subscribe('arguments.xyz', this.createHandler('arguments2'));
    $.subscribe('arguments.abc', this.createHandler('arguments3'));
    $.publish('arguments', [null, 'test 1 2 3', undefined, 9]);
    deepEqual(this.result, [
      ['arguments1', null, 'test 1 2 3', undefined, 9],
      ['arguments2', null, 'test 1 2 3', undefined, 9],
      ['arguments3', null, 'test 1 2 3', undefined, 9]
    ], 'handlers should receive all passed arguments.');
  });

  test('namespaces', function() {
    $.subscribe('namespaces', this.createHandler('namespaces1'));
    $.subscribe('namespaces.xyz', this.createHandler('namespaces2'));
    $.subscribe('namespaces.abc', this.createHandler('namespaces3'));
    $.publish('namespaces.xyz', [8, 9]);
    deepEqual(this.result, [
      ['namespaces2', 8, 9]
    ], 'publishing should support jquery event namespaces.');
  });

  test('unsubscribe', function() {
    $.subscribe('unsubscribe', this.createHandler('unsubscribe1'));
    $.subscribe('unsubscribe.xyz', this.createHandler('unsubscribe2'));
    $.subscribe('unsubscribe.abc', this.createHandler('unsubscribe3'));
    $.unsubscribe('unsubscribe.xyz');
    $.publish('unsubscribe', [8, 9]);
    deepEqual(this.result, [
      ['unsubscribe1', 8, 9],
      ['unsubscribe3', 8, 9]
    ], 'unsubscribing should work.');
  });

}(jQuery));

