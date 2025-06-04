<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateParkingRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'placa' => 'required|string|max:10',
            'entrada' => 'required|date',
            'id_tipo' => 'required|integer|exists:vehicle_types,id_tipo',
        ];
    }
}
