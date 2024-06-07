<?php

use App\Http\Controllers\GaugeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/gauge',[GaugeController::class, 'index'])->name('groupedGauges');
Route::get('/', function () {return Inertia::render('GaugeMonitorPage');});

require __DIR__.'/auth.php';
