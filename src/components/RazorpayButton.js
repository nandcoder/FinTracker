import React, { useState, useEffect } from "react";
// import useNavigate from "react-router-dom";
import { Box, Image, useToast } from "@chakra-ui/react";
import UPI from '../assets/images/upi-icon.svg';

const RazorpayButton = ({ amount, payee }) => {
    const [orderId, setOrderId] = useState("");
    // const [amount, setAmount] = useState(100);
    // const [payee, setPayee] = useState('John Doe');
    // const [paymentId, setPaymentId] = useState('');
    const toast = useToast();

    useEffect(() => {
        console.log("amt,pye", amount, payee);
        createOrder()
    }, [amount, payee])
    const createOrder = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, payee })
        };
        fetch('http://localhost:4000/api/checkout', requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrderId(data.order.id)
                console.log(data)
            })
            .catch(err => {
                console.error(err);
                toast({
                    title: 'top-right toast',
                    position: 'top-right',
                    isClosable: true,
                    render: () => (
                        <Box color='white' p={3} bg='red.500'>
                            Razorpay connection failed!!
                        </Box>
                    ),
                })
            })
    };

    const handlePayment = async () => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            name: "FinTracker",
            description: `Pay to ${payee}`,
            image: "rupee.png",
            order_id: orderId,
            handler: function (response) {
                console.log(response);
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                /**handler will run when payment done successful */
                try {
                    /*the handler function of RazorpayButton component, after successful payment, get the cart items from the state and send it to the backend for processing. */
                    //   const cartData = items.map((item) => ({
                    //     itemId: item._id,
                    //     name: item.name,
                    //     price: item.price,
                    //     quantity: quantities && quantities[item._id] ? quantities[item._id] : 1,
                    //     // quantity: quantities ? Math.max(1, quantities[item._id]) : 1,

                    //   }));
                    //   console.log(items);
                    //   console.log("cartdataDetails", cartData);
                    //   console.log("RazorpayQuantities", quantities);

                    const paymentData = {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        // Additional data if needed
                        // cartData: cartData,
                        // userId: userId,
                    };
                    // After successful order creation, clear the cart items and cartCount from the state.
                    //   setItems([]);
                    //   setCartCount(0);

                    const res = async (paymentData) => {
                        const url = `http://localhost:4000/api/paymentverification`;

                        // try {
                        //     const response = await axios.post(url, paymentData, {
                        //         headers: {
                        //             "Content-Type": "application/json",
                        //         },
                        //     });
                        //     console.log(response);
                        //     // toast.success("Request successful");
                        //     toast.success(response.data.message);
                        //     return response.data;
                        // } catch (error) {
                        //     console.log(`Error: ${error}`);
                        //     toast.error("Request failed");
                        //     ;
                        // }
                    };
                } catch (error) {
                    console.error("Error processing payment:", error);
                    // Handle the error response from the backend if necessary
                }

                /**after successful payment orders page will open */
                // navigate(`/orders/${userId}`)
            },

            // customer bydefault details
            prefill: {
                name: "Nand Raj",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                custom_field: 'Paying via FinTracker'
            },
            theme: {
                color: "#3399cc",
            },
        };
        // console.log(items);
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
        <Image onClick={handlePayment} src={UPI} height={10} display={'inline-flex'} cursor={'pointer'} />
    );
};

export default RazorpayButton;