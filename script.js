const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// ✅ Function to load a single image
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
    img.src = url;
  });
}

// ✅ Function to download all images using Promise.all()
async function downloadImages() {
  // ✅ Clear previous output
  output.innerHTML = "";

  // ✅ Create and display loading spinner
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.innerText = "Loading...";
  output.appendChild(loading);

  try {
    // ✅ Use Promise.all to load all images in parallel
    const imgElements = await Promise.all(
      images.map((image) => loadImage(image.url))
    );

    // ✅ Remove loading spinner
    loading.remove();

    // ✅ Display the images
    imgElements.forEach((img) => {
      output.appendChild(img);
    });
  } catch (err) {
    // ✅ Remove loading spinner
    loading.remove();

    // ✅ Display error message
    const error = document.createElement("div");
    error.id = "error";
    error.innerText = err;
    output.appendChild(error);
  }
}

// ✅ Trigger download on button click
btn.addEventListener("click", downloadImages);
