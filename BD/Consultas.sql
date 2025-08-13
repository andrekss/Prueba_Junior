create table Historial_Preguntas (
     id serial,
     pregunta text,
     respuesta text,
     Fecha date
)


select * from Historial_Preguntas;
alter table Historial_Preguntas
add column Fecha date;