#!/bin/bash

# Start OWASP ZAP in daemon mode
zap.sh -daemon -port 8080

# Wait for ZAP to start
sleep 10

# Run ZAP Active Scan using ZAP API
curl "http://localhost:8080/JSON/ascan/action/scan/?url=http://localhost:3000&recurse=true&inScopeOnly=true"

# Wait for scan to complete
sleep 60

# Fetch the scan report
curl "http://localhost:8080/JSON/core/action/htmlreport/"
