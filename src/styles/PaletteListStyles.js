import sizes from "./sizes";
import bg from "./Confetti-Doodles.svg";

export default{
    root:{
        backgroundColor: "#1174aa",
        backgroundImage:`url(${bg})`,
        /* background by SVGBackgrounds.com */
        height:"100vh ",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",
        overflow:"scroll",
        backgroundAttachment: "fixed"
    },
    container:{
        width:"60%",
        display:"flex",
        alignItems:"flex-start",
        flexDirections:"column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
        width: "75%"
        },
        [sizes.down("md")]: {
            width: "60%"
        },
        [sizes.down("xs")]: {
        width: "60%"
        }
    },
    nav:{
        display:"flex",
        width:"100%",
        justifyContent:"space-between",
        color:"white",
        alignItems:"center",
        "& a":{
            color:"white"
        }

    },
    palette:{
        boxSizing:"border-box",
        width:"100%",
        display:"grid",
        gridTemplateColumns:"repeat(3,30%)",
        gridGap: "2.5rem",
        [sizes.down("md")]: {
        gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
        gridTemplateColumns: "repeat(1, 100%)",
        gridGap: "1rem"
        }
    }
}