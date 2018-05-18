import Greeter from "./greeter";

const student = new Greeter("Henrique", "Assunção", "Clementino");

document.body.innerHTML = student.greeter();
