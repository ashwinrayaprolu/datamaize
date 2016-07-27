# datamaize
A modular component layer for all modern web applications which includes below components

##Notable Features
 - Includes support for modern grids
 - Includes support for Charts/Graphs
 - Includes support for Tree Menu
 - Includes support for file browser
 - Includes support for Portlets
 - Includes support for reconciliation


##Requirements
jQuery 1.9.3+

##Browser support
IE9+, Modern Browsers

##Quick Start
1.  Download **jQuery 1.8.3+** and **jqfactory**, create your plugin file, and include them all as `script` tags on an HTML page
    ```html
<link rel="stylesheet" href="assets/jquery-ui-1.10.4.custom/css/smoothness/jquery-ui-1.10.4.custom.min.css"></link>
<script type="text/javascript" src="assets/jquery/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="assets/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>

<script src="assets/handsontable-0.26.0/dist/handsontable.full.js"></script>
<link type="text/css" rel="stylesheet" href="assets/handsontable-0.26.0/dist/handsontable.full.css"></link>
<script src="../dist/js/datamaize.min.js"></script>

    ```

##Example Usage

 - Using Handsontable Plugin

 __Live Grid support?__

 - With the handsontable plugin Live Scrolling is supported by default


 ```javascript
   
 $(document).ready(function () {
                $.datamaize.plugins.handsontable.init("example1", {
                    dataSource: function (offSet, pageNumber, rowsPerPage, numberOfRowsToLoad) {
                        return  $.ajax({
                            url: "/data",
                            method: "POST",
                            data: {numberOfRowsToLoad: numberOfRowsToLoad, offSet: offSet},
                            dataType: "json",
                            success: function (response) {
                            },
                            error: function (response) {
                                console.log("Error")
                            }
                        });


                    },
                    rowHeaders: true,
                    colHeaders: true
                });

            });
 
    ```

 - Example is located in example folder
 - run npm install
 - run bower install
 - run node app.js
 - Open browser http://localhost:4730/example/hot-wrapper.html

##Contributors
 [Ashwin Rayaprolu](https://github.com/ashwinrayaprolu1984)

##License
 Copyright (c) 2012 Ashwin Rayaprolu Licensed under the MIT license.