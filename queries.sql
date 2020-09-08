--list of all products
SELECT * from PRODUCTS;

select productID, productName 
from products;

select ProductName, Price, Unit
from products;

--list of all customers from UK
select * 
from customers
where country = 'UK'; -- this sample database has case sensitive string comparisons

--list of customers from UK or Berlin
select * 
from CUSTOMERS
where Country='UK' OR City='Berlin';

--list of all customers from the UK or USA
select * 
from CUSTOMERS
where Country='UK' OR Country = 'USA'


--list of all customers from the UK or USA using IN Clause
select * 
from CUSTOMERS
where country IN ('UK','USA')

--list of 5 cheapest products
select * from products
where price
order by price
limit 5;

--list of 5 expensive products
select * from products
where price
order by price desc
limit 5;

-- add a new shipping company
INSERT into shippers (shipperName, Phone)
values('Broken Packages', '(503) 666-9966')

--add a mutliple at the same time
insert into shippers (phone, shipperName)
values ('(212) 555-1212', 'LS Shipping'), ('(212) 555-1214', 'Code Shipping');

--fix the errors
--select * from shippers
update shippers set shipperName = 'Lambda Shipping', Phone = '(212) 555-1211'
where shipperID = 4;

--deleting a record
--select * from shippers
delete from shippers
where shipperID = 4;