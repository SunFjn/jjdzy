class View_chat_TuJian extends UIModalPanel {

	public iconImg: fairygui.GLoader;
	public colorImg: fairygui.GLoader;
	public levelLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public starLb: fairygui.GTextField;
	public ownerLb: fairygui.GLabel;
	public tjNameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public backIcon: fairygui.GLoader;

	public static URL: string = "ui://fx4pr5qewjpa23";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_TuJian").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}


	/**810001 id_1001 星级_3001  等级_12500战力 */
	private updateShow() {
		let s = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		let cfg = Config.picture_005[arr[0]];
		if (cfg) {
			IconUtil.setImg(s.iconImg, Enum_Path.TUJIAN_URL + cfg.pic + ".jpg");
			IconUtil.setImg(s.colorImg, Enum_Path.TUJIAN_URL + "bg" + cfg.quality + ".png");
			s.levelLb.text = Config.piclv_005[arr[2]].lv + "";
			s.nameLb.text = cfg.name;
			let starstr: string = "";
			let starcfg = Config.picstar_005[arr[1]];
			let starNum = Math.floor(starcfg.lv / 5);
			let starNum1 = starcfg.lv % 5;
			for (let i = 0; i < 5; i++) {
				if (i < starNum1) {
					starstr += "" + (starNum + 1);
				} else {
					starstr += "" + starNum;
				}
			}
			s.starLb.text = starstr;
			s.ownerLb.text = "拥有者：" + vo.name;
			s.tjNameLb.text = HtmlUtil.fontNoSize("【" + cfg.name + "·图鉴】", Color.getColorStr(cfg.quality));
			s.powerLb.text = "战力：" + arr[3];
		}
	}

	protected onShown(): void {
		IconUtil.setImg(this.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		this.updateShow();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(this.backIcon, null);
		IconUtil.setImg(self.iconImg, null);
		IconUtil.setImg(self.colorImg, null);
		GGlobal.layerMgr.close(UIConst.CHAT_TUJIAN);
	}
}