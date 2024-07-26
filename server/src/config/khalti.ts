import axios from "axios";

export async function initializeKhaltiPayment({
    return_url,
    website_url,
    amount,
    purchase_order_id,
    purchase_order_name,
}: any) {
    try {
        const headersList = {
            Authorization: `Key 2147e4690242439ca4ede3ae641c3f8f`,
            "Content-Type": "application/json",
        };

        const bodyContent = JSON.stringify({
            return_url,
            website_url,
            amount,
            purchase_order_id,
            purchase_order_name,
        });

        const reqOptions = {
            url: `https://a.khalti.com/api/v2/epayment/initiate/`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        const response = await axios.request(reqOptions);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

