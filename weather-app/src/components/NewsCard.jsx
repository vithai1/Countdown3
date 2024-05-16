import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions, Button} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './../App.css'

  export default function NewsCard(data) {
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {data['title']}Title
            </Typography>
            <Typography sx={{mb: 1.5}} variant="body2">
                {data["author"]}
            </Typography>
            <Typography sx={{mb: 1.5}} variant="body2">
                {data["abs"]}
            </Typography>
            
          </CardContent>
          <CardActions>
            <a href={data["url"]}>
                <Button size="small">Story Link</Button>
            </a>
        </CardActions>
        </React.Fragment>
      );

    return (
      <Box sx={{width: 600}}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }