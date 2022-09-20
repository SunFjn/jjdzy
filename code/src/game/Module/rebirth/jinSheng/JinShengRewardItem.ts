class JinShengRewardItem extends fairygui.GComponent {

	public gridArr: JinShengGrid[] = [];
	// public drawBt: Button1;
	public promptLb: fairygui.GRichTextField;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://dllc71i9elpxi";

	public static createInstance(): JinShengRewardItem {
		return <JinShengRewardItem><any>(fairygui.UIPackage.createObject("rebirth", "JinShengRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		for (let i = 0; i < 3; i++) {
			let grid = <JinShengGrid><any>(a.getChild("grid" + i));
			a.gridArr.push(grid);
		}
		// a.drawBt = <Button1><any>(a.getChild("drawBt"));
		a.promptLb = <fairygui.GRichTextField><any>(a.getChild("promptLb"));
		a.drawImg = <fairygui.GImage><any>(a.getChild("drawImg"));
		// a.drawBt.addClickListener(a.onDraw, this);
	}

	private onDraw() {
		let a = this;
		GGlobal.modeljinsheng.CG_JINSHENG_DRAWREWARD(a.vo.id);
	}

	private vo;
	public show(cfg, isShow: boolean) {
		let a = this;
		a.vo = cfg;
		let arr: any[] = JSON.parse(cfg.reward);
		if (isShow && cfg.time != "0") arr = arr.concat(JSON.parse(cfg.time));
		let reward = ConfigHelp.makeItemListArr(arr);
		let len = a.gridArr.length;
		for (let i = 0; i < len; i++) {
			let grid: JinShengGrid = a.gridArr[i];
			if (i < reward.length) {
				grid.visible = true;
				grid.setVo(reward[i], isShow && cfg.time != "0" && i == reward.length - 1);
			} else {
				grid.visible = false;
			}
		}
		a.drawImg.visible = false;
		// a.drawBt.visible = false;
		a.promptLb.visible = false;
		if (Model_JinSheng.drawArr.indexOf(cfg.id) != -1) {
			a.drawImg.visible = true;
		} else {
		// 	if (Model_JinSheng.level >= cfg.id) {
		// 		a.drawBt.visible = true;
		// 		a.drawBt.checkNotice = true;
		// 	} else {
				a.promptLb.visible = true;
				a.promptLb.text = cfg.tips;
		// 	}
		}
	}

	public clean() {
		for (let i = 0; i < this.gridArr.length; i++) {
			this.gridArr[i].clean();
		}
	}
}