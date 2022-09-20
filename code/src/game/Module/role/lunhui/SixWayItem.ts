/**
 * 六道item
 */
class SixWayItem extends fairygui.GComponent{
	public nameLb: fairygui.GRichTextField;
	public proLb: fairygui.GRichTextField;
	public bgImg: fairygui.GLoader;
	public pzImg: fairygui.GLoader;
	public c1: fairygui.Controller;
	public lbActivate: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;

	private _cfg:Isixdaotz_505;

	public static URL: string = "ui://ehelf5bh11m1ww";

	public static createInstance(): SixWayItem {
		return <SixWayItem><any>(fairygui.UIPackage.createObject("lunhui", "SixWayItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public setdata(id:number, index:number) {
		let s = this;
		let cfg1:Isixdao_505;
		for(let key in Config.sixdao_505)
		{
			let cfg:Isixdao_505 = Config.sixdao_505[key];
			if(Math.floor(cfg.id /10) == (index + 1))
			{
				cfg1 = cfg;
				break;
			}
		}

		if(id <= 0)//未激活
		{
			if(Model_player.voMine.reincarnationLevel >= cfg1.lh)//已开启
			{
				s.c1.selectedIndex = 1;
			}else{
				s.c1.selectedIndex = 0;
				s.lbActivate.text = cfg1.lh + "世轮回开启";
			}

			for(let key in Config.sixdaotz_505)
			{
				let cfg:Isixdaotz_505 = Config.sixdaotz_505[key];
				if(cfg.type == (index + 1))
				{
					s._cfg = cfg;
					break;
				}
			}
			IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + s._cfg.type +".jpg");
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k0.png");
			s.nameLb.text = HtmlUtil.fontNoSize(s._cfg.name + "(2/4/6)", "#666666");
			// let attArr: Array<any> = JSON.parse(s._cfg.attr);
			// let attstr:string = "";
			// for (let i = 0; i < attArr.length; i++) {
			// 	attstr += Vo_attr.getShowStr(attArr[i][0], 0);
			// }
			s.proLb.text = "尚未激活";
		}else{
			s.c1.selectedIndex = 1;
			s._cfg = Config.sixdaotz_505[id];
			if(!s._cfg)  return;

			let str:string = "";
			if(s._cfg.num == 2)
			{
				str = "(" + HtmlUtil.fontNoSize("2", Color.WHITESTR) + "/4/6)";
			}else if(s._cfg.num == 4)
			{
				str = "(2/" + HtmlUtil.fontNoSize("4", Color.WHITESTR) + "/6)";
			}else{
				str = "(2/4/" + HtmlUtil.fontNoSize("6", Color.WHITESTR) + ")";
			}
			s.nameLb.text = ConfigHelp.createColorName(s._cfg.name, s._cfg.pz) + str;
			// let attArr: Array<any> = JSON.parse(s._cfg.attr);
			// let attstr:string = "";
			// for (let i = 0; i < attArr.length; i++) {
			// 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
			// }
			s.proLb.text = s._cfg.tips;
			s.proLb.color = Color.WHITEINT;
			IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + s._cfg.type +".jpg");
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k" + s._cfg.pz + ".png");
		}
		s.addClickListener(s.onClick, s);

		s.checkNotice = GGlobal.reddot.checkCondition(UIConst.SIXWAY, index);
	}

	/**
	 * 点击事件
	 */
	private onClick(e: egret.TouchEvent): void {
		if(this.c1.selectedIndex <= 0)  return;

		Model_LunHui.type = this._cfg.type;
		// GGlobal.layerMgr.close2(UIConst.SIXWAY);
		// GGlobal.layerMgr.close2(UIConst.LUNHUI);
		// GGlobal.layerMgr.close2(UIConst.TIANMING);
		GGlobal.layerMgr.open(UIConst.SIXWAY_YINJI, Model_LunHui.type);
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