import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from "@mui/material/Link";
import PlaceIcon from '@mui/icons-material/Place';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CountryDetail = () => {
  const { country } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
console.log("test", country)
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => {
        setCountryInfo(res.data[0]);
        console.log(res.data[0]);
      });
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    countryInfo && (
    <Card sx={{ maxWidth: 520, m: "auto", mt: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {countryInfo.name.common[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={countryInfo.name.common}
        subheader={countryInfo.capital}
      />
      <CardMedia
        component="img"
        height="194"
        image={countryInfo.flags.png}
        alt={countryInfo.name.common}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         The country belongs to {countryInfo.region} region and {countryInfo.subregion} sub-region. <br/> 
         Located at the {countryInfo.latlng[0]} °N and {countryInfo.latlng[1]} °W, this country has population of {countryInfo.population} <br/>
         and it has gained the independence, according to the CIA World Factbook.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="back to home">
          <Link href ="/">
          <ChevronLeftIcon />
          </Link>
        </IconButton>
        <IconButton aria-label="share">
          <Link href= {countryInfo.maps.openStreetMaps}>
          <PlaceIcon />
          </Link>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
           Add more info
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
  );
}

export default CountryDetail