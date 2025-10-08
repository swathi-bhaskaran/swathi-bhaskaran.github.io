# 🦆 DuckDB Amazon Analysis - Localhost Integration

## 🚀 Quick Start

### Option 1: Automated Setup
```bash
python start_duckdb_server.py
```

### Option 2: Manual Setup
```bash
# Create database and load data
duckdb amazon_sales.db -c "CREATE TABLE amazon_sales AS SELECT * FROM read_csv_auto('Amazon Sale Report.csv', HEADER=TRUE, ENCODING='LATIN1');"

# Start web interface
duckdb amazon_sales.db --ui --port 4213
```

## 🔗 Access Your Analysis

Once the server is running, access your analysis at:
**http://localhost:4213/**

## 📊 What You'll Find

### Pre-loaded Data
- **Table**: `amazon_sales`
- **Records**: 128K+ Amazon sales transactions
- **Columns**: Order ID, Date, Status, Fulfilment, Category, Amount, State, etc.

### Sample Queries to Try

```sql
-- Channel Performance Analysis
SELECT 
    Fulfilment,
    COUNT(*) as total_orders,
    SUM(Amount) as total_revenue,
    ROUND(100.0 * COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) / COUNT(*), 2) as failure_rate
FROM amazon_sales
WHERE Amount > 0
GROUP BY Fulfilment
ORDER BY total_revenue DESC;

-- Geographic Analysis
SELECT 
    "ship-state" as state,
    COUNT(*) as total_orders,
    ROUND(100.0 * COUNT(CASE WHEN Status IN ('Cancelled', 'Undelivered', 'RTO', 'Lost') THEN 1 END) / COUNT(*), 2) as failure_rate
FROM amazon_sales
WHERE Amount > 0 AND "ship-state" IS NOT NULL
GROUP BY "ship-state"
HAVING COUNT(*) >= 100
ORDER BY failure_rate DESC
LIMIT 10;

-- Category Performance
SELECT 
    Category,
    COUNT(*) as total_orders,
    SUM(Amount) as total_revenue,
    ROUND(100.0 * SUM(Amount) / (SELECT SUM(Amount) FROM amazon_sales WHERE Amount > 0), 2) as revenue_percentage
FROM amazon_sales
WHERE Amount > 0 AND Category IS NOT NULL
GROUP BY Category
ORDER BY total_revenue DESC
LIMIT 10;
```

## 🎯 Key Insights to Discover

1. **Channel Dependency**: 72% revenue from Merchant channel
2. **Failure Rates**: 11.46% vs 2.50% (Merchant vs Amazon FBA)
3. **Geographic Bottlenecks**: West Bengal (18.67%) and Tamil Nadu (17.14%)
4. **High-Value Categories**: Set and Western Dress categories

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill existing process on port 4213
netstat -ano | findstr :4213
taskkill /PID <PID_NUMBER> /F
```

### Encoding Issues
```bash
# Try different encoding
duckdb amazon_sales.db -c "CREATE TABLE amazon_sales AS SELECT * FROM read_csv_auto('Amazon Sale Report.csv', HEADER=TRUE, ENCODING='UTF8');"
```

### Database Not Found
```bash
# Recreate database
rm amazon_sales.db
python start_duckdb_server.py
```

## 📱 Portfolio Integration

The localhost:4213 link is integrated into your portfolio:
- **Main Portfolio**: Direct link in project card
- **Dashboard**: Prominent call-to-action button
- **Documentation**: Complete setup instructions

## 🎉 Success!

Once running, you'll have:
- ✅ Interactive DuckDB web interface
- ✅ Pre-loaded Amazon sales data
- ✅ Real-time SQL querying
- ✅ Data visualization capabilities
- ✅ Portfolio integration

**Access at: http://localhost:4213/**
