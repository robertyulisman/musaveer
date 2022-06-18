import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";


const DetailTempat = ({ place, selected, refProp }) => {
    const kelasDetail = useStyles();

    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })

    return (
        // Detail Tempat
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : ""}
                tittle={place.name}
            />
            <CardContent>
                {/* Nama Tempat */}
                <Typography gutterBottom variant='h5'> {place.name} </Typography>
                {/* Ulasan */}
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtittle1"> dari {place.num_reviews} ulasan </Typography>
                </Box>
                {/* Rentang Harga */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtittle1"> Rentang Harga </Typography>
                    <Typography gutterBottom variant="subtittle1"> {place.price_level} </Typography>
                </Box>

                {/* Peringkat */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtittle1"> Peringkat </Typography>
                    <Typography gutterBottom variant="subtittle1"> {place.ranking} </Typography>
                </Box>
                {/* Penghargaan */}
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography varriant="subtittle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {/* Tipe Masakan */}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={kelasDetail.chip} />
                ))}
                {/* Alamat */}
                {place?.address && (
                    <Typography gutterBottom variant="subtittle2" text="textSecondary" className={kelasDetail.spacing}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {/* Nomer Telepon */}
                {place?.phone && (
                    <Typography gutterBottom variant="subtittle2" text="textSecondary" className={kelasDetail.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}

                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, "_blank")}>
                        TripAdvisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, "_blank")}>
                        Website
                    </Button>
                </CardActions>

            </CardContent>


        </Card>
    )
}

export default DetailTempat;
