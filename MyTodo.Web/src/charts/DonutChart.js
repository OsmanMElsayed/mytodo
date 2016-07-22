//http://tributary.io/inlet/6007c4a5b2c09aaec266c6354019c042

var d3 = require('d3');

function DonutChart(containerSelector) {

    var container = d3.select(containerSelector);

    var containerWidth = document.querySelector(containerSelector)
        .offsetWidth;
    var chart_m = containerWidth / 2 * 0.14;
    var chart_r = containerWidth / 2 * 0.85;

    var drawCenterCircle = function (pie) {

        var eventObj = {
            mouseover: function (d, i) {
                d3.select(this)
                    .transition()
                    .attr("r", chart_r * 0.65);
            },

            mouseout: function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr("r", chart_r * 0.6);
            },

            click: function (d, i) {
                var paths = container.selectAll('.clicked');
                contract(paths);
                paths.classed('clicked', false);
                resetAllCenterText();
            }
        }

        var donut = container.select('.donut');

        // The circle displaying total data.
        donut.append("circle")
            .attr("r", chart_r * 0.6)
            .style("fill", "#E7E7E7")
			.on(eventObj);

        donut.append('text')
                .attr('class', 'center-txt category-name')
                .attr('y', chart_r * -0.16)
                .attr('text-anchor', 'middle')
                .style('font-weight', 'bold');

        donut.append('text')
                .attr('class', 'center-txt value')
                .attr('text-anchor', 'middle');

        donut.append('text')
                    .attr('class', 'center-txt percentage')
                    .attr('y', chart_r * 0.16)
                    .attr('text-anchor', 'middle')
                    .style('fill', '#A2A2A2');
    }

    var setCenterText = function () {

        var sum = d3.sum(container.selectAll('.clicked').data(), function (d) {
            return d.data.value;
        });


        container.select('.value')
            .text(function (d) {
                return sum ? sum + d.unit
                            : d.total + d.unit;
            });
        container.select('.percentage')
            .text(function (d) {
                return sum ? (sum / d.total * 100).toFixed(2) + '%'
                            : '';
            });
    }

    var resetAllCenterText = function () {
        container.select('.category-name')
                .text('');
        container.select('.value')
            .text(function (d) {
                return d.total + d.unit;
            });
        container.select('.percentage')
                .text('');

    }

    var expand = function (path) {
        path.transition()
			.attr('d', d3.svg.arc()
				.innerRadius(chart_r * 0.7)
				.outerRadius(chart_r * 1.08)
            );
    }

    var contract = function (path, dir) {
        path.transition()
			.duration(500)
			.ease('bounce')
			.attr('d', d3.svg.arc()
                  .innerRadius(chart_r * 0.7)
                  .outerRadius(chart_r)
            );
    }

    var drawDonut = function () {

        var eventObj = {

            mouseover: function (d) {
                expand(d3.select(this));

                container.select('.category-name').text(function () {
                    return d.data.category.name;
                });
                container.select('.value').text(function (data) {
                    return d.data.value + data.unit;
                });
                container.select('.percentage').text(function (data) {
                    return (d.data.value / data.total * 100).toFixed(2) + '%';
                });
            },

            mouseout: function () {
                var thisPath = d3.select(this);
                var categoryName = container.select('.category-name');
                if (!thisPath.classed('clicked')) {
                    contract(thisPath, 0);
                    categoryName.text('');
                }
                else {
                    if (container.selectAll('.clicked')[0].length > 1) {
                        categoryName.text('');
                    }
                }

                setCenterText();
            },

            click: function () {

                var thisPath = d3.select(this);
                var clicked = thisPath.classed('clicked');
                thisPath.classed('clicked', !clicked);

                if (clicked) {
                    contract(thisPath);
                }
                else {
                    expand(thisPath);
                }

                setCenterText();
            }
        };




        var pie = d3.layout.pie()
                        .sort(null)
                        .value(function (d) {
                            return d.value;
                        });

        var arc = d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(function () {
                            return (d3.select(this).classed('clicked')) ? chart_r * 1.08
                                                                       : chart_r;
                        });

        // Start joining data with paths
        var paths = container.select('.donut')
                        .selectAll('path')
                        .data(function (d, i) {
                            return pie(d.data);
                        });

        paths.enter()
            .append('path')
            .attr('d', arc)
            .style('fill', function (d) {
                return d.data.category.color;
            })
            .style('stroke', '#FFFFFF')
            .on(eventObj);

        paths.exit().remove();

        resetAllCenterText();
    }

    this.draw = function (data) {

        var svg = container.append('svg')
            .attr('width', containerWidth)
			.attr('height', containerWidth);

        svg.selectAll('.donut')
            .data([data])
            .enter()
            .append('g')
			.attr('class', 'donut')
			.attr('transform', 'translate(' + (chart_r + chart_m) + ',' + (chart_r + chart_m) + ')');


        drawCenterCircle();
        drawDonut();
    }
}

module.exports = DonutChart;