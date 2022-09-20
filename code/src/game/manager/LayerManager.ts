class LayerManager {

	public GameMain: egret.Sprite;
	/**最低层ui面板 -1*/
	public UI_floorUI_1: fairygui.GComponent;
	/**最低层ui面板 */
	public UI_floorUI: fairygui.GComponent;
	/**低于模块层 */
	public UI_MainLowBottom: fairygui.GComponent;
	/**低于主UI面板的场景UI层 */
	public UI_MainBottom: fairygui.GComponent;
	public UI_Popup: fairygui.GComponent;
	public UI_Message: fairygui.GComponent;
	public UI_Tips: fairygui.GComponent;
	public UI_OFFLINE: fairygui.GComponent;

	public _registerMap: any = {};
	public _views: any = {};
	public _opens = [];
	public constructor() {
	}


	public init(p: egret.Sprite) {
		var s = this;
		s.GameMain = p;
		s.UI_floorUI_1 = new fairygui.GComponent();
		s.UI_floorUI = new fairygui.GComponent();
		s.UI_MainLowBottom = new fairygui.GComponent();
		s.UI_MainBottom = new fairygui.GComponent();
		s.UI_Popup = new fairygui.GComponent();
		s.UI_Message = new fairygui.GComponent();
		s.UI_Tips = new fairygui.GComponent();
		s.UI_OFFLINE = new fairygui.GComponent();

		p.addChild(s.UI_floorUI_1.displayObject);
		p.addChild(s.UI_floorUI.displayObject);
		p.addChild(s.UI_MainLowBottom.displayObject);
		p.addChild(s.UI_MainBottom.displayObject);
		p.addChild(fairygui.GRoot.inst.displayObject);
		p.addChild(s.UI_Popup.displayObject);
		p.addChild(s.UI_Tips.displayObject);
		p.addChild(s.UI_Message.displayObject);
		p.addChild(s.UI_OFFLINE.displayObject);
		fairygui.GRoot.inst.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onACTIVATE, this);
		App.stage.addEventListener(egret.Event.ACTIVATE, this.onACTIVATE, this);
		App.stage.addEventListener(egret.Event.DEACTIVATE, this.onDEACTIVATE, this);
		App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
		s.setStageScale();
	}

	public uiAlign = 0;
	public offx = 0;
	public static AdjustH: number = 1136;
	public stagebg: fairygui.GGraph;
	private setStageScale() {
		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		let rate = sh / sw;
		let s = this;
		s.offx = 0;
		s.setLayerPropty({ "scaleX": 1, "scaleY": 1, "x": 0 });
		LayerManager.AdjustH = 1136;
		fairygui.GRoot.contentScaleFactor = 1;
		s.uiAlign = 0;
		if (rate > 1.85) {
			s.uiAlign = 50;
			let mx = sw / 640;
			let my = mx;
			s.setLayerPropty({ "scaleX": mx, "scaleY": mx, "x": 0 });
			LayerManager.AdjustH = 727040 / sw;
			fairygui.GRoot.contentScaleFactor = mx;
			s.offx = 0;
		} else if (rate < 1.775) {
			let _x = (sw - sh / 1.775) >> 1;
			s.setLayerPropty({ "x": _x });
			s.offx = _x;
		} else {
			s.setLayerPropty({ "x": 0 });
		}
		fairygui.GRoot.inst.setSize(640, 1136);
		console.log("界面宽度：" + sw + "界面高度" + sh + "宽高比" + rate);
		App.stageWidth = sw < 640 ? 640 : sw;
		App.stageHeight = sh < 1136 ? 1136 : sh;
	}

	private setLayerPropty(obj) {
		let s = this;
		for (var key in obj) {
			s.UI_floorUI_1[key] = obj[key];
			s.UI_floorUI[key] = obj[key];
			fairygui.GRoot.inst[key] = obj[key];
			s.UI_Popup[key] = obj[key];
			s.UI_MainBottom[key] = obj[key];
			s.UI_MainLowBottom[key] = obj[key];
			s.UI_Tips[key] = obj[key];
			s.UI_Message[key] = obj[key];
			s.UI_OFFLINE[key] = obj[key];
		}
	}

	private onResize() {
		this.setStageScale();
		GGlobal.control.notify(Enum_MsgType.ONRESIZE);
	}

	public sleepTime = 0;
	private onACTIVATE() {
		if (GGlobal.sdk) {
			GGlobal.sdk.setKeepScreenOn();
		}
		SoundManager.getInstance().removeStopFlag("fousIn");
		GGlobal.control.notify(Enum_MsgType.GAMEACTIVE);
		this.sleepTime = egret.getTimer() - this.sleepTime;
		if (this.sleepTime > 10000) {//后台超过10秒触发, 清理一些队列数据等，主要用于追帧
			GGlobal.control.notify(Enum_MsgType.GAMEACTIVE_EVT);
		}
	}

	private onDEACTIVATE() {
		SoundManager.getInstance().addStopFlag("fousIn");
		this.sleepTime = egret.getTimer();
	}

	public register(id: number, uiclz, arg = null, layer: fairygui.GComponent = null) {
		this._registerMap[id] = [uiclz, arg, layer];
	}

	/**
	 * 通过面板id获取注册的类
	 * @param panelId 
	 */
	public getClassById(panelId: number): any {
		let t = this;
		let t_vo = t._registerMap[panelId];
		if (t_vo)
			return t_vo[0];
		else
			return null;
	}

	public limitByFB(panelId) {
		let isFuBen = GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelGuanQia.inGuanQiaBoss();
		if (isFuBen) {
			var lib = Config.xitong_001;
			if (lib && lib[panelId]) {
				let hasRestrict = lib[panelId].restrict == 1;
				if (hasRestrict) {
					ViewCommonWarn.text("请先退出当前场景");
					return false;
				}
			}
		}
		return true;
	}

	public panelData: { [cla: string]: number } = {};
	public lastPanelId: number = 0;
	public backPanelId = 0;
	/**打开界面*/
	public open(panelId, arg: any = null) {
		let self = this;
		if (panelId == UIConst.CAOCAO_LAIXI) {
			let vo = GGlobal.modelActivity.getActivityByID(panelId);
			panelId = vo.groupId;
			arg = vo.id;
		} else if (panelId == UIConst.WU_JIANG) {
			if (HeroStateManager.wuJLimit()) {
				return;
			}
		}
		if (this.isOpenView(panelId)) {
			let panel = this.getView(panelId);
			if (panel && panel instanceof UIPanelBase) {
				panel.bringToFront();
			}
			return;
		}
		if (!HeroStateManager.isCanDO(panelId)) {
			return;
		}
		if (!GGlobal.isNetWorking) {
			console.log("您的网络似乎不太稳定");
			return;
		}
		if (!self.limitByFB(panelId)) {
			return;
		}
		if (!ModuleManager.isOpen(panelId, true)) return;
		if ((panelId == UIConst.COUNTRY || panelId == UIConst.NANZHENG_BEIZHAN || panelId == UIConst.COUNTRY_DONATE) && Model_player.voMine.country == 0) {
			panelId = UIConst.COUNTRY_SELECT;
		} else if (panelId == UIConst.MAINTOWN && GGlobal.mapscene.scenetype != SceneCtrl.GUANQIA) {
			ViewCommonWarn.text("请先退出当前场景")
			return;
		}

		var r = self._registerMap[panelId];
		if (!r) {
			// ViewCommonWarn.text("error open id:" + mainID);
			return;
		} else {
			if (arg == null) arg = r[1];
		}

		let t_canOpen: boolean = true; //能否打开的判断标识
		//实例化前判断是否能打开界面
		if ("checkOpen" in r[0]) //没有checkOpen接口的默认为true
		{
			t_canOpen = r[0].checkOpen(arg); //此接口为每个面板写的静态方法
		}
		if (!t_canOpen)
			return;

		var ui: IUIView = self.getView(panelId);
		self.panelData[r[0].prototype.__class__] = panelId;
		if (!ui) {
			ui = new r[0]();
			ui.uiparent = r[2];
			ui.panelId = panelId;
			self._views[panelId] = ui;
		}

		if (ModuleManager.isModuleUI(panelId) && panelId != UIConst.GM && panelId != UIConst.GM_PROTOCOL) {
			if (self.lastPanelId != panelId && !ui.uiparent) {
				if (self.lastPanelId > 0 && panelId != UIConst.CHAT) {
					if (self.lastPanelId != self.backPanelId) {
						self.backPanelId = 0;
					}
					self.close2(self.lastPanelId);
				}
				self.lastPanelId = panelId;
			}
		}
		if (self._opens.indexOf(ui) == -1) {
			self._opens.push(ui);
			if (ui.uiparent) {
				ui.uiparent.addChild(ui as any);
			}
			ui.onOpen(arg);
		} else {
			if (ui.uiparent) {
				var index = ui.uiparent.numChildren - 1;
				index = index <= 0 ? 0 : index;
				ui.uiparent.setChildIndex(ui as any, index);
			}
			ui.onOpen(arg);
		}

		if (panelId == self.backPanelId) {
			self.backPanelId = 0;
		}
	}

	/**打开界面 未开启会提示*/
	public open2(id, arg: any = null) {
		if (LayerManager.checkCoditionOpen(id, arg)) {
			this.open(id, arg);
			return true;
		}
		return false;
	}

	/**
	 * 	1.指定标签号 2.指定面板id
		1_大图标系统id_标签下标
		2_大图标系统id_面板id
	 */
	public static openLinkStr(link: String) {
		var info = link.split("_");
		if (info.length == 2) {
			LayerManager.openLink(Number(info[0]), Number(info[1]));
		} else {
			LayerManager.openLink(Number(info[0]), Number(info[1]), Number(info[2]));
		}
	}
	/**
	 * 打开连接面板
	 * flag 1标签判断arg为标签下标 2面板判断arg为面板id
	 * lobbyer
	 */
	public static openLink(flag: number, funId: number, arg: any = null) {
		if (!LayerManager.checkCoditionOpen(funId, arg, true)) return;
		if (!arg) {
			GGlobal.layerMgr.open(funId);
		} else if (flag == 1) {
			GGlobal.layerMgr.open2(funId, arg);
		} else {
			GGlobal.layerMgr.open(arg);
		}
	}

	/**特殊处理 */
	public static checkCoditionOpen(id: number, arg: any = null, isMsg: boolean = true): boolean {
		var ret: boolean = true;
		return ret;
	}

	public close(id) {
		let self = this;
		var ui: IUIView = this._views[id];
		var index = self._opens.indexOf(ui)
		if (ui && index != -1) {
			this._opens.splice(index, 1);
			ui.onClose();
			if (ui.parent) {
				ui.parent.removeChild((ui as any));
			} else {
				if (this.lastPanelId > 0) {
					var r = this._registerMap[this.lastPanelId];
				}
				if (id == self.lastPanelId || (r && ui instanceof r[0])) this.lastPanelId = 0;
				if (self.backPanelId > 0 && self.backPanelId != id) {
					self.open(self.backPanelId);
				} else {
					if (Model_player.taskId > Config.xtcs_004[2803].num) {
						if (Config.xitong_001) {
							let cfg = Config.xitong_001[id];
							if (cfg && cfg.close > 0) {
								self.open(cfg.close);
							}
						}
					}
				}
			}
		}
	}
	// private getViewById(id) {
	// 	var viewInfo = this._registerMap[id];
	// 	if (viewInfo && viewInfo[0]) {
	// 		return viewInfo[0].getInitedCla();
	// 	} else {
	// 		return null;
	// 	}
	// }

	/**用于继承UIPanelbase界面的关闭窗口 */
	public close2(id, param?) {
		var ui: IUIView = this._views[id];
		let index = -1;
		if (ui) {
			index = this._opens.indexOf(ui);
		}
		if (index < 0) {
			var r = this._registerMap[id];
			if (r) {
				for (let key in this._opens) {
					if (this._opens[key] instanceof r[0]) {
						ui = this._opens[key];
						index = this._opens.indexOf(ui);
						break;
					}
				}
			}
		}
		if (ui && index != -1 && ui instanceof UIPanelBase) {
			this._opens.splice(index, 1);
			ui.hide();
			ui.onClose();
			let r1 = this._registerMap[this.lastPanelId];
			if (id == this.lastPanelId || (r1 && ui instanceof r1[0])) this.lastPanelId = 0;
		} else if (ui && index != -1 && ui instanceof UIModalPanel) {
			ui.doHideAnimation();
		}
	}

	/**界面是否打开中 */
	public isOpenView(id): boolean {
		var bo: boolean = false;
		var ui: IUIView = this.getView(id);
		if (!ui) {
			var r = this._registerMap[id];
			if (r) {
				for (let key in this._views) {
					if (this._views[key] instanceof r[0]) {
						ui = this._views[key];
						break;
					}
				}
			}
		}
		if (ui && ui.isInit) {
			if (this._opens.indexOf(ui) >= 0) {
				bo = true;
			}
		}
		return bo;
	}

	/**界面是否打开中 */
	public isOpenView1(id): boolean {
		var ui: IUIView = this.getView(id);
		if (ui) {
			if (this._opens.indexOf(ui) >= 0) {
				return true;
			}
		}
		return false;
	}

	public getView(id) {
		var ui = this._views[id];//this.getViewById(id);
		if (!ui) {
			var r = this._registerMap[id];
			if (r) {
				for (let key in this._views) {
					if (this._views[key] instanceof r[0]) {
						ui = this._views[key];
						break;
					}
				}
			}
		}
		return ui;
	}

	public closeAllPanel(igoneTown = false) {
		let self = this;
		let len = self._opens.length//关闭界面时可能打开新界面，这样不处理后面新打开界面
		for (let i = 0; i < len; i++) {
			let ui = self._opens[i];
			if (!ui) continue;
			if (igoneTown && ui instanceof ViewMainTown) {
				continue;
			}
			if (ui instanceof ViewCommonWarn || ui instanceof ViewBroadcastItemText || ui instanceof ViewLZD) {
				continue;
			}
			if (ui && !ui.visible) {
				continue;
			}
			self._opens.splice(i, 1);
			if (ui && ui instanceof UIPanelBase) {
				if (ui.panelId == UIConst.SJMJ2) {
					ui["close3"]();
				} else {
					ui.hide();
				}
			} else if (ui && ui instanceof UIModalPanel) {
				ui.doHideAnimation();
			}
			if (ui.parent) {
				ui.parent.removeChild((ui as any));
			}
			ui.onClose();
			i--;
			len--;
		}
		self.lastPanelId = 0;
	}

	public closeAllPanelExcept(views) {
		let len = this._opens.length;
		let classArr = views ? views : [];
		for (let i = 0; i < len; i++) {
			let ui = this._opens[i];
			if (!ui) continue;
			let isContinue = 0;
			for (let k in classArr) {
				if (ui instanceof classArr[k]) {
					isContinue = 1;
					break;
				}
			}
			if (isContinue) {
				continue;
			}
			if (ui instanceof ViewCommonWarn || ui instanceof ViewBroadcastItemText || ui instanceof ViewLZD) {
				continue;
			}
			this._opens.splice(i, 1);
			if (ui && ui instanceof UIPanelBase) {
				ui.hide();
			} else if (ui && ui instanceof UIModalPanel) {
				ui.doHideAnimation();
			}
			if (ui.parent) {
				ui.parent.removeChild((ui as any));
			}
			ui.onClose();
			i--;
			len--;
		}
	}

	private static sc = -1;
	public static getFullScreenSc() {
		if (this.sc != -1) {
			return this.sc;
		}
		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		let rate = sh / sw;
		let mx = sw / 640;
		let my = sh / 1136;
		this.sc = Math.min(mx, my);
		return this.sc;
	}

	private _modalWaitPane: fairygui.GObject;
	public showModalWait(msg: string = null): void {
		if (fairygui.UIConfig.globalModalWaiting != null) {
			if (this._modalWaitPane == null)
				this._modalWaitPane = fairygui.UIPackage.createObjectFromURL(fairygui.UIConfig.globalModalWaiting);
			this._modalWaitPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			this._modalWaitPane.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);

			this.UI_OFFLINE.addChild(this._modalWaitPane);
			this._modalWaitPane.text = msg;
		}
	}

	public closeModalWait(): void {
		if (this._modalWaitPane != null && this._modalWaitPane.parent != null)
			this.UI_OFFLINE.removeChild(this._modalWaitPane);
	}


	private _bg: egret.Bitmap;
	private _bgurl;
	public addChildMainBg() {
		var imageLoader: egret.ImageLoader = new egret.ImageLoader();
		imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler1, this);
		this._bgurl = RESManager.getVersionUrl(Enum_Path.BACK_URL + "crero.jpg");
		imageLoader.load(this._bgurl);
		this._bg = new egret.Bitmap();
		let num = GGlobal.main.numChildren;
		GGlobal.main.addChildAt(this._bg, 1);
		// GGlobal.control.listen(Enum_MsgType.CARTONGEND, this.removeMainBg, this);
	}

	private loadCompleteHandler1(event): void {
		var imageLoader = <egret.ImageLoader>event.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this._bg.texture = texture;
		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		let rate = sh / sw;
		let mx = sw / 640;
		let my = sh / 1136;
		let sc = Math.max(mx, my);
		this._bg.scaleX = sc;
		this._bg.scaleY = sc;
		this._bg.x = (sw - this._bg.width * sc) >> 1;//不考虑横屏
	}

	public removeMainBg() {
		if (this._bg) {
			this._bg.texture = null;
			IconUtil.reduceUrlCounter(this._bgurl);
		}
	}

	//是否有打开的全屏界面
	public checkHasUIPanelBase() {
		for (let i = 0; i < this._opens.length; i++) {
			let ui = this._opens[i];
			if (ui instanceof UIPanelBase) {
				return true;
			}
		}
		return false;
	}

	public setPanelVisible(panelID: number, value: boolean) {
		let self = this;
		let panel = self.getView(panelID);
		if (panel instanceof UIPanelBase) {
			panel.visible = value;
			if (panel.modalLayer) panel.modalLayer.visible = value;
			GGlobal.setUnitLayerVis(!value);
		} else if (panel instanceof UIModalPanel) {
			panel.visible = value;
			if (panel.modalLayer) panel.modalLayer.visible = value;
		}
	}

	public checkPanelLife() {
		let dic = this._views;
		let time1 = 300000;
		if (DEBUG) time1 = 5000;
		let now = egret.getTimer();
		let count = 0;
		for (let i in dic) {
			if (count > 10) return;
			let panelid = i;
			if (Number(panelid) < 1000) {
				continue;
			}
			let panel: IUIView = dic[i];
			if (panel._isLife) {
				continue;
			}
			let index = this._opens.indexOf(panel);
			if (index < 0) {
				let time = panel.lastLifeTime;
				if (now - time > time1) {
					panel.dispose();
					delete this._views[i];
					count++;
					RESManager.wechatInvild = 1;
				}
			}
		}
	}
}