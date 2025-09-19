
import "./style.css";

import {meal} from "./module.js";

import {Home} from "./home.js";

import {Menu} from "./menu.js";

import {About} from "./about.js";

const homeBtn = document.querySelector("#home");
const menuBtn = document.querySelector("#menu");
const aboutBtn = document.querySelector("#about");

window.addEventListener("load", () => Home())

aboutBtn.addEventListener("click", () => About())

menuBtn.addEventListener("click", () => Menu());


homeBtn.addEventListener("click", () => Home());

