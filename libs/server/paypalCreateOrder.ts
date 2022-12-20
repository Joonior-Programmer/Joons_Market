import { PayPalEnvironment } from "@paypal/checkout-server-sdk/lib/core/paypal_environment";
import { PayPalHttpClient } from "@paypal/checkout-server-sdk/lib/core/paypal_http_client";

const paypal = require("@paypal/checkout-server-sdk");

// Creating an environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment: PayPalEnvironment = new paypal.core.SandboxEnvironment(
  clientId,
  clientSecret
);
let client: PayPalHttpClient = new paypal.core.PayPalHttpClient(environment);

// Call API with your client and get a response for your call
let createOrder = async (currency: string, amount: string, title: string) => {
  // Construct a request object and set desired parameters
  // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: amount,
            },
          },
        },
        items: [
          {
            name: title,
            unit_amount: {
              currency_code: currency,
              value: amount,
            },
            quantity: 1,
          },
        ],
      },
    ],
  });

  let order = await client.execute(request);
  // If call returns body in response, you can get the deserialized version from the result attribute of the response.
  return order.result;
};
export default createOrder;
