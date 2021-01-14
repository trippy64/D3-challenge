// @TODO: YOUR CODE HERE!


const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;




const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40); // extra padding for third label

// Append an SVG group
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var ourXAxis = "poverty";
var ourYAxis = "healthcare";


(async function(){

  // Import Data
  const stateData = await d3.csv("D3_data_journalism/data/data.csv");

  // Parse Data/Cast as numbers
  stateData.forEach(function(data) {
    data.poverty    = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age        = +data.age;
    data.smokes     = +data.smokes;
    data.obesity    = +data.obesity;
    data.income     = +data.income;
  });

 
 // xLinearScale function above csv import
 var xLinearScale = xScale(hairData, chosenXAxis);

 // Create y scale function
 var yLinearScale = d3.scaleLinear()
   .domain([0, d3.max(poverty, d => d.num_hits)])
   .range([height, 0]);

 // Create initial axis functions
 var bottomAxis = d3.axisBottom(xLinearScale);
 var leftAxis = d3.axisLeft(yLinearScale);

 // append x axis
 var xAxis = chartGroup.append("g")
   .classed("x-axis", true)
   .attr("transform", `translate(0, ${height})`)
   .call(bottomAxis);

 // append y axis
 chartGroup.append("g")
   .call(leftAxis);

 // append initial circles
 var circlesGroup = chartGroup.selectAll("circle")
   .data(obesity)
   .enter()
   .append("circle")
   .attr("cx", d => xLinearScale(d[chosenXAxis]))
   .attr("cy", d => yLinearScale(d.income))
   .attr("r", 20)
   .attr("fill", "pink")
   .attr("opacity", ".5");

 // Create group for two x-axis labels
 var labelsGroup = chartGroup.append("g")
   .attr("transform", `translate(${width / 2}, ${height + 20})`);

 var incomeAxis = labelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 20)
   .attr("value", "income") // value to grab for event listener
   .classed("active", true)
   .text("Househld income");

 var AgeAxis = labelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 40)
   .attr("value", "age") // value to grab for event listener
   .classed("inactive", true)
   .text("Age (Median)");

 // append y axis
 chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .classed("axis-text", true)
   .text("Lacks Healthcare");

 // updateToolTip function above csv import
 var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

 // x axis labels event listener
 labelsGroup.selectAll("text")
   .on("click", function() {
     // get value of selection
     var value = d3.select(this).attr("value");
     if (value !== chosenXAxis) {

       // replaces chosenXAxis with value
       chosenXAxis = value;

       // console.log(chosenXAxis)

       // functions here found above csv import
       // updates x scale for new data
       xLinearScale = xScale(income, chosenXAxis);

       // updates x axis with transition
       xAxis = renderAxes(xLinearScale, xAxis);

       // updates circles with new x values
       circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

       // updates tooltips with new info
       circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

       // changes classes to change bold text
       if (chosenXAxis === "smokes") {
         Smokes
           .classed("active", true)
           .classed("inactive", false);
         householdIncome
           .classed("active", false)
           .classed("inactive", true);
       }
       else {
         obese
           .classed("active", false)
           .classed("inactive", true);
         Obese
           .classed("active", true)
           .classed("inactive", false);
       }
     }
   });
}).catch(function(error) {
 console.log(error);
});
