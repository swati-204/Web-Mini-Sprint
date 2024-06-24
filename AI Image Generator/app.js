const generateForm = document.querySelector(".generate-form");
const ImageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "sk-...GkPz";

async function generateAiImages(userPrompt, userImageQuantity) {
    function updateImageCard(imgDataArray) {
        imgDataArray.forEach((imgObject, index) => {
            const imgCard = ImageGallery.querySelectorAll(".img-card")[index];
            const imgElement = imgCard.querySelector("img");
            const downloadBtn = imgCard.querySelector(".download-btn");

            const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
            imgElement.src = aiGeneratedImg;

            imgElement.onload = () => {
                imgCard.classList.remove("loading");
                downloadBtn.setAttribute("href", aiGeneratedImg);
                downloadBtn.setAttribute("download", `${userPrompt}.jpg`);
            };
        });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if (!response.ok) {
            throw new Error("Failed to generate Images");
        }
        
        const { data } = await response.json();
        updateImageCard([...data]);
    } catch (error) {
        alert(error.message);
    }
}

generateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userPrompt = event.target[0].value;
    const userImageQuantity = event.target[1].value;

    const imgCardMarkup = Array.from({ length: userImageQuantity }, function () {
        return (
            `<div class="img-card loading">
                <noscript><img decoding="async" src="images/loader.svg" alt="img"></noscript><img class="lazy"  decoding="async" src='data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20%20%22%3E%3C/svg%3E' data-src="images/loader.svg" alt="img">
                <a href="#" class="download-btn">
                    <noscript><img decoding="async" src="images/download.svg" alt="download-icon"></noscript><img class="lazy"  decoding="async" src='data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20%20%22%3E%3C/svg%3E' data-src="images/download.svg" alt="download-icon">
                </a>
            </div>`
        );
    }).join("");

    ImageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImageQuantity);
});
