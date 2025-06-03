<?php

namespace App\Http\Controllers;

use App\Models\VehicleTypes;
use Illuminate\Http\Request;

class VehiclesTypesController extends Controller
{
    public function index()
    {
        return VehicleTypes::all();
    }
}
