class TipRebirthLook extends UIModalPanel {

	public labAttrCur:fairygui.GRichTextField;
	public labAttrNext:fairygui.GRichTextField;
	public labTitle:fairygui.GRichTextField;
	public labCur:fairygui.GRichTextField;
	public labNext:fairygui.GRichTextField;
	public labPower:fairygui.GRichTextField;
	public curStatus:fairygui.GRichTextField;
	public nextStatus:fairygui.GRichTextField;
	public groupCur:fairygui.GGroup;

	public static URL:string = "ui://3tzqotadm20j41";

	public static createInstance():TipRebirthLook {
		return <TipRebirthLook><any>(fairygui.UIPackage.createObject("role","TipRebirthLook"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("role");
		this.view = fairygui.UIPackage.createObject("role", "TipRebirthLook").asCom;
		this.contentPane = this.view;
		
		this.labAttrCur = <fairygui.GRichTextField><any>(this.view.getChild("labAttrCur"));
		this.labAttrNext = <fairygui.GRichTextField><any>(this.view.getChild("labAttrNext"));
		this.curStatus = <fairygui.GRichTextField><any>(this.view.getChild("curStatus"));
		this.nextStatus = <fairygui.GRichTextField><any>(this.view.getChild("nextStatus"));
		this.labTitle = <fairygui.GRichTextField><any>(this.view.getChild("labTitle"));
		this.labCur = <fairygui.GRichTextField><any>(this.view.getChild("labCur"));
		this.labNext = <fairygui.GRichTextField><any>(this.view.getChild("labNext"));
		this.labPower = <fairygui.GRichTextField><any>(this.view.getChild("labPower"));
		this.groupCur = <fairygui.GGroup><any>(this.view.getChild("groupCur"));
		super.childrenCreated();
	}

	public onOpen(arg):void{
		super.onOpen(arg)
		this.updateView();
	}

	protected onHide(): void {
		super.onHide()
		GGlobal.layerMgr.close(UIConst.TIP_REBIRTH_LOOK);
	}

	private updateView():void{
		var zs = Model_player.voMine.zsID;
		var zhuansheng = Config.zhuansheng_705[zs];
		if (zhuansheng.nextid != 0) {
			var zhuanshengNext = Config.zhuansheng_705[zhuansheng.nextid];
			this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuanshengNext.attr), "+", null, "#15f234");
			this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+");
			// this.labNext.text = "下阶转生：" + "[color=#0bf22c]" + zhuanshengNext.lv + "[/color]"
			this.labNext.text = "下阶转生:"
			this.nextStatus.text = zhuanshengNext.lv
			this.groupCur.x = 24;
		} else {//满级
			this.groupCur.x = 158;
			this.labNext.text = ""
			this.labNext.text = ""
			this.labAttrNext.text = "";
			this.labNext.text = ""
			this.nextStatus.text = "";
		}
		this.labPower.text = "" + zhuansheng.fight
		// this.labCur.text = "当前阶段：" + "[color=#0bf22c]" + zhuansheng.lv + "[/color]"
		// this.labCur.text = "当前阶段：" + zhuansheng.lv
		this.curStatus.text = zhuansheng.lv
		this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+", null, "#ffffff");
	}
}