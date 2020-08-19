import React, { Component } from 'react';
import Palette from "./Palette";
import seedColor from "./seedColor.js";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import {Route,Switch} from "react-router-dom";
import {generatePalette} from "./colorHelpers";
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      palettes:seedColor
    }
    this.findPalette=this.findPalette.bind(this);
    this.savePalette=this.savePalette.bind(this);
  }

  savePalette(newPalette){
    this.setState({
      palettes:[...this.state.palettes,newPalette]
    })
  }

  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id===id
    })
  }
  render() { 
    const {palettes}=this.state;
    return (  
    <Switch>
          <Route exact path='/' render={(routeProps)=><PaletteList palettes={palettes} {...routeProps}/>}/>
          <Route exact path='/palette/new' render={
                                                  (routeProps)=>
                                                  <NewPaletteForm savePalette={this.savePalette} 
                                                                  palettes={palettes} 
                                                                  {...routeProps}
                                                  />
                                                  }
          />
          
          
          
          <Route exact path='/palette/:id' render={
                                              routeProps=>(
                                              <Palette 
                                                    palette ={generatePalette(this.findPalette(routeProps.match.params.id))}
                                              />
                                              )}
          />
          <Route path='/palette/:paletteId/:colorId' render={
                                                      routeProps=>
                                                      <SingleColorPalette 
                                                      palette ={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                                                      colorId={routeProps.match.params.colorId}
                                                />}
          />
                                              
    </Switch>
    );
}
}

export default App;
