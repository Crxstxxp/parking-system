<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class ParkingExport implements FromCollection, WithHeadings
{
    protected $registros;

    public function __construct(Collection $registros)
    {
        $this->registros = $registros;
    }

    public function collection()
    {
        return $this->registros->map(
            fn($item) =>
            [
                'ID' => $item->id,
                'Placa' => $item->placa,
                'Hora Entrada' => $item->entrada,
                'Hora Salida' => $item->salida,
                'Costo' => '$' . $item->vehicleType->costo,
            ]
        );
    }

    public function headings(): array
    {
        return [
            'ID',
            'Placa',
            'Hora Entrada',
            'Hora Salida',
            'Costo',
        ];
    }
}
