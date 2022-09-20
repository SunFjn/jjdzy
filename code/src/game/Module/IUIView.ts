// TypeScript file
interface IUIView {
	onOpen(arg);
	onClose();
	dispose();
	isInit: boolean;
	uiparent: fairygui.GComponent;
	panelId;
	lastLifeTime;
	parent: fairygui.GComponent;
	_isLife;
}