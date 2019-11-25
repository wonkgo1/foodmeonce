import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts"
import LegislationHistogram from "./LegislationHistogram";

class Visualizations extends React.Component{
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20
  };

    componentDidMount() {

  }
  
  
    render(){
  
      return (
        <div>
        <p> Visualizations</p>
        <CongressionalDistricts/>
        <LegislationHistogram data = {this.state.data} width = {this.state.width} height = {this.state.height} scale = {this.state.scale}/>
        </div>
      );
    }
  }
  
  export default Visualizations;