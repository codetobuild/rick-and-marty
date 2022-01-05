import { Typography, Container, Zoom, Tooltip } from "@mui/material";

const MyCard = () => {
  return (
    <Container sx={{ bgcolor: "warning.main" }}>
      <Tooltip
        title="hello title"
        placement="bottom-start"
        color="warning.main"
        sx={{}}
        TransitionComponent={Zoom}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "white",
            borderRadius: 2,
            bgcolor: "primary.main",
            boxShadow: 3,
            textAlign: "left",
          }}>
          HEADING TITLE
        </Typography>
      </Tooltip>
    </Container>
  );
};

export default MyCard;
