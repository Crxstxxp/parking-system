<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

route::get('/dashboard', fn() => Inertia::render('Home'));
