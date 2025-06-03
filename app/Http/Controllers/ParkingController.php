<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\CreateParkingRegisterRequest;
use Inertia\Inertia;
use App\Models\{Parking, VehicleTypes};
use DB;

class ParkingController extends Controller
{

    public function getDataView()
    {
        $parkingData = Parking::with('vehicleType')->get()->toArray();
        $vehicleTypes = VehicleTypes::all()->filter()->toArray();


        return Inertia::render('Pages/ParkingPage', [
            'data' => $parkingData,
            'vehicleTypes' => $vehicleTypes
        ]);
    }

    public function store(CreateParkingRegisterRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $data = $this->getParkingData($request->validated());

            Parking::create($data);
            return redirect()->route('parking.index');
        });
    }

    private function getParkingData(array $data)
    {
        if (!isset($data['id_tipo'])) {
            throw new Exception('El tipo de vehículo es requerido');
        }

        $value = match ($data['id_tipo']) {
            1 => 0,
            2 => 1,
            3 => 3,
            default => throw new Exception('Tipo de vehículo inválido'),
        };

        return array_merge($data, ['costo' => $value]);
    }

}
