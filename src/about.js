


export function About() {
    const content = document.querySelector("#content");
    content.textContent = "";


    let intro = document.createElement("h1");
    intro.textContent = "no body is going to see this anyway:)"

    content.appendChild(intro);
    

    
}
