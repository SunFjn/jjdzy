class NZBZ_Item extends fairygui.GComponent {

	public headItem: NZBZHead;
	public guanxianLb: fairygui.GRichTextField;
	public gongxunLb: fairygui.GRichTextField;
	public prestigeLb: fairygui.GRichTextField;
	public jifenImg: fairygui.GLoader;
	public powerLb: fairygui.GRichTextField;
	public battleBt: fairygui.GButton;
	public saoDangBt: fairygui.GButton;

	public static URL: string = "ui://xzyn0qe3nb1u6";

	public static createInstance(): NZBZ_Item {
		return <NZBZ_Item><any>(fairygui.UIPackage.createObject("nzbz", "NZBZ_Item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.headItem = <NZBZHead><any>(this.getChild("headItem"));
		this.guanxianLb = <fairygui.GRichTextField><any>(this.getChild("guanxianLb"));
		this.gongxunLb = <fairygui.GRichTextField><any>(this.getChild("gongxunLb"));
		this.prestigeLb = <fairygui.GRichTextField><any>(this.getChild("prestigeLb"));
		this.jifenImg = <fairygui.GLoader><any>(this.getChild("jifenImg"));
		this.powerLb = <fairygui.GRichTextField><any>(this.getChild("powerLb"));
		this.battleBt = <fairygui.GButton><any>(this.getChild("battleBt"));
		this.saoDangBt = <fairygui.GButton><any>(this.getChild("saoDangBt"));
		this.battleBt.addClickListener(this.battleHandler, this);
		this.saoDangBt.addClickListener(this.battleHandler, this);
	}

	private battleHandler(): void {
		if (Model_NZBZ.battleNum > 0) {
			let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
			if (vipcfg && vipcfg.SAODANGPK == 1 && Model_player.voMine.str >= this.vo.power) {
				GGlobal.modelnzbz.CG_NZBZ_SAODANG(this.vo.id);
			} else {
				GGlobal.modelnzbz.CG_NZBZ_BATTLE(this.vo.id);
			}
		} else {
			Model_NZBZ.addHandler()
			// ViewCommonWarn.text("剩余挑战次数不足");
		}
	}

	private _vo: Vo_NZBZ;
	public set vo(vo: Vo_NZBZ) {
		this._vo = vo;
		if (vo) {
			this.headItem.show(vo.headId, vo.framePic, vo.country, vo.level);
			if (vo.guanzhi <= 1) {
				this.guanxianLb.text = vo.name;
			} else {
				this.guanxianLb.text = "【" + (vo.guanzhi - 1) + "阶·" + Config.guanxian_701[vo.guanzhi].name + "】" + vo.name;
			}
			let arr = JSON.parse(Config.xtcs_004[vo.constId].other);
			this.gongxunLb.text = "功勋        " + arr[0][2];
			this.prestigeLb.text = "声望        " + arr[1][2];
			let url;
			if (vo.jifenId == 1041) {
				url = "ui://xzyn0qe3aro8p";//30积分
			} else if (vo.jifenId == 1042) {
				url = "ui://xzyn0qe3aro8r";//20积分
			} else {
				url = "ui://xzyn0qe3aro8q";//10积分
			}
			this.jifenImg.url = url;
			this.powerLb.text = "战力：" + vo.power;
			let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
			this.saoDangBt.visible = false;
			this.battleBt.visible = false;
			if (vipcfg && vipcfg.SAODANGPK == 1 && Model_player.voMine.str >= vo.power) {
				this.saoDangBt.visible = true;
			} else {
				this.battleBt.visible = true;
			}
		}
	}

	public get vo(): Vo_NZBZ {
		return this._vo;
	}
}