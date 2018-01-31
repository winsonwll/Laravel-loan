<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempPhone extends Model
{
    protected $table = 'temp_phone';
    protected $primaryKey = 'id';

    public $timestamps = false;

    //不可被批量赋值的属性。即所有的属性都可以被批量赋值
    protected $guarded = [];
}
