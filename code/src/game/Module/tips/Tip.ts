class Tip extends fairygui.GComponent {
	public constructor() {
		super();
		this.initView();
	}

	protected initView(): void { }

	public show(obj: any, type: number = 1): void {
		throw new Error("abstract function must override");
	}

	public clear(): void {
		if (this.parent)
			this.parent.removeChild(this);
	}
	protected closeButton
	protected constructFromXML(xml: any): void {
		this.closeButton = <fairygui.GButton><any>(this.getChild("closeButton"));
		if(!this.closeButton){
			var frame = <fairygui.GComponent><any>(this.getChild("frame"));	
			if(frame){
				this.closeButton = <fairygui.GButton><any>(frame.getChild("closeButton"))
			}
		}	
		if(this.closeButton){
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseView, this);
		}
	}

	protected onCloseView(event:egret.TouchEvent):void {
		TipManager.hide();
	}
}