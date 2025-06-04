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
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { router } from "@inertiajs/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
    )}`;
};

const steps = ["Tipo de exportación", "Resumen"];

export default function ParkingPage({ data, vehicleTypes }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        placa: "",
        entrada: formatDate(new Date()),
        id_tipo: "",
    });

    const [filtroDesde, setFiltroDesde] = useState(null);
    const [filtroHasta, setFiltroHasta] = useState(null);

    const [openExportOptions, setOpenExportOptions] = useState(false);
    const [tipoExportacion, setTipoExportacion] = useState("pdf");
    const [exportType, setExportType] = useState("rango");
    const [groupBy, setGroupBy] = useState("horas");
    const [activeStep, setActiveStep] = useState(0);

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
                    id_tipo: "",
                });
            },
            onError: (errors) => {
                console.error("Errores de validación:", errors);
            },
        });
    };

    const registrarSalida = (id) => {
    const time = formatDate(new Date());

    router.post(`/parking/${id}`, { salida: time }, {
        onSuccess: () => {
            alert("Salida registrada correctamente.");
            router.reload();
        },
        onError: (err) => {
            console.error("Error al registrar salida", err);
        }
    });
};

    const openExportDialog = (tipo) => {
        setTipoExportacion(tipo);
        setExportType("rango");
        setGroupBy("horas");
        setFiltroDesde(null);
        setFiltroHasta(null);
        setActiveStep(0);
        setOpenExportOptions(true);
    };

    const handleExport = () => {
        if (exportType === "rango" && (!filtroDesde || !filtroHasta)) {
            alert("Selecciona un rango de fechas.");
            return;
        }

        let params = new URLSearchParams({
            tipo: exportType,
            agrupar: groupBy,
        });

        if (filtroDesde && filtroHasta) {
            params.append("desde", filtroDesde.toISOString());
            params.append("hasta", filtroHasta.toISOString());
        }

        window.open(
            `/export/${tipoExportacion}?${params.toString()}`,
            "_blank"
        );
        setOpenExportOptions(false);
    };

    const handleNext = () => {
        if (activeStep === 0) {
            setActiveStep(1);
        } else if (activeStep === 1) {
            if (!filtroDesde || !filtroHasta) {
                alert("Selecciona el rango de fechas/horas para continuar.");
                return;
            }
            if (filtroDesde > filtroHasta) {
                alert(
                    "La fecha/hora 'Desde' debe ser menor o igual a 'Hasta'."
                );
                return;
            }
            handleExport();
        }
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
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
                        onClick={() => openExportDialog("pdf")}
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
                        onClick={() => openExportDialog("excel")}
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
                                <TableCell>
                                    {item.salida ? (
                                        item.salida
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() =>
                                                registrarSalida(item.id)
                                            }
                                        >
                                            Registrar salida
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.vehicle_type.nombre}
                                </TableCell>
                                <TableCell>{`$${item.vehicle_type.costo}`}</TableCell>
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

            <Dialog
                open={openExportOptions}
                onClose={() => setOpenExportOptions(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Exportar datos</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box mt={3} display="flex" flexDirection="column" gap={2}>
                        {activeStep === 0 && (
                            <>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    {exportType === "rango" ? (
                                        <>
                                            <DateTimePicker
                                                label="Desde"
                                                value={filtroDesde}
                                                onChange={setFiltroDesde}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                            <DateTimePicker
                                                label="Hasta"
                                                value={filtroHasta}
                                                onChange={setFiltroHasta}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <DateTimePicker
                                                label="Hora desde (hoy)"
                                                value={filtroDesde}
                                                onChange={(val) => {
                                                    if (!val) return;
                                                    const hoy = new Date();
                                                    val.setFullYear(
                                                        hoy.getFullYear(),
                                                        hoy.getMonth(),
                                                        hoy.getDate()
                                                    );
                                                    setFiltroDesde(val);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                            <DateTimePicker
                                                label="Hora hasta (hoy)"
                                                value={filtroHasta}
                                                onChange={(val) => {
                                                    if (!val) return;
                                                    const hoy = new Date();
                                                    val.setFullYear(
                                                        hoy.getFullYear(),
                                                        hoy.getMonth(),
                                                        hoy.getDate()
                                                    );
                                                    setFiltroHasta(val);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </>
                                    )}
                                </LocalizationProvider>
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Resumen
                                </Typography>
                                <Typography>
                                    Tipo de exportación:{" "}
                                    <b>
                                        {exportType === "hoy"
                                            ? "Por horas (solo hoy)"
                                            : "Por rango de días"}
                                    </b>
                                </Typography>

                                {filtroDesde && filtroHasta ? (
                                    <Typography>
                                        Desde:{" "}
                                        <b>{filtroDesde.toLocaleString()}</b>
                                        <br />
                                        Hasta:{" "}
                                        <b>{filtroHasta.toLocaleString()}</b>
                                    </Typography>
                                ) : (
                                    <Typography color="error">
                                        Faltan datos para el rango.
                                    </Typography>
                                )}

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Esta opción agrupará los datos dentro del
                                    rango seleccionado.
                                </Typography>
                            </>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions>
                    {activeStep > 0 && (
                        <Button onClick={handleBack}>Atrás</Button>
                    )}

                    {activeStep < steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (!filtroDesde || !filtroHasta) {
                                    alert(
                                        "Selecciona el rango de fechas/horas."
                                    );
                                    return;
                                }
                                if (filtroDesde > filtroHasta) {
                                    alert(
                                        "La fecha/hora 'Desde' debe ser menor o igual a 'Hasta'."
                                    );
                                    return;
                                }
                                setActiveStep((prev) => prev + 1);
                            }}
                        >
                            Siguiente
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleExport}>
                            Descargar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </SidebarLayout>
    );
}
