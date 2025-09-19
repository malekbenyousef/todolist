import image from "./restaurant.jpg";


export function Home() {
    const content = document.querySelector("#content");
    content.textContent = "";


    let intro = document.createElement("h1");
    intro.textContent = "welcome"

    content.appendChild(intro);
    

    let photo = document.createElement("img");
    photo.src = image;
    content.appendChild(photo);
    
}
