const CDN_BASE = 'https://unpkg.com/@code_monk/falert@latest/dist/';

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
			fatal: CDN_BASE + 'assets/sounds/dramatic.mp3',
			warning: CDN_BASE + 'assets/sounds/concerning.mp3',
			notice: CDN_BASE + 'assets/sounds/noteworthy.mp3'
		};
		for (const [k, url] of Object.entries(sounds)) {
			const a = new Audio();
			a.addEventListener("error", console.error);
			a.volume = Falert.settings.audio.volume;
			a.src = url;
			Falert.settings.sounds[k] = a;
		}
	};
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
		let newTop = 35;
		for (let i of Falert.instances) {
			newTop += i.offsetHeight;
		}
		domNode.style.top = newTop + 'px';
		domNode.querySelector('.body').classList.add(type);
		domNode.addEventListener("animationend", ev => {
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
		Falert.settings.sounds[type].play();
	}

	static getHighestZindex(): number {
		let z: number = 0;
		for (let f of Falert.instances) {
			let i = Number(f.style.zIndex);
			if (i > z) {
				z = i;
			}
		}
		return z;
	}

}

export { Falert };