#!/usr/bin/env python3
"""
DuckDB Server Starter Script
Starts the DuckDB web interface on localhost:4213
"""

import subprocess
import sys
import os
import webbrowser
import time

def start_duckdb_server():
    """Start DuckDB web interface server"""
    print("🚀 Starting DuckDB Web Interface...")
    
    # Check if DuckDB is installed
    try:
        result = subprocess.run(['duckdb', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ DuckDB found: {result.stdout.strip()}")
        else:
            print("❌ DuckDB not found. Please install DuckDB first.")
            return False
    except FileNotFoundError:
        print("❌ DuckDB not found. Please install DuckDB first.")
        print("   Install with: pip install duckdb")
        return False
    
    # Create database file if it doesn't exist
    db_file = "amazon_sales.db"
    if not os.path.exists(db_file):
        print(f"📊 Creating database file: {db_file}")
        try:
            # Create database and load data
            subprocess.run([
                'duckdb', db_file, '-c', 
                f"CREATE TABLE amazon_sales AS SELECT * FROM read_csv_auto('Amazon Sale Report.csv', HEADER=TRUE, ENCODING='LATIN1');"
            ], check=True)
            print("✅ Database created and data loaded")
        except subprocess.CalledProcessError as e:
            print(f"❌ Error creating database: {e}")
            return False
    
    # Start DuckDB web interface
    print("🌐 Starting DuckDB web interface on localhost:4213...")
    try:
        # Start the server in the background
        process = subprocess.Popen([
            'duckdb', db_file, '--ui', '--port', '4213'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Wait a moment for the server to start
        time.sleep(3)
        
        # Check if the process is still running
        if process.poll() is None:
            print("✅ DuckDB web interface started successfully!")
            print("🔗 Access your analysis at: http://localhost:4213/")
            
            # Open browser automatically
            try:
                webbrowser.open('http://localhost:4213/')
                print("🌐 Browser opened automatically")
            except:
                print("⚠️  Could not open browser automatically")
            
            print("\n📋 Available actions:")
            print("   - Press Ctrl+C to stop the server")
            print("   - Visit http://localhost:4213/ in your browser")
            print("   - The database 'amazon_sales' is pre-loaded with your data")
            
            # Keep the script running
            try:
                process.wait()
            except KeyboardInterrupt:
                print("\n🛑 Stopping DuckDB server...")
                process.terminate()
                print("✅ Server stopped")
            
        else:
            print("❌ Failed to start DuckDB web interface")
            stdout, stderr = process.communicate()
            print(f"Error: {stderr.decode()}")
            return False
            
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        return False
    
    return True

def main():
    """Main function"""
    print("=" * 60)
    print("🦆 DuckDB Amazon Analysis Server")
    print("=" * 60)
    
    if start_duckdb_server():
        print("\n🎉 DuckDB server setup complete!")
    else:
        print("\n❌ Failed to start DuckDB server")
        sys.exit(1)

if __name__ == "__main__":
    main()
