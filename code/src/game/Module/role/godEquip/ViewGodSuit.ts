class ViewGodSuit extends UIModalPanel {

	public frame: fairygui.GComponent;
	public labTitle: fairygui.GTextField;
	public labPower: fairygui.GTextField;
	public labCur: fairygui.GTextField;
	public labAttrCur: fairygui.GTextField;
	public labNeedCur: fairygui.GTextField;
	public labNext: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labNeedNext: fairygui.GTextField;
	public btnUp: Button0;
	public closeButton: fairygui.GButton;
	public boxMax: fairygui.GGroup;

	public static URL: string = "ui://3tzqotadltpm17";

	public static createInstance(): ViewGodSuit {
		return <ViewGodSuit><any>(fairygui.UIPackage.createObject("role", "ViewGodSuit"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("role");
		this.view = fairygui.UIPackage.createObject("role", "ViewGodSuit").asCom;
		this.contentPane = this.view;
		
		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		this.labTitle = <fairygui.GTextField><any>(this.view.getChild("labTitle"));
		this.labPower = <fairygui.GTextField><any>(this.view.getChild("labPower"));
		this.labCur = <fairygui.GTextField><any>(this.view.getChild("labCur"));
		this.labAttrCur = <fairygui.GTextField><any>(this.view.getChild("labAttrCur"));
		this.labNeedCur = <fairygui.GTextField><any>(this.view.getChild("labNeedCur"));
		this.btnUp = <Button0><any>(this.view.getChild("btnUp"));
		this.labNext = <fairygui.GTextField><any>(this.view.getChild("labNext"));
		this.labAttrNext = <fairygui.GTextField><any>(this.view.getChild("labAttrNext"));
		this.labNeedNext = <fairygui.GTextField><any>(this.view.getChild("labNeedNext"));
		this.boxMax = <fairygui.GGroup><any>(this.view.getChild("boxMax"));
		super.childrenCreated();
	}

	public onOpen(arg):void{
		super.onOpen(arg)
		this.btnUp.addClickListener(this.upHandle, this);
		GGlobal.control.listen(Enum_MsgType.GOD_EQUIP_SUIT_JIE, this.updateView, this);
		this.updateView();
	}

	protected onHide(): void {
		super.onHide()
		this.btnUp.removeClickListener(this.upHandle, this);
		GGlobal.control.remove(Enum_MsgType.GOD_EQUIP_SUIT_JIE, this.updateView, this);
		GGlobal.layerMgr.close(UIConst.GOD_EQUIP_SUIT);
	}


	private updateView(): void {
		var level = 999999;
		var equipData = Model_player.voMine.equipData;
		var voE: VoEquip;
		for (var i: number = 0; i < 10; i++) {
			voE = equipData[i + 10];
			if (voE) {
				if (voE.cfg.jie < level) {
					level = voE.cfg.jie;
				}
			} else {
				level = 0;
				break;
			}
		}
		var suitCur;
		if (Model_GodEquip.GOD_JIE == 0) {
			suitCur = null;
		} else {
			suitCur = Config.godequipsuit_208[Model_GodEquip.GOD_JIE]
		}
		var suitNext = Config.godequipsuit_208[Model_GodEquip.GOD_JIE + 1];
		if (suitCur) {
			this.labCur.text = "当前阶段：";
			this.labNeedCur.text = "全身神装" + Model_GodEquip.GOD_JIE + "阶";
			this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitCur.attr),"+")
			this.labPower.text = "战力+" + suitCur.power
			this.labTitle.text = "套装" + Model_GodEquip.GOD_JIE + "阶"

			this.labNext.y = this.labCur.y + 110;
			this.labNeedNext.y = this.labNeedCur.y + 110;
			this.labAttrNext.y = this.labAttrCur.y + 110;
		} else {
			this.labCur.text = "";
			this.labNeedCur.text = "";
			this.labAttrCur.text = ""
			this.labPower.text = "战力+0"
			this.labTitle.text = "套装0阶"

			this.labNext.y = this.labCur.y;
			this.labNeedNext.y = this.labNeedCur.y;
			this.labAttrNext.y = this.labAttrCur.y;
		}

		if (Model_GodEquip.GOD_JIE < level) {
			this.btnUp.checkNotice = true;
		} else {
			this.btnUp.checkNotice = false;
		}

		if (suitNext) {
			this.labNext.text = "下一阶段：";
			this.labNeedNext.text = "全身神装" + (Model_GodEquip.GOD_JIE + 1) + "阶";
			this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr),"+")
			this.boxMax.visible = false;
			this.btnUp.visible = this.btnUp.touchable = true;
		} else {
			this.labNext.text = "";
			this.labNeedNext.text = "";
			this.labAttrNext.text = ""
			this.boxMax.visible = true;
			this.btnUp.visible = this.btnUp.touchable = false;
		}
	}

	private upHandle(event: egret.TouchEvent = null): void {
		if(this.btnUp.checkNotice){
			GGlobal.modelGodEquip.CGUpJieOrange();
		}else{
			ViewCommonWarn.text("未满足条件")
		}
		
	}
}
