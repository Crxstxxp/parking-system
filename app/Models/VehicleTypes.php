<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleTypes extends Model
{
    protected $table = 'vehicle_types';
    public $timestamps = false;

    protected $fillable = ['nombre'];

    public function parkings()
    {
        return $this->belongsTo('App\Models\Parkings', 'id_tipo', 'id_tipo');
    }
}
