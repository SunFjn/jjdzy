class Child_LiuYi extends fairygui.GComponent implements ChildShaoZhu {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public lbPower: fairygui.GLabel;
	public lbYaoqiu: fairygui.GRichTextField;
	public imgYaoqiu: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public btn1: BtnLiuYi;
	public btn2: BtnLiuYi;
	public btn3: BtnLiuYi;
	public btn4: BtnLiuYi;
	public btn5: BtnLiuYi;
	public btn6: BtnLiuYi;
	public btn0: BtnXueTang;
	public lbLvSel: fairygui.GRichTextField;
	public lbPowerSel: fairygui.GRichTextField;
	public lbAttrSel: fairygui.GRichTextField;
	public lbCanUp: fairygui.GRichTextField;
	public btnLY: Button1;
	public vres: ViewResource;
	public lbRes: fairygui.GRichTextField;
	public imgSel: fairygui.GLoader;
	public lbOpen: fairygui.GRichTextField;
	public btnXT: Button1;
	public lbXT: fairygui.GRichTextField;
	public lbPowerXT: fairygui.GRichTextField;
	public lbAttrXT: fairygui.GRichTextField;
	public lbMaxLv: fairygui.GRichTextField;

	public static URL: string = "ui://p83wyb2bad1l1h";

	private _btnArr: fairygui.GButton[]
	private _vo: Vo_ShaoZhu
	type: number;
	private _xtVo: Vo_LiuYi//学堂
	//六艺
	private _selVo: Vo_LiuYi_LY;

	public static createInstance(): Child_LiuYi {
		return <Child_LiuYi><any>(fairygui.UIPackage.createObject("ShaoZhu", "Child_LiuYi"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s._btnArr = []
		for (let i = 0; i < 7; i++) {
			let v = s["btn" + i]
			s._btnArr.push(v)
			v.data = i;
		}
	}

	open(vo: Vo_ShaoZhu) {
		let m = GGlobal.model_LiuYi
		let s = this;
		s._vo = vo;
		m.CG_OPENUI_5125();
		s.registerEvent(true);
	}

	close() {
		let m = GGlobal.model_LiuYi
		let s = this;
		s.registerEvent(false);
		IconUtil.setImg(s.imgSel, null);
	}

	upVo(vo: Vo_ShaoZhu) {
		let s = this;
		s._vo = vo;
		s.upView()
	}

	private registerEvent(pFlag: boolean): void {
		let m = GGlobal.model_LiuYi
		let r = GGlobal.reddot;
		let self = this;
		m.register(pFlag, Model_LiuYi.OPENUI, self.upView, self);
		m.register(pFlag, Model_LiuYi.UPLEVEL, self.upLevel, self);
		r.register(pFlag, UIConst.SHAOZHU_LIUYI, self.upRed, self);
		EventUtil.register(pFlag, self.btnLY, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
		EventUtil.register(pFlag, self.btnXT, egret.TouchEvent.TOUCH_TAP, self.onXueTang, self);
		for (let i = 0; i < self._btnArr.length; i++) {
			EventUtil.register(pFlag, self._btnArr[i], egret.TouchEvent.TOUCH_TAP, self.onClickBtn, self);
		}
	}
	private _openSix: any = {}
	private upView() {
		let m = GGlobal.model_LiuYi
		let s = this;
		s._xtVo = m.liuyiObj[s._vo.shaozhuID]
		let school: Isonsixschool_267

		if (!s._xtVo) {
			school = Config.sonsixschool_267[1]
			//开启列表
			s._openSix = {}
			let openSix: number[] = JSON.parse(school.six)[0];
			for (let i = 0; i < openSix.length; i++) {
				s._openSix[openSix[i]] = true;
			}
		} else {
			school = s._xtVo.cfg
			s._openSix = s._xtVo.openSix
		}
		s.lbName.text = school.name

		if (!s._xtVo) {//未激活
			s.btn0.cfg = school
			for (let i = 0; i < s._btnArr.length - 1; i++) {
				(s._btnArr[i + 1] as BtnLiuYi).lyId = i + 1;
				(s._btnArr[i + 1] as BtnLiuYi).open = false;
				(s._btnArr[i + 1] as BtnLiuYi).vo = null;
			}
			s.lbPower.text = 0 + ""
		} else {
			s.btn0.vo = s._xtVo
			for (let i = 0; i < s._btnArr.length - 1; i++) {
				(s._btnArr[i + 1] as BtnLiuYi).vo = s._xtVo.lyArr[i];
				(s._btnArr[i + 1] as BtnLiuYi).open = s._openSix[i + 1];;
			}
			s.upAllPower();
		}
		s.upRed();
		s.upKaoShi();
		s.c1.selectedIndex = 0
		s.c2.selectedIndex = 0
		// s.upXueTang()
	}

	private upAllPower() {
		let s = this;
		let power = 0;
		let xtCfg = s._xtVo.cfg;
		power += xtCfg.power;
		for (let i = 0; i < s._xtVo.lyArr.length; i++) {
			let ly = s._xtVo.lyArr[i];
			if (!ly.cfg) continue;
			power += ly.cfg.power;
		}
		s.lbPower.text = "" + power
	}

	private _kaoShiYQ = true;
	private upKaoShi() {
		let s = this;
		s._kaoShiYQ = true;
		let cfg: Isonsixschool_267;
		let lyArr
		if (!s._xtVo) {//初始化数据
			cfg = Config.sonsixschool_267[1]
			lyArr = [];
			for (let i = 0; i < 6; i++) {
				lyArr.push({ lyId: i + 1, lyLv: 0, st: 0, ks: 0 })
			}
		} else {
			cfg = s._xtVo.cfg
			lyArr = s._xtVo.lyArr
		}
		if (cfg.yq == "0") {
			s.lbYaoqiu.text = ""
			s.imgYaoqiu.visible = false
			return;
		}
		let cfgYQ = {};
		let yqArr: number[][] = JSON.parse(cfg.yq)

		for (let i = 0; i < yqArr.length; i++) {
			cfgYQ[yqArr[i][0]] = yqArr[i][1]
		}
		let str = HtmlUtil.fontNoSize("考试要求：", Color.GREENSTR);
		for (let i = 0; i < lyArr.length; i++) {
			let ly = lyArr[i];
			let isOpen = s._openSix[ly.lyId] ? true : false
			let max = cfgYQ[ly.lyId];
			if (!isOpen) {
				continue;
			}
			str += "\n"
			if (ly.lyId == 1) {
				str += "礼：";
			}
			else if (ly.lyId == 2) {
				str += "乐："
			}
			else if (ly.lyId == 3) {
				str += "射："
			}
			else if (ly.lyId == 4) {
				str += "御："
			}
			else if (ly.lyId == 5) {
				str += "书：";
			}
			else if (ly.lyId == 6) {
				str += "数：";
			}
			str += HtmlUtil.fontNoSize("Lv" + ly.lyLv + "/" + max, ly.lyLv >= max ? Color.GREENSTR : Color.WHITESTR);
			if (s._kaoShiYQ) { s._kaoShiYQ = ly.lyLv >= max }
		}
		s.lbYaoqiu.text = str;
		s.imgYaoqiu.visible = true
	}

	private onClickBtn(evt: egret.TouchEvent): void {
		let s = this;
		let btn: fairygui.GButton = evt.currentTarget as fairygui.GButton;
		if (btn.data == 0) {
			s.upXueTang();
			s.c2.selectedIndex = 0
		} else {
			s._selVo = (btn as BtnLiuYi).vo;
			if (!s._selVo) {
				s._selVo = new Vo_LiuYi_LY()
				s._selVo.initData((btn as BtnLiuYi).lyId)
			}
			s.upLiuYi();
			s.c2.selectedIndex = 1
		}
	}

	private upLevel() {
		let s = this;
		s.upLiuYi()
		s.upKaoShi();
		s.upAllPower();
	}

	private upRed() {
		let s = this;
		let m = GGlobal.model_LiuYi
		if (!s._xtVo) {//未激活
			s.btn0.checkNotice = false
			for (let i = 0; i < s._btnArr.length - 1; i++) {
				(s._btnArr[i + 1] as BtnLiuYi).checkNotice = false;
			}
		} else {
			s.btn0.checkNotice = m.checkXTKaoShi(s._xtVo);
			for (let i = 0; i < s._btnArr.length - 1; i++) {
				let open = s._openSix[i + 1];
				(s._btnArr[i + 1] as BtnLiuYi).checkNotice = open ? m.checkLyUpLv(s._vo, s._xtVo, s._xtVo.lyArr[i]) : false;
			}
		}

		if (s.c1.selectedIndex == 0) {
			s.upXueTang()
		} else {
			s.upLiuYi()
		}
	}

	private upLiuYi() {
		let s = this;
		let m = GGlobal.model_LiuYi
		if (!s._vo || !s._selVo) {
			return;
		}
		let isOpen = s._openSix[s._selVo.lyId] ? true : false;
		s.lbMaxLv.text = ""
		s.lbCanUp.text = ""
		s.lbRes.text = ""
		if (isOpen) {
			s.lbOpen.text = "";
			let cfg = s._selVo.cfg
			IconUtil.setImg(s.imgSel, Enum_Path.SHAOZHU_URL + s._selVo.lyId + "b.png");
			let nextCfg = Config.sonsix_267[cfg.next];
			let cfgYQ = m.getStarMaxCfg(s._vo.starLv)
			s.lbLvSel.text = "Lv." + s._selVo.lyLv + "/" + cfgYQ["max" + s._selVo.lyId]
			s.lbPowerSel.text = "战力：" + cfg.power
			let nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null;
			s.lbAttrSel.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);
			//消耗
			if (cfg.consume == "0") {
				s.itRes = null
				s.vres.visible = false
				s.btnLY.visible = false;
				s.lbMaxLv.text = HtmlUtil.fontNoSize("已满级", Color.GREENSTR);
			} else {
				s.itRes = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume))[0]
				s.vres.setItemId(s.itRes.id)
				let hasCt = Model_Bag.getItemCount(s.itRes.id)
				s.vres.setLb(hasCt, s.itRes.count);
				s.vres.visible = true;
				s.lbRes.text = HtmlUtil.fontNoSize(s.itRes.name, Color.getColorStr(s.itRes.quality))
				if (s._vo.starLv < nextCfg.star) {
					s.lbCanUp.text = HtmlUtil.fontNoSize(s._vo.cfg.name + ConfigHelp.NumberToChinese(nextCfg.star) + "星可升级", Color.REDSTR);
					s.btnLY.enabled = false;
					s.btnLY.checkNotice = false;
				} else {
					s.btnLY.enabled = true;
					s.btnLY.checkNotice = hasCt >= s.itRes.count
				}
				s.btnLY.visible = true;
			}
		} else {
			let openXtT = s.openXT(s._selVo.lyId)
			s.lbOpen.text = "提升到" + (openXtT ? openXtT.name : "高级") + "可学习六艺·" + s._selVo.cfg.name;
			IconUtil.setImg(s.imgSel, null);
			s.lbLvSel.text = ""
			s.lbPowerSel.text = ""
			s.lbAttrSel.text = ""
			s.vres.visible = false;
			s.vres.visible = false;
			s.btnLY.visible = false;
		}
	}
	private itRes: IGridImpl

	private openXT(lyId, xtId = 1) {
		while (true) {
			let school = Config.sonsixschool_267[xtId]
			if (!school) {
				return null
			}
			let openSix: number[] = JSON.parse(school.six)[0];
			for (let i = 0; i < openSix.length; i++) {
				if (openSix[i] == lyId) {
					return school
				}
			}
			xtId = school.next
		}
	}

	//学堂
	private upXueTang() {
		let s = this;
		let m = GGlobal.model_LiuYi
		let cfg
		if (!s._xtVo) {
			cfg = Config.sonsixschool_267[1];
		} else {
			cfg = s._xtVo.cfg;
		}
		let nextCfg = Config.sonsixschool_267[cfg.next];
		let nextStr = nextCfg ? "(+" + (nextCfg.jc / 1000) + "%)" : ""
		s.lbPowerXT.text = "战力：" + cfg.power;
		let nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null
		s.lbAttrXT.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);
		s.lbXT.text = HtmlUtil.fontNoSize(cfg.name + "：", "#1E9CED") + s._vo.cfg.name + "升星基础属性+" + (cfg.jc / 1000) + "%" + HtmlUtil.fontNoSize(nextStr, Color.GREENSTR)
		s.btnXT.visible = (nextCfg != null)
		s.btnXT.checkNotice = m.checkXTKaoShi(s._xtVo)
	}

	private onUp() {
		let s = this;
		if (!s._selVo) {
			return;
		}
		if (!s.btnLY.checkNotice) {
			View_CaiLiao_GetPanel.show(s.itRes as VoItem)
			return;
		}
		GGlobal.model_LiuYi.CG_UPLV_5127(s._vo.shaozhuID, s._selVo.lyId)
	}

	private onXueTang() {
		let s = this;
		if (!s._xtVo) {
			ViewCommonWarn.text("未激活少主");
			return;
		}
		if (!s._kaoShiYQ) {
			ViewCommonWarn.text("六艺等级未达到要求");
			return;
		}
		let cfg = s._xtVo.cfg;
		if (Number(cfg.next) == 0) {
			ViewCommonWarn.text("已满级");
			return;
		}
		GGlobal.layerMgr.open(UIConst.SHAOZHU_LIUYI_KAOSHI, s._xtVo);
	}
}