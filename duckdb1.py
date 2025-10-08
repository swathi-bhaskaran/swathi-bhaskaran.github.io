import duckdb
import pandas as pd
import matplotlib.pyplot as plt

# 1. DEFINE THE CORRECTED PATH TO THE FILE
# The path now points to your specific directory and includes the file name.
# Forward slashes (/) are used to ensure the path is read correctly by Python/DuckDB.
sales_report_path = 'C:/Users/swath/DashCam_Practicum/temp_portfolio/hq4743.github.io/Amazon Sale Report.csv'

# The SQL query to get the top 10 categories by total sales
sql_query = f"""
SELECT
    Category,
    SUM(Amount) AS Total_Sales
FROM
    '{sales_report_path}' -- DuckDB now points directly to your file
GROUP BY
    Category
ORDER BY
    Total_Sales DESC
LIMIT 10;
"""

print(f"Attempting to query file: {sales_report_path}\n")

try:
    # 2. Connect to an in-memory database
    con = duckdb.connect(database=':memory:', read_only=True)
    
    # 3. Execute the SQL query and fetch the results into a Pandas DataFrame
    top_categories_df = con.sql(sql_query).df()
    
    # 4. Close the connection
    con.close()
    
    # 5. Display Results and Create a Plot
    print("DuckDB Query Results (Top 10 Sales Categories):")
    print(top_categories_df)

    # Visualization
    plt.figure(figsize=(12, 6))
    plt.bar(
        top_categories_df['Category'], 
        top_categories_df['Total_Sales'], 
        color='gold'
    )
    plt.xlabel('Category')
    plt.ylabel('Total Sales ($)')
    plt.title('Top 10 E-Commerce Categories by Total Sales')
    plt.xticks(rotation=45, ha='right')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.show()

except Exception as e:
    print("\n--- ERROR ---")
    print("Failed to run DuckDB query. Please check the following:")
    print(f"1. Is the file exactly at this path: {sales_report_path}")
    print(f"2. Does the CSV contain columns named 'Category' and 'Amount' (case-sensitive)?")
    print(f"DuckDB reported the error: {e}")