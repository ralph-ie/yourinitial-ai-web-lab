let model;

async function loadModel() {
  model = await mobilenet.load();
  classifyImage();
}

async function classifyImage() {
  const img = document.getElementById("image");
  const result = await model.classify(img);
  document.getElementById("prediction").innerText =
    `${result[0].className} (${(result[0].probability * 100).toFixed(2)}%)`;
}

document.getElementById("classifyBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("upload");
  if (fileInput.files.length === 0) return;

  const img = document.getElementById("image");
  img.src = URL.createObjectURL(fileInput.files[0]);

  img.onload = classifyImage;
});

loadModel();
