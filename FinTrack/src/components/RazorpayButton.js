import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-razorpay";

import usePostData from "../hooks/usePostData";

import { CartContext } from "../CartContext";
import AuthContext from "../auth/AuthContext";
import generatePushID from "../utils/generateId";

const RazorpayButton = ({ totalAmount, quantities }) => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState("");
    const { items, setItems, cartCount, setCartCount } = useContext(CartContext);

    const { authUser } = useContext(AuthContext);
    const userId = authUser._id;
    console.log(authUser)

    useEffect(() => {
        setOrderId(generatePushID())
    }, []);

    /**
     * The handlePayment function is called when the user clicks on the "Pay with Razorpay" button. It creates a new instance of the Razorpay checkout with the specified options and opens the checkout form.
     */

    const handlePayment = async () => {
        const options = {
            // key: process.env.RAZOR_PAY_KEY_ID, // Replace with your actual Razorpay Key ID
            key: "rzp_test_LECvIyhGviKzTp", // Replace with your actual Razorpay Key ID
            amount: totalAmount * 100, //  Razorpay accepts the amount in paise or the smallest currency unit.
            currency: "INR",
            name: "BookVault", // Replace with your brand name
            description: "Test Transaction",
            image: "./images/bookstore logo.jpeg",
            order_id: orderId,
            handler: function (response) {
                console.log(response); 
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                /**handler will run when payment done successful */
                try {
                    /*the handler function of RazorpayButton component, after successful payment, get the cart items from the state and send it to the backend for processing. */
                    const cartData = items.map((item) => ({
                        itemId: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: quantities && quantities[item._id] ? quantities[item._id] : 1,
                        // quantity: quantities ? Math.max(1, quantities[item._id]) : 1,

                    }));
                    console.log(items);
                    console.log("cartdataDetails", cartData);
                    console.log("RazorpayQuantities", quantities);

                    const paymentDataWithCarts = {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        // Additional data if needed
                        cartData: cartData,
                        userId: userId,
                    };
                    // After successful order creation, clear the cart items and cartCount from the state.
                    setItems([]);
                    setCartCount(0);

                    const res = usePostData("paymentSuccess", paymentDataWithCarts);
                    // console.log("usePostData called");
                    // console.log(res);

                    // Handle the success response from the backend if necessary
                } catch (error) {
                    console.error("Error processing payment:", error);
                    // Handle the error response from the backend if necessary
                }

                /**after successful payment orders page will open */
                navigate(`/orders/${userId}`)
            },

            // customer bydefault details
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        console.log(items);
        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    };

    return (
        <div
            className="App"
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <button onClick={handlePayment} className="btn btn-primary">
                Pay with Razorpay
            </button>
        </div>
    );
};

export default RazorpayButton;
