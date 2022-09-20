/**
 * 六道印记item
 */
class SixWayYinJiItem extends fairygui.GButton{
	public labName: fairygui.GTextField;
	public labName1: fairygui.GTextField;
	public pzImg: fairygui.GLoader;
	public iconImg: fairygui.GLoader;
	public lbStar: fairygui.GTextField;
	public noticeImg: fairygui.GImage;
	public imgAdd: fairygui.GImage;
	public imgName: fairygui.GImage;
	public c1: fairygui.Controller;

	public pos: number;//印记部位
	public index: number;//1-6

	public static URL: string = "ui://ehelf5bh11m1w15";

	public static createInstance(): SixWayYinJiItem {
		return <SixWayYinJiItem><any>(fairygui.UIPackage.createObject("lunhui", "SixWayYinJiItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
	}

	private _vo:VoSixWay;
	public setVo(v: VoSixWay, pos:number) {
		let s = this;
		s._vo = v;
		s.pos = pos;
		if (v && v.id != 0) {
			s.c1.selectedIndex = 1;
			s.labName1.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l" + v.pz + ".png");
			IconUtil.setImg(s.iconImg, Enum_Path.SIXWAY_URL + v.icon + ".png");
			s.lbStar.text = v.star + "";

			s.checkNotice = (Model_LunHui.canUpLevel(v) || Model_LunHui.canUpStar(v) || Model_LunHui.canUpPower(v.pos));
		}else {
			s.c1.selectedIndex = 0;
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l0.png");
			let curCfg:Isixdaoyj_505;
			for(let key in Config.sixdaoyj_505)
			{
				let cfg:Isixdaoyj_505 = Config.sixdaoyj_505[key];
				if(cfg && cfg.type == pos)
				{
					curCfg = cfg;
					break;
				}
			}
			s.labName.text = HtmlUtil.fontNoSize(curCfg?curCfg.name:"", "#666666");
			IconUtil.setImg(s.iconImg, null);
			s.checkNotice = Model_LunHui.canWear(pos);
		}
	}

	public get vo(): VoSixWay {
		return this._vo;
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		if (this._checkNotice != value) {
			this._checkNotice = value;
			this.noticeImg.visible = value;
		}
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}