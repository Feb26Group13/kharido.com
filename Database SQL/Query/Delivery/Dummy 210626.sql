INSERT INTO addresses
(
userid,
street,
city,
state,
country,
pincode,
is_default
)
VALUES
(
3,
'MG Road',
'Mumbai',
'Maharashtra',
'India',
'400001',
1
);


INSERT INTO orders
(
userid,
addressid,
total_amount,
payment_status,
order_status
)
VALUES
(
3,
1,
2500,
'PAID',
'PLACED'
);

INSERT INTO delivery_assignments
(
orderid,
deliveryid,
pickup_status
)
VALUES
(
2,
1,
'PENDING'
);