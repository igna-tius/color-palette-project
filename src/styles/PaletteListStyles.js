export default{
    root:{
        backgroundColor:"blue",
        height:"100vh ",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center"
    },
    container:{
        width:"50%",
        display:"flex",
        alignItems:"flex-start",
        flexDirections:"column",
        flexWrap:"wrap"
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
        gridGap:"5%"
    }
}