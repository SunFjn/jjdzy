class VSixWayGrid extends fairygui.GComponent{
	public iconImg: fairygui.GLoader;
	public starLb:fairygui.GRichTextField;
	public starGroup:fairygui.GGroup;
	public pzImg: fairygui.GLoader;
	public isShowEff: boolean = false;
	private _temp:Isixdaoyj_505;
	public lbName:fairygui.GRichTextField;

	public static URL:string = "ui://ehelf5bh11m1w11";

	public static createInstance():VSixWayGrid {
		return <VSixWayGrid><any>(fairygui.UIPackage.createObject("lunhui","VSixWayGrid"));
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
	public set vo(v:VoSixWay){
		let s = this;
		s._vo = v;
		if(v && v.id > 0){
			s.starLb.text = v.star + "";
			s.lbName.text = v.colorName;
			s.starGroup.visible = true;
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l" + v.pz + ".png");
			// s.showEff(s.isShowEff);
			IconUtil.setImg(s.iconImg, Enum_Path.SIXWAY_URL + v.icon + ".png");
		}else{
			IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l0.png");
			IconUtil.setImg(s.iconImg, null);
			s.starLb.text = "";
			s.lbName.text = "";
			s.starGroup.visible = false;
			// s.showEff(false);
		}
	}
	public get vo():VoSixWay{
		return this._vo;
	}

	private effPart: Part;
	public showEff(v: boolean): void {
		let s = this;
		if (v && s.vo && s.vo.id > 0) {
			s._temp = s.vo.cfg;
			s.showEffTemp(v);
		} else {
			if (s.effPart) {
				EffectMgr.instance.removeEff(s.effPart);
				s.effPart = null;
			}
		}
	}

	private showEffTemp(v:boolean){
		let s = this;
		if (v && s._temp && s._temp.pz >= 5) {
			if (s.effPart) {
				EffectMgr.instance.removeEff(s.effPart);
				s.effPart = null;
			}
			if (s.effPart == null) {
				var idx = 0;
				if (s._temp.pz >= 8) {
					idx = 10055;
				} else {
					idx = 10001 + (s._temp.pz - 5);
					idx = idx > 10002 ? 10002 : idx;
				}
				s.effPart = EffectMgr.addEff("uieff/" + idx, s.displayListContainer, s.width / 2 + 3, s.height / 2 - 1, 800, -1);
			}
		} else {
			if (s.effPart) {
				EffectMgr.instance.removeEff(s.effPart);
				s.effPart = null;
			}
		}
	}

	public clean(){
		let s = this;
		super.clean();
		s.showEff(false);
		IconUtil.setImg(s.pzImg, null);
	}
}