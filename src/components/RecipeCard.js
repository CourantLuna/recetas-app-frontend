import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardActions,
  Chip,
  CardContent,
  IconButton,
  Rating,
} from "@mui/material";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdTimer,
  MdBarChart,
  MdRestaurantMenu,
  MdEdit,
  MdDelete,
  MdShare,
  MdPrint,
  MdStarOutline,
} from "react-icons/md";

const RecipeCard = ({
  receta,
  hovered,
  setHovered,
  handleViewDetails,
  handleEditRecipe,
  handleOpenConfirmDialog,
  labels,
  value,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        "&:hover .overlay": {
          opacity: 1,
        },
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        width: 300,
        height: 430,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
        paddingY: 1,
        alignSelf: "flex-start",
      }}
      onClick={() => handleViewDetails(receta)}
    >
      {/* Primera fila: Título + Corazón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "54px",
          paddingX: 1,
          columnGap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {receta.Nombre}
        </Typography>
        <Box
          onMouseEnter={() => setHovered(receta.RecetaID)}
          onMouseLeave={() => setHovered(null)}
          sx={{ cursor: "pointer" }}
        >
          {hovered === receta.RecetaID ? (
            <MdFavorite size={24} color="red" />
          ) : (
            <MdFavoriteBorder size={24} color="gray" />
          )}
        </Box>
      </Box>

      {/* Segunda fila: Calificación */}
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
          paddingX: 1,
          columnGap: 1,
        }}
      >
        <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<MdStarOutline style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 0 }}>{`(${receta.CantidadCalificaciones || 5})`}</Box>
        <Box sx={{ ml: 2 }}>{labels[value]}</Box>
      </Box>

      {/* Imagen */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="190"
          image={
            receta.ImageUrl ||
            "https://via.placeholder.com/300x200?text=Upload+Image"
          }
          alt={receta.Nombre}
          sx={{
            marginTop: 1,
            padding: 0,
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />

        {/* Layer Transparente */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: "9px",
            left: 0,
            width: "100%",
            height: "96%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "8px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          Clic para ver más
        </Box>
      </Box>

      {/* Chips */}
      <CardContent
        sx={{
          display: "flex",
          alignContent: "flex-start",
          paddingX: 1,
          columnGap: 1,
        }}
      >
        <Chip
          label={`${receta.TiempoPreparacion || 0} '`}
          icon={<MdTimer />}
          variant="outlined"
        />
        <Chip
          label={receta.Dificultad || "Fácil"}
          icon={<MdBarChart />}
          variant="outlined"
        />
        <Chip
          label={`${receta.Porciones || 1} porciones`}
          icon={<MdRestaurantMenu />}
          variant="outlined"
        />
      </CardContent>

      {/* Acciones */}
      <CardActions
        sx={{ justifyContent: "space-around", padding: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton edge="end" aria-label="edit">
          <MdEdit
            size={24}
            color="blue"
            onClick={(e) => {
              e.stopPropagation();
              handleEditRecipe(receta);
            }}
          />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenConfirmDialog(receta);
          }}
        >
          <MdDelete size={24} color="blue" />
        </IconButton>
        <IconButton edge="end" aria-label="share">
          <MdShare size={24} color="blue" />
        </IconButton>
        <IconButton edge="end" aria-label="print">
          <MdPrint size={24} color="blue" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
