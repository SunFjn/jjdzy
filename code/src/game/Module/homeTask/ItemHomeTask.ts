class ItemHomeTask extends fairygui.GComponent {

	public progress: fairygui.GProgressBar;
	public lbNa0: fairygui.GRichTextField;
	public lbTitle: fairygui.GRichTextField;
	public lbNa1: fairygui.GRichTextField;
	public grid: ViewGrid;
	public btn: fairygui.GButton;
	public imgYWC: fairygui.GImage;
	public btnLQ: fairygui.GButton;
	public lbCt0: fairygui.GRichTextField;
	public img0: fairygui.GLoader;
	public lbCt1: fairygui.GRichTextField;
	public img1: fairygui.GLoader;

	public static URL: string = "ui://oy62ymetd8t63";

	public static createInstance(): ItemHomeTask {
		return <ItemHomeTask><any>(fairygui.UIPackage.createObject("homeTask", "ItemHomeTask"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.btnLQ.addClickListener(s.onGet, s);
		s.btn.addClickListener(s.onGo, s);
	}

	private _vo: Vo_HomeTask;
	public set vo(v: Vo_HomeTask) {
		let s = this;
		s._vo = v;
		s.progress.max = 1;
		s.progress.value = v.state == 0 ? 0 : 1;
		//奖励
		// var award = JSON.parse(v.award);
		// for (var i = 0; i < award.length; i++) {
		// 	let na
		// 	let ct
		// 	if (award[i][0] == Enum_Attr.ITEM || award[i][0] == Enum_Attr.EQUIP) {
		// 		na = ConfigHelp.getItemColorName(award[i][1], false);
		// 		ct = award[i][2]
		// 	} else {
		// 		na = Vo_attr.getAttrName(award[i][0]);
		// 		ct = award[i][2];
		// 	}
		// 	s["lbNa" + i].text = na
		// 	s["lbCt" + i].text = "+" + ct
		// 	s["img" + i]
		// }

		var award = ConfigHelp.makeItemListArr(JSON.parse(v.award))
		for (let i = 0; i < award.length; i++) {
			s["lbNa" + i].text = award[i].name
			s["lbCt" + i].text = "+" + award[i].count
			IconUtil.setImg(s["img" + i], Enum_Path.ICON70_URL + award[i].icon + ".png");
		}

		s.lbTitle.text = v.name;
		let icon = ConfigHelp.makeItemListArr(JSON.parse(v.icon));;
		s.grid.tipEnabled = s.grid.isShowEff = true;
		s.grid.vo = icon[0];

		s.imgYWC.visible = v.state == 2;
		s.btn.visible = v.state == 0;
		s.btnLQ.visible = v.state == 1;
	}

	private onGet() {
		let s = this;
		if (!s._vo) {
			return;
		}
		GGlobal.model_HomeTask.CG_GET_TASK_REWARD_11409(s._vo.id);
	}

	private onGo() {
		let s = this;
		if (!s._vo) {
			return;
		}
		GGlobal.layerMgr.open(s._vo.nextto);
		GGlobal.layerMgr.close2(UIConst.HOME_TASK)
	}

	public clean() {
		super.clean();
		let s = this;
		s.grid.clean();
		for (let i = 0; i < 2; i++) {
			IconUtil.setImg(s["img" + i], null);
		}

	}
}