#!/usr/bin/env python3
"""
Simple Amazon Analysis Script
Handles encoding issues and creates basic analysis
"""

import duckdb
import pandas as pd
import json

def run_analysis():
    print("🚀 Starting Amazon Analysis...")
    
    # Connect to DuckDB
    con = duckdb.connect(database=':memory:')
    
    try:
        # Try different encodings
        csv_file = r'C:\Users\swath\DashCam_Practicum\temp_portfolio\hq4743.github.io\Amazon Sale Report.csv'
        
        # Load data with UTF-8 first
        try:
            con.execute(f"""
                CREATE OR REPLACE TABLE amazon_sales AS
                SELECT * FROM read_csv_auto('{csv_file}', HEADER=TRUE, ENCODING='UTF8');
            """)
            print("✅ Loaded data with UTF-8 encoding")
        except:
            try:
                con.execute(f"""
                    CREATE OR REPLACE TABLE amazon_sales AS
                    SELECT * FROM read_csv_auto('{csv_file}', HEADER=TRUE, ENCODING='LATIN1');
                """)
                print("✅ Loaded data with LATIN1 encoding")
            except:
                con.execute(f"""
                    CREATE OR REPLACE TABLE amazon_sales AS
                    SELECT * FROM read_csv_auto('{csv_file}', HEADER=TRUE);
                """)
                print("✅ Loaded data with auto-detected encoding")
        
        # Get basic stats
        result = con.execute("SELECT COUNT(*) as total_records FROM amazon_sales").fetchone()
        print(f"📊 Total Records: {result[0]:,}")
        
        # Channel analysis
        channel_query = """
        SELECT 
            Fulfilment,
            COUNT(*) as total_orders,
            SUM(Amount) as total_revenue,
            ROUND(100.0 * SUM(Amount) / (SELECT SUM(Amount) FROM amazon_sales WHERE Amount > 0), 2) as revenue_percentage,
            COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) as failed_orders,
            ROUND(100.0 * COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) / COUNT(*), 2) as failure_rate
        FROM amazon_sales
        WHERE Amount > 0
        GROUP BY Fulfilment
        ORDER BY total_revenue DESC;
        """
        
        channel_results = con.execute(channel_query).fetchall()
        print(f"\n🚚 Channel Performance:")
        for row in channel_results:
            print(f"   {row[0]}: {row[3]}% revenue, {row[5]}% failure rate")
        
        # Geographic analysis
        geo_query = """
        SELECT 
            "ship-state" as state,
            COUNT(*) as total_orders,
            COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) as failed_orders,
            ROUND(100.0 * COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) / COUNT(*), 2) as failure_rate
        FROM amazon_sales
        WHERE Amount > 0 AND "ship-state" IS NOT NULL
        GROUP BY "ship-state"
        HAVING COUNT(*) >= 50
        ORDER BY failure_rate DESC
        LIMIT 5;
        """
        
        geo_results = con.execute(geo_query).fetchall()
        print(f"\n🗺️ Top 5 States by Failure Rate:")
        for row in geo_results:
            print(f"   {row[0]}: {row[3]}% failure rate ({row[2]} failed out of {row[1]} orders)")
        
        # Category analysis
        category_query = """
        SELECT 
            Category,
            COUNT(*) as total_orders,
            SUM(Amount) as total_revenue,
            ROUND(100.0 * SUM(Amount) / (SELECT SUM(Amount) FROM amazon_sales WHERE Amount > 0), 2) as revenue_percentage
        FROM amazon_sales
        WHERE Amount > 0 AND Category IS NOT NULL
        GROUP BY Category
        ORDER BY total_revenue DESC
        LIMIT 5;
        """
        
        category_results = con.execute(category_query).fetchall()
        print(f"\n📦 Top 5 Categories by Revenue:")
        for row in category_results:
            print(f"   {row[0]}: {row[3]}% revenue share (₹{row[2]:,.2f})")
        
        # Save results
        results = {
            'total_records': result[0],
            'channel_analysis': [{'fulfillment': r[0], 'revenue_percentage': r[3], 'failure_rate': r[5]} for r in channel_results],
            'geographic_analysis': [{'state': r[0], 'failure_rate': r[3], 'failed_orders': r[2], 'total_orders': r[1]} for r in geo_results],
            'category_analysis': [{'category': r[0], 'revenue_percentage': r[3], 'total_revenue': r[2]} for r in category_results]
        }
        
        with open('amazon_analysis_results.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n✅ Analysis complete! Results saved to amazon_analysis_results.json")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    
    finally:
        con.close()

if __name__ == "__main__":
    run_analysis()
