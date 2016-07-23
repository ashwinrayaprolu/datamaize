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

// http://www.phantomjs.org/

var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

console.log('[phantomjs] Loading page...');

page.open('http://blog.founddrama.net/', function(status){
  if (status !== 'success') {
    console.log('could not retrieve!');
  } else {
    page.evaluate(function(){
      console.log('[phantomjs] Querying for post titles...');
      var list = Array.prototype.slice.call(document.querySelectorAll('h2 > a[rel="bookmark"]'), 0);
      console.log('[phantomjs] ' + list.length + ' post titles:');
      list.forEach(function(el){
        console.log('  ' + el.innerHTML.replace(/<.*?>/g, ''));
      });
    });
  }
  phantom.exit();
});
