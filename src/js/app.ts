import { Falert } from "./falert";

document.querySelector('#falert1').addEventListener('click', ev => {
	let f = new Falert('HEY!', "watch out, dude", "notice");
});
document.querySelector('#falert2').addEventListener('click', ev => {
	let f = new Falert('WOWZA!', "holy mackerel", "fatal");
});
document.querySelector('#falert3').addEventListener('click', ev => {
	let f = new Falert('Warning', "Call your mom", "warning");
});
