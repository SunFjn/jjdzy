class JinShengItem extends fairygui.GComponent {
	public expBar: fairygui.GProgressBar;
	public goBt: Button0;
	public drawBt: Button1;
	public expLb: fairygui.GRichTextField;
	public conditionLb: fairygui.GRichTextField;
	public moneyLb: fairygui.GRichTextField;
	public backImg: fairygui.GLoader;
	private drawImg: fairygui.GImage;

	public static URL: string = "ui://dllc71i9s0h0d";

	public static createInstance(): JinShengItem {
		return <JinShengItem><any>(fairygui.UIPackage.createObject("rebirth", "JinShengItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.expBar = <fairygui.GProgressBar><any>(a.getChild("expBar"));
		a.goBt = <Button0><any>(a.getChild("goBt"));
		a.drawBt = <Button1><any>(a.getChild("drawBt"));
		a.expLb = <fairygui.GRichTextField><any>(a.getChild("expLb"));
		a.conditionLb = <fairygui.GRichTextField><any>(a.getChild("conditionLb"));
		a.moneyLb = <fairygui.GRichTextField><any>(a.getChild("moneyLb"));
		a.backImg = <fairygui.GLoader><any>(a.getChild("backImg"));
		a.drawImg = <fairygui.GImage><any>(a.getChild("drawImg"));
		a.goBt.addClickListener(a.onGo, this);
		a.drawBt.addClickListener(a.onGo, this);
	}

	private onGo(evt: egret.TouchEvent): void {
		let a = this;
		evt.stopImmediatePropagation();
		evt.stopPropagation();
		if ((a.vo.state == 0 && a.vo.curCount >= a.vo.max) || a.vo.state == 1) {
			GGlobal.modeljinsheng.CG_JINSHENG_DRAWTASK(a.vo.id);
		} else {
			let panelId = a.vo.ui;
			if (panelId == UIConst.ERBASU) {
				GGlobal.layerMgr.open(panelId, { tabIndex: 2, listIndex: a.vo.can1 - 1 });
			} else if (panelId == UIConst.GUANXIAN) {
				let ui = GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel;
				if (panelId == UIConst.GUANXIAN) ui.onOpen(1);
			} else {
				if (Math.floor(panelId / 100) == 45 && !ModuleManager.isOpen(panelId)) {//活动
					panelId = UIConst.HUODONG
				}
				GGlobal.layerMgr.open(panelId);
			}
		}
	}

	public vo: Vo_JinShengTask;
	public show(vo: Vo_JinShengTask) {
		let a = this;
		a.vo = vo;
		a.expLb.text = vo.exp + "";
		a.conditionLb.text = vo.tips;
		a.moneyLb.text = vo.yb + "";
		a.expBar.max = vo.max;
		a.expBar.value = vo.curCount;
		a.goBt.visible = false;
		a.drawImg.visible = false;
		a.drawBt.visible = false;
		if ((vo.state == 0 && vo.curCount >= vo.max) || vo.state == 1) {
			a.drawBt.visible = true;
			a.drawBt.checkNotice = true;
		} else if (vo.state == 2) {
			a.drawImg.visible = true;
		} else {
			a.goBt.visible = true;
		}

		if (vo.id < 3000) {
			a.backImg.url = "ui://dllc71i9hd1b15";
		} else {
			a.backImg.url = "ui://dllc71i9hd1b14";
		}
	}
}