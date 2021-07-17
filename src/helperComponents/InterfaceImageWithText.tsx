import {Component} from "react";
import { Grid, Typography, withStyles, withWidth} from "@material-ui/core";



interface Props {
    classes?: any ,
    imageSrc:string,
    textUnderImage?:any,
    imageAlt:string,
    width:any,
    locationInMobileScreen?:any
}


const styles = (theme:any) => ({

    imagePc: {
        height: theme.spacing(45),
        paddingTop:"100px !important"
    } ,
    imageMobile: {
        height: theme.spacing(27),
        width: theme.spacing(30),
    },
    imageInTop:{
        height: theme.spacing(35),
        paddingTop:theme.spacing(8)
    },
    imageInCenter:{
        paddingTop:theme.spacing(13)
    }

});
class InterfaceImageWithText extends Component<Props> {

    render() {
        console.log(this.props.imageSrc)
        const {classes ,width , locationInMobileScreen} = this.props
        const imageClass = width === 'sm' || width === 'xs' ? classes.imageMobile:classes.imagePc
        const imageLocation = locationInMobileScreen === "top" ? classes.imageInTop:classes.imageInCenter

        return (
            <Grid container  item lg={12} justify={"center"}
                  alignItems={"center"} direction={"column"} spacing={2}>
                <Grid item>
                    <img
                        className={`${imageClass}  ${imageLocation}`}
                          src={`${this.props.imageSrc}`} alt={this.props.imageAlt}/>
                </Grid>
                {this.props.textUnderImage ?
                    <Grid item>
                        <Typography>{this.props.textUnderImage } </Typography>
                    </Grid>:""
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(withWidth()(InterfaceImageWithText))