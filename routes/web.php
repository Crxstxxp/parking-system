<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () =>Inertia::render('Home'));

Route::get('/parking', 'App\Http\Controllers\ParkingController@getDataView')->name('parking.index');
Route::post('/parking', 'App\Http\Controllers\ParkingController@store');

Route::get('/vehicles', 'App\Http\Controllers\VehiclesTypesController@getDataView')->name('vehicles.index');
Route::post('/vehicles', 'App\Http\Controllers\VehiclesTypesController@store')->name('vehicles.index');

Route::get('/export/{format}', 'App\Http\Controllers\ExportController@export');

