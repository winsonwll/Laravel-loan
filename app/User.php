<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * 可以被批量赋值的属性
     *
     * @var array
     */
    protected $fillable = [
        'phone', 'password', 'name', 'sex', 'client_type', 'last_login_time', 'last_login_ip', 'status', 'created_at', 'updated_at', 'remember_token'
    ];

    /**
     * 在数组中隐藏的属性
     *
     * @var array
     */
    protected $hidden = [
        'password', 'client_type', 'last_login_time', 'last_login_ip', 'created_at', 'updated_at', 'remember_token'
    ];
}
