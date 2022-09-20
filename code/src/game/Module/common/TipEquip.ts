class TipEquip extends UIModalPanel {

	public childTip:ChildTipBagItem;
	public btnUse:Button0;

	public static URL:string = "ui://jvxpx9em7g6v25";

	public static createInstance():TipEquip {
		return <TipEquip><any>(fairygui.UIPackage.createObject("common","TipEquip"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "TipEquip").asCom;
		this.contentPane = this.view;

		this.childTip = <ChildTipBagItem><any>(this.view.getChild("childTip"));
		this.btnUse = <Button0><any>(this.view.getChild("btnUse"));
		super.childrenCreated();
	}

	protected onShown(){
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.addClickListener(this.onClickPuton,this);
		this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.show(this._args)
	}

	protected onHide(): void {
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.removeClickListener(this.onClickPuton,this);
		this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		GGlobal.layerMgr.close(UIConst.TIP_EQUIP);
	}
	
	private _vo:VoEquip;
	public show(obj: VoEquip): void {
		var vo:VoEquip = obj;
		this._vo = vo;
		this.childTip.vo = vo;
	}

	private onClickPuton():void{
		if(Model_Equip.wearEquip(this._vo)){
			this.closeEventHandler(null)
		}
	}

	private resize():void{
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2)
	}
}