interface HTMLDialogElement extends HTMLElement {
	open: boolean,
	returnValue: string,
	close: (msg: string) => any,
	show: () => any,
	showModal: () => any;
}

declare var HTMLDialogElement: {
	prototype: HTMLDialogElement;
	new(): HTMLDialogElement;
};
