import duckdb

# Define the file paths
csv_file = r'C:\Users\swath\DashCam_Practicum\SQL\Amazon Sales Report.csv'
db_file = 'amazon_sales.db'
table_name = 'sales_report'

# Connect to the DuckDB file. If the file doesn't exist, it will be created.
con = duckdb.connect(database=db_file)

# The READ_CSV_AUTO function is used to read the CSV file directly and infer the data types.
# The 'header=True' argument is standard when your CSV has column headers.
# The 'DELIMITER' argument might be needed if your CSV uses something other than a comma.

# To handle the encoding issue ('latin1' was used to read the file earlier), 
# we'll add the 'ENCODING' parameter to the SQL command.

sql_query = f"""
CREATE OR REPLACE TABLE {table_name} AS
SELECT *
FROM read_csv_auto('{csv_file}', HEADER=TRUE, ENCODING='LATIN1');
"""

# Execute the query
con.execute(sql_query)

# Optional: Verify the data was loaded by querying the first 5 rows
print(con.sql(f"SELECT * FROM {table_name} LIMIT 5;"))

# Close the connection and save the .db file
con.close()

print(f"\nSuccessfully created the DuckDB file: {db_file}")
print(f"Data is loaded into the table: {table_name}")

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