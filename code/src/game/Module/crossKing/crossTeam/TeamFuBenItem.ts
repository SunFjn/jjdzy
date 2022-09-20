class TeamFuBenItem extends fairygui.GButton {

	public taiziImg: fairygui.GLoader;
	public chooseImg: fairygui.GLoader;
	public nameIcon: fairygui.GLoader;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	private awatar: UIRole;
	public imgDoub: fairygui.GImage;

	public static URL: string = "ui://yqpfulefiad82x";

	public static createInstance(): TeamFuBenItem {
		return <TeamFuBenItem><any>(fairygui.UIPackage.createObject("crossKing", "TeamFuBenItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.grid0.isShowEff = s.grid1.isShowEff = true;
	}

	public vo: Izdfb_255;
	public setVo(cfg: Izdfb_255) {
		let s = this;
		s.vo = cfg;
		s.nameIcon.url = CommonManager.getUrl("crossKing", "fuben" + cfg.id);
		s.nameIcon.grayed = Model_player.voMine.zsID < cfg.zs;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward3));
		s.grid0.isShowEff = true;
		s.grid1.isShowEff = true;
		s.grid0.vo = rewardArr[0];
		s.grid1.vo = rewardArr[1];
		s.grid0.tipEnabled = true;
		s.grid1.tipEnabled = true;
		let lb = Config.NPC_200[cfg.boss];
		if (!s.awatar) {
			s.awatar = UIRole.create();
			s.awatar.uiparent = s.displayListContainer;
		}
		s.awatar.setBody(lb.mod);
		s.awatar.setPos(100, 170);
		if (lb.weapon) {
			s.awatar.setWeapon(lb.mod);
		}
		s.awatar.onAdd();
		IconUtil.setImg(s.taiziImg, Enum_Path.BACK_URL + "taizi.png");
		IconUtil.setImg(s.chooseImg, Enum_Path.BACK_URL + "seletedbg.png");

		let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
		this.imgDoub.visible = (act != null)
	}

	public clean() {
		let s = this;
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		IconUtil.setImg(s.taiziImg, null);
		IconUtil.setImg(s.chooseImg, null);
		s.grid0.vo = null;
		s.grid1.vo = null;
	}
}