import { DRAWER_WIDTH } from "../constants";
const drawerWidth = DRAWER_WIDTH;


export default {
  root:{
      width:"100%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
  },
  picker:{
      width:drawerWidth <= 400 ? "80% !important":"380px !important",
      marginTop:drawerWidth <= 400 ? "2rem":"1rem",
      marginLeft:"0",
      margingRight:"0"
  },
  addColor:{
      width:"80%"
  },
  colorNameInput:{
      width:"100%",
      height:"70px",
      marginBottom:"0"

  },
  button:{
      marginTop:drawerWidth <= 400 ? "":"-.5rem",
      width:"100%",
      height:drawerWidth <= 400 ? "auto":"35%",
      padding:"1rem",
      fontSize:"1.4rem",
      textAlign:"center"
  }
}