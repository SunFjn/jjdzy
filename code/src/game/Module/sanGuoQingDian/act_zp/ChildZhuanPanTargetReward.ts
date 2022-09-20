class ChildZhuanPanTargetReward extends fairygui.GComponent {

	public label: fairygui.GRichTextField;
	public drawImg: fairygui.GImage;
	public drawBt: Button1;
	public gridArr: ViewGrid[] = [];

	public static URL: string = "ui://kdt501v2dg2219";

	public static createInstance(): ChildZhuanPanTargetReward {
		return <ChildZhuanPanTargetReward><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "ChildZhuanPanTargetReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.label = <fairygui.GRichTextField><any>(s.getChild("label"));
		for (let i = 0; i < 3; i++) {
			let grid = <ViewGrid><any>(s.getChild("grid" + i));
			s.gridArr.push(grid);
		}
		s.drawImg = <fairygui.GImage><any>(s.getChild("drawImg"));
		s.drawBt = <Button1><any>(s.getChild("drawBt"));
		s.drawBt.addClickListener(s.drawHandler, s);
	}

	private drawHandler() {
		if (this.vo.state == 1) {
			GGlobal.modelSGQD.CGDrawReward4129(this.vo.cfg.id);
		} else {
			ViewCommonWarn.text("未达到领取条件");
		}
	}

	private vo: Vo_ZhuanPanTarget;
	public updateShow(vo: Vo_ZhuanPanTarget) {
		let s = this;
		if (vo.state == 0 && ModelSGQD.zpCtMy >= vo.cfg.time) {
			vo.state = 1;
		}
		s.vo = vo;
		s.label.text = "转盘" + vo.cfg.time + "次";
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.reward));
		for (let i = 0; i < s.gridArr.length; i++) {
			if (i < rewardArr.length) {
				s.gridArr[i].visible = true;
				s.gridArr[i].vo = rewardArr[i];
				s.gridArr[i].isShowEff = true;
				s.gridArr[i].tipEnabled = true;
			} else {
				s.gridArr[i].visible = false;
			}
		}
		s.drawBt.visible = true;
		s.drawImg.visible = false;
		s.drawBt.checkNotice = vo.state == 1;
		switch (vo.state) {//0:未达到，1:可领取，2:已领取
			case 0:
				s.drawBt.visible = false;
				break;
			case 1:
				s.drawBt.text = "可领取";
				break;
			case 2:
				s.drawBt.visible = false;
				s.drawImg.visible = true;
				break;
		}
	}

	public clean() {
		let s = this;
		for (let i = 0; i < s.gridArr.length; i++) {
			s.gridArr[i].clean();
		}
	}
}