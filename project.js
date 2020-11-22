var graphPromise = d3.csv("ProjectDataBoth.csv");


var getGraphData = function(graph)
{
    return Year(Total_Mean);
}


var successFCN = function(graph){ console.log("Success", graph);
                                  getGraph(graph);
                    
                                  }

var failFCN = function(errMessage)
{console.log("fail",errMessage);}

graphPromise.then(successFCN, failFCN);

var getGraph = function(data)
{
    var screen = {width:500, height:500};
    
    var margins = {top:15, bottom:40, left:70, right :40};
    
    var graph = { 
    width: screen.width-margins.left-margins.right,
        height: screen.height-margins.top-margins.bottom,
    };
    
    
    var g = d3.select("#graph")
    .append("g")
    .classed("canvas",true)
    .attr("transform","translate("+margins.left+","+  margins.top+")");
    
       var getYear = function(row)
    {return row.Year} 
       
    var maxYear  = d3.max(data.map(getYear));
    console.log (maxYear);
    
    var minYear = d3.min(data.map(getYear));
    console.log(minYear);
    
    var xScale = d3.scaleLinear()
    .domain([minYear,maxYear])
    .range([0, graph.width])
 
    var getYear = function(row)
    {return row.Year} 
    
    var getTotal_Mean = function(row){
        return parseInt (row.Total_Mean)
    }
    
      var maxTotal  = d3.max(data.map(getTotal_Mean));
    console.log (maxTotal);
    
    var minTotal = d3.min(data.map(getTotal_Mean));
    console.log(minTotal);
    
    var yScale = d3.scaleLinear()
    .domain([minTotal,maxTotal])
    .range([graph.height,0])
    
   createLines(data,graph,xScale,yScale) 
    createAxes(screen,margins,graph,xScale,yScale)
    createLabels(screen,margins,graph)
    Createlegends(screen,margins,graph,data)
    
}
    
    var createLabels = function(screen,margins,graph)
    
    {
        var labels = d3.select("#graph")
        .append("g")
        .classed("labels",true)
        
        labels.append("text")
        .text("Mean Earnings of Both Men and Women (1975-2018)")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
        
        
        labels.append("text")
        .text("Year")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
        
        
        labels.append("g")
        .attr("transform","translate(20,"+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Total Mean")
        .classed("label", true)
        .attr("text-anchor","middle")
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
        
    }
   
   var createAxes = function(screen,margins,graph,xScale,yScale)
   
    { 
        
   var xAxis = d3.axisBottom(xScale);
   var yAxis = d3.axisLeft(yScale);
    
   var axes = d3.select("#graph")
   .append("g")
   axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
        
        axes.append("g")
            .attr("transform","translate("+margins.left+","+(margins.top)+")")
            .call(yAxis)
    }
    
    
    var createLines = function(data,graph,xScale,yScale){
        
        var makeLines = d3.line()
        .x(function(Values)
           {return xScale(Values.Year);})
        
        .y(function(Values)
           {return yScale(Values.Total_Mean);});  
        

     d3.select(".canvas")
     .append("path")
        .datum(data)
       .attr("class","line")
        .attr("d",makeLines)
       ;

        
    var maleLines = d3.line()
    .x(function(Values)
      {return xScale(Values.Year);})
    .y(function(Values)
       { return yScale(Values.MeanofMean);})
    
     d3.select(".canvas")
     .append("path")
        .datum(data)
       .attr("class","mline")
        .attr("d",maleLines)

        ;
        
    var femaleLines = d3.line()
    .x(function(Values)
      {return xScale(Values.Year);})
    .y(function(Values)
       { return yScale(Values.MeanofWomen);})
    
     d3.select(".canvas")
     .append("path")
        .datum(data)
       .attr("class","lineColor")
        .attr("d",femaleLines)
        ;
    }
    
    
    var Createlegends = function(screen,margins,graph,data)
    { 
    
        var legend = d3.select(".canvas")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+(margins.left+10)+"'"+(margins.top+10)+")");
        
   var key = legend.selectAll("g")
   .data(["female","male","both"])
   .enter()
   .append("g")
   .classed("legendkey",true)
   .attr("fill",function(data){
       return 
   }
        
        )
 
    
    }
    
    