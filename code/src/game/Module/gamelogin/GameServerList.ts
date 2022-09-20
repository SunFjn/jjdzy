/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class GameServerList extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n6: fairygui.GImage;
	public n2: fairygui.GImage;
	public btnClose: fairygui.GLoader;
	public lst0: fairygui.GList;
	public lst1: fairygui.GList;
	public n7: fairygui.GRichTextField;
	public static URL: string = "ui://a056duzjpc65f";
	public bg: fairygui.GGraph;
	public static createInstance(): GameServerList {
		return <GameServerList><any>(fairygui.UIPackage.createObject("Login", "GameServerList"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n6 = <fairygui.GImage><any>(this.getChild("n6"));
		this.n2 = <fairygui.GImage><any>(this.getChild("n2"));
		this.btnClose = <fairygui.GLoader><any>(this.getChild("btnClose"));
		this.lst0 = <fairygui.GList><any>(this.getChild("lst0"));
		this.lst1 = <fairygui.GList><any>(this.getChild("lst1"));
		this.n7 = <fairygui.GRichTextField><any>(this.getChild("n7"));
		this.bg = <fairygui.GGraph><any>(this.getChild("bg"));
		this.lst0.callbackThisObj = this;
		this.lst0.itemRenderer = this.tabRender;
		this.lst0.setVirtual();
		this.lst1.callbackThisObj = this;
		this.lst1.itemRenderer = this.serverRender;
		this.lst1.setVirtual();
	}

	private serverRender(index, obj) {
		let it: ServerBtn = obj as ServerBtn;
		let data;
		if (this.isMyServerPage()) {
			data = this.myServerList[index];
		} else {
			let realIdx = Math.max(this.nowIndex - 1, 0);
			let stratIndex = realIdx * this.page;
			data = this.serverList[stratIndex + index];
		}
		it.data = data;
		it.setSt(data.state,data.alias);
	}

	public selectHD: Handler;
	private onServerClick(event: fairygui.ItemEvent) {
		let s = this;
		let item: ServerBtn = event.itemObject as ServerBtn;
		this.selectHD.runWith(item.data);
		this.uidispose();
	}

	private tabRender(index, obj) {
		let it: ServerTabbutton = obj as ServerTabbutton;
		it.data = index;
		it.selected = index == 0;
		if (index == 0) {
			it.text = "最近登录";
		} else {
			let realIndex = index - 1;
			it.text = (realIndex * this.page + 1) + "-" + (realIndex * this.page + this.page) + "区"
		}
	}

	private onTabClick(event: fairygui.ItemEvent) {
		let s = this;
		let item: ServerTabbutton = event.itemObject as ServerTabbutton;
		this.setServerList(item.data);
	}

	private page = 10;
	private nowIndex = 0;
	private setServerList(index) {
		this.nowIndex = index;
		if (this.isMyServerPage()) {//历史服务器
			this.lst1.numItems = this.myServerList.length;
		} else {
			let realIdx = Math.max(index - 1, 0);
			let stratIndex = realIdx * this.page;
			let max = (realIdx + 1) * this.page;
			max = max > this.serverList.length ? this.serverList.length : max;
			this.lst1.numItems = max - stratIndex;
		}
	}

	private isMyServerPage() {
		return this.nowIndex == 0 && this.myServerList;
	}

	private myServerList = [];
	private serverList = [];
	public showList(obj) {
		this.serverList = obj.formal;
		this.myServerList = obj.recent;
		let len = Math.ceil(this.serverList.length / this.page);
		this.lst0.numItems = len + 1;//加上历史服务器，置空也是如此
		this.setServerList(0);
		// var app = App.stage;
		// this.setXY((app.stageWidth - this.width) >> 1, (app.stageHeight - this.height) >> 1);
		this.listen();
	}

	private listen() {
		this.lst0.addEventListener(fairygui.ItemEvent.CLICK, this.onTabClick, this);
		this.lst1.addEventListener(fairygui.ItemEvent.CLICK, this.onServerClick, this);
		this.btnClose.addClickListener(this.uidispose, this);
		this.bg.addClickListener(this.uidispose, this);
	}

	public uidispose() {
		this.lst0.removeEventListener(fairygui.ItemEvent.CLICK, this.onTabClick, this);
		this.lst1.removeEventListener(fairygui.ItemEvent.CLICK, this.onServerClick, this);
		this.btnClose.removeClickListener(this.uidispose, this);
		this.bg.removeClickListener(this.uidispose, this);
		if (this.displayObject.parent) {
			this.displayObject.parent.removeChild(this.displayObject);
		}
	}
}