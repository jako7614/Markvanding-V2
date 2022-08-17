drop database if exists markvanding;
create database markvanding;
use markvanding;

create table machines(
id int primary key not null,
pumpname text,
time datetime,
active bool not null
);

create table pumps(
id int primary key not null auto_increment,
name text not null,
number text not null,
active bool not null,
startcode text not null,
stopcode text not null
);

INSERT INTO machines (id, active) VALUES (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0), (8, 0), (9, 0), (10, 0), (11, 0), (12, 0);
INSERT INTO pumps (name, number, active, startcode, stopcode) VALUES
("Bom", "61542121", 0, "T", "S"),
("Dover", "61741817", 0, "T", "S"),
("Egeris Nord", "42181163", 0, "T", "S"),
("Egeris Syd", "42181162", 0, "T", "S"),
("Grænsevej", "54557199", 0, "T", "S"),
("Hjerrild", "60489986", 0, "Tx", "S"),
("Kongeåvej", "91899834", 0, "T", "S"),
("Langtofte", "54557795", 0, "T", "S"),
("Nyvej", "51765105", 0, "T", "S"),
("Sønderskov", "22984242", 0, "Tt", "S"),
("Vesterlund", "60487449", 0, "T", "S"),
("Ågård", "42181161", 0, "T", "S");

create table maintenance (
id int primary key not null auto_increment,
machineid int not null,
time datetime not null,
note text not null
)