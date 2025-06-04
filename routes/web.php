<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () =>Inertia::render('Home'));

Route::get('/parking', 'App\Http\Controllers\ParkingController@getDataView')->name('parking.index');
Route::post('/parking', 'App\Http\Controllers\ParkingController@store');
Route::post('/parking/{id}', 'App\Http\Controllers\ParkingController@update');

Route::get('/vehicles', 'App\Http\Controllers\VehiclesTypesController@getDataView')->name('vehicles.index');
Route::post('/vehicles', 'App\Http\Controllers\VehiclesTypesController@store');

Route::get('/export/{format}', 'App\Http\Controllers\ExportController@export');

