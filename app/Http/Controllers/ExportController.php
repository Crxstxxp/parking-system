<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Parking;
use App\Exports\parkingExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportController extends Controller
{
    public function export(Request $request, string $format)
    {
        $request->validate([
            'tipo' => 'required|in:rango,hoy',
            'desde' => 'required|date',
            'hasta' => 'required|date',
            'agrupar' => 'nullable|in:horas,dias',
        ]);

        $from = Carbon::parse($request->input('desde'));
        $to = Carbon::parse($request->input('hasta'));
        $to->endOfMinute();

        $query = Parking::whereBetween('created_at', [$from, $to]);

        $data = $query->get();

        if ($format === 'excel') {
            return Excel::download(new parkingExport($data), 'exportacion.xlsx');
        } elseif ($format === 'pdf') {
            $pdf = PDF::loadView('exports.Parking', ['data' => $data]);
            return $pdf->download('exportacion.pdf');
        } else {
            abort(400, 'Formato no soportado');
        }
    }
}
