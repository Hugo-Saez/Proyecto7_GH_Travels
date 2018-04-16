#!/usr/bin/env bash

sudo apt-get update
debconf-set-selections <<< "mysql-server mysql-server/root_password password mysql"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password mysql"
sudo apt-get install -y mysql-server php-mysql
sudo dpkg --configure -a
sudo apt-get -y install nodejs
sudo apt-get -y install nodejs-legacy
sudo apt-get -y install npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

echo 'CREATE DATABASE IF NOT EXISTS Actividad3 CHARACTER SET Latin1 COLLATE latin1_spanish_ci;'> basededatos.sql
echo 'USE Actividad3;' >> basededatos.sql
echo 'CREATE TABLE usuarios (id INT NOT NULL AUTO_INCREMENT,usuario VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,password VARCHAR(50) NOT NULL,PRIMARY KEY (id));' >> basededatos.sql
cat basededatos.sql

sudo mysql -uroot -pmysql < basededatos.sql