<?php

namespace App\Models;

class M3Result {

    public $status;
    public $msg;

    public function toJson()
    {
        return json_encode($this, JSON_UNESCAPED_UNICODE);
    }
}
