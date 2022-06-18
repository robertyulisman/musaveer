import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  // Jarak
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // Subtittle
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  // Chip
  chip: {
    margin: "5px 5px 5px 0",
  },
}));
