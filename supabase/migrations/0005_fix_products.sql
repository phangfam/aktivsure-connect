-- Remove products that were never real (AktivSure Cardio, AktivSure Joint) —
-- only AktivSure DM (milk powder) is an actual product. Reassign any demo
-- contacts pointing at the removed products to DM first, so the delete
-- doesn't violate the contacts.product_id FK.
update contacts
set product_id = (select id from products where slug = 'aktivsure-dm')
where product_id in (
  select id from products where slug in ('aktivsure-cardio', 'aktivsure-joint')
);

delete from products where slug in ('aktivsure-cardio', 'aktivsure-joint');
