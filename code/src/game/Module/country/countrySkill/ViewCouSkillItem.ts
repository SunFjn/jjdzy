class ViewCouSkillItem extends fairygui.GButton {

	public lbCur: fairygui.GTextField;
	public lbCurVal: fairygui.GTextField;
	public lbNext: fairygui.GTextField;
	public lbNextVal: fairygui.GTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public imgName: fairygui.GLoader;
	public noticeImg: fairygui.GImage;
	public lbLevel: fairygui.GRichTextField;
	public imgLocked: fairygui.GImage;

	public static URL: string = "ui://uwzc58njdr4r6d";

	public static createInstance(): ViewCouSkillItem {
		return <ViewCouSkillItem><any>(fairygui.UIPackage.createObject("country", "ViewCouSkillItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const sf = this;
		CommonManager.parseChildren(sf, sf);
	}

	private _vo: { skillId: number, isAct: number, cfg: Igjjn_748 }
	public set vo(v: { skillId: number, isAct: number, cfg: Igjjn_748 }) {
		this._vo = v
		let cfgNext = Config.gjjn_748[v.cfg.next]
		if (v.cfg.attr != "0") {
			this.lbCurVal.text = ConfigHelp.attrString(JSON.parse(v.cfg.attr), "+")
			if (cfgNext) {
				this.lbNextVal.text = ConfigHelp.attrString(JSON.parse(cfgNext.attr), "+", null, "#15f234")
			}
		} else if (v.cfg.zxjy != "0" || (cfgNext && cfgNext.zxjy != "0")) {
			this.lbCurVal.text = "离线经验+" + v.cfg.lxjy
			if (cfgNext) {
				this.lbNextVal.text = HtmlUtil.fontNoSize("离线经验+" + cfgNext.lxjy, "#15f234");
			}
		} else {
			this.lbCurVal.text = "离线铜钱+" + v.cfg.lxtq
			if (cfgNext) {
				this.lbNextVal.text = HtmlUtil.fontNoSize("离线铜钱+" + cfgNext.lxtq, "#15f234");
			}

		}

		if (!cfgNext) {
			this.lbNext.text = "已满级"
			this.lbNextVal.text = ""
		} else {
			this.lbNext.text = "下级效果"
		}

		ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.cfg.icon + ".png", this.imgIcon);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + 5 + ".png", this.bg);
		ImageLoader.instance.loader(Enum_Path.PIC_URL + v.cfg.tupianzi + ".png", this.imgName);
		let lv = v.skillId % 1000
		this.lbLevel.text = "Lv." + lv;
		this.imgLocked.visible = lv == 0
		this.lbLevel.visible = lv > 0
		this.noticeImg.visible = GGlobal.modelCouSkill.checkRedVo(v.skillId)
	}
	public get vo() {
		return this._vo
	}
}