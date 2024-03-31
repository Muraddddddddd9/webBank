<?php

    $connect = mysqli_connect('localhost', 'root', 'pass', 'name_table');

    if (!$connect) {
        die('Error connect to DataBase');
    }