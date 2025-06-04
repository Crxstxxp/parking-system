<?php

namespace App\Http\Controllers;

use App\Models\VehicleTypes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CreateVehicleTypeRequest;

class VehiclesTypesController extends Controller
{
    public function getDataView()
    {
        return inertia::render('Pages/VeiclesTypesPage', [
            'data' => VehicleTypes::all()->filter()->toArray()
        ]);
    }

    public function store(CreateVehicleTypeRequest $request)
    {
        VehicleTypes::create($request->validated());
        return redirect()->route('vehicles.index')->with('success', 'Vehicle type created successfully.');
    }
}
