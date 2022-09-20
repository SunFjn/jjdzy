class Child_ShaoZhu_QiYuan extends fairygui.GComponent implements ChildShaoZhu {

	public btnBuy1: Button1;
	public btnBuy10: Button1;
	public labBuy1: fairygui.GRichTextField;
	public labBuy10: fairygui.GRichTextField;
	public labTip: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public labPoint: fairygui.GRichTextField;
	public gird0: VSZQiYuanPoint;
	public gird3: VSZQiYuanPoint;
	public gird2: VSZQiYuanPoint;
	public gird1: VSZQiYuanPoint;
	public reward0: ViewGrid;
	public reward1: ViewGrid;
	public reward2: ViewGrid;
	public vres1: ViewResource;
	public vres10: ViewResource;
	public list: fairygui.GList;
	public checkBox: fairygui.GButton;
	public lbShuoMing: fairygui.GRichTextField;

	public static URL: string = "ui://p83wyb2bsr6c15";

	private girdArr: VSZQiYuanPoint[]
	private _rewardArr: ViewGrid[]
	private qyItem: VoItem;
	private _cost1: number = 0;
	private _cost10: number = 0;


	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.girdArr = [s.gird0, s.gird1, s.gird2, s.gird3];
		s._rewardArr = [s.reward0, s.reward1, s.reward2];
		s.list.itemRenderer = s.renderItem;
		s.list.callbackThisObj = s;
		s.list.setVirtualAndLoop();
		s.list.touchable = false
		for (let i = 0; i < s._rewardArr.length; i++) {
			s._rewardArr[i].visible = false;
		}
		s.qyItem = VoItem.create(Model_SZQiYuan.qiyuanId);
		s.lbShuoMing.text = HtmlUtil.createLink("玩法说明");
	}

	private openShuoM(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_QIYUAN)
	}

	type: number;
	private _first = false
	public open(vo: Vo_ShaoZhu) {
		let s = this;
		if (!s._first) {
			GGlobal.modelSZQiYuan.CG_OPENUI();
			s._first = true;
			let c = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6103))[0][2])
			s.labBuy1.text = "购买" + c + "铜币"
			s.labBuy10.text = "购买" + (c * 10) + "铜币"
			s.addListen();
			s.overDraw()
		}
		s.update();
	}
	public close() {
		let s = this;
		s.removeListen();
		s._first = false;
	}

	private addListen(): void {
		let s = this;
		s.btnBuy1.addClickListener(s.onBuy1, s);
		s.btnBuy10.addClickListener(s.onBuy10, s);
		s.checkBox.addClickListener(s.onCheck, s);
		s.lbShuoMing.addEventListener(egret.TextEvent.LINK, s.openShuoM, s);
		for (let i = 0; i < 4; i++) {
			s.girdArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, s.onGetPoint, s)
		}
		GGlobal.control.listen(Enum_MsgType.SZQIYUAN_OPEN_UI, s.update, s)
		GGlobal.control.listen(Enum_MsgType.SZQIYUAN_GET_POINT, s.update, s)
		GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY, s.update, s)
		GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, s.startDraw, s)
		GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY_OVER, s.overDraw, s)
		Timer.instance.listen(s.scrollComp1, s, 100);
		s.btnBuy1.touchable = s.btnBuy10.touchable = true;
		let key = Model_player.voMine.id + "szQiYuanCheck"
		let val = egret.localStorage.getItem(key);
		Model_SZQiYuan.skipTween = val == "1" ? true : false;
		s.checkBox.selected = Model_SZQiYuan.skipTween;
		s.vres10.setType(1)
		s.vres1.setType(1)
	}

	private removeListen(): void {
		let s = this;
		s.btnBuy1.removeClickListener(s.onBuy1, s);
		s.btnBuy10.removeClickListener(s.onBuy10, s);
		s.checkBox.removeClickListener(s.onCheck, s);
		s.lbShuoMing.removeEventListener(egret.TextEvent.LINK, s.openShuoM, s);
		for (let i = 0; i < 4; i++) {
			s.girdArr[i].clean();
			s.girdArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onGetPoint, s)
		}
		GGlobal.control.remove(Enum_MsgType.SZQIYUAN_OPEN_UI, s.update, s)
		GGlobal.control.remove(Enum_MsgType.SZQIYUAN_GET_POINT, s.update, s)
		GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY, s.update, s)
		GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, s.startDraw, s)
		GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY_OVER, s.overDraw, s)
		Timer.instance.remove(s.scrollComp1, s);
		Timer.instance.remove(s.upDraw, s);
		s.list.numItems = 0
	}
	private showArr: IGridImpl[];
	private base;
	private update() {
		let s = this;
		let model = GGlobal.modelSZQiYuan
		//奖励展示
		let cfg = Config.sonqy_267[1]
		if (cfg) {
			s.showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))
		} else {
			s.showArr = [];
		}
		s.list.numItems = s.showArr.length;

		//积分奖励
		var pointMax = 0;
		if (model.pointArr.length > 0) {
			for (let i = 0; i < model.pointArr.length; i++) {
				let pointCfg = Config.sonpoint_267[model.pointArr[i].id];
				s.girdArr[i].setVo(model.pointArr[i], this.base);
				if (pointMax < Number(pointCfg.point)) {
					pointMax = Number(pointCfg.point)
				}
			}
		} else {
			for (let i = 0; i < s.girdArr.length; i++) {
				s.girdArr[i].setVo(null, 0);
			}
		}
		let bs = Math.floor(model.myPoint / pointMax)
		this.base = pointMax * bs
		this.expBar.max = pointMax;
		// this.expBar.value = model.myPoint - this.base;
		// this.expBar.text = (model.myPoint - this.base) + "/" + pointMax;
		if (model.pointArr.length > 0) {
			let $val = model.myPoint - this.base;
			let $id = 0;
			for (let i = 0; i < model.pointArr.length; i++) {
				let t = Config.sonpoint_267[model.pointArr[i].id].point;
				if ($val >= t) {
					$id = model.pointArr[i].id;
				}
			}
			let a = [0, 300, 1000, 2000, 3000]//对应0 500 1000 1500 2000
			let curP = Config.sonpoint_267[$id] ? Config.sonpoint_267[$id].point : 0;
			let nextP = Config.sonpoint_267[$id + 1] ? Config.sonpoint_267[$id + 1].point : 2000;
			if ($id == 4) {//满级
				this.expBar.value = pointMax;
			} else {
				let valT = nextP - curP //0,10...
				this.expBar.value = a[$id] + Math.floor(($val - curP) * (a[$id + 1] - a[$id]) / valT)
			}
		}else{
			this.expBar.value = 0
		}
		this.expBar._titleObject.text = (model.myPoint - this.base) + "/" + pointMax;

		//花费
		if (this._cost1 == 0) {
			this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6101))[0][2])
		}
		if (this._cost10 == 0) {
			this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6102))[0][2])
		}
		if (model.qyCount > 0) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + s.qyItem.icon + ".png", s.vres1.getChild("icon").asLoader);
			this.vres1.text = "" + model.qyCount + "/1"
			this.vres1.color = Color.WHITEINT;
			this.btnBuy1.checkNotice = true;
		} else {
			s.vres1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao)
			this.vres1.text = "" + this._cost1
			if (Model_player.voMine.yuanbao >= this._cost1) {
				this.vres1.color = Color.GREENINT;
			} else {
				this.vres1.color = Color.REDINT;
			}
			this.btnBuy1.checkNotice = false;
		}
		if (model.qyCount > 9) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + s.qyItem.icon + ".png", s.vres10.getChild("icon").asLoader);
			this.vres10.text = "" + model.qyCount + "/10"
			this.vres10.color = Color.WHITEINT;
			this.btnBuy10.checkNotice = true;
		} else {
			s.vres10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao)
			this.vres10.text = "" + this._cost10
			if (Model_player.voMine.yuanbao >= this._cost10) {
				this.vres10.color = Color.GREENINT;
			} else {
				this.vres10.color = Color.REDINT;
			}
			this.btnBuy10.checkNotice = false;
		}
	}

	private onBuy1(): void {
		let model = GGlobal.modelSZQiYuan
		if (model.qyCount > 0) {
			model.CG_PRAY(1);
		} else {
			if (Model_player.voMine.yuanbao < this._cost1) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			model.CG_PRAY(1);
			this.btnBuy1.touchable = this.btnBuy10.touchable = false;
		}
	}

	private onBuy10(): void {
		let model = GGlobal.modelSZQiYuan
		if (model.qyCount > 9) {
			model.CG_PRAY(10);
		} else {
			if (Model_player.voMine.yuanbao < this._cost10) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			model.CG_PRAY(10);
			this.btnBuy1.touchable = this.btnBuy10.touchable = false;
		}
	}

	private onGetPoint(e: egret.TouchEvent): void {
		var v = e.currentTarget as VSZQiYuanPoint;
		var vPoint: { id: number, ct: number } = v.vo;
		if (vPoint == null) return;
		let pointCfg: Isonpoint_267 = Config.sonpoint_267[vPoint.id]
		var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward))
		GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_REWARD, { award: rewardArr, type: 1, vo: vPoint, base: this.base });
	}

	private renderItem(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.isShowEff = true;
		v.vo = this.showArr[index];
	}

	private onCheck(e) {
		Model_SZQiYuan.skipTween = this.checkBox.selected
		let key = Model_player.voMine.id + "szQiYuanCheck"
		let val = Model_SZQiYuan.skipTween ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}


	private startDraw(dropArr: { item: IGridImpl, isBig: number }[]) {
		let s = this
		if (Model_SZQiYuan.skipTween) {
			s.btnBuy1.touchable = s.btnBuy10.touchable = true;
			return;
		}
		s._dropArr = dropArr

		// for (let i = 0; i < 3; i++) {
		// 	s._rewardArr[i].vo = dropArr[i].item
		// 	s._rewardArr[i].visible = true;
		// 	s._rewardArr[i].alpha = 0;
		// 	egret.Tween.get(s._rewardArr[i]).to({ alpha: 1 }, 1000)
		// }
		// setTimeout(function () {
		// 	for (let i = 0; i < 3; i++) {
		// 		s._rewardArr[i].visible = false;
		// 	}
		// }, 1200);
		s._t = 0;
		for (let i = 0; i < 3; i++) {
			let v = s._rewardArr[i]
			v.visible = true;
			v.isShowEff = true;
			v.vo = s.showArr[Math.floor(Math.random() * s.showArr.length)];
		}
		Timer.instance.listen(s.upDraw, s, 100);
	}
	private _t;
	private _dropArr: { item: IGridImpl, isBig: number }[];
	private upDraw() {
		let s = this;
		s._t++;
		for (let i = 0; i < 3; i++) {
			let grid: ViewGrid = s._rewardArr[i]
			if (s._t < 9) {
				if (s._t == 8) {
					if (i == 0) {
						grid.vo = s._dropArr[i].item;
						EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
						continue;
					}
				}
			} else {
				if (i == 0) continue;
				if (s._t < 15) {
					if (s._t == 14) {
						if (i == 1) {
							grid.vo = s._dropArr[i].item;
							EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
							continue;
						}
					}
				} else {
					if (i == 1) continue;
					if (s._t < 21) {
						if (s._t == 20) {
							if (i == 2) {
								grid.vo = s._dropArr[i].item;
								EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
								continue;
							}
						}
					} else {
						if (i == 2) continue;
					}
				}
			}
			grid.vo = s.showArr[Math.floor(Math.random() * s.showArr.length)];
		}
		if (s._t > 20) {
			Timer.instance.remove(s.upDraw, s);
		}
	}

	private overDraw() {
		let s = this;
		s.btnBuy1.touchable = s.btnBuy10.touchable = true;
		for (let i = 0; i < 3; i++) {
			s._rewardArr[i].visible = false;
			s.clean();
		}
	}


	private scrollComp1() {
		let s = this;
		let pos = s.list.scrollPane.posX + 5;
		s.list.scrollPane.setPosX(pos, true);
	}
}