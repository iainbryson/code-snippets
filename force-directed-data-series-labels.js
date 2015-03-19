/*
Snippet of an idea I've had several times but never seems to pan out perfectly.

To prevent data series labels for D3.js line charts from overlapping, use force directed layout.  This snippet constrains the x position so that the labels simply float up or down
*/

        var foci = [], labels=[];
        
        series_label_data.forEach(function(d, i) {
            foci.push({x: d.x, y: d.y});
        });

        // Create the force layout with a slightly weak charge
        var force = d3.layout.force()
            .nodes(series_label_data)
            .charge(-20)
            .chargeDistance(7)
            .gravity(0)
            .size([width, height]);

        force.on("tick", function(e) {
            var k = .1 * e.alpha;
            series_label_data.forEach(function(o, j) {
                // The change in the position is proportional to the distance
                // between the label and the corresponding place (foci)
                o.y += (foci[j].y - o.y) * k;
                //o.x += (foci[j].x - o.x) * k;
            });

            // Update the position of the text element
            vis.selectAll(".series-label")
               .call(seriesLabel);
        });

        force.start();

