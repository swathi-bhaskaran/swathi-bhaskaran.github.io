#!/usr/bin/env python3
"""
Amazon Logistics Optimization Analysis Generator
Generates comprehensive analysis and visualizations for Amazon seller data
"""

import duckdb
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import json
import os

class AmazonAnalysisGenerator:
    def __init__(self, csv_file_path):
        self.csv_file_path = csv_file_path
        self.con = None
        self.results = {}
        
    def connect_to_duckdb(self):
        """Connect to DuckDB and load the Amazon sales data"""
        try:
            self.con = duckdb.connect(database=':memory:')
            
            # Load the CSV data
            load_query = f"""
            CREATE OR REPLACE TABLE amazon_sales AS
            SELECT * FROM read_csv_auto('{self.csv_file_path}', HEADER=TRUE, ENCODING='LATIN1');
            """
            
            self.con.execute(load_query)
            print("✅ Successfully loaded Amazon sales data into DuckDB")
            return True
            
        except Exception as e:
            print(f"❌ Error connecting to DuckDB: {e}")
            return False
    
    def get_data_summary(self):
        """Get basic data summary statistics"""
        try:
            summary_query = """
            SELECT 
                COUNT(*) as total_records,
                COUNT(DISTINCT "Order ID") as unique_orders,
                COUNT(DISTINCT Category) as unique_categories,
                COUNT(DISTINCT "ship-state") as unique_states,
                SUM(Amount) as total_revenue,
                AVG(Amount) as avg_order_value
            FROM amazon_sales
            WHERE Amount > 0;
            """
            
            result = self.con.execute(summary_query).fetchone()
            self.results['summary'] = {
                'total_records': result[0],
                'unique_orders': result[1],
                'unique_categories': result[2],
                'unique_states': result[3],
                'total_revenue': result[4],
                'avg_order_value': result[5]
            }
            
            print(f"📊 Data Summary:")
            print(f"   Total Records: {result[0]:,}")
            print(f"   Unique Orders: {result[1]:,}")
            print(f"   Categories: {result[2]}")
            print(f"   States: {result[3]}")
            print(f"   Total Revenue: ₹{result[4]:,.2f}")
            print(f"   Avg Order Value: ₹{result[5]:,.2f}")
            
        except Exception as e:
            print(f"❌ Error getting data summary: {e}")
    
    def analyze_channel_performance(self):
        """Analyze fulfillment channel performance"""
        try:
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
            
            result = self.con.execute(channel_query).fetchall()
            self.results['channel_analysis'] = []
            
            print(f"\n🚚 Channel Performance Analysis:")
            for row in result:
                channel_data = {
                    'fulfillment': row[0],
                    'total_orders': row[1],
                    'total_revenue': row[2],
                    'revenue_percentage': row[3],
                    'failed_orders': row[4],
                    'failure_rate': row[5]
                }
                self.results['channel_analysis'].append(channel_data)
                
                print(f"   {row[0]}:")
                print(f"     Revenue Share: {row[3]}%")
                print(f"     Failure Rate: {row[5]}%")
                print(f"     Total Revenue: ₹{row[2]:,.2f}")
            
        except Exception as e:
            print(f"❌ Error analyzing channel performance: {e}")
    
    def analyze_geographic_performance(self):
        """Analyze performance by geographic region"""
        try:
            geo_query = """
            SELECT 
                "ship-state" as state,
                COUNT(*) as total_orders,
                SUM(Amount) as total_revenue,
                COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) as failed_orders,
                ROUND(100.0 * COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) / COUNT(*), 2) as failure_rate
            FROM amazon_sales
            WHERE Amount > 0 AND "ship-state" IS NOT NULL
            GROUP BY "ship-state"
            HAVING COUNT(*) >= 100  -- Only states with significant volume
            ORDER BY failure_rate DESC
            LIMIT 10;
            """
            
            result = self.con.execute(geo_query).fetchall()
            self.results['geographic_analysis'] = []
            
            print(f"\n🗺️ Geographic Performance Analysis (Top 10 by Failure Rate):")
            for row in result:
                geo_data = {
                    'state': row[0],
                    'total_orders': row[1],
                    'total_revenue': row[2],
                    'failed_orders': row[3],
                    'failure_rate': row[4]
                }
                self.results['geographic_analysis'].append(geo_data)
                
                print(f"   {row[0]}: {row[4]}% failure rate ({row[3]} failed out of {row[1]} orders)")
            
        except Exception as e:
            print(f"❌ Error analyzing geographic performance: {e}")
    
    def analyze_category_performance(self):
        """Analyze performance by product category"""
        try:
            category_query = """
            SELECT 
                Category,
                COUNT(*) as total_orders,
                SUM(Amount) as total_revenue,
                ROUND(100.0 * SUM(Amount) / (SELECT SUM(Amount) FROM amazon_sales WHERE Amount > 0), 2) as revenue_percentage,
                AVG(Amount) as avg_order_value
            FROM amazon_sales
            WHERE Amount > 0 AND Category IS NOT NULL
            GROUP BY Category
            ORDER BY total_revenue DESC
            LIMIT 10;
            """
            
            result = self.con.execute(category_query).fetchall()
            self.results['category_analysis'] = []
            
            print(f"\n📦 Category Performance Analysis (Top 10 by Revenue):")
            for row in result:
                category_data = {
                    'category': row[0],
                    'total_orders': row[1],
                    'total_revenue': row[2],
                    'revenue_percentage': row[3],
                    'avg_order_value': row[4]
                }
                self.results['category_analysis'].append(category_data)
                
                print(f"   {row[0]}: {row[3]}% revenue share (₹{row[2]:,.2f})")
            
        except Exception as e:
            print(f"❌ Error analyzing category performance: {e}")
    
    def generate_insights(self):
        """Generate key business insights"""
        try:
            insights = []
            
            # Channel dependency insight
            merchant_data = next((item for item in self.results['channel_analysis'] if item['fulfillment'] == 'Merchant'), None)
            amazon_data = next((item for item in self.results['channel_analysis'] if item['fulfillment'] == 'Amazon'), None)
            
            if merchant_data and amazon_data:
                insights.append({
                    'type': 'channel_dependency',
                    'title': 'High Revenue Dependency on Unreliable Channel',
                    'description': f"The Merchant channel drives {merchant_data['revenue_percentage']}% of total revenue but has a {merchant_data['failure_rate']}% failure rate, compared to Amazon FBA's {amazon_data['failure_rate']}% failure rate.",
                    'impact': 'High',
                    'recommendation': 'Consider shifting high-value orders to Amazon FBA channel'
                })
            
            # Geographic bottleneck insight
            if self.results['geographic_analysis']:
                worst_state = self.results['geographic_analysis'][0]
                insights.append({
                    'type': 'geographic_bottleneck',
                    'title': f'Geographic Bottleneck in {worst_state["state"]}',
                    'description': f"{worst_state['state']} has the highest failure rate at {worst_state['failure_rate']}%, with {worst_state['failed_orders']} failed orders out of {worst_state['total_orders']} total orders.",
                    'impact': 'High',
                    'recommendation': 'Review courier partnerships and logistics in this region'
                })
            
            # Category risk insight
            if self.results['category_analysis']:
                top_category = self.results['category_analysis'][0]
                insights.append({
                    'type': 'category_risk',
                    'title': f'High-Value Category: {top_category["category"]}',
                    'description': f"The {top_category['category']} category represents {top_category['revenue_percentage']}% of total revenue with an average order value of ₹{top_category['avg_order_value']:,.2f}.",
                    'impact': 'Medium',
                    'recommendation': 'Prioritize this category for logistics optimization'
                })
            
            self.results['insights'] = insights
            
            print(f"\n💡 Key Business Insights Generated:")
            for insight in insights:
                print(f"   {insight['title']}")
                print(f"     Impact: {insight['impact']}")
                print(f"     Recommendation: {insight['recommendation']}")
            
        except Exception as e:
            print(f"❌ Error generating insights: {e}")
    
    def create_visualizations(self):
        """Create interactive visualizations"""
        try:
            # Channel Performance Chart
            if 'channel_analysis' in self.results:
                channel_data = self.results['channel_analysis']
                
                fig = go.Figure()
                
                # Add failure rate bars
                fig.add_trace(go.Bar(
                    x=[item['fulfillment'] for item in channel_data],
                    y=[item['failure_rate'] for item in channel_data],
                    name='Failure Rate (%)',
                    marker_color=['#ff6b6b', '#4ecdc4'],
                    text=[f"{item['failure_rate']}%" for item in channel_data],
                    textposition='auto'
                ))
                
                fig.update_layout(
                    title='Delivery Failure Rate by Fulfillment Channel',
                    xaxis_title='Fulfillment Channel',
                    yaxis_title='Failure Rate (%)',
                    template='plotly_white'
                )
                
                fig.write_html('channel_performance_chart.html')
                print("✅ Created channel performance chart")
            
            # Geographic Analysis Chart
            if 'geographic_analysis' in self.results:
                geo_data = self.results['geographic_analysis'][:5]  # Top 5 states
                
                fig = go.Figure()
                
                fig.add_trace(go.Bar(
                    x=[item['state'] for item in geo_data],
                    y=[item['failure_rate'] for item in geo_data],
                    name='Failure Rate (%)',
                    marker_color='#ff4757',
                    text=[f"{item['failure_rate']}%" for item in geo_data],
                    textposition='auto'
                ))
                
                fig.update_layout(
                    title='Top 5 States by Delivery Failure Rate',
                    xaxis_title='State',
                    yaxis_title='Failure Rate (%)',
                    template='plotly_white'
                )
                
                fig.write_html('geographic_analysis_chart.html')
                print("✅ Created geographic analysis chart")
            
            # Category Revenue Chart
            if 'category_analysis' in self.results:
                category_data = self.results['category_analysis'][:5]  # Top 5 categories
                
                fig = go.Figure()
                
                fig.add_trace(go.Bar(
                    x=[item['category'] for item in category_data],
                    y=[item['revenue_percentage'] for item in category_data],
                    name='Revenue Share (%)',
                    marker_color='#667eea',
                    text=[f"{item['revenue_percentage']}%" for item in category_data],
                    textposition='auto'
                ))
                
                fig.update_layout(
                    title='Top 5 Categories by Revenue Share',
                    xaxis_title='Product Category',
                    yaxis_title='Revenue Share (%)',
                    template='plotly_white'
                )
                
                fig.write_html('category_revenue_chart.html')
                print("✅ Created category revenue chart")
            
        except Exception as e:
            print(f"❌ Error creating visualizations: {e}")
    
    def save_results(self):
        """Save analysis results to JSON file"""
        try:
            with open('amazon_analysis_results.json', 'w') as f:
                json.dump(self.results, f, indent=2, default=str)
            print("✅ Saved analysis results to amazon_analysis_results.json")
        except Exception as e:
            print(f"❌ Error saving results: {e}")
    
    def close_connection(self):
        """Close DuckDB connection"""
        if self.con:
            self.con.close()
            print("✅ Closed DuckDB connection")
    
    def run_full_analysis(self):
        """Run the complete analysis pipeline"""
        print("🚀 Starting Amazon Logistics Optimization Analysis...")
        
        if not self.connect_to_duckdb():
            return False
        
        self.get_data_summary()
        self.analyze_channel_performance()
        self.analyze_geographic_performance()
        self.analyze_category_performance()
        self.generate_insights()
        self.create_visualizations()
        self.save_results()
        self.close_connection()
        
        print("\n🎉 Analysis Complete! Check the generated files:")
        print("   - amazon_analysis_results.json")
        print("   - channel_performance_chart.html")
        print("   - geographic_analysis_chart.html")
        print("   - category_revenue_chart.html")
        
        return True

def main():
    # Path to the Amazon sales CSV file
    csv_file_path = r'C:\Users\swath\DashCam_Practicum\temp_portfolio\hq4743.github.io\Amazon Sale Report.csv'
    
    # Check if file exists
    if not os.path.exists(csv_file_path):
        print(f"❌ CSV file not found at: {csv_file_path}")
        print("Please update the csv_file_path variable with the correct path.")
        return
    
    # Create and run analysis
    analyzer = AmazonAnalysisGenerator(csv_file_path)
    analyzer.run_full_analysis()

if __name__ == "__main__":
    main()
