import { lstm } from "./src/features/utils/lstm.js";

const testLstm = async () => {
    const comments = [
        "what is meaning of lazy loading",
        "hello this is my insta id",
        "Hello I am Amay Korade",
        "this is new year offer",
        "this is my instagram id"
    ];

    try {
        const result = await lstm(comments);
        console.log('API Response:', result.results[0].comment);
    } catch (error) {
        console.error('Error while calling lstm:', error.message);
    }
};

testLstm();