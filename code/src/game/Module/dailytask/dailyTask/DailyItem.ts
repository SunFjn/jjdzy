/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class DailyItem extends fairygui.GComponent {

	public progress: fairygui.GProgressBar;
	public btnLQ: Button1;
	public btn: Button0;
	public lbAwards: fairygui.GRichTextField;
	public lbTitle: fairygui.GRichTextField;
	public lbHuoYue: fairygui.GRichTextField;
	public imgYWC: fairygui.GImage;

	public static URL: string = "ui://b3p8szvvtw1l2";

	public static createInstance(): DailyItem {
		return <DailyItem><any>(fairygui.UIPackage.createObject("dailytask", "DailyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.progress = <fairygui.GProgressBar><any>(s.getChild("progress"));
		s.btnLQ = <Button1><any>(s.getChild("btnLQ"));
		s.btn = <Button0><any>(s.getChild("btn"));
		s.lbAwards = <fairygui.GRichTextField><any>(s.getChild("lbAwards"));
		s.lbTitle = <fairygui.GRichTextField><any>(s.getChild("lbTitle"));
		s.lbHuoYue = <fairygui.GRichTextField><any>(s.getChild("lbHuoYue"));
		s.imgYWC = <fairygui.GImage><any>(s.getChild("imgYWC"));
		s.btnLQ.checkNotice = true;
		s.btnLQ.addClickListener(s.getAwardsHandler, s);
		s.btn.addClickListener(s.getAwardsHandler, s);
	}

	private getAwardsHandler(e: egret.TouchEvent) {
		if(!this._vo){
			return;
		}
		var st = this._vo.state;
		if (st == 0) {
			e.stopPropagation();
			GGlobal.layerMgr.close2(UIConst.DAILYTASK);
			GGlobal.layerMgr.backPanelId = UIConst.DAILYTASK;
			if (this._link == UIConst.CHAT && Model_GlobalMsg.kaifuDay <= 7) {
				GGlobal.layerMgr.open(this._link, 1);
			} else {
				GGlobal.layerMgr.open(this._link);
			}
		}
		else if (st == 1) GGlobal.modeltask.CG_AWARDS_1053(this._vo.id);
	}

	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}

	private grids = [];
	private _link;
	private _vo: VoTask;
	setVO(vo: VoTask) {
		let s = this;
		s._vo = vo;
		s.progress.max = vo.max;
		s._link = vo.link;
		s.progress.value = vo.progress;
		s.lbAwards.text = ConfigHelp.makeItemRewardText(vo.award, "  ", "+");
		s.lbTitle.text = vo.name;
		s.lbHuoYue.text = "活跃度+" + vo.huoyuedu;

		ConfigHelp.cleanGridview(s.grids);
		let awards = ConfigHelp.makeItemListArr(JSON.parse(vo.icon));;
		s.grids = ConfigHelp.addGridview(awards, s, 10, 10, false, false);

		s.imgYWC.visible = vo.state == 2;
		s.btn.visible = vo.state == 0;
		s.btnLQ.visible = vo.state == 1;
	}
}