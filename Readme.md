📦 Amazon Logistics Optimization Project (DuckDB & Tableau)

 📌 Project Summary

This project involved a comprehensive analysis of an Amazon Seller's sales data to identify and resolve critical, hidden logistics failures that were directly impacting profitability and customer satisfaction. The core goal was to pinpoint **where** and **why** a high-volume fulfillment channel was underperforming compared to the industry standard.

Metric: Channel Dependence (The Business Asset)
72% of revenue came from the 'Merchant' (seller-fulfilled) channel.

Reliability (The Business Risk)
The 'Merchant' channel had an 11.46% delivery failure rate.

 Problem Source (The Root Cause)
The failure rate was concentrated geographically in two key states.

* **DuckDB:** Used for fast, in-memory analysis and complex SQL aggregation on the large CSV dataset, particularly for window functions (`PARTITION BY`, `ROW_NUMBER()`).
* **SQL (Advanced):** Utilized Common Table Expressions (CTEs), Conditional Aggregation (`SUM(CASE WHEN...)`), and Window Functions for data ranking and normalization.
* **Python/Pandas:** Used for initial data cleaning, file format handling, and ensuring data consistency (e.g., standardizing state names).

🔑 Key Analytical Insights

The analysis proceeded through a four-phase structure to diagnose the problem:

 1. Fulfillment Quality Risk (The "What") :
    **Finding:** The 'Merchant' fulfillment channel, which drives $\mathbf{72\%}$ of total revenue, was found to be highly unreliable with an $\mathbf{11.46\%}$ delivery failure rate (Undelivered, RTO, Lost).
   **Benchmark:** This compares poorly to the high-standard $\mathbf{2.50\%}$ failure rate of the 'Amazon' (FBA) channel.

 2. **Geographic Pinpointing (The "Where") :
 **Finding:** The average $\mathbf{11.46\%}$ failure rate was not uniform; it was primarily caused by severe bottlenecks in two states.
 **Evidence:** The failure rate for the 'Merchant' channel was $\mathbf{18.67\%}$ in **West Bengal** and $\mathbf{17.14\%}$ in **Tamil Nadu**.
 

3. **Product Exposure (The "Who")**
 **Finding:** By applying the Pareto Principle (80/20 Rule), the analysis showed the high-risk states were driven by sales of the most valuable products.
 **Evidence:** The **'Set'** and **'Western Dress'** categories, which represent the top-ranking products by revenue, were the most exposed to the $\mathbf{\sim 18\%}$ failure risk in the problem regions.

 🚀 Actionable Recommendation

Based on the evidence, the following strategy was provided to the client for immediate profit recovery:

1.  Logistics Re-routing: Immediately shift inventory of the highest-revenue categories (**Set** and **Western Dress**) from the low-reliability **'Merchant'** channel to the reliable **'Amazon' (FBA)** channel, specifically for orders shipping to West Bengal and Tamilnadu
2.  Courier Audit: Use the $\mathbf{18.67\%}$ failure rate as leverage to renegotiate or replace the local courier partner for the 'Merchant' channel in the identified problem states.

This targeted action minimizes risk for the most valuable products and directly addresses the largest source of logistical inefficiency.
