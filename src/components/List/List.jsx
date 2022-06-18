import React, {useState, useEffect, createRef} from "react";
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, InputBase } from "@material-ui/core";
import DetailTempat from "../DetailTempat/DetailTempat";
import useStyles from "./styles";


const List = ({tempat, childClicked, sdgLoading, rating, setRating}) => {
    const kelasDetail = useStyles ();
    const [referensi, setReferensi] = useState([]);
    

    useEffect(() => {
        const refs= Array(tempat?.length).fill().map((_, i) => referensi[i] || createRef());

        setReferensi(refs);
    }, [tempat]);

    return (
        <div className = {kelasDetail.container}>
            <Typography variant="h5">
                Restauran, Hotel dan Tempat Menarik disekitarmu
            </Typography>
            {sdgLoading ? (
                <div className={kelasDetail.loading}> 
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
            
            <FormControl className={kelasDetail.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>Semua</MenuItem>
                    <MenuItem value={3}>Diatas 3</MenuItem>
                    <MenuItem value={4}>Diatas 4</MenuItem>
                    <MenuItem value={5}>Hanya 5</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                
        </FormControl>
            <Grid container spacing ={3} className = {kelasDetail.list}>
                {tempat?.map((place, i) => (
                    <Grid ref={referensi[i]} item key={i} xs={12}>
                            <DetailTempat place={place} selected={Number(childClicked) === i} refProp={referensi[i]}/>
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;