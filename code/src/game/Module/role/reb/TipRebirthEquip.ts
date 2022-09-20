class TipRebirthEquip extends UIModalPanel {

	public btnUp: Button0;
	public g22: fairygui.GImage;
	public lbName: fairygui.GTextField;
	public grid: ViewGrid;
	public lbNum: fairygui.GTextField;
	public lbLevel: fairygui.GTextField;
	public lbDes: fairygui.GRichTextField;
	public lbSourceTit: fairygui.GRichTextField;
	public lbDesTit: fairygui.GRichTextField;
	public lbSource: fairygui.GRichTextField;
	public imgDes: fairygui.GImage;
	public imgSource: fairygui.GImage;
	public btnOneKey: Button1;
	public expBar: fairygui.GProgressBar;
	public lbLv: fairygui.GTextField;
	public viewRes: ViewResource;

	public lbBase: fairygui.GTextField;
	public lbLH: fairygui.GTextField;
	public lbLhName: fairygui.GTextField;
	public lbValue: fairygui.GRichTextField;

	public static URL: string = "ui://3tzqotadm20j42";

	public static createInstance(): TipRebirthEquip {
		return <TipRebirthEquip><any>(fairygui.UIPackage.createObject("role", "TipRebirthEquip"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("role");
		this.view = fairygui.UIPackage.createObject("role", "TipRebirthEquip").asCom;
		this.contentPane = this.view;

		this.btnUp = <Button0><any>(this.view.getChild("btnUp"));
		this.g22 = <fairygui.GImage><any>(this.view.getChild("g22"));
		this.lbName = <fairygui.GTextField><any>(this.view.getChild("lbName"));
		this.grid = <ViewGrid><any>(this.view.getChild("grid"));
		this.lbNum = <fairygui.GTextField><any>(this.view.getChild("lbNum"));
		this.lbLevel = <fairygui.GTextField><any>(this.view.getChild("lbLevel"));
		this.lbDes = <fairygui.GRichTextField><any>(this.view.getChild("lbDes"));
		this.lbSourceTit = <fairygui.GRichTextField><any>(this.view.getChild("lbSourceTit"));
		this.lbDesTit = <fairygui.GRichTextField><any>(this.view.getChild("lbDesTit"));
		this.lbSource = <fairygui.GRichTextField><any>(this.view.getChild("lbSource"));
		this.imgDes = <fairygui.GImage><any>(this.view.getChild("imgDes"));
		this.imgSource = <fairygui.GImage><any>(this.view.getChild("imgSource"));
		this.btnOneKey = <Button1><any>(this.view.getChild("btnOneKey"));
		this.expBar = <fairygui.GProgressBar><any>(this.view.getChild("expBar"));
		this.lbLv = <fairygui.GTextField><any>(this.view.getChild("lbLv"));
		this.viewRes = <ViewResource><any>(this.view.getChild("viewRes"));
		this.lbBase = <fairygui.GTextField><any>(this.view.getChild("lbBase"));
		this.lbLH = <fairygui.GTextField><any>(this.view.getChild("lbLH"));
		this.lbLhName = <fairygui.GTextField><any>(this.view.getChild("lbLhName"));
		this.lbValue = <fairygui.GRichTextField><any>(this.view.getChild("lbValue"));
		super.childrenCreated();
	}

	private _vo: VoEquip
	public onOpen(arg): void {
		this._vo = arg as VoEquip
		super.onOpen(arg)

	}

	protected onShown(): void {
		var a = this;
		a.btnUp.addClickListener(a.onUp, a);
		a.btnOneKey.addClickListener(a.onUp, a);
		GGlobal.control.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, a.updateShow, a);
		a.updateShow();
	}

	protected onHide(): void {
		super.onHide()
		var a = this;
		a.btnUp.removeClickListener(a.onUp, a);
		a.btnOneKey.removeClickListener(a.onUp, a);
		GGlobal.layerMgr.close(UIConst.TIP_REBIRTH_EQUIP);
		GGlobal.control.remove(Enum_MsgType.REBIRTH_EQUIP_UPDATA, a.updateShow, a);
	}

	public updateShow(): void {
		let s = this;
		s.grid.vo = s._vo
		s.grid.showEff(true);
		s.lbName.text = s._vo.name;
		s.lbName.color = s._vo.qColor
		s.lbBase.text = "基础战力：[color=#16f60b]" + s._vo.basePower + "[/color]";

		var type = s._vo.type - 30

		let lh: VoRebirthLH = Model_Equip.lhArr[type];
		s.lbLv.text = "Lv." + lh.lv
		let lhCfg = Config.zhuanshenglh_256[lh.lv]

		s.lbLH.text = "炼魂战力：[color=#16f60b]" + lhCfg.fight + "[/color]";
		if (lhCfg.exp == 0) {//满级
			s.expBar.value = 1;
			s.expBar.max = 1;
			s.expBar._titleObject.text = "MAX";
		} else {
			s.expBar.value = lh.exp;
			s.expBar.max = lhCfg.exp;
		}
		var needExp = lhCfg.exp - lh.exp;
		if (needExp < 0) {
			needExp = 0;
		}
		let need = Math.ceil(needExp / Model_Equip.lhAddExp)
		//炼魂石
		let lhItem = VoItem.create(Model_Equip.lhItemId)
		s.viewRes.setImgUrl(lhItem.icon);
		let has = Model_Bag.getItemCount(Model_Equip.lhItemId)
		s.viewRes.setCount(has);
		s.lbLhName.text = lhItem.name;

		let lhAttr = lhCfg["bw" + (type + 1)]
		s.lbValue.text = s.attrString(s._vo.baseAttr, ConfigHelp.SplitStr(lhAttr), "+", "#FFFFFF", "#15f234")

		// this.btnUp.checkNotice = has > 0 && lhCfg.exp != 0;
		this.btnOneKey.checkNotice = (has * 10 + lh.exp >= lhCfg.exp) && (lhCfg.exp != 0);
		this._isFull = lhCfg.exp == 0;
	}

	private _isFull: boolean;
	private onUp(e: egret.TouchEvent) {
		let has = Model_Bag.getItemCount(Model_Equip.lhItemId)
		if (has == 0) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_Equip.lhItemId));
			return;
		}
		if (this._isFull) {
			ViewCommonWarn.text("已满级")
			return;
		}
		var cur = e.currentTarget;
		if (cur.id == this.btnUp.id) {
			GGlobal.modelEquip.addLHLv(this._vo.type, 0);
		} else {
			GGlobal.modelEquip.addLHLv(this._vo.type, 1);
		}
	}

	/**属性描述  格式 [[101,100],[102,100],[104,100]] return 攻击：100 防御：100*/
	public attrString(arr: any, arr1: any, gap = "：", ATTColor?: string, valColor?: string): string {
		let str = "";
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			let attrType1: number = 0;
			let attrValue1: number = 0;
			let same = false;
			for (let j = 0; j < arr1.length; j++) {
				attrType1 = Number(arr1[j][0]);
				attrValue1 = Number(arr1[j][1]);
				if (attrType1 == attrType) {
					same = true;
					break;
				}
			}
			var name: string = "";
			var val: string = '';
			var jssxCfg = Config.jssx_002[attrType]
			if (jssxCfg) {
				name = jssxCfg.name;
				if (jssxCfg.type == 2) {
					val = gap + "" + (attrValue / 1000) + "%";
				} else {
					val = gap + "" + attrValue + "";
				}
				if (same) {
					val += " (炼魂+" + attrValue1 + ")";
				}
				if (ATTColor) {
					name = HtmlUtil.fontNoSize(name, ATTColor);
				} else {
					if (valColor) {
						name = HtmlUtil.fontNoSize(name, valColor);
					}
				}
				if (valColor) {
					val = HtmlUtil.fontNoSize(val, valColor);
				}
				str += name + val;
			}
			if (i != arr.length - 1) {
				str += "\n";
			}
		}
		return str;
	}

}