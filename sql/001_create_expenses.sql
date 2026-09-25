CREATE TABLE expenses (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    amount NUMERIC(10,2) NOT NULL CHECK(amount>0),
    description TEXT NOT NULL,
    expense_date DATE NOT NULL,
    category TEXT NOT NULL
);
