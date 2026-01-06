import pg from 'pg'

//Configura tu conexion a la base de datos
export const pool = new pg.Pool({
    user:'admin',
    host:'localhost',
    database:'floristeria',
    password:'1234',
    port:"5432"

});
