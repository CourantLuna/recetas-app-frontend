import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilo personalizado para el overlay del diálogo
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Fondo translúcido negro
  },
}));

const DeleteDialog = ({ open, onClose, onConfirm, itemName, itemLabel, title }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro de que deseas eliminar {itemLabel} <strong>{itemName}</strong>? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
        >
          Eliminar
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeleteDialog;
