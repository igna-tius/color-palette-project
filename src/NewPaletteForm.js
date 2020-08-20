import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyles"


class NewPaletteForm extends Component {
  static defaultProps={
    maxColors:20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor:"teal",
      newColorName: "",
      colors: this.props.palettes[0].colors
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.removeColor=this.removeColor.bind(this);
    this.clearColors=this.clearColors.bind(this);
    this.addRandomColor=this.addRandomColor.bind(this);
  }


  addRandomColor(){
    const allColors=this.props.palettes.map(p=>p.colors).flat()
    const rand=Math.floor(Math.random() * allColors.length)
    this.setState(
      {
        colors:[...this.state.colors,allColors[rand]]
      }
    )
  }
  clearColors(){
    this.setState({
      colors:[]
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  

  addNewColor(newColor) {
    
    this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
  }

  removeColor(deleteColor){
    this.setState({
      colors:this.state.colors.filter(color=>color.name!==deleteColor)
    })
  }
  handleChange(evt) {
    this.setState({ 
      [evt.target.name]: evt.target.value 
    });
  }

  render() {
    const { classes ,maxColors} = this.props;
    const { open ,colors} = this.state;
    const paletteIsFull= colors.length >=maxColors;


    return (
      <div className={classes.root}>
        <PaletteFormNav 
            open={open}
            classes={classes} 
            handleDrawerOpen={this.handleDrawerOpen} 
            palettes={this.props.palettes} 
            handleSubmit={this.handleSubmit}/>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.left} />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
              <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
              <div className={classes.buttons}>
                <Button
                    className={classes.button} 
                    variant='contained' 
                    color='secondary' 
                    onClick={this.clearColors}>
                  Clear Palette
                </Button>
                <Button
                    className={classes.button} 
                    variant='contained' 
                    color='primary'
                    disabled={paletteIsFull}
                    onClick={this.addRandomColor}
                    style={{ backgroundColor: paletteIsFull ?"grey": "" }}>
                  Random Color
                </Button>
              </div>
              <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors}/>
           
          </div>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
                colors={colors} 
                removeColors={this.removeColor} 
                onSortEnd={this.onSortEnd}
                axis='xy'
                />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);