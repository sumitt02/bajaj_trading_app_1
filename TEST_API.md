# API Testing Guide

## 🚀 Quick Start - Testing Your API

### Step 1: Start the Server

```bash
npm install
npm start
```

You should see:
```
🚀 Trading API SDK server is running on http://localhost:3000
```

### Step 2: Test the API

Open a **new terminal window** (keep server running) and run the tests below.

---

## 📋 Method 1: Using cURL (Command Line)

### 1. Health Check
```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Trading API SDK is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get All Instruments (Stocks)
```bash
curl http://localhost:3000/api/v1/instruments
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE",
      "instrumentType": "EQUITY",
      "lastTradedPrice": 2450.50
    },
    ...
  ],
  "count": 10
}
```

### 3. Place a MARKET BUY Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "550e8400-e29b-41d4-a716-446655440000",
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10,
    "price": null,
    "status": "NEW",
    "userId": "user123",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**⚠️ Important:** Copy the `orderId` from the response for next steps!

### 4. Place a LIMIT SELL Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "TCS",
    "exchange": "NSE",
    "orderType": "SELL",
    "orderStyle": "LIMIT",
    "quantity": 5,
    "price": 3450.00
  }'
```

### 5. Check Order Status
```bash
# Replace {orderId} with actual order ID from step 3
curl http://localhost:3000/api/v1/orders/{orderId} \
  -H "Authorization: Bearer user123"
```

**Example:**
```bash
curl http://localhost:3000/api/v1/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer user123"
```

**Wait 2 seconds** after placing order, then check status. It should show `"status": "EXECUTED"`

### 6. Get All Orders for User
```bash
curl http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer user123"
```

### 7. Get All Trades
```bash
curl http://localhost:3000/api/v1/trades \
  -H "Authorization: Bearer user123"
```

### 8. Get Portfolio
```bash
curl http://localhost:3000/api/v1/portfolio \
  -H "Authorization: Bearer user123"
```

### 9. Cancel an Order
```bash
# Replace {orderId} with actual order ID
curl -X DELETE http://localhost:3000/api/v1/orders/{orderId} \
  -H "Authorization: Bearer user123"
```

---

## 📋 Method 2: Using Postman

### Setup Postman Collection

1. **Open Postman** (download from postman.com if needed)

2. **Create a New Collection**: "Bajaj Trading API"

3. **Set Collection Variables**:
   - Click on Collection → Variables
   - Add:
     - `base_url`: `http://localhost:3000`
     - `user_id`: `user123`

4. **Add Requests**:

#### Request 1: Health Check
- **Method**: GET
- **URL**: `{{base_url}}/health`
- Click **Send**

#### Request 2: Get Instruments
- **Method**: GET
- **URL**: `{{base_url}}/api/v1/instruments`
- Click **Send**

#### Request 3: Place Market Buy Order
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/orders`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer {{user_id}}`
- **Body** (select "raw" and "JSON"):
  ```json
  {
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10
  }
  ```
- Click **Send**

#### Request 4: Place Limit Sell Order
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/orders`
- **Headers**: Same as Request 3
- **Body**:
  ```json
  {
    "symbol": "TCS",
    "exchange": "NSE",
    "orderType": "SELL",
    "orderStyle": "LIMIT",
    "quantity": 5,
    "price": 3450.00
  }
  ```

#### Request 5: Get Order Status
- **Method**: GET
- **URL**: `{{base_url}}/api/v1/orders/{orderId}`
  - Replace `{orderId}` with actual order ID from Request 3
- **Headers**: `Authorization: Bearer {{user_id}}`

#### Request 6: Get All Orders
- **Method**: GET
- **URL**: `{{base_url}}/api/v1/orders`
- **Headers**: `Authorization: Bearer {{user_id}}`

#### Request 7: Get Trades
- **Method**: GET
- **URL**: `{{base_url}}/api/v1/trades`
- **Headers**: `Authorization: Bearer {{user_id}}`

#### Request 8: Get Portfolio
- **Method**: GET
- **URL**: `{{base_url}}/api/v1/portfolio`
- **Headers**: `Authorization: Bearer {{user_id}}`

#### Request 9: Cancel Order
- **Method**: DELETE
- **URL**: `{{base_url}}/api/v1/orders/{orderId}`
- **Headers**: `Authorization: Bearer {{user_id}}`

---

## 📋 Method 3: Using Browser (GET requests only)

Some endpoints can be tested directly in browser:

1. **Health Check**: 
   - Open: `http://localhost:3000/health`

2. **Get Instruments**: 
   - Open: `http://localhost:3000/api/v1/instruments`

**Note**: POST/DELETE requests need tools like Postman or curl.

---

## 📋 Method 4: Complete Test Script

Save this as `test-api.sh` and run: `bash test-api.sh`

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"
USER="user123"

echo "=== Testing Bajaj Trading API ==="
echo ""

# 1. Health Check
echo "1. Health Check..."
curl -s $BASE_URL/health | python3 -m json.tool
echo ""

# 2. Get Instruments
echo "2. Getting Instruments..."
curl -s $BASE_URL/api/v1/instruments | python3 -m json.tool
echo ""

# 3. Place Market Buy Order
echo "3. Placing MARKET BUY Order..."
ORDER_RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER" \
  -d '{
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10
  }')
echo $ORDER_RESPONSE | python3 -m json.tool

# Extract order ID (requires jq or manual)
ORDER_ID=$(echo $ORDER_RESPONSE | grep -o '"orderId":"[^"]*' | cut -d'"' -f4)
echo "Order ID: $ORDER_ID"
echo ""

# 4. Wait for execution
echo "4. Waiting for order execution (2 seconds)..."
sleep 2
echo ""

# 5. Check Order Status
echo "5. Checking Order Status..."
curl -s $BASE_URL/api/v1/orders/$ORDER_ID \
  -H "Authorization: Bearer $USER" | python3 -m json.tool
echo ""

# 6. Get All Orders
echo "6. Getting All Orders..."
curl -s $BASE_URL/api/v1/orders \
  -H "Authorization: Bearer $USER" | python3 -m json.tool
echo ""

# 7. Get Trades
echo "7. Getting Trades..."
curl -s $BASE_URL/api/v1/trades \
  -H "Authorization: Bearer $USER" | python3 -m json.tool
echo ""

# 8. Get Portfolio
echo "8. Getting Portfolio..."
curl -s $BASE_URL/api/v1/portfolio \
  -H "Authorization: Bearer $USER" | python3 -m json.tool
echo ""

echo "=== Testing Complete ==="
```

---

## 🧪 Testing Different Scenarios

### Test 1: Valid Market Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10
  }'
```

### Test 2: Valid Limit Order
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "TCS",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "LIMIT",
    "quantity": 5,
    "price": 3400.00
  }'
```

### Test 3: Invalid Order (Missing Price for Limit)
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "TCS",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "LIMIT",
    "quantity": 5
  }'
```
**Expected**: Error 400 - "Price is required for LIMIT orders"

### Test 4: Invalid Order (Negative Quantity)
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "RELIANCE",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": -5
  }'
```
**Expected**: Error 400 - "Quantity must be greater than 0"

### Test 5: Invalid Instrument
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user123" \
  -d '{
    "symbol": "INVALID",
    "exchange": "NSE",
    "orderType": "BUY",
    "orderStyle": "MARKET",
    "quantity": 10
  }'
```
**Expected**: Error 400 - "Instrument INVALID not found on NSE"

### Test 6: Get Non-Existent Order
```bash
curl http://localhost:3000/api/v1/orders/invalid-order-id \
  -H "Authorization: Bearer user123"
```
**Expected**: Error 404 - "Order not found"

---

## ✅ Expected Test Results

### Complete Flow Test:

1. **Place Order** → Status: `NEW`
2. **Wait 2 seconds**
3. **Check Order Status** → Status: `EXECUTED`
4. **Get Trades** → Should show the executed trade
5. **Get Portfolio** → Should show the stock in holdings

### Portfolio Test:

1. Place BUY order for RELIANCE (quantity: 10)
2. Wait for execution
3. Place another BUY order for RELIANCE (quantity: 5)
4. Wait for execution
5. Check portfolio → Should show RELIANCE with quantity: 15 and calculated average price

---

## 🐛 Troubleshooting

### Server Not Running
```bash
# Check if server is running
curl http://localhost:3000/health

# If not, start server
npm start
```

### Port Already in Use
```bash
# Change port in server.js
const PORT = process.env.PORT || 3001;
```

### JSON Parsing Error
Make sure you're using:
- `Content-Type: application/json` header
- Valid JSON in request body
- Proper quotes (use single quotes for shell, double for JSON)

### Order Not Executing
- Wait at least 2 seconds after placing order
- Check if order status is "EXECUTED"
- For LIMIT orders, check if price is favorable

---

## 📊 Testing Checklist

- [ ] Server starts without errors
- [ ] Health endpoint works
- [ ] Can fetch instruments
- [ ] Can place MARKET order
- [ ] Can place LIMIT order
- [ ] Order executes after ~1 second
- [ ] Can check order status
- [ ] Can view trades
- [ ] Can view portfolio
- [ ] Portfolio updates after buy
- [ ] Can cancel order (before execution)
- [ ] Error handling works (invalid inputs)
- [ ] Authentication works (with/without header)

---

## 💡 Pro Tips

1. **Use `-v` flag with curl** for verbose output:
   ```bash
   curl -v http://localhost:3000/api/v1/instruments
   ```

2. **Pretty print JSON** (if you have `jq`):
   ```bash
   curl http://localhost:3000/api/v1/instruments | jq
   ```

3. **Save responses to file**:
   ```bash
   curl http://localhost:3000/api/v1/instruments > response.json
   ```

4. **Use Postman Collections** for easy testing and sharing

5. **Test error cases** to ensure proper error handling

---

Happy Testing! 🚀
