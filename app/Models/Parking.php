<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    protected $table = 'parking_records';

    protected $fillable = [
        'placa',
        'entrada',
        'salida',
        'id_tipo'
    ];

    public function vehicleType()
    {
        return $this->hasOne('App\Models\VehicleTypes', 'id_tipo', 'id_tipo');
    }
}
