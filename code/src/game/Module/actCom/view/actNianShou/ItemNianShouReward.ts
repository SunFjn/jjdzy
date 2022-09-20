class ItemNianShouReward extends fairygui.GComponent {

	public imgYWC: fairygui.GImage;
	public list: fairygui.GList;
	public lbNo: fairygui.GRichTextField;
	public lbPoint: fairygui.GRichTextField;
	public btnGet: Button2;

	public static URL: string = "ui://ht2966i4dsuf9";

	public static createInstance(): ItemNianShouReward {
		return <ItemNianShouReward><any>(fairygui.UIPackage.createObject("actComNianShou", "ItemNianShouReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
		s.btnGet.addClickListener(s.onReward, s);
	}

	private _v: Inianpoint_299;
	public set vo(v: Inianpoint_299) {
		let s = this;
		s._v = v;
		s.lbPoint.text = "获得" + v.point + "积分"
		s._lstData = ConfigHelp.makeItemListArr(JSON.parse(v.reward));
		s.list.numItems = s._lstData.length;
		let m = GGlobal.model_ActNianShou
		let st = m.rewStObj[v.id]
		let point = m.point

		if (st == 1) {//已领取
			s.imgYWC.visible = true;
			s.lbNo.visible = false;
			s.btnGet.visible = false;
		} else if (point >= v.point) {//可领取
			s.imgYWC.visible = false;
			s.btnGet.checkNotice = s.btnGet.visible = true;
			s.lbNo.visible = false;
		} else {
			s.imgYWC.visible = false;
			s.btnGet.visible = false;
			s.lbNo.visible = true;
		}
	}

	private onReward() {
		let s = this;
		if (!s._v) {
			return;
		}
		GGlobal.model_ActNianShou.CG_GET_GOAL_REWARD_11557(s._v.id)
	}

	public clean() {
		super.clean();
		let s = this;
		s.list.numItems = 0;
	}
	private _lstData;
	private itemRender(idx, grid: ViewGrid) {
		grid.tipEnabled = grid.isShowEff = true;
		grid.vo = this._lstData[idx];
	}
}