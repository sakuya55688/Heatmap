//重要：這是將資料輸入script的方式
var data =<%-JSON.stringify(items)%>
console.log(data);


var w = 1000 , h =580 , padding = 40;
var svg = d3.select("#g1").append("svg").attr("width",w).attr("height",h);
var size = 20;
var color = d3.scaleOrdinal()           .range(["FF0000","FF5511","FF8800","FFBB00","FFFF00","BBFF00","77FF00","00FF00","00FF99","00FFCC","0000FF"]);

var rect = svg.selectAll("rect")
    .data(d3.merge(d3.range(0, w + size, size).map(function(x) {
      return d3.range(0, h + size, size).map(function(y) {
        return [x, y];
      });
    })))
    .enter().append("rect")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("width", size)
    .attr("height", size)
    .style("stroke", "white")
    .style("stroke-width", "1px")
    .style("fill", function(d,i){ 
            if(i == 1013 || i== 1007) return "#FF0000";
            /*
            if(i<90) return color(0);
            else if(i<180) return color(1);
            else if(i<270) return color(5);                    
            else if(i<360) return color(10);
            */

        });

var rack1 = svg.append("rect").attr("x", 300).attr("y", 60).attr("width", 180)                           .attr("height", 40).style("fill","white");
var rack2_up = svg.append("rect").attr("x", 580).attr("y", 60).attr("width", 340)                           .attr("height", 40).style("fill","white");
var rack2_down = svg.append("rect").attr("x", 580).attr("y", 120).attr("width", 340)                           .attr("height", 40).style("fill","white");
var rack3_up = svg.append("rect").attr("x", 580).attr("y", 240).attr("width", 340)                           .attr("height", 40).style("fill","white");
var rack3_down = svg.append("rect").attr("x", 580).attr("y", 300).attr("width", 340)                           .attr("height", 40).style("fill","white");
var rack4_up = svg.append("rect").attr("x", 580).attr("y", 410).attr("width", 205)                           .attr("height", 40).style("fill","white");
var rack4_down = svg.append("rect").attr("x", 580).attr("y", 480).attr("width", 205)                           .attr("height", 40).style("fill","white");
var circle = svg.append("circle").attr("cx",908).attr("cy",470).attr("r",57)
                .style("fill","white");



var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.timeParse("%Y-%m-%d %H:%S:%M");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom().scale(x).tickFormat(d3.timeFormat("%Y-%m-%d %H:%S:%M"));
var yAxis = d3.axisLeft().scale(y).ticks(10);

var svg2 = d3.select("#g1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data.forEach(function(d) {
    d.time = parseDate(d.time);
    d.Adam2COM4 = +d.Adam2COM4;
}

