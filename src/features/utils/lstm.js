import axios from "axios"

export const lstm = async (messages) => {
    try {
        const payload = {
            comments: Array.isArray(messages) ? messages : [messages],
        }

        console.log("Payload being sent to API:", payload);

        const response = await axios.post(' http://127.0.0.1:5000/predict', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Response: ", response.data);

        return response.data;
    } catch (error) {
        console.error('Error in lstm function:', error.message);
        throw error;
    }
}