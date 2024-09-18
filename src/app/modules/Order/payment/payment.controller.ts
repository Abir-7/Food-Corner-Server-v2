/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../utils/catchAsync";

import { Order } from "../order.model";

export const paymentConfirm = catchAsync(async (req, res) => {
  const { id } = req.query;

  const orderData: any = await Order.findById(id)
    .populate({
      path: "customerId",
      select: "name email",
    })
    .populate({
      path: "items.productId",
      select: "title photo",
    });

  if (!orderData) {
    return res.status(404).send("<h1>Booking not found</h1>");
  }
  if (orderData) {
    orderData.paymentStatus = "paid";
    orderData.save();
  }

  // Extract user details
  const userName = `${orderData.customerId.name.firstName} ${
    orderData.customerId.name.middleName ?? ""
  } ${orderData.customerId.name.lastName}`;
  const userEmail = orderData.customerId.email;

  // Map product details
  const products = orderData.items
    .map((item: any) => {
      return `<div style="margin-bottom: 20px; display: flex; gap: 15px;">
      <div style="flex: 1;">
        <p><strong>Product Name:</strong> ${item.productId.title} <br> 
           <strong>Size:</strong> ${item.size} <br> 
           <strong>Quantity:</strong> ${item.quantity} <br>
        </p>
      </div>
      ${
        item.productId.photo
          ? `<div style="flex: 0 0 auto;">
              <img src="${item.productId.photo}" alt="${item.productId.title}" style="max-width: 70px; height: auto;">
            </div>`
          : ""
      }
    </div>`;
    })
    .join("");

  // Subtotal
  const subTotal = orderData.total.subTotal;

  // HTML response
  return res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                background-color: rgb(251 146 60);
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                color: #333333;
            }
            .footer {
                background-color: rgb(251 146 60);
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                font-size: 14px;
            }
            .highlight {
                font-weight: bold;
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear <strong>${userName}</strong>,</p>
                <p>Your order has been <span class="highlight">confirmed</span> with the following details:</p>
                <p><strong>User Email:</strong> ${userEmail}</p>
                ${products}
                <p><strong>Subtotal:</strong> ${subTotal} tk</p>
                <p>Thank you for shopping with us. We hope to see you again!</p>
            </div>
            <div class="footer">
                &copy; 2024 Food-Corner. All rights reserved. <a  style=" color: white;font-weight: bold;" href='https://chipper-longma-698a80.netlify.app'>Home</a>
            </div>
        </div>
    </body>
    </html>`);
});
