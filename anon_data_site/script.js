function payNow() {
  const amountSelected = document.getElementById("dataAmount").value;
  const userEmail = prompt("Enter your email to receive data:");
  const price = amountSelected === "50" ? 4000 : 1000; // 40 ₹ or 10 ₹ in paise

  const options = {
    key: "rzp_test_LNNUMSLKL8ryU3", // ✅ Your Razorpay Test Key
    amount: price,
    currency: "INR",
    name: "Anonymous Data",
    description: "Buy Data",
    handler: function (response) {
      alert("Payment successful. Data will be sent to your email shortly.");

      fetch("https://anon-data-api.onrender.com/send-data", { // ✅ LIVE BACKEND URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: response.razorpay_payment_id,
          amount: amountSelected,
          email: userEmail,
          count: parseInt(amountSelected)
        })
      })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => alert("Error sending email: " + err));
    },
    prefill: { email: "" },
    theme: { color: "#3399cc" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
