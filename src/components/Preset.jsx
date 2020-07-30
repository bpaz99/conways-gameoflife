import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function Preset(props) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className="preset-preview"
          image={require(`${props.data.src}`)}
          title={`${props.data.name} - preset`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Preset;
