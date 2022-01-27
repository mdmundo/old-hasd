import { useState, useEffect, useContext } from "react";
import { Chip, Grid, IconButton, Typography, Container, Card, CardContent, CardActions, Tooltip } from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import { navigate } from "@reach/router";
import Category from "./Category";
import Instrumental from "./InstrumentalIcon";
import sorted from "./sorted.json";
import hymns from "./hymns.json";
import categories from "./categories.json";
import { getFavorites } from "../common/favorites";

const List = () => {
  const { category: selected, setCategory: setSelected } = useContext(Category);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getFavorites().then((numbers) => {
      const favorites = numbers.map((favorite) => hymns[favorite - 1]);

      const options = { ...sorted, Favoritos: favorites };

      setOptions(options);
    });
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Grid container sx={{ mb: 2 }} direction="row" justifyContent="center" alignItems="flex-start" spacing={0.7}>
        {["Favoritos", ...categories].map((category) => (
          <Grid key={category} item>
            <Chip
              label={category}
              variant={selected === category ? "filled" : "outlined"}
              color="primary"
              size="small"
              onClick={() => {
                if (selected !== category) {
                  setSelected(category);
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {options[selected] &&
          options[selected].map((option, index) => (
            <Grid item key={`${index}${option.number}`}>
              <Card>
                <CardContent>
                  <Typography variant="button" display="block" align="center" gutterBottom>
                    {option.number}
                  </Typography>
                  <Typography>{option.hymn}</Typography>
                  <Typography color="text.secondary" variant="caption" display="block">
                    {option.category}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="Cantado">
                    <IconButton
                      size="small"
                      disableRipple
                      onClick={() => {
                        navigate(`/load/sung/${option.number}`);
                      }}
                    >
                      <MusicNote fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Instrumental">
                    <IconButton
                      size="small"
                      disableRipple
                      onClick={() => {
                        navigate(`/load/instrumental/${option.number}`);
                      }}
                    >
                      <Instrumental fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Letra">
                    <IconButton
                      size="small"
                      disableRipple
                      onClick={() => {
                        navigate(`/load/lyrics/${option.number}`);
                      }}
                    >
                      <MusicOff fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default List;
