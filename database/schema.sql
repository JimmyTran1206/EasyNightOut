set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price_range" INT NOT NULL check ("price_range">=1 AND "price_range"<=5),
    PRIMARY KEY ("id")
);

INSERT INTO "restaurants" ("name", "location", "price_range")
    values ('McDonalds', 'New York', 3),
            ('pizza','Vegas', 2),
            ('Wendys', 'Denver',1) ;

CREATE TABLE "public"."reviews" (
    "review_id" SERIAL NOT NULL PRIMARY KEY,
    "restaurant_id" INT NOT NULL REFERENCES restaurants (id),
    "name" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INT NOT NULL check ("rating">=1 AND "rating"<=5)
);

INSERT INTO reviews ("restaurant_id", "name", "review", "rating")
    VALUES (1,'Johnny','Yes this is awesome',5),
            (2,'Sangri','Yes this is okie',3);
