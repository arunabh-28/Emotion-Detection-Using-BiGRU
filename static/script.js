async function predictEmotion() {

```
const text = document.getElementById("textInput").value;
const result = document.getElementById("result");

if (text.trim() === "") {
    result.innerText = "Please enter some text.";
    return;
}

result.innerText = "Predicting...";

try {

    const response = await fetch("/predict", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })
    });

    if (!response.ok) {
        throw new Error("Prediction failed");
    }

    const data = await response.json();

    result.innerText =
        "Emotion: " +
        data.predicted_emotion +
        " " +
        data.confidence.toFixed(2);

} catch (error) {

    console.error(error);

    result.innerText =
        "Unable to connect to the prediction server.";
}
```

}
