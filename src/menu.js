
import image from "./nienke-broeksema-_hiPJ6Z0vao-unsplash.jpg";


export function Menu() {
    const content = document.querySelector("#content");
    content.textContent = "";


    let intro = document.createElement("h1");
    intro.textContent = "this is the menu!!"

    content.appendChild(intro);
    

    let photo = document.createElement("img");
    photo.src = image;
    content.appendChild(photo);
    
}
