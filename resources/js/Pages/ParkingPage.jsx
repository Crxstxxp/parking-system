import React, { useState } from "react";
import SidebarLayout from "../Layouts/SidebarLayout";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
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
    Select,
    MenuItem,
} from "@mui/material";
import { router } from "@inertiajs/react";

const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
    )}`;
};

export default function ParkingPage({ data, vehicleTypes }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        placa: "",
        entrada: formatDate(new Date()),
        salida: formatDate(new Date(Date.now() + 3 * 60 * 60 * 1000)),
        id_tipo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = () => {
        const payload = {
            ...form,
            entrada: formatDate(form.entrada),
            salida: formatDate(form.salida),
        };

        router.post("/parking", payload, {
            onSuccess: () => {
                setOpen(false);
                setForm({
                    placa: "",
                    entrada: formatDate(new Date()),
                    salida: formatDate(
                        new Date(Date.now() + 3 * 60 * 60 * 1000)
                    ),
                    id_tipo: "",
                });
            },
            onError: (errors) => {
                console.error("Errores de validación:", errors);
            },
        });
    };

    return (
        <SidebarLayout>
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                    Estacionamiento
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ mr: 1 }}
                    >
                        Nuevo Registro
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<PictureAsPdfIcon />}
                        sx={{ mr: 1 }}
                    >
                        Exportar PDF
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#1D6F42",
                            "&:hover": { backgroundColor: "#155D35" },
                        }}
                        startIcon={<GridOnIcon />}
                    >
                        Exportar Excel
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>Entrada</TableCell>
                            <TableCell>Salida</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.placa}</TableCell>
                                <TableCell>{item.entrada}</TableCell>
                                <TableCell>{item.salida}</TableCell>
                                <TableCell>{item.vehicle_type.nombre}</TableCell>
                                <TableCell>{`$${item.vehicle_type.costo}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Nuevo Registro</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 1,
                    }}
                >
                    <TextField
                        label="Placa"
                        name="placa"
                        value={form.placa}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Entrada"
                        name="entrada"
                        value={form.entrada}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Salida"
                        name="salida"
                        value={form.salida}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Select
                        label="Tipo de vehículo"
                        name="id_tipo"
                        value={form.id_tipo}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Selecciona un tipo</em>
                        </MenuItem>
                        {vehicleTypes.map((tipo) => (
                            <MenuItem key={tipo.id_tipo} value={tipo.id_tipo}>
                                {tipo.nombre}
                            </MenuItem>
                        ))}
                    </Select>
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
