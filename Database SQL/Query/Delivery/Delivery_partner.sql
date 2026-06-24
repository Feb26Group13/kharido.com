INSERT INTO roles
(roleid,rolename)
VALUES
(4,'DELIVERY_PARTNER');


CREATE TABLE delivery_partners(
    deliveryid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,

    city VARCHAR(100) UNIQUE NOT NULL,

    company_name VARCHAR(100) NOT NULL,

    phone VARCHAR(15),

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE',

    FOREIGN KEY(userid)
    REFERENCES users(userid)
);


CREATE TABLE delivery_assignments(
    assignmentid INT PRIMARY KEY AUTO_INCREMENT,

    orderid INT NOT NULL,

    deliveryid INT NOT NULL,

    assigned_date DATETIME
    DEFAULT CURRENT_TIMESTAMP,

    pickup_status ENUM(
        'PENDING',
        'PICKED',
        'IN_TRANSIT',
        'DELIVERED'
    ) DEFAULT 'PENDING',

    FOREIGN KEY(orderid)
    REFERENCES orders(orderid),

    FOREIGN KEY(deliveryid)
    REFERENCES delivery_partners(deliveryid)
);

INSERT INTO users
(username,email,password,roleid,status)
VALUES
(
'delivery_mumbai',
'mumbai@kharido.com',
'12345',
4,
'ACTIVE'
),

(
'delivery_pune',
'pune@kharido.com',
'12345',
4,
'ACTIVE'
),

(
'delivery_nagpur',
'nagpur@kharido.com',
'12345',
4,
'ACTIVE'
);


INSERT INTO delivery_partners
(
userid,
city,
company_name,
phone
)
VALUES
(
6,
'Mumbai',
'Kharido Logistics',
'9999999991'
),

(
7,
'Pune',
'Kharido Logistics',
'9999999992'
),

(
8,
'Nagpur',
'Kharido Logistics',
'9999999993'
);





