Keyset pagination

psql -h localhost -p 5432 -U postgres

\c test - connect to db


create table person (
    id bigserial not null primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    validated bool default false
);

insert into person (first_name, last_name, email) 
values ('alice', 'pg', 'alice@pg.com');

insert into person (first_name, last_name, email) 
values ('bob', 'pg', 'bob@pg.com');


create table regions (
    id bigserial not null primary key,
    name varchar(50) not null
);

insert into regions (name) 
values ('Vychod'), ('Zapad'), ('Stred') ;

create table cities (
    id bigserial not null primary key,
    name varchar(50) not null,
    region_id int not null
);

insert into cities (name, region_id) 
values ('Kosice', 0), ('Presov', 0), ('Bratislava', 1), ('Zvolen', 2) ;

create table sensors (
    id bigserial not null primary key,
    city_id int not null
);

insert into sensors (city_id) 
values (0),(0),(0),(0),(1),(1),(2),(2);


create table measurements (
    id bigserial not null primary key,
    sensor_id int not null,
    measured_at timestamp,
    temperature numeric(5,2)
);

insert into measurements (sensor_id, ) 
values (0, ),(0),(0),(0),(1),(1),(2),(2);

OVER (ORDER BY m.measured_at ASC)

select c.name, m.measured_at, m.temperature, m.temperature - avg(m.temperature) over (partition by c.name order by m.measured_at) foo  
from cities c 
join sensors s on c.id = s.city_id 
join measurements m on m.sensor_id = s.id 
order by c.name, m.measured_at;

insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T00:00:00Z', 5, 10);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T01:00:00Z', 5, 20);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T02:00:00Z', 5, 30);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T03:00:00Z', 5, 40);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T04:00:00Z', 5, 50);

insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T00:00:00Z', 7, 10);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T01:00:00Z', 7, 20);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T02:00:00Z', 7, 30);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T03:00:00Z', 7, 40);
insert into measurements (measured_at, sensor_id, temperature) values ('2021-01-01T04:00:00Z', 7, 50);

select *
from cities c 
join sensors s on c.id = s.city_id 
join measurements m on m.sensor_id = s.id 