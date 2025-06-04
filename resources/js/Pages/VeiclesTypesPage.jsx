import React, { useState } from "react";
import SidebarLayout from "../Layouts/SidebarLayout";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { router } from "@inertiajs/react";

export default function VehicleTypesPage({ data }) {
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [costo, setCosto] = useState("");

    const handleAdd = () => {
        router.post(
            "/vehicles",
            { nombre, costo },
            {
                onSuccess: () => {
                    setOpen(false);
                    setNombre("");
                    setCosto("");
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error("Errores de validación:", errors);
                },
            }
        );
    };

    return (
        <SidebarLayout>
            <Box
                mb={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h5" fontWeight="bold">
                    Tipos de Vehículos
                </Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Nuevo Tipo
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id_tipo}>
                                <TableCell>{item.id_tipo}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{`$${item.costo}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Nuevo Tipo de Vehículo</DialogTitle>
                <DialogContent sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        label="Costo"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}
                        type="number"
                        fullWidth
                        inputProps={{ min: 0, step: "0.01" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleAdd}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </SidebarLayout>
    );
}
