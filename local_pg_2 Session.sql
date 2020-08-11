truncate TABLE "Institutions" RESTART IDENTITY ;
truncate TABLE "Users" RESTART IDENTITY ;
truncate TABLE "Customers" RESTART IDENTITY ;
truncate TABLE "Accounts" RESTART IDENTITY ;
truncate TABLE "Addresses" RESTART IDENTITY ;
truncate TABLE "BusinessImages" RESTART IDENTITY ;
--ALTER table "Users" drop column "ActivationLink"
-- select "ActivationLink" from "Users"
