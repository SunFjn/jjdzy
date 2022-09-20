class ViewBagOpenGrid extends fairygui.GComponent {

	//>>>>start
	public btnOk:fairygui.GButton;
	public btnCancel:fairygui.GButton;
	public btnAdd:fairygui.GButton;
	public btnReduce:fairygui.GButton;
	public btnClose:fairygui.GButton;
	public lbmonery:fairygui.GTextField;
	public lbNum:fairygui.GTextField;
	//>>>>end

	public static URL:string = "ui://v4sxjak5etor2";

	public static createInstance():ViewBagOpenGrid {
		return <ViewBagOpenGrid><any>(fairygui.UIPackage.createObject("bag","ViewBagOpenGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btnOk = <fairygui.GButton><any>(this.getChild("btnOk"));
		this.btnCancel = <fairygui.GButton><any>(this.getChild("btnCancel"));
		this.btnAdd = <fairygui.GButton><any>(this.getChild("btnAdd"));
		this.btnReduce = <fairygui.GButton><any>(this.getChild("btnReduce"));
		this.btnClose = <fairygui.GButton><any>(this.getChild("btnClose"));
		this.lbmonery = <fairygui.GTextField><any>(this.getChild("lbmonery"));
		this.lbNum = <fairygui.GTextField><any>(this.getChild("lbNum"));

		this.btnClose.addClickListener(this.closeHandle, this);
	}

	public closeHandle(event: egret.TouchEvent = null): void {
		this.removeFromParent();
		fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resetPosition, this);
	}
	public resetPosition(): void {
		// this.shape.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
	}

	private static _instance: ViewBagOpenGrid;
	public static get instance(): ViewBagOpenGrid {
		if (!ViewBagOpenGrid._instance) ViewBagOpenGrid._instance = ViewBagOpenGrid.createInstance()
		return ViewBagOpenGrid._instance;
	}

	public static show(): void {
		fairygui.GRoot.inst.addChild(ViewBagOpenGrid.instance);
		ViewBagOpenGrid.instance.update();
	}
	
	public update(): void {
		this.resetPosition();
		fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resetPosition, this);
		this.updateView();
	}
	private updateView(): void {
		this.lbmonery.text = 111 + "";
	}
}