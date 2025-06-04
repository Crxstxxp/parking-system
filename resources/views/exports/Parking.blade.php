<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Exportación PDF</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #eee;
        }
    </style>
</head>
<body>
    <h2>Registros de Parking</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Hora de entrada</th>
                <th>Hora de salida</th>
                <th>Costo</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->placa }}</td>
                    <td>{{ $item->entrada }}</td>
                    <td>{{ $item->salida }}</td>
                    <td>{{ "$" . $item->vehicleType->costo }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
