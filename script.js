//Set width and height of scatter svg as vis div element
var width = document.getElementById('vis')
    .clientWidth;
var height = document.getElementById('vis')
    .clientHeight;

//set max of x and y axis using max vales derived in excel
var max_x = 240;
var max_y = 100;

//set scatter margins
var margin = {
    top: 40,
    left: 30,
    right: 60,
    bottom: 60,
};

//set up scatter svg
var svg = d3.select("#vis")
    .append("svg")
        .attr('width', width)
        .attr('height', height)
    .append("g")
        .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;


var xscale = d3.scaleLinear()
                .domain([0, max_x])
                .range([margin.left, width]);

var yscale = d3.scaleLinear()
                .domain([0, max_y])
                .range([height, 0]);


var xaxis = d3.axisBottom(xscale);

var yaxis = d3.axisLeft(yscale);

svg.append('g')
    .attr('transform', 'translate(0, ' + (height) + ')')
    .attr("stroke-width",4)
    .attr('class', 'x axis');

svg.append('g')
    .attr('transform', 'translate('+ margin.left + ', 0)')
    .attr("stroke-width",4)
    .attr('class', 'y axis');

var t = d3.transition()
        .duration(500)
        .ease(d3.easeQuadOut);



//get scale for radius depending on capacities

var rscale = d3.scaleLinear()
                .domain([0, 100000])
                .range([0, 20]);

//});
//add x axis and axis title
svg.select('.x.axis')
        .transition(t)
        .call(xaxis);

svg.append("text")      // text label for the x axis
        .attr("class","text")
        .attr("x", width/2 )
        .attr("y",  height + (margin.bottom*3/4))
        .attr("font-weight","bold")
        .style("text-anchor", "middle")
        .style("fill","black")
        .text("Wage Bill - (£ Mill)");

//add y axis and axis title
svg.select('.y.axis')
        .transition(t)
        .call(yaxis);

//
svg.append("text")
        .attr("class","text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .attr("font-weight","bold")
        .style("text-anchor", "middle")
        .text("Points");

svg.append("text")
        .attr("class","title")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle") 
        .attr("font-weight","bold")
        .style("font-size", "18px")
        .style("fill", "black")
        .text("Premier League: Wage Bill vs Points");


//set up clubinfo div
var clubinfo = d3.select("#vis").append("div")
    .attr("class", "clubinfo")
    .style("opacity", 0)    ;




function drawscatter(scatterseason) {


    //start animation with points transitioning on to vis - Remove all points.
    svg.selectAll("text.season_label").remove();
    svg.selectAll("text.regressiontext").remove();
    if (scatterseason === "All seasons") {
        svg.selectAll(".regression_line").remove();};

    if (scatterseason === "2000") {seasondata = "2000/2001";}
    else if (scatterseason === "2001") {seasondata = "2001/2002";}
    else if (scatterseason === "2002") {seasondata = "2002/2003";}
    else if (scatterseason === "2003") {seasondata = "2003/2004";}
    else if (scatterseason === "2004") {seasondata = "2004/2005";}
    else if (scatterseason === "2005") {seasondata = "2005/2006";}
    else if (scatterseason === "2006") {seasondata = "2006/2007";}
    else if (scatterseason === "2007") {seasondata = "2007/2008";}
    else if (scatterseason === "2008") {seasondata = "2008/2009";}
    else if (scatterseason === "2009") {seasondata = "2009/2010";}
    else if (scatterseason === "2010") {seasondata = "2010/2011";} 
    else if (scatterseason === "2011") {seasondata = "2011/2012";}
    else if (scatterseason === "2012") {seasondata = "2012/2013";}
    else if (scatterseason === "2013") {seasondata = "2013/2014";}
    else if (scatterseason === "2014") {seasondata = "2014/2015";}
    else if (scatterseason === "2015") {seasondata = "2015/2016";}



 d3.csv("pldata.csv", function(d) {
  if (scatterseason === "All seasons") 
    {return {
    UniqueID : d.UniqueID,
    Year : d.Year,
    Club : d.Club,
    Season_Wage_Bill : +d.Season_Wage_Bill,
    Points_Gained : +d["Points Gained"],
    Finalpos : d.Final_standing,
    color1 : d.color1,
    color2 : d.color2,
    Club_short : d.Club_short,
    Home_games : +d.Home_games,
    Home_goals : +d.Home_goals,
    Home_goals_average : +d.Home_goals_average,
    Home_goals_conceded : +d.Home_goals_conceded,
    Home_goals_conceded_average : +d.Home_goals_conceded_average,
    Home_wins : +d.Home_wins,
    Home_draws : +d.Home_draws,
    Home_losses : +d.Home_losses,
    Home_games_refereed_by_Mike_Dean : +d.Home_games_refereed_by_Mike_Dean,
    Home_shots : +d.Home_shots,
    Home_shots_average : +d.Home_shots_average,
    Home_shots_conceded : +d.Home_shots_conceded,
    Home_shots_conceded_average : +d.Home_shots_conceded_average,
    Home_shots_on_target : +d.Home_shots_on_target,
    Home_shots_on_target_average : +d.Home_shots_on_target_average,
    Home_shots_conceded_on_target : +d.Home_shots_conceded_on_target,
    Home_shots_conceded_on_target_average : +d.Home_shots_conceded_on_target_average,
    Home_corners : +d.Home_corners,
    Home_corners_average : +d.Home_corners_average,
    Home_corners_conceded : +d.Home_corners_conceded,
    Home_corners_conceded_average : +d.Home_corners_conceded_average,
    Home_fouls : +d.Home_fouls,
    Home_fouls_average : +d.Home_fouls_average,
    Home_fouls_against : +d.Home_fouls_against,
    Home_fouls_against_average : +d.Home_fouls_against_average,
    Home_yellows : +d.Home_yellows,
    Home_yellows_average : +d.Home_yellows_average,
    Home_yellows_against : +d.Home_yellows_against,
    Home_yellows_against_average : +d.Home_yellows_against_average,
    Home_reds : +d.Home_reds,
    Home_reds_average : +d.Home_reds_average,
    Home_reds_against : +d.Home_reds_against,
    Home_reds_against_average : +d.Home_reds_against_average,
    Home_booking_points : +d.Home_booking_points,
    Home_booking_points_average : +d.Home_booking_points_average,
    Home_booking_points_against : +d.Home_booking_points_against,
    Home_booking_points_against_average : +d.Home_booking_points_against_average,
    Home_shots_on_target_percentage : +d.Home_shots_on_target_percentage,
    Away_games : +d.Away_games,
    Away_goals : +d.Away_goals,
    Away_goals_average : +d.Away_goals_average,
    Away_goals_conceded : +d.Away_goals_conceded,
    Away_goals_conceded_average : +d.Away_goals_conceded_average,
    Away_wins : +d.Away_wins,
    Away_draws : +d.Away_draws,
    Away_losses : +d.Away_losses,
    Away_games_refereed_by_Mike_Dean : +d.Away_games_refereed_by_Mike_Dean,
    Away_shots : +d.Away_shots,
    Away_shots_average : +d.Away_shots_average,
    Away_shots_conceded : +d.Away_shots_conceded,
    Away_shots_conceded_average : +d.Away_shots_conceded_average,
    Away_shots_on_target : +d.Away_shots_on_target,
    Away_shots_on_target_average : +d.Away_shots_on_target_average,
    Away_shots_conceded_on_target : +d.Away_shots_conceded_on_target,
    Away_shots_conceded_on_target_average : +d.Away_shots_conceded_on_target_average,
    Away_corners : +d.Away_corners,
    Away_corners_average : +d.Away_corners_average,
    Away_corners_conceded : +d.Away_corners_conceded,
    Away_corners_conceded_average : +d.Away_corners_conceded_average,
    Away_fouls : +d.Away_fouls,
    Away_fouls_average : +d.Away_fouls_average,
    Away_fouls_against : +d.Away_fouls_against,
    Away_fouls_against_average : +d.Away_fouls_against_average,
    Away_yellows : +d.Away_yellows,
    Away_yellows_average : +d.Away_yellows_average,
    Away_yellows_against : +d.Away_yellows_against,
    Away_yellows_against_average : +d.Away_yellows_against_average,
    Away_reds : +d.Away_reds,
    Away_reds_average : +d.Away_reds_average,
    Away_reds_against : +d.Away_reds_against,
    Away_reds_against_average : +d.Away_reds_against_average,
    Away_booking_points : +d.Away_booking_points,
    Away_booking_points_average : +d.Away_booking_points_average,
    Away_booking_points_against : +d.Away_booking_points_against,
    Away_booking_points_against_average : +d.Away_booking_points_against_average,
    Away_shots_on_target_percentage : +d.Away_shots_on_target_percentage,
    Games : +d.Games,
    Goals : +d.Goals,
    Goals_conceded : +d.Goals_conceded,
    Wins : +d.Wins,
    Draws : +d.Draws,
    Losses : +d.Losses,
    Games_refereed_by_Mike_Dean : +d.Games_refereed_by_Mike_Dean,
    Shots : +d.Shots,
    Shots_conceded : +d.Shots_conceded,
    Shots_on_target : +d.Shots_on_target,
    Shots_conceded_on_target : +d.Shots_conceded_on_target,
    Corners : +d.Corners,
    Corners_conceded : +d.Corners_conceded,
    Fouls : +d.Fouls,
    Fouls_against : +d.Fouls_against,
    Yellows : +d.Yellows,
    Yellows_against : +d.Yellows_against,
    Reds : +d.Reds,
    Reds_against : +d.Reds_against,
    Booking_points : +d.Booking_points,
    Booking_points_against : +d.Booking_points_against,
    Goals_average : +d.Goals_average,
    Goals_conceded_average : +d.Goals_conceded_average,
    Shots_average : +d.Shots_average,
    Shots_conceded_average : +d.Shots_conceded_average,
    Shots_on_target_average : +d.Shots_on_target_average,
    Shots_conceded_on_target_average : +d.Shots_conceded_on_target_average,
    Corners_average : +d.Corners_average,
    Corners_conceded_average : +d.Corners_conceded_average,
    Fouls_average : +d.Fouls_average,
    Fouls_against_average : +d.Fouls_against_average,
    Yellows_average : +d.Yellows_average,
    Yellows_against_average : +d.Yellows_against_average,
    Reds_average : +d.Reds_average,
    Reds_against_average : +d.Reds_against_average,
    Booking_points_average : +d.Booking_points_average,
    Booking_points_against_average : +d.Booking_points_against_average,
    Shots_on_target_percentage : +d.Shots_on_target_percentage

  };}
  else {
    if (d.Year === seasondata) {return {
    Year : d.Year,
    Club : d.Club,
    Season_Wage_Bill : +d.Season_Wage_Bill,
    Points_Gained : +d["Points Gained"],
    Finalpos : d.Final_standing,
    Intercept : +d.Intercept,
    Coefficient : +d.Coefficient,
    color1 : d.color1,
    color2 : d.color2,
    style : d.style,
    corr : +d.corr,
    Club_short : d.Club_short,
    Home_games : +d.Home_games,
    Home_goals : +d.Home_goals,
    Home_goals_average : +d.Home_goals_average,
    Home_goals_conceded : +d.Home_goals_conceded,
    Home_goals_conceded_average : +d.Home_goals_conceded_average,
    Home_wins : +d.Home_wins,
    Home_draws : +d.Home_draws,
    Home_losses : +d.Home_losses,
    Home_games_refereed_by_Mike_Dean : +d.Home_games_refereed_by_Mike_Dean,
    Home_shots : +d.Home_shots,
    Home_shots_average : +d.Home_shots_average,
    Home_shots_conceded : +d.Home_shots_conceded,
    Home_shots_conceded_average : +d.Home_shots_conceded_average,
    Home_shots_on_target : +d.Home_shots_on_target,
    Home_shots_on_target_average : +d.Home_shots_on_target_average,
    Home_shots_conceded_on_target : +d.Home_shots_conceded_on_target,
    Home_shots_conceded_on_target_average : +d.Home_shots_conceded_on_target_average,
    Home_corners : +d.Home_corners,
    Home_corners_average : +d.Home_corners_average,
    Home_corners_conceded : +d.Home_corners_conceded,
    Home_corners_conceded_average : +d.Home_corners_conceded_average,
    Home_fouls : +d.Home_fouls,
    Home_fouls_average : +d.Home_fouls_average,
    Home_fouls_against : +d.Home_fouls_against,
    Home_fouls_against_average : +d.Home_fouls_against_average,
    Home_yellows : +d.Home_yellows,
    Home_yellows_average : +d.Home_yellows_average,
    Home_yellows_against : +d.Home_yellows_against,
    Home_yellows_against_average : +d.Home_yellows_against_average,
    Home_reds : +d.Home_reds,
    Home_reds_average : +d.Home_reds_average,
    Home_reds_against : +d.Home_reds_against,
    Home_reds_against_average : +d.Home_reds_against_average,
    Home_booking_points : +d.Home_booking_points,
    Home_booking_points_average : +d.Home_booking_points_average,
    Home_booking_points_against : +d.Home_booking_points_against,
    Home_booking_points_against_average : +d.Home_booking_points_against_average,
    Home_shots_on_target_percentage : +d.Home_shots_on_target_percentage,
    Away_games : +d.Away_games,
    Away_goals : +d.Away_goals,
    Away_goals_average : +d.Away_goals_average,
    Away_goals_conceded : +d.Away_goals_conceded,
    Away_goals_conceded_average : +d.Away_goals_conceded_average,
    Away_wins : +d.Away_wins,
    Away_draws : +d.Away_draws,
    Away_losses : +d.Away_losses,
    Away_games_refereed_by_Mike_Dean : +d.Away_games_refereed_by_Mike_Dean,
    Away_shots : +d.Away_shots,
    Away_shots_average : +d.Away_shots_average,
    Away_shots_conceded : +d.Away_shots_conceded,
    Away_shots_conceded_average : +d.Away_shots_conceded_average,
    Away_shots_on_target : +d.Away_shots_on_target,
    Away_shots_on_target_average : +d.Away_shots_on_target_average,
    Away_shots_conceded_on_target : +d.Away_shots_conceded_on_target,
    Away_shots_conceded_on_target_average : +d.Away_shots_conceded_on_target_average,
    Away_corners : +d.Away_corners,
    Away_corners_average : +d.Away_corners_average,
    Away_corners_conceded : +d.Away_corners_conceded,
    Away_corners_conceded_average : +d.Away_corners_conceded_average,
    Away_fouls : +d.Away_fouls,
    Away_fouls_average : +d.Away_fouls_average,
    Away_fouls_against : +d.Away_fouls_against,
    Away_fouls_against_average : +d.Away_fouls_against_average,
    Away_yellows : +d.Away_yellows,
    Away_yellows_average : +d.Away_yellows_average,
    Away_yellows_against : +d.Away_yellows_against,
    Away_yellows_against_average : +d.Away_yellows_against_average,
    Away_reds : +d.Away_reds,
    Away_reds_average : +d.Away_reds_average,
    Away_reds_against : +d.Away_reds_against,
    Away_reds_against_average : +d.Away_reds_against_average,
    Away_booking_points : +d.Away_booking_points,
    Away_booking_points_average : +d.Away_booking_points_average,
    Away_booking_points_against : +d.Away_booking_points_against,
    Away_booking_points_against_average : +d.Away_booking_points_against_average,
    Away_shots_on_target_percentage : +d.Away_shots_on_target_percentage,
    Games : +d.Games,
    Goals : +d.Goals,
    Goals_conceded : +d.Goals_conceded,
    Wins : +d.Wins,
    Draws : +d.Draws,
    Losses : +d.Losses,
    Games_refereed_by_Mike_Dean : +d.Games_refereed_by_Mike_Dean,
    Shots : +d.Shots,
    Shots_conceded : +d.Shots_conceded,
    Shots_on_target : +d.Shots_on_target,
    Shots_conceded_on_target : +d.Shots_conceded_on_target,
    Corners : +d.Corners,
    Corners_conceded : +d.Corners_conceded,
    Fouls : +d.Fouls,
    Fouls_against : +d.Fouls_against,
    Yellows : +d.Yellows,
    Yellows_against : +d.Yellows_against,
    Reds : +d.Reds,
    Reds_against : +d.Reds_against,
    Booking_points : +d.Booking_points,
    Booking_points_against : +d.Booking_points_against,
    Goals_average : +d.Goals_average,
    Goals_conceded_average : +d.Goals_conceded_average,
    Shots_average : +d.Shots_average,
    Shots_conceded_average : +d.Shots_conceded_average,
    Shots_on_target_average : +d.Shots_on_target_average,
    Shots_conceded_on_target_average : +d.Shots_conceded_on_target_average,
    Corners_average : +d.Corners_average,
    Corners_conceded_average : +d.Corners_conceded_average,
    Fouls_average : +d.Fouls_average,
    Fouls_against_average : +d.Fouls_against_average,
    Yellows_average : +d.Yellows_average,
    Yellows_against_average : +d.Yellows_against_average,
    Reds_average : +d.Reds_average,
    Reds_against_average : +d.Reds_against_average,
    Booking_points_average : +d.Booking_points_average,
    Booking_points_against_average : +d.Booking_points_against_average,
    Shots_on_target_percentage : +d.Shots_on_target_percentage
  };
}
}}, function(data) {

    console.log(scatterseason)
    season=scatterseason

    dots = svg.selectAll(".dot")
    .data(data, function (d) { if (scatterseason === "All seasons") {return d.UniqueID;} else {return d.Club;}});
    // exit phase
    dots
        .exit()
        .remove();

    //create 50:50 style circles

    /*var half = svg.append("defs").append("linearGradient").attr("id", "half")
        .attr("x1", "0%").attr("x2", "0%").attr("y1", "100%").attr("y2", "0%");
    half.append("stop").attr("offset", "50%").style("stop-color", function(d, i){ return d.color1; });
    half.append("stop").attr("offset", "50%").style("stop-color", function(d, i){ return d.color2; }); 

    var new_dots = dots
        .enter()
        .append('circle')
        .attr('r', 5)
        //use team colors for fill and stroke
        .attr('fill', function(d, i){ if (d.style==="half") {return "url(#half)"; } else return d.color1})
        .attr('stroke', function(d, i){ if (d.style==="half") {return "black"} else return d.color2; })
        .attr('class','dot');*/
    
    
    //define domain of zcale (circle radius) using max value of chosen stat
    var zmax_value = d3.max(data, function(d) {
            return d[stat_selection];})

    var zscale = d3.scaleLinear()
                .domain([0, zmax_value])
                .range([2, 8]);

    new_dots = dots
        .enter()
        .append('circle')
        .attr('r', function(d, i){ if (stat_selection==="No_selection") {return 6} else {return(zscale(d[stat_selection]))}})
        //use team colors for fill and stroke
        .attr('fill', function(d, i){return d.color1;})
        .attr('stroke', function(d, i){return d.color2;})
        .attr('class','dot')
        .style("opacity",function(d,i) { if (team_selection==="All"){
            if (d.Season_Wage_Bill===0){
                    return 0.4;}
                    else{
                        return 1; }}
                else { if (d.Club===team_selection) {
            return 1 } else {return 0.2}}})
        .on("mouseover", function(d,i) {console.log(scatterseason);
          clubinfo
               .style("opacity", 0.9)
               .style("left", (d3.event.pageX - 10) + "px")
               .style("top", (d3.event.pageY -30) + "px");
                if (d.Season_Wage_Bill===0) {
                    if (scatterseason === "All seasons"){
                        clubinfo.html(d.Club + 
                "<br/> Final Standing:" + d.Finalpos + 
                "<br/> Season:" + d.Year + 
                "<br/> Season wage bill : unknown.")}
                    else {
                        clubinfo.html(d.Club + "<br/> Final Standing:" + d.Finalpos + "<br/> Season wage bill : unknown.")}} 
                else {
                    if (scatterseason === "All seasons"){
                        clubinfo.html(d.Club + 
                "<br/> Final Standing:" + d.Finalpos + 
                "<br/> Points:" + d.Points_Gained + 
                "<br/> Season_Wage_Bill (£):" + d.Season_Wage_Bill + 
                "<br/> Season:" + d.Year)}
                    else {
                        clubinfo.html(d.Club + 
                            "<br/> Final Standing: "+ d.Finalpos + 
                            "<br/> Points:" + d.Points_Gained + 
                            "<br/> Season_Wage_Bill(£) :" + d.Season_Wage_Bill)}}

                })
        .on("mouseout", function(d) {
          clubinfo.transition()
               .duration(500)
               .style("opacity", 0);
      })
        .on("click",function(d,i) {
            team_selection=d.Club;
            updatechosenteam();
            if (season === "All seasons") {drawscatter("All seasons")} else {drawscatter(seasonvalue)};
            if (season === "All seasons") {drawbarchart("All seasons")} else {drawbarchart(seasonvalue)};
            //if (seasonvalue) {drawscatter(seasonvalue)} else {drawscatter("All seasons")}
        });

    //don't transition if still all seasons
    if(scatterseason===lastdrawnseason){

    new_dots.merge(dots)
        .attr('r', function(d){ if (stat_selection==="No_selection") {return 6} else {return (zscale(d[stat_selection]))}})
        .attr("cx", function(d, i){ return xscale(d.Season_Wage_Bill)+ 1; })
        .attr("cy", function(d, i){ return yscale(d.Points_Gained) + 1;})
        .style("opacity",function(d,i) { if (team_selection==="All"){
            if (d.Season_Wage_Bill===0){
                    return 0.4;}
                    else{
                        return 1; }}
                else { if (d.Club===team_selection) {
            return 1 } else {return 0.2}}})
        ;}

    else{

    new_dots.merge(dots)
        .transition(t)
        .attr('r', function(d){ if (stat_selection==="No_selection") {return 6} else {return (zscale(d[stat_selection]))}})
        .attr("cx", function(d, i){ return xscale(d.Season_Wage_Bill)+ 1; })
        .attr("cy", function(d, i){ return yscale(d.Points_Gained) + 1;})
        .style("opacity",function(d,i) { if (team_selection==="All"){
            if (d.Season_Wage_Bill===0){
                    return 0.4;}
                    else{
                        return 1; }}
                else { if (d.Club===team_selection) {
            return 1 } else {return 0.2}}})
        ;}

    //bring chosen team dots to front

    svg.selectAll(".dot").sort(function (d, i) { 
      if (d.Club===team_selection) {return 1;}               
      else {return -1;};                            
    });

    //add labels for selected team if not 'all seasons'

    var labels = svg.selectAll('.label')
            .data(data);

        labels
        .exit().remove();

        var new_labels = labels
        .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', 0)
            .attr('y', height)

        new_labels.merge(labels)
            .attr('x', function(d) {
                return xscale(d.Season_Wage_Bill) + 5;
            })
            .attr('y', function(d){
                return yscale(d.Points_Gained) - 5;
            })
            .text(function(d){
                return d.Club;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "6px")
            .style('display',function(d,i) {
                if (scatterseason==="All seasons") {return "none"}
                else if (team_selection==="All"){
                    return "none";}
                else { if (d.Club===team_selection) {
                return "block" } else {return "none"}}});


    //Add year label originally set to all seasons.    

    if (scatterseason === "All seasons"){

        var label = svg.append("text")
        .attr("class","season_label")
        .attr("y",height - 12)
        .attr("x", width)
        .attr("text-anchor","end")
        .style('fill', '#F3ECEC')
        .style("font-size", "24")
        .text("2000 - 2016");}
    
    else {var label = svg.append("text")
        .attr("class","season_label")
        .attr("y",height - 12)
        .attr("x", width)
        .attr("text-anchor","end")
        .style("font-face","Arial")
        .style('fill', '#F3ECEC')
        .style("font-size", "24")
        .text("SEASON: " + seasondata);}

    if (scatterseason !== "All seasons"){

        //add regression info (and box)

        regressioninfobox = svg.append("rect")
        .attr("y",(height*6.25/10)-20)
        .attr("x", width-200 -10)
        .attr("height", 70)
        .attr("width", 210)
        .style("fill-opacity", '0')
        .attr("stroke","white")
        .attr("stroke-width",2)
        .attr("stroke-dasharray", ("3, 3"))
        .style("opacity",0)

        regressioninfotext1 = svg.append("text")
        .attr("class","regressiontext")
        .attr("y",(height*6.25/10))
        .attr("x", width-200 +30)
        .attr("text-anchor","start")
        .style("text-decoration","underline")
        .text("Regression Model");

        regressioninfotext2 = svg.append("text")
        .data(data)
        .attr("class","regressiontext")
        .attr("y",(height*6.25/10) + 20)
        .attr("x", width-200)
        .attr("text-anchor","start")
        .text(function(d) {return ("Points = " + d.Intercept.toFixed(2) + " + Wages*" + d.Coefficient.toFixed(2))});

        regressioninfotext3 = svg.append("text")
        .data(data)
        .attr("class","regressiontext")
        .attr("y",(height*6.25/10) + 40)
        .attr("x", width-200)
        .attr("text-anchor","start")
        .text(function(d) {return ("Correlation coefficient: " + d.corr.toFixed(3))});

        //add regression line

        var regression_line = svg.selectAll(".regression_line")
            .data(data);

        regression_line
        .exit().remove();

        var new_regression_line = regression_line
            .enter()
            .append("line")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 4)
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray","5,10")
            .attr("class", "regression_line")
            .on("mouseover", function(d) {
            regressioninfotext1.transition() 
               .duration(150)
               .style("opacity", 1);
            regressioninfotext2.transition() 
               .duration(300)
               .style("opacity", 1);
            regressioninfotext3.transition() 
               .duration(450)
               .style("opacity", 1);
            regressioninfobox.transition() 
               .duration(100)
               .style("opacity", 1);
                })
            .on("mouseout", function(d) {
            regressioninfotext1.transition() 
               .duration(150)
               .style("opacity", 0);
            regressioninfotext2.transition() 
               .duration(300)
               .style("opacity", 0);
            regressioninfotext3.transition() 
               .duration(450)
               .style("opacity", 0);
            regressioninfobox.transition() 
               .duration(500)
               .style("opacity", 0);
                });

        //Ensure line of best fit does not exceed max of yscale

        new_regression_line.merge(regression_line)
                .transition(t)
                .attr("x1", function(d,i) { return xscale(0); })
                .attr("y1", function(d,i) { return yscale(d.Intercept); })
                .attr("x2", function(d,i) { if ((max_x*d.Coefficient)+d.Intercept>95){
                    return xscale((95-d.Intercept)/d.Coefficient); }
                    else{
                        return xscale(max_x); }})
                .attr("y2", function(d,i) { if ((max_x*d.Coefficient)+d.Intercept>95){
                    return yscale(95); }
                    else{
                        return yscale((max_x*d.Coefficient)+d.Intercept);}
                })

        };

        lastdrawnseason = scatterseason;

    });
  
}

team_selection = "All";
lastdrawnseason="None"
stat_selection="No_selection";

slidecount=0;

var slider = d3.select('#season');
slider.on('change', function() {
    drawscatter(this.value);
    slidecount += 1;
    seasonvalue = this.value
    selectedseason=seasonvalue
    updatechosenseason()
    drawbarchart(this.value);
});



function drawallseasons () {
    selectedseason="All seasons"
    drawscatter(selectedseason)
    updatechosenseason()
};

drawallseasons ()

//map..

var teammap = L.map('map').setView([53, -1.8904], 6.4);

//teammap.dragging.disable()

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
        //minZoom: 5,
        //maxZoom: 9,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
    })
    .addTo(teammap);

//set up stadium info div
var stadiuminfo = d3.select("#map").append("div")
    .attr("class", "stadiuminfo");

//draw map
var draw = function() {
    d3.select('#overlay')
        .remove();
    var bounds = teammap.getBounds();
    var topLeft = teammap.latLngToLayerPoint(bounds.getNorthWest());
    var bottomRight = teammap.latLngToLayerPoint(bounds.getSouthEast());
    var existing = d3.set();
    var drawLimit = bounds.pad(0.4);

    var filteredPoints = points.filter(function(d) {
        var latlng = new L.LatLng(d.lat, d.lon);
        if (!drawLimit.contains(latlng)) {
            return false;
        }
        var point = teammap.latLngToLayerPoint(latlng);

        key = point.toString();
        if (existing.has(key)) {
            return false;
        }
        existing.add(key);

        d.x = point.x;
        d.y = point.y;
        return true;
        });

    var svgmap = d3.select(teammap.getPanes()
            .overlayPane)
        .append("svg")
        .attr('id', 'overlay')
        .attr("class", "leaflet-zoom-hide")
        .style("width", teammap.getSize()
            .x + 'px')
        .style("height", teammap.getSize()
            .y + 'px')
        .style("margin-left", topLeft.x + "px")
        .style("margin-top", topLeft.y + "px");

    var g = svgmap.append("g")
        .attr("transform", "translate(" + (-topLeft.x) + "," + (-topLeft.y) + ")");

    var svgmapPoints = g.attr("class", "points")
        .selectAll("g")
        .data(filteredPoints)
        .enter()
        .append("g")
        .attr("class", "point");

    svgmapPoints.append("circle")
        .attr('r', function(d, i){ return rscale(d.capacity); })
        //use team colours
        .attr('fill', function(d, i){ return d.color1; })
        .attr('stroke', function(d, i){ return d.color2; })
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";})
        .on("mouseover", function(d) {
          stadiuminfo.transition()
               .duration(200)
          stadiuminfo.html(d.stadium + "<br/>(" + d.Club +")<br/>Capacity:"+d.capacity)
               .style("opacity", 1);
            })

        .on("mouseout", function(d) {
            stadiuminfo.transition()
               .duration(500)
               .style("opacity", 0);
            stadiuminfo.html( );
            })
        .on("click",function(d,i) {
            team_selection=d.Club;
            updatechosenteam();
            if (selectedseason === "All seasons") {drawscatter("All seasons")} else {drawscatter(selectedseason)};
            if (selectedseason === "All seasons") {drawbarchart("All seasons")} else {drawbarchart(selectedseason)};
            //if (seasonvalue) {drawscatter(seasonvalue)} else {drawscatter("All seasons")}
        })

                              
};

//draw teams onto map
d3.csv('pldata.csv', function(d) {
    return {
        stadium : d.Stadium,
        lat: +d.Latitude,
        lon: +d.Longitude,
        capacity: +d.Capacity,
        color1 : d.color1,
        color2 : d.color2,
        Club : d.Club,
    };
}, function(error, rows) {
    points = rows;
    draw();
    teammap.on('viewreset moveend', draw);
});
//create function for when select all teams button is pressed
function drawallteams(){
team_selection = "All";
updatechosenteam();
if (selectedseason === "All seasons") {drawscatter("All seasons");} else {drawscatter(selectedseason);}
if (selectedseason === "All seasons") {drawbarchart("All seasons");} else {drawbarchart(selectedseason);}}

//create functions for showing selections in stats bar
function updatechosenteam(){
    document.getElementById("statsmenu1").innerHTML = ("Team :   " + team_selection);
}
updatechosenteam();

function updatechosenseason(){
    if (selectedseason !== "All seasons") {
    document.getElementById("statsmenu2").innerHTML = ("Season :   " + selectedseason + " - " + (parseInt(selectedseason)+1));}
    else {document.getElementById("statsmenu2").innerHTML = ("Season : All");}
    }
updatechosenseason();

function updatechosenstat(){
   statselectionstring=String(stat_selection);
   statselectionstring2=statselectionstring.replace(/_/g,' ');
   document.getElementById("statsmenu3").innerHTML = ("Stat choice :   " + statselectionstring2);
    }
updatechosenstat();

d3.csv('Choices.csv', function(d) {
    return {
        choice : d.choice,
    };
}, function(error, data) {

    var dropdown = d3.select("#dropdown")
    .append("select");

    dropdown.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("value", function (d) { return d.choice; })
        .text(function (d) { return d.choice; });

    dropdown
      .on("change", function(d) {
        var choicevalue = d3.select(this).property("value");
        stat_selection = choicevalue;
        updatechosenstat();
        drawbarchart(selectedseason);
        drawscatter(selectedseason);
      });
  });

 //set up bar chart area

 var barinfo = d3.select("#barchart").append("div")
    .attr("class", "clubinfo")
    .style("max-width","70px")
    .style("opacity", 0);


var bcwidth = document.getElementById('barchart')
    .clientWidth;
var bcheight = document.getElementById('barchart')
    .clientHeight;

var bcmargin = {
    top: 30,
    bottom: 30,
    left: 42,
    right: 30
};

var bcsvg = d3.select('#barchart')
    .append('svg')
    .attr('width', bcwidth)
    .attr('height', bcheight)
    .append('g')
    .attr('transform', 'translate(' + bcmargin.left + ',' + bcmargin.top + ')');

bcwidth = bcwidth - bcmargin.left - bcmargin.right;
bcheight = bcheight - bcmargin.top - bcmargin.bottom;

var bcx_scale = d3.scaleBand()
    .rangeRound([0, bcwidth])
    .padding(0.1);

var bcy_scale = d3.scaleLinear()
    .range([bcheight, 0]);

bcsvg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + bcheight + ')');

bcsvg.append('g')
    .attr('class', 'y axis');


var bcy_axis = d3.axisLeft(bcy_scale);
var bcx_axis = d3.axisBottom(bcx_scale);

previous_barchartseason="All seasons"

function drawbarchart(barseason) {

    if (stat_selection === "No_selection")

    {

    bcsvg.selectAll(".bar").remove();

    bcsvg.append("text")
        .attr("class","noselection")
        .attr("x", (bcwidth*(3/7)))             
        .attr("y", (bcheight*(2/3)))
        .attr("text-anchor", "middle") 
        .attr("font-weight","bold")
        .style("font-size", "20px")
        .style("fill", "grey")
        .text("Select stat from selections menu.");



    }

    else

    
    {

    bcsvg.selectAll(".noselection").remove();

    if(barseason === "All seasons") {if(previous_barchartseason !== "All seasons"){bcsvg.selectAll(".bar").remove();}};

    if(barseason !== "All seasons") {if(previous_barchartseason === "All seasons"){bcsvg.selectAll(".bar").remove();}};

    previous_barchartseason=barseason;

    if (barseason === "2000") {barseasondata = "2000/2001";}
    else if (barseason === "2001") {barseasondata = "2001/2002";}
    else if (barseason === "2002") {barseasondata = "2002/2003";}
    else if (barseason === "2003") {barseasondata = "2003/2004";}
    else if (barseason === "2004") {barseasondata = "2004/2005";}
    else if (barseason === "2005") {barseasondata = "2005/2006";}
    else if (barseason === "2006") {barseasondata = "2006/2007";}
    else if (barseason === "2007") {barseasondata = "2007/2008";}
    else if (barseason === "2008") {barseasondata = "2008/2009";}
    else if (barseason === "2009") {barseasondata = "2009/2010";}
    else if (barseason === "2010") {barseasondata = "2010/2011";} 
    else if (barseason === "2011") {barseasondata = "2011/2012";}
    else if (barseason === "2012") {barseasondata = "2012/2013";}
    else if (barseason === "2013") {barseasondata = "2013/2014";}
    else if (barseason === "2014") {barseasondata = "2014/2015";}
    else if (barseason === "2015") {barseasondata = "2015/2016";}
    else {barseasondata = "All"}

    d3.csv('bardata.csv', function(d) {

    if (d.Year === barseasondata) {return {
   Year : d.Year,
Club : d.Club,
Color1 : d.Color1,
Color2 : d.Color2,
Club_short : d.Club_short,
Home_games : +d.Home_games,
Home_goals : +d.Home_goals,
Home_goals_average : +d.Home_goals_average,
Home_goals_conceded : +d.Home_goals_conceded,
Home_goals_conceded_average : +d.Home_goals_conceded_average,
Home_wins : +d.Home_wins,
Home_draws : +d.Home_draws,
Home_losses : +d.Home_losses,
Home_games_refereed_by_Mike_Dean : +d.Home_games_refereed_by_Mike_Dean,
Home_shots : +d.Home_shots,
Home_shots_average : +d.Home_shots_average,
Home_shots_conceded : +d.Home_shots_conceded,
Home_shots_conceded_average : +d.Home_shots_conceded_average,
Home_shots_on_target : +d.Home_shots_on_target,
Home_shots_on_target_average : +d.Home_shots_on_target_average,
Home_shots_conceded_on_target : +d.Home_shots_conceded_on_target,
Home_shots_conceded_on_target_average : +d.Home_shots_conceded_on_target_average,
Home_corners : +d.Home_corners,
Home_corners_average : +d.Home_corners_average,
Home_corners_conceded : +d.Home_corners_conceded,
Home_corners_conceded_average : +d.Home_corners_conceded_average,
Home_fouls : +d.Home_fouls,
Home_fouls_average : +d.Home_fouls_average,
Home_fouls_against : +d.Home_fouls_against,
Home_fouls_against_average : +d.Home_fouls_against_average,
Home_yellows : +d.Home_yellows,
Home_yellows_average : +d.Home_yellows_average,
Home_yellows_against : +d.Home_yellows_against,
Home_yellows_against_average : +d.Home_yellows_against_average,
Home_reds : +d.Home_reds,
Home_reds_average : +d.Home_reds_average,
Home_reds_against : +d.Home_reds_against,
Home_reds_against_average : +d.Home_reds_against_average,
Home_booking_points : +d.Home_booking_points,
Home_booking_points_average : +d.Home_booking_points_average,
Home_booking_points_against : +d.Home_booking_points_against,
Home_booking_points_against_average : +d.Home_booking_points_against_average,
Home_shots_on_target_percentage : +d.Home_shots_on_target_percentage,
Away_games : +d.Away_games,
Away_goals : +d.Away_goals,
Away_goals_average : +d.Away_goals_average,
Away_goals_conceded : +d.Away_goals_conceded,
Away_goals_conceded_average : +d.Away_goals_conceded_average,
Away_wins : +d.Away_wins,
Away_draws : +d.Away_draws,
Away_losses : +d.Away_losses,
Away_games_refereed_by_Mike_Dean : +d.Away_games_refereed_by_Mike_Dean,
Away_shots : +d.Away_shots,
Away_shots_average : +d.Away_shots_average,
Away_shots_conceded : +d.Away_shots_conceded,
Away_shots_conceded_average : +d.Away_shots_conceded_average,
Away_shots_on_target : +d.Away_shots_on_target,
Away_shots_on_target_average : +d.Away_shots_on_target_average,
Away_shots_conceded_on_target : +d.Away_shots_conceded_on_target,
Away_shots_conceded_on_target_average : +d.Away_shots_conceded_on_target_average,
Away_corners : +d.Away_corners,
Away_corners_average : +d.Away_corners_average,
Away_corners_conceded : +d.Away_corners_conceded,
Away_corners_conceded_average : +d.Away_corners_conceded_average,
Away_fouls : +d.Away_fouls,
Away_fouls_average : +d.Away_fouls_average,
Away_fouls_against : +d.Away_fouls_against,
Away_fouls_against_average : +d.Away_fouls_against_average,
Away_yellows : +d.Away_yellows,
Away_yellows_average : +d.Away_yellows_average,
Away_yellows_against : +d.Away_yellows_against,
Away_yellows_against_average : +d.Away_yellows_against_average,
Away_reds : +d.Away_reds,
Away_reds_average : +d.Away_reds_average,
Away_reds_against : +d.Away_reds_against,
Away_reds_against_average : +d.Away_reds_against_average,
Away_booking_points : +d.Away_booking_points,
Away_booking_points_average : +d.Away_booking_points_average,
Away_booking_points_against : +d.Away_booking_points_against,
Away_booking_points_against_average : +d.Away_booking_points_against_average,
Away_shots_on_target_percentage : +d.Away_shots_on_target_percentage,
Games : +d.Games,
Goals : +d.Goals,
Goals_conceded : +d.Goals_conceded,
Wins : +d.Wins,
Draws : +d.Draws,
Losses : +d.Losses,
Games_refereed_by_Mike_Dean : +d.Games_refereed_by_Mike_Dean,
Shots : +d.Shots,
Shots_conceded : +d.Shots_conceded,
Shots_on_target : +d.Shots_on_target,
Shots_conceded_on_target : +d.Shots_conceded_on_target,
Corners : +d.Corners,
Corners_conceded : +d.Corners_conceded,
Fouls : +d.Fouls,
Fouls_against : +d.Fouls_against,
Yellows : +d.Yellows,
Yellows_against : +d.Yellows_against,
Reds : +d.Reds,
Reds_against : +d.Reds_against,
Booking_points : +d.Booking_points,
Booking_points_against : +d.Booking_points_against,
Goals_average : +d.Goals_average,
Goals_conceded_average : +d.Goals_conceded_average,
Shots_average : +d.Shots_average,
Shots_conceded_average : +d.Shots_conceded_average,
Shots_on_target_average : +d.Shots_on_target_average,
Shots_conceded_on_target_average : +d.Shots_conceded_on_target_average,
Corners_average : +d.Corners_average,
Corners_conceded_average : +d.Corners_conceded_average,
Fouls_average : +d.Fouls_average,
Fouls_against_average : +d.Fouls_against_average,
Yellows_average : +d.Yellows_average,
Yellows_against_average : +d.Yellows_against_average,
Reds_average : +d.Reds_average,
Reds_against_average : +d.Reds_against_average,
Booking_points_average : +d.Booking_points_average,
Booking_points_against_average : +d.Booking_points_against_average,
Shots_on_target_percentage : +d.Shots_on_target_percentage



    };
  }
}, function(data) {


        var teams = data.map(function(d) {
            return d.Club_short;})

        bcx_scale.domain(teams);

        var bcmax_value = d3.max(data, function(d) {
            return d[stat_selection];})

        bcy_scale.domain([0, bcmax_value]);

        var bars = bcsvg.selectAll('.bar')
            .data(data);

        //exit
        bars
            .exit()
            .remove();

        //enter
        var new_bars = bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('height', 0)
            .attr('y', bcheight)
            .attr('width', function() {
                if(barseason!=="All seasons"){return (bcx_scale.bandwidth()-8)} else {return (bcx_scale.bandwidth()-4);}})
            .style("opacity",function(d,i) { if (team_selection==="All"){
                        return 1; }
                else { if (d.Club===team_selection) {
            return 1 } else {return 0.2}}})
             .on("mouseover", function(d) {
            barinfo
               .style("opacity", 0.9)
               .style("left", (d3.event.pageX - 35) + "px")
               .style("top", (d3.event.pageY -30) + "px");
            barinfo.html(d.Club + "<br/>" + statselectionstring2 + " : " + d[stat_selection]);
                })
            .on("mousemove", function(d) {
            barinfo
               .style("opacity", 0.9)
               .style("left", (d3.event.pageX - 35) + "px")
               .style("top", (d3.event.pageY -30) + "px");
            barinfo.html(d.Club + "<br/>" + statselectionstring2 + " : " + d[stat_selection]);
                })
            .on("mouseout", function(d) {
            barinfo.transition()
               .duration(200)
               .style("opacity", 0);
                 })
            .on("click",function(d,i) {
            team_selection=d.Club;
            updatechosenteam();
            if (barseason === "All seasons") {drawscatter("All seasons")} else {drawscatter(seasonvalue)}
            if (barseason === "All seasons") {drawbarchart("All seasons")} else {drawbarchart(seasonvalue)};});

        //update
        new_bars.merge(bars)
            .transition(t)
            .attr('x', function(d) {
                return bcx_scale(d.Club_short);
            })
            .attr('y', function(d) {
                return bcy_scale(d[stat_selection]);
            })
            .attr('height', function(d) {
                return bcheight - bcy_scale(d[stat_selection]);
            })
            .attr('fill', function(d) {
                return d.Color1; 
            })
            .attr('stroke', function(d) {
                return d.Color2; 
            })
             .attr('stroke-width', 2)
             .style("opacity",function(d,i) { if (team_selection==="All"){
                        return 1; }
                else { if (d.Club===team_selection) {
            return 1 } else {return 0.2}}})
            ;


        bcsvg.select('.x.axis')
            .transition(t)
            .call(bcx_axis)
            .attr("stroke-width",4)
            .style("font", function() {
                if(barseason!=="All seasons"){return("12px sans-serif")} else{return("font","8px sans-serif")}});        

        bcsvg.select('.y.axis')
            .transition(t)
            .call(bcy_axis)
            .style("font","12px sans-serif")
            .attr("stroke-width",4);

});
}}


drawbarchart(selectedseason);