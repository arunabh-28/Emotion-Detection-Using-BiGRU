const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const buttonText = document.getElementById("buttonText");
const loader = document.getElementById("loader");

const charCount = document.getElementById("charCount");
const clearButton = document.getElementById("clearButton");

const resultSection = document.getElementById("resultSection");
const errorMessage = document.getElementById("errorMessage");

const emotionName = document.getElementById("emotionName");
const emotionIcon = document.getElementById("emotionIcon");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceBar = document.getElementById("confidenceBar");

const analyzedText = document.getElementById("analyzedText");
const newAnalysisButton = document.getElementById("newAnalysisButton");


/*
    Emotion icons
*/

const emotionIcons = {
    sadness: "😢",
    joy: "😄",
    love: "❤️",
    anger: "😠",
    fear: "😨",
    surprise: "😲"
};


/*
    Update character counter
*/

textInput.addEventListener("input", () => {

    const length = textInput.value.length;

    charCount.textContent = `${length} / 2000`;

});


/*
    Example buttons
*/

const exampleButtons = document.querySelectorAll(".example-button");

exampleButtons.forEach(button => {

    button.addEventListener("click", () => {

        textInput.value = button.dataset.text;

        textInput.dispatchEvent(new Event("input"));

        textInput.focus();

    });

});


/*
    Clear button
*/

clearButton.addEventListener("click", () => {

    textInput.value = "";

    textInput.dispatchEvent(new Event("input"));

    textInput.focus();

    resultSection.classList.add("hidden");

    hideError();

});


/*
    New analysis button
*/

newAnalysisButton.addEventListener("click", () => {

    resultSection.classList.add("hidden");

    textInput.focus();

    window.scrollTo({
        top: document.querySelector(".analyzer-card").offsetTop - 30,
        behavior: "smooth"
    });

});


/*
    Enter key shortcut

    Ctrl + Enter → Analyze
*/

textInput.addEventListener("keydown", event => {

    if (event.ctrlKey && event.key === "Enter") {

        analyzeEmotion();

    }

});


/*
    Analyze emotion
*/

analyzeButton.addEventListener("click", analyzeEmotion);


async function analyzeEmotion() {

    const text = textInput.value.trim();


    /*
        Basic validation
    */

    if (!text) {

        showError("Please write something before analyzing.");

        textInput.focus();

        return;

    }


    if (text.length > 2000) {

        showError("Please keep your text below 2000 characters.");

        return;

    }


    /*
        Loading state
    */

    setLoading(true);

    hideError();


    try {

        /*
            Relative URL is important.

            This works both locally and on Render.
        */

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Something went wrong while analyzing the text."
            );

        }


        /*
            Display result
        */

        displayResult(data);


    } catch (error) {

        console.error(error);

        showError(
            error.message ||
            "Unable to connect to the server. Please try again."
        );

    } finally {

        setLoading(false);

    }

}


/*
    Display prediction
*/

function displayResult(data) {

    const emotion = data.predicted_emotion;

    const confidence = Number(data.confidence) * 100;


    /*
        Main result
    */

    emotionName.textContent = emotion;

    emotionIcon.textContent =
        emotionIcons[emotion] || "•";


    confidenceValue.textContent =
        `${confidence.toFixed(1)}%`;


    confidenceBar.style.width =
        `${Math.min(confidence, 100)}%`;


    analyzedText.textContent =
        `"${data.text}"`;


    /*
        Emotion probabilities

        Backend returns:

        all_probabilites

        Note:
        The spelling "probabilites" is kept because
        that is the field currently defined in your
        FastAPI PredictionResponse model.
    */

    const probabilities = data.all_probabilites || {};


    updateProbability(
        "sadness",
        probabilities.sadness
    );

    updateProbability(
        "joy",
        probabilities.joy
    );

    updateProbability(
        "love",
        probabilities.love
    );

    updateProbability(
        "anger",
        probabilities.anger
    );

    updateProbability(
        "fear",
        probabilities.fear
    );

    updateProbability(
        "surprise",
        probabilities.surprise
    );


    /*
        Show results
    */

    resultSection.classList.remove("hidden");


    /*
        Scroll smoothly to result
    */

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/*
    Update individual probability bar
*/

function updateProbability(emotion, probability) {

    const valueElement =
        document.getElementById(`${emotion}Value`);

    const barElement =
        document.getElementById(`${emotion}Bar`);


    if (typeof probability !== "number") {

        valueElement.textContent = "0%";

        barElement.style.width = "0%";

        return;

    }


    const percentage =
        Math.max(0, Math.min(100, probability * 100));


    valueElement.textContent =
        `${percentage.toFixed(1)}%`;


    barElement.style.width =
        `${percentage}%`;

}


/*
    Loading state
*/

function setLoading(isLoading) {

    if (isLoading) {

        analyzeButton.disabled = true;

        analyzeButton.classList.add("loading");

        buttonText.textContent = "Analyzing...";

    } else {

        analyzeButton.disabled = false;

        analyzeButton.classList.remove("loading");

        buttonText.textContent = "Analyze emotion";

    }

}


/*
    Error handling
*/

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

}


function hideError() {

    errorMessage.textContent = "";

    errorMessage.style.display = "none";

}