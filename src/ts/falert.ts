interface FalertSettings {
	insertionNode: HTMLElement;
	audio: {
		volume: number;
	},
	sounds: {
		fatal: HTMLAudioElement;
		warning: HTMLAudioElement;
		notice: HTMLAudioElement;
	};
}

class Falert {
	static instances = new Set<HTMLElement>();
	static settings = {
		insertionNode: document.body,
		audio: {
			volume: 0.25
		},
		sounds: {}
	};
	static {
		//	preload audio
		let sounds = {
			fatal:  'https://github.com/sean9999/falert.js/raw/master/src/sounds/dramatic.mp3',
			warning:'https://github.com/sean9999/falert.js/raw/master/src/sounds/concerning.mp3',
			notice: 'https://github.com/sean9999/falert.js/raw/master/src/sounds/noteworthy.mp3'
		};
		for (const [k, url] of Object.entries(sounds)) {
			const a = new Audio();
			//a.addEventListener("canplaythrough", console.info, false);
			a.addEventListener("error", console.error);
			a.volume = Falert.settings.audio.volume;
			a.src = url;
			Falert.settings.sounds[k] = a;
		}
	}
	static html = `
	<div class="falert container flyin">
		<div class="falert body breathing">
			<h2>Alert!</h2>
			<p>You can't put your finger in the socket</p>
		</div>
	</div>
	`;
	constructor(head: string, body: string, type: string = "notice") {
		const t = document.createElement('template');
		t.innerHTML = Falert.html.trim();
		const domNode = <HTMLDivElement>t.content.firstChild;
		domNode.style.zIndex = (Falert.getHighestZindex() + 1).toString(10);

		//	get a new "top" value to push this node down the page
		let newTop = 0;
		for (let i of Falert.instances) {
			newTop += i.offsetHeight;
		}
		domNode.style.top = newTop + 'px';
		domNode.querySelector('.body').classList.add(type);
		domNode.addEventListener("animationend", ev => {
			console.log('animation end', ev);
			domNode.classList.remove('flyin');
			domNode.classList.add('swaying');
		});
		domNode.addEventListener('click', ev => {
			Falert.instances.delete(domNode);
			domNode.remove();
		});
		domNode.querySelector('.body h2').innerHTML = head;
		domNode.querySelector('.body p').innerHTML = body;
		domNode.classList.add(type);
		document.body.appendChild(domNode);
		Falert.instances.add(domNode);
		console.log(Falert.settings.sounds[type]);
		Falert.settings.sounds[type].play();
	}
	static getHighestZindex() {
		let z = 0;
		for (let f of Falert.instances) {
			let i = Number(f.style.zIndex);
			if (i > z) {
				z = i;
			}
		}
		return z;
	}
}

export { Falert, FalertSettings };