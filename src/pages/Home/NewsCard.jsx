import {Card, CardActions, CardContent, CardMedia, Link, Typography} from "@mui/material";

const NewsCard = ({item, colors}) => {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                alt={item.title}
                height="340"
                image={item.imageUrl}
            />
            <CardContent>
                <Typography variant="body2" pt="10px" color="text.secondary">
                    Published On: {item.date} , {item.time}
                </Typography>
                <Typography variant="body2" pt="10px" color="text.secondary">
                    Author: {item.author}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" pt="20px">
                    {item.title}
                </Typography>
                <Typography variant="p" color="text.secondary">
                    {item.content}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "center"}}>
                <Link
                    href={item.readMoreUrl}
                    color={colors.light[200]}
                    sx={{fontSize: "1.3em", textDecoration: "none"}}
                >
                    Read More
                </Link>
            </CardActions>
        </Card>
    );
};

export default NewsCard;