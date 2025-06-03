import React from 'react';
import SidebarLayout from '../Layouts/SidebarLayout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const productos = [
    { id: 1, nombre: 'Laptop', precio: '$800' },
    { id: 2, nombre: 'Mouse', precio: '$20' },
    { id: 3, nombre: 'Teclado', precio: '$35' },
];

export default function VeicleTypesPage() {
    return (
        <SidebarLayout>
            <h1 className="text-2xl font-bold mb-4">Productos</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map(producto => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.id}</TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>{producto.precio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SidebarLayout>
    );
}
