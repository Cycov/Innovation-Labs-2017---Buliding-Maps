$(document).ready(function() {
    $('#floorplan-container').load('svg/testing/floorplan.svg', function() {
        //Constant values
        $('#floorplan-container').append('<div id="floorplan-catcher"></div>');
        //Waypoints list
        var waypoints = {};

        //Other variables
        var i = 0;
        var awaitSecondPress = false;
        var firstElement;

        //Keep svg inside container
        $('svg').attr('width', '100%')
        $('svg').removeAttr('height');

        //Extract waypoints
        $('ellipse[id^="wp"]').each(function(index) {
            waypoints[$(this).attr('id')] = {};
        });

        //On waypoint clicked
        $('ellipse[id^="wp"]').on('click', function() {
            //Check if waypoint was pressed before
            if (!awaitSecondPress) {
                firstElement = this;
                ChangeColor(this, '#00ff40');
                awaitSecondPress = true;
            } else {
                var dist = 1;
                var id1 = $(firstElement).attr('id');
                var id2 = $(this).attr('id');

                //Add distances between the 2 waypoints
                dist = 1 //prompt("Enter distance","1");
                ChangeColor(firstElement, '#ff0000');

                if (dist != null) {
                    waypoints[id1][id2] = dist;
                    waypoints[id2][id1] = dist;

                    //Draw a line
                    $(document.createElementNS('http://www.w3.org/2000/svg', 'line')).attr({
                        x1: $(firstElement).attr('cx'),
                        y1: $(firstElement).attr('cy'),
                        x2: $(this).attr('cx'),
                        y2: $(this).attr('cy'),
                        style: 'stroke:#1c8dff;stroke-width:0.6;stroke-dasharray:1.32291667,0.66145833;stroke-dashoffset:0'
                    }).appendTo($('svg'));
                }

                //Completed
                awaitSecondPress = false;
            }
        });

        //Listener for click on image wrapper to get pos of cursor
        $('#floorplan-catcher').mousedown(function(e) {
            console.log('x: ' + e.offsetX + ' , y:' + e.offsetY) + '<br/>';
            $(document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')).attr({
                cx: e.offsetX,
                cy: e.offsetY,
                rx: 6,
                ry: 6,
                style: 'fill:yellow;stroke:purple;stroke-width:2'
            }).appendTo($('svg'));
        })

        $('#testBtn').on('click', function() {
            var text = $('#manualPaths').val();
            if (text != '')
                waypoints = JSON.parse(text);
            //Generate a random path from wp1 to wp9

            //Create new instance of Graph.js
            var graph = new Graph(waypoints);
            var shortest = graph.findShortestPath('wp1', 'wp9');

            //Create a list of points to be used in <path> style propriety
            var points = '';
            jQuery.each(shortest, function(id, val) {
                //Each segment requires a extra parameter (https://www.w3schools.com/graphics/svg_path.asp)

                // M = moveto
                // L = lineto
                // H = horizontal lineto
                // V = vertical lineto
                // C = curveto
                // S = smooth curveto
                // Q = quadratic Bézier curve
                // T = smooth quadratic Bézier curveto
                // A = elliptical Arc
                // Z = closepath

                var ch = 'L'; //default a regular line
                if (id == 0) {
                    ch = 'M'; //Startpoint
                }
                if (id == shortest.length) {
                    ch = 'Z'; //End
                }

                //Waypoint contained in the path. cx,cy are center point (x,y)
                var wp = $('#' + val);
                var x = wp.attr('cx');
                var y = wp.attr('cy');
                points += ch + ' ' + x + ' ' + y + ' ';
            });

            //Draw the path
            $(document.createElementNS('http://www.w3.org/2000/svg', 'path')).attr({
                d: points,
                fill: 'none',
                'stroke-width': 1,
                'stroke-linecap': 'round',
                'stroke-opacity': 1,
                stroke: 'red'
            }).appendTo($("svg"));
            $('#debugInfo').append(JSON.stringify(waypoints));
        });

        function CreateSVGElement() {

        }

        /**
         * Change the color of a SVG element extracting from 'style' attribute
         * @param {Object} element - the svg element
         * @param {string} color - the color as hex value
         * @returns {Object} - The modified object
         * */
        function ChangeColor(element, color) {
            //Extract color
            var style = $(element).attr('style').split(';');
            var col = style[0].split(':');
            //Edit and join
            col[1] = color;
            style[0] = col.join(':');
            $(element).attr('style', style.join(';'));
            return element;
        }
    })
});