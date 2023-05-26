let mysql = require('mysql2')

/* 
cli -> 
docker exec -it mysqldb mysql -u root -p    --> root (probably)
create database testnode;
create user 'admin'@'localhost' identified by 'admin'; 
grant all privileges on `testnode`.* to 'admin'@'localhost';
flush privileges;
use testnode;
create table test(id int auto_increment primary key, nom varchar(50), prenom varchar(50), message text);
create table admin(id int auto_increment primary key, nom varchar(50), password text);
exit;
*/

let conn = mysql.createConnection({
    host : 'mysqldb',
    user : 'admin',
    password : 'admin',
    database : 'testnode'
})

conn.connect((err) => {
    if (err) throw err;
})

module.exports = conn