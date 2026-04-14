-- Donations table
\c raushni_backend;

CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id VARCHAR(50) UNIQUE NOT NULL,
    donor_name VARCHAR(200) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(20),
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100) UNIQUE,
    receipt_no VARCHAR(50) UNIQUE,
    purpose TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    donation_date TIMESTAMPTZ DEFAULT NOW(),
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_donations_donation_id ON donations(donation_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_date ON donations(donation_date);