class View_ActCom_SGBZList extends UIModalPanel {

	public frame: fairygui.GLabel;
	public listLb: fairygui.GRichTextField;
	public escBt: fairygui.GButton;
	public sureBt: fairygui.GButton;

	public static URL: string = "ui://y9683xrpj158c";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActComSGBZ", "View_ActCom_SGBZList").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private onSure() {
		this.doHideAnimation();
		GGlobal.modelsgbz.CG_CountryTreasure_chooseItem_8651(this._args);
	}

	private onEsc() {
		this.doHideAnimation();
	}

	protected onShown(): void {
		let self = this;
		let showStr0 = "至尊宝藏清单：";
		let showStr1 = "豪华宝藏清单：";
		let showStr2 = "高级宝藏清单：";
		let listArr: any[] = self._args;
		for (let j = 0; j < listArr.length; j++) {
			let cfg = Config.bzjc_753[listArr[j][0]];
			let arr = listArr[j][1];
			let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.bzjc));
			let showStr = "";
			for (let i = 0; i < arr.length; i++) {
				let vo = rewardArr[arr[i]]
				showStr += (i == 0 ? "" : ",") + HtmlUtil.fontNoSize(vo.name + "x" + vo.count, Color.getColorStr(vo.quality));
			}
			if (cfg.dc == 4) {
				showStr0 += showStr;
			} else if (cfg.dc == 3) {
				showStr1 += showStr;
			} else {
				showStr2 += showStr;
			}
		}
		self.listLb.text = showStr0 + "\n" + showStr1 + "\n" + showStr2;
		self.sureBt.addClickListener(self.onSure, self);
		self.escBt.addClickListener(self.onEsc, self);
	}

	protected onHide(): void {
		let self = this;
		self.sureBt.removeClickListener(self.onSure, self);
		self.escBt.removeClickListener(self.onEsc, self);
	}
}