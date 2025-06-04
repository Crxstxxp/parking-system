<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateParkingRegisterRequest;
use Inertia\Inertia;
use App\Models\{Parking, VehicleTypes};
use Illuminate\Support\Facades\DB;

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
            Parking::create($request->validated());
            return redirect()->route('parking.index');
        });
    }
}
