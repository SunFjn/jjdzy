class TuJianItem extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public colorImg: fairygui.GLoader;
	public starLb: fairygui.GTextField;
	public levelLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public maskImg: fairygui.GImage;
	public isShowMask: boolean = true;
	public isShowNotice: boolean = true;

	public static URL: string = "ui://m0rbmsgscia23b";

	public static createInstance(): TuJianItem {
		return <TuJianItem><any>(fairygui.UIPackage.createObject("TuJian", "TuJianItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s,s);
	}

	private STARMAX: number = 5;
	private _vo: Vo_TuJian;
	public set vo(vo: Vo_TuJian) {
		let s = this;
		s._vo = vo;
		if (vo) {
			IconUtil.setImg(s.iconImg, Enum_Path.TUJIAN_URL + vo.pic + ".jpg");
			IconUtil.setImg(s.colorImg, Enum_Path.TUJIAN_URL + "bg" + vo.quality + ".png");
			s.nameLb.text = vo.name;
			if (vo.isJiHuo) {
				s.checkNotice = false;
				s.maskImg.visible = false;
				s.levelLb.visible = true;
				let starstr: string = "";
				let starcfg = Config.picstar_005[s.vo.starLv];
				let starNum = Math.floor(s.vo.starLv / s.STARMAX);
				let starNum1 = s.vo.starLv % s.STARMAX;
				for (let i = 0; i < s.STARMAX; i++) {
					if (i < starNum1) {
						starstr += "" + (starNum + 1);
					} else {
						starstr += "" + starNum;
					}
				}
				s.starLb.text = starstr;
				s.levelLb.text = vo.level + "";
				if (vo.next_star > 0) {
					let costArr0: Array<any> = s.vo.consume_star;
					let costVo0: VoItem = VoItem.create(costArr0[0][1]);
					let count0 = Model_Bag.getItemCount(costArr0[0][1]);
					if (count0 >= costArr0[0][2] && s.isShowNotice) {
						s.checkNotice = true;
					}
				}
				if (vo.level < vo.levelMax) {
					let costArr1: Array<any> = s.vo.consume_level;
					let costVo1: VoItem = VoItem.create(costArr1[0][1]);
					let count1 = Model_Bag.getItemCount(costArr1[0][1]);
					if (count1 >= costArr1[0][2] && s.isShowNotice) {
						s.checkNotice = true;
					}
				}
			} else {
				s.maskImg.visible = s.isShowMask;
				s.levelLb.visible = false;
				s.starLb.text = "00000";
				let costArr0: Array<any> = s.vo.activation_jihuo;
				let costVo0: VoItem = VoItem.create(costArr0[0][1]);
				costVo0.count = costArr0[0][2];
				let count = Model_Bag.getItemCount(costArr0[0][1]);
				if (count >= costVo0.count && s.isShowNotice) {
					s.checkNotice = true;
				} else {
					s.checkNotice = false;
				}
				let starstr: string = "";
				let starNum = Math.floor(s.vo.starLv / s.STARMAX);
				let starNum1 = s.vo.starLv % s.STARMAX;
				for (let i = 0; i < s.STARMAX; i++) {
					if (i < starNum1) {
						starstr += "" + (starNum + 1);
					} else {
						starstr += "" + starNum;
					}
				}
				s.starLb.text = starstr;
			}
		}
	}

	public get vo(): Vo_TuJian {
		return this._vo;
	}

	private check: boolean = false;
	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
		this.check = value;
	}

	public get checkNotice(): boolean {
		return this.check;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.iconImg, null);
		IconUtil.setImg(self.colorImg, null);
	}
}