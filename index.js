var $hXvsm$express = require("express");
var $hXvsm$cors = require("cors");
var $hXvsm$bodyparser = require("body-parser");
var $hXvsm$stripe = require("stripe");




const $2685e5b20c9f29f6$var$app = $hXvsm$express();
$2685e5b20c9f29f6$var$app.use($hXvsm$express.static("public"));
$2685e5b20c9f29f6$var$app.use($hXvsm$bodyparser.urlencoded({
    extended: false
}));
$2685e5b20c9f29f6$var$app.use($hXvsm$bodyparser.json());
$2685e5b20c9f29f6$var$app.use($hXvsm$cors());

const $2685e5b20c9f29f6$var$stripe = $hXvsm$stripe("sk_test_51PlvRgG1Zj6TIJKdXUtt0lgysWbL7KY0k4ythth1HFodYOuFhsyQYRexWdz9dZe3aPLOyXYCNazjcpfscJObXEOm00X8WFZSI8");
$2685e5b20c9f29f6$var$app.post("https://stripecheckout.netlify.app/checkout", async (req, res, next)=>{
    try {
        const session = await $2685e5b20c9f29f6$var$stripe.checkout.sessions.create({
            payment_method_types: [
                "card"
            ],
            shipping_address_collection: {
                allowed_countries: [
                    "US",
                    "CA"
                ]
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd"
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7
                            }
                        }
                    }
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "usd"
                        },
                        display_name: "Next day air",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1
                            }
                        }
                    }
                }
            ],
            line_items: req.body.items.map((item)=>({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                            images: [
                                item.product
                            ]
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                })),
            mode: "payment",
            success_url: "https://stripecheckout.netlify.app/success.html",
            cancel_url: "https://stripecheckout.netlify.app/cancel.html"
        });
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});
$2685e5b20c9f29f6$var$app.listen(PORT, "0.0.0.0", ()=>console.log(`app is running on ${PORT}`));


//# sourceMappingURL=index.js.map
