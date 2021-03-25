import {Component} from "react";
import {Box, Grid, Typography, withStyles, withWidth} from "@material-ui/core";



interface Props {
    classes?: any ,
    imageSrc:string,
    textUnderImage?:any,
    imageAlt:string,
    width?:any
}


const styles = (theme:any) => ({
    imageContainer: {
        overflow: "hidden",
        width: "100vw",
    },
    image: {
        height: theme.spacing(45)
    }


});
class InterfaceImageWithText extends Component<Props> {

    render() {
        const {classes ,width} = this.props
        const imgWidth = width === 'sm' || width === 'xs' ?"300px":"750px"
        return (
            <Box className={classes.imageContainer} >
            <Grid container  item lg={12} justify={"center"}
                  alignItems={"center"} direction={"column"} spacing={2}>
                <Grid item>
                    <img
                        style={{
                            width:imgWidth,
                        marginTop:"13vh"
                    }}
                          src={`${this.props.imageSrc}`} alt={this.props.imageAlt}/>
                </Grid>
                {this.props.textUnderImage ?
                    <Grid item>
                        <Typography>{this.props.textUnderImage } </Typography>
                    </Grid>:""
                }
            </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(withWidth()(InterfaceImageWithText))