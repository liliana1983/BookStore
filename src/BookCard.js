import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import TableDropdown from "./TableDropdown";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './BookCard.css';
import { Rating, RatingView } from 'react-simple-star-rating';


function MyStarRating(r) {
  return (
    <div >
      <RatingView ratingValue={r}  />
    </div>
  )
}


const BookCard = ({list, onDelete}) =>{
  return (
    <div className="books" >
    {list.map((card) => (      
       
    <Card className="card" key={card.id}>       
      <CardContent>           
        <Typography variant="h6"  sx={{textAlign: 'center'}} component="div">
          {card.title}         
        </Typography>
        <Typography  color="text.secondary">
        {card.authors.join(",")}
        </Typography>
        <Typography variant="body2">
       published: {card.publishDate}
          </Typography>
        <Typography  className="star-button" variant="body2">
        <RatingView ratingValue={card.rating} size={20} />   
        <span style={{flexGrow: 1}}/>
        <Button size="small"><TableDropdown text="More"
                  items={
                      [
                        {text: "Check Out", link: true, path: `/book/${card.id}/view`},
                        {text: "Change", link: true, path: `/book/${card.id}/edit`},
                        {text: "Delete", link: false, action: () => onDelete(card.id)}
                      ]
                  }
                  /></Button>     
          </Typography>        
      </CardContent> 
    </Card>
    ))}
    </div>
  );
}

export default BookCard;