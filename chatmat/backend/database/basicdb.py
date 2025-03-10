from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri("sqlite:///Chinook.db")
print(db.dialect)
# print(db.get_usable_table_names())

query_test = """SELECT 
    Track.Name, 
    SUM(InvoiceLine.UnitPrice * InvoiceLine.Quantity) AS TotalSales
FROM 
    InvoiceLine
JOIN 
    Track ON InvoiceLine.TrackId = Track.TrackId
GROUP BY 
    Track.Name
ORDER BY 
    TotalSales DESC
LIMIT 5;"""
print(db.run(query_test))