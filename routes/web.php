<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () =>Inertia::render('Home'));

Route::get('/parking', 'App\Http\Controllers\ParkingController@getDataView')->name('parking.index');
Route::post('/parking', 'App\Http\Controllers\ParkingController@store');

Route::get('/vehicles', fn () => Inertia::render('Pages/VeicleTypesPage'));


