/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TitleItem extends fairygui.GComponent {

	public btnWear: Button1;
	public lbCondition: fairygui.GRichTextField;
	public iconState: fairygui.GImage;
	public jieBg: fairygui.GImage;
	public iconTitle: fairygui.GLoader;
	public lbTime: fairygui.GRichTextField;
	public lbAttr: fairygui.GRichTextField;
	public btnLvlup: Button1;
	public lbCost: fairygui.GRichTextField;
	public lbJie: fairygui.GRichTextField;
	public bottomGroup: fairygui.GGroup;
	public closeButton: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://3tzqotadltpm14";

	public static createInstance(): TitleItem {
		return <TitleItem><any>(fairygui.UIPackage.createObject("role", "TitleItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.btnWear = <Button1><any>(this.getChild("btnWear"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.iconState = <fairygui.GImage><any>(this.getChild("iconState"));
		this.iconTitle = <fairygui.GLoader><any>(this.getChild("iconTitle"));
		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this.lbAttr = <fairygui.GRichTextField><any>(this.getChild("lbAttr"));
		this.btnLvlup = <Button1><any>(this.getChild("btnLvlup"));
		this.lbCost = <fairygui.GRichTextField><any>(this.getChild("lbCost"));
		this.lbJie = <fairygui.GRichTextField><any>(this.getChild("lbJie"));
		this.bottomGroup = <fairygui.GGroup><any>(this.getChild("bottomGroup"));
		this.closeButton = <fairygui.GLoader><any>(this.getChild("closeButton"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.jieBg = <fairygui.GImage><any>(this.getChild("jieBg"));

		this.btnWear.addClickListener(this.wearHandler, this);
		this.closeButton.touchable = true;
		this.closeButton.addClickListener(this.scaleHandler, this);
		this.btnLvlup.addClickListener(this.jinjieHandler, this);
		this.setHeight();
	}

	private wearHandler(e) {
		var m = GGlobal.modeltitle;
		var id = this.vo.id;
		var type;
		var st = this.vo.state;
		switch (st) {
			case 0:// 0：未激活
				m.CG_ACTIVE_509(id);
				break;
			case 1:// 1：可激活
				m.CG_ACTIVE_509(id);
				break;
			case 2:// 2：已激活
				m.CG_WEAR_503(1, id);
				break;
			case 3:// 3：已穿戴
				m.CG_WEAR_503(2, id);
				break;
		}
	}

	private sc: number = 1;
	private scaleHandler(e) {
		this.sc *= -1;
		this.setHeight();
	}

	public resetScale() {
		this.sc = 1;
		this.setHeight();
	}

	public setHeight() {
		if (this.sc == 1) {
			this.closeButton.rotation = 90;
			this.height = this.height = 120;
			this.bottomGroup.visible = false;
		} else {
			this.closeButton.rotation = 270;
			this.height = this.height = 250;
			this.bottomGroup.visible = true;
		}
		GGlobal.modeltitle.notify("listresize");
	}

	private maxLevel: number = 0;
	private jinjieHandler(e) {
		if (this.vo.type == 0) {
			if (this.vo.isMaxLevel()) {
				ViewCommonWarn.text("称号已满级");
			} else {
				var condition = this.vo.condtion[0];
				var val = condition[2];
				if (this.vo.email != "0")
					val = JSON.parse(this.vo.email)[0][1];
				var ml = Model_Bag.getItemCount(val);
				if (ml == 0) {
					View_CaiLiao_GetPanel.show(VoItem.create(val));
				} else {
					var m = GGlobal.modeltitle;
					m.CG_LEVELUP_513(this.vo.id);
				}
			}
		}
	}

	tipKey: string = "";
	vo: VoTitle;
	setVO(v: VoTitle) {
		this.noticeImg.visible = false;
		Tools.removeNoticeIcon(this.tipKey);

		this.vo = v;
		var st = this.vo.state;
		this.tipKey = "title" + v.id;
		var m = GGlobal.modeltitle;
		this.iconState.visible = m.curID == v.id;
		ImageLoader.instance.loader(Enum_Path.TITLE_URL + v.picture + ".png", this.iconTitle);
		if (st > 1) {
			this.lbCondition.text = "<font color='#15f234'>" + v.desc + "</font>";
		} else {
			this.lbCondition.text = "激活条件：<font color='#fe0000'>" + v.desc + "</font>";
		}
		let attStr = "<font color='#ffc334'>战力：" + v.power + "</font>";
		for (let i = 0; i < v.attr.length; i++) {
			attStr += "\n" + ConfigHelp.attrString([v.attr[i]], "  +", "#f1f1f1", "#15f234");
			if (i + 1 < v.attr.length) {
				i++;
				attStr += "     " + ConfigHelp.attrString([v.attr[i]], "  +", "#f1f1f1", "#15f234");
			}
		}
		this.lbAttr.text = attStr;
		this.lbJie.text = v.level + "\n阶";

		var st = this.vo.state;
		this.btnWear.visible = true;
		this.btnLvlup.checkNotice = false;
		this.btnWear.checkNotice = false;

		switch (st) {
			case 0:// 0：未激活
				this.btnWear.text = "激活";
				this.btnWear.visible = false;
				break;
			case 1:// 1：可激活
				this.btnWear.text = "激活";
				Tools.addNoticeIcon(this.btnWear, this.tipKey, 10, 1);
				break;
			case 2:// 2：已激活
				this.btnWear.text = "穿戴";
				break;
			case 3:// 3：已穿戴
				this.btnWear.text = "卸下";
				break;
		}

		if (m.curID == v.id) {
			this.btnWear.text = "卸下";
		}

		this.updateTime();

		let canLevelUp = this.vo.type == 0 && (this.vo.state == 2 || this.vo.state == 3) && this.vo.ttype != 4;//永久且已激活且不是国家类型的称号
		this.lbCost.visible = this.btnLvlup.visible = canLevelUp;
		var condition = this.vo.condtion[0];
		var type = condition[0];
		var itemid = condition[2];
		if (this.vo.email != "0") {
			itemid = JSON.parse(this.vo.email)[0][1];
		}
		var ct = Model_Bag.getItemCount(itemid);
		if (ct > 0) {
			var str = HtmlUtil.fontNoSize("*1", Color.GREENSTR);
		} else {
			var str = HtmlUtil.fontNoSize("*1", Color.REDSTR);
		}
		this.lbCost.text = "消耗：<font color='#fe0000'>" + ConfigHelp.getItemColorName(itemid) + "</font>" + str;
		this.updateReddot();
	}

	updateTime() {
		var t = Model_GlobalMsg.getServerTime();
		var st = this.vo.state;
		this.lbJie.visible = this.jieBg.visible = this.vo.type == 0;
		if (st == 2 || st == 3) {
			if (this.vo.type == 0) {
				if (this.vo.ttype != 4) {
					this.lbTime.text = "期限：永久";
				} else {
					this.lbTime.text = "";//国家不显示期限
				}
			} else {
				var timeX = (this.vo.time - t) / 1000;
				var day = timeX / (24 * 60 * 60);
				if (day >= 1) {
					day = Math.ceil(timeX / (24 * 60 * 60));//向下取整
					this.lbTime.text = "期限：" + day + "天";
				} else {
					this.lbTime.text = "期限：" + TimeUitl.getRemainingTime(this.vo.time, t, { hour: "时", minute: "分", second: "秒" });
				}
			}
		} else {
			this.lbTime.text = "";
		}
	}

	updateReddot() {
		var condition = this.vo.condtion[0];
		var type = condition[0];
		var val = condition[2];
		var ok = false;
		if (type == 9) {
			var ml = Model_Bag.getItemCount(val);
			ok = ml > 0;
		}

		if (!ok) {
			var mail = this.vo.email;
			if (mail != "0") {
				var t = JSON.parse(mail);
				var ml = Model_Bag.getItemCount(t[0][1]);
				ok = ml > 0;
			}
		}

		if (ok) {
			this.btnWear.visible = true;
			if (this.vo.state > 1 && this.vo.isMaxLevel() == false) {
				this.noticeImg.visible = true;
				this.btnLvlup.checkNotice = true;
			} else {
				if(!this.vo.isMaxLevel()){
					this.btnWear.checkNotice = true;
				}
				this.btnLvlup.checkNotice = false;
			}
		}
	}
}