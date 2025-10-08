# report.py

import duckdb
# The corrected full file path should be here, e.g.:
csv_file = r'C:\Users\swath\DashCam_Practicum\SQL\Amazon Sales Report.csv'
db_file = 'amazon_sales.db'
table_name = 'sales_report'

# --- 1. Creation and Loading (Run this once) ---
print("Attempting to create and load database...")
con = duckdb.connect(database=db_file)
sql_create = f"""
CREATE OR REPLACE TABLE {table_name} AS
SELECT *
FROM read_csv_auto('{csv_file}', HEADER=TRUE, ENCODING='LATIN1');
"""
con.execute(sql_create)
con.close()
print("Database created successfully!")

# --- 2. Verification and Analysis (Run this as many times as you like) ---
con = duckdb.connect(database=db_file)

# Verification Query
print(f"Total rows loaded: {con.sql(f'SELECT COUNT(*) FROM {table_name};')}")

# Revenue/SKU Analysis Query
analysis_query = f"""... (your full analysis query here) ..."""
print("\nAnalysis Results:")
print(con.sql(analysis_query))

con.close()