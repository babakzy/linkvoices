-- Update seeded demo invoice to use product-based line items
-- and derive invoice total from the sum of item amounts.
DO $$
DECLARE
    v_demo_invoice_uuid UUID := 'fff45e65-9088-4928-9261-38abe1944cec';
    v_items JSONB := '[
        {
            "name": "Landing Page Design Package",
            "quantity": 1,
            "rate": 950.00,
            "tax": 0,
            "amount": 950.00
        },
        {
            "name": "Nuxt Frontend Implementation Package",
            "quantity": 1,
            "rate": 2400.00,
            "tax": 0,
            "amount": 2400.00
        },
        {
            "name": "Backend API Integration Package",
            "quantity": 1,
            "rate": 1350.00,
            "tax": 0,
            "amount": 1350.00
        },
        {
            "name": "QA and Launch Support",
            "quantity": 2,
            "rate": 305.00,
            "tax": 0,
            "amount": 610.00
        }
    ]'::jsonb;
BEGIN
    UPDATE invoices
    SET
        items = v_items,
        total = COALESCE(
            (
                SELECT ROUND(SUM((item->>'amount')::numeric), 2)
                FROM jsonb_array_elements(v_items) AS item
            ),
            0
        )
    WHERE invoice_uuid = v_demo_invoice_uuid;
END $$;
