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

    imagePc: {
        height: theme.spacing(45),
        paddingTop:theme.spacing(18)
    } ,
    imageMobile: {
        height: theme.spacing(28),
        paddingTop:theme.spacing(13)
    }



});
class InterfaceImageWithText extends Component<Props> {

    render() {
        console.log(this.props.imageSrc)
        const {classes ,width} = this.props
        const imageClass = width === 'sm' || width === 'xs' ? classes.imageMobile:classes.imagePc
        return (
            <Grid container  item lg={12} justify={"center"}
                  alignItems={"center"} direction={"column"} spacing={2}>
                <Grid item>
                    <img
                        className={imageClass}
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