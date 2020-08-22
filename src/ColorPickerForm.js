import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles"



class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state={
            currentColor:"teal",
            newColorName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.updateCurrentColor=this.updateCurrentColor.bind(this);
    }

    
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
        this.props.colors.every(
            ({ name }) => name.toLowerCase() !== this.state.newColorName.toLowerCase()
        )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
        this.props.colors.every(({ color }) => color !== this.state.currentColor)
        );
    }

    handleSubmit(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
          };
          this.props.addNewColor(newColor);
          this.setState({
              newColorName:""
          })
    }
    
    handleChange(evt) {
        this.setState({ 
        [evt.target.name]: evt.target.value 
        });
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    render() { 
        const {paletteIsFull,classes}=this.props;
        const {currentColor,newColorName}=this.state;
        return (  
            <div className={classes.root}>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form' className={classes.addColor} instantValidate={false}> 
                    <TextValidator
                        placeholder="Color Name"
                        className={classes.colorNameInput}
                        name="newColorName"
                        variant="filled"
                        margin="normal"
                        value={newColorName}
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used!"
                        ]}
                    />
                    <Button
                        className={classes.button}
                        variant='contained'
                        disabled={paletteIsFull}
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: paletteIsFull ?  "grey": currentColor }}
                    >
                    {paletteIsFull?"Palette Full":"Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
 
export default withStyles(styles)(ColorPickerForm);