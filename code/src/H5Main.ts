class H5Main extends egret.Sprite {
	public constructor() {
		super();
		ResourceVersionConfig.initialize();
		this.onAddToStage();
	}
	private GAME_CFG_URL = "resource/gameCFG.json";
	private readonly hasWxSdk = false;
	private async onAddToStage() {
		const self = this;
		GGlobal.loginArg = self.getLoginArg();
		GGlobal.deCodeLogin(GGlobal.loginArg);
		RES.getVirtualUrl = RESManager.getGameCFGUrl;
		await self.initialize();
		await self.loadGlobalCFG();
		await RES.loadConfig(RESManager.getVersionUrl("resource/default.res.json"), GGlobal.resHead + "resource/");
		await self.loadVersionConfig("version_json");
		self.enterGame();
	}

	/**加载版本文件*/
	private async loadVersionConfig(url) {
		const self = this;
		return new Promise(function (resolve) {
			RES.getResAsync(url, function (data) {
				ResourceVersionConfig.urlDic = RES.getRes(url);
				resolve(data);
			}, self);
		});
	}

	private async loadGlobalCFG() {
		let self = this;
		return new Promise(function (resolve) {
			let rawFile = new XMLHttpRequest();
			rawFile.overrideMimeType("application/json");
			rawFile.open("GET", GGlobal.resHead + self.GAME_CFG_URL + "?" + Math.random(), true);
			rawFile.onreadystatechange = function () {
				if (rawFile.readyState === 4 && rawFile.status == 200) {
					console.log("game cfg:" + rawFile.responseText);
					let data = JSON.parse(rawFile.responseText);
					Model_GlobalMsg.decode(data);
					resolve();
				}
			}
			rawFile.send(null);
		})
	}

	private async initialize() {
		App.init();
		GGlobal.main.addChild(fairygui.GRoot.inst.displayObject);
		if (DEBUG) {
			GGlobal.resHead = "";
		} else {
			GGlobal.resHead = GGlobal.loginArg.resHead;
			Model_UserData.PHPURL = GGlobal.loginArg.serverHttpUrl;
		}
		commonBinder.bindAll();
		return new Promise(function (resolve) {
			resolve();
		}
		);
	}
	public async enterGame() {
		const self = this;
		GGlobal.init();
		self.showPro(0.3, "链接服务器");
		await self.connectServer(GGlobal.loginArg.ip, GGlobal.loginArg.port);
		await self.loadAniResource();
		self.showPro(0.4, "检查角色信息");
		await self.checkCreateRole();
		self.showPro(0.5, "加载游戏必要资源");
		await self.loadCommonResource();

		self.showPro(0.7, "加载游戏配置");
		self.cfg1 = await self.loadGameCfg("config0_json");
		self.showPro(0.8, "解析配置中");
		await self.parseConfig();
		await self.decodeImportCfg();
		self.showPro(0.9, "获取角色信息");
		await self.prepareRoleInfo();
		if (GGlobal.main.isNewRole) {
			await self.loadRoleResource();
			self.showPro(1, "加载角色资源");
			await RES.getResAsync("CartoonManager");
			await RES.getResAsync("CartoonManager_atlas0");
			self.hideLoading();
			await self.playCartong();
		} else {
			self.hideLoading();
		}
		self.createGameScene();
		if (DEBUG) {
			self.initGMEntrance();
		}
		if (GGlobal.loginArg.isTest) {
			self.initGMEntrance();
		}
	}
    /**
     * 创建游戏场景
     * Create a game scene
     */
	private createGameScene() {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_ENTER);
		var layermgr = GGlobal.layerMgr;
		GGlobal.mapscene = new MapScene();
		layermgr.GameMain.addChildAt(GGlobal.mapscene.mapView, 0);

		GGlobal.mainUICtr.init();
		GGlobal.initData();
		GGlobal.isEnterGame = true;
		GGlobal.layerMgr.removeMainBg();
		GGlobal.modelGlobalMsg.enterGame();
	}
	private _gmSpr;
	public static openGM() {
		GGlobal.main.entrance.initGMEntrance();
	}
	public initGMEntrance() {
		let self = this;
		self._gmSpr = new egret.Sprite();
		GGlobal.main.addChild(self._gmSpr);

		let spr: egret.Sprite = self.createGrid("外挂", 0);
		spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			GGlobal.layerMgr.open(UIConst.GM);
		}, self);

		spr = self.createGrid("关闭", 40);
		spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			self._gmSpr.parent.removeChild(self._gmSpr);
		}, self);
	}

	createGrid = (txt, posy) => {
		let self = this;
		let spr = new egret.Sprite();
		spr.graphics.beginFill(0x9370DB);
		spr.graphics.drawRect(0, 0, 50, 30);
		spr.graphics.endFill();
		spr.y = posy;
		self._gmSpr.addChild(spr);
		spr.touchEnabled = true;
		var gmTxt: egret.TextField = new egret.TextField();
		gmTxt.text = txt;
		gmTxt.x = (50 - gmTxt.textWidth) / 2
		gmTxt.y = (30 - gmTxt.textHeight) / 2
		spr.addChild(gmTxt);
		return spr;
	}

	public isLoginAwait: boolean = false;
	public mainResolve;
	private async connectServer(ip, port) {
		const self = this;
		const socketMgr = GGlobal.socketMgr;
		socketMgr.init();
		return new Promise(function (resolve) {
			var socketConnected = function (mgr: WebSocketMgr, e: egret.Event) {//连接成功
				self.isLoginAwait = false;
				self.mainResolve = null;
				resolve();
			}
			var socketError = function (mgr: WebSocketMgr, e: egret.Event) {
				console.log("连不上服务器");
			}
			self.isLoginAwait = true;
			self.mainResolve = resolve;
			socketMgr.connectCallBack = socketConnected;
			socketMgr.errorCallBack = socketError;
			socketMgr.connect(ip, port);
		});
	}

	private async loadCommonResource() {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_LOADMAINUI);
		const s = this;
		return new Promise(function (resolve) {
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e: RES.ResourceEvent) {
				GGlobal.commonpkg = GGlobal.createPack("common");
				GGlobal.createPack("MainUI");
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, s);
				if (e.groupName == "preload") {
					resolve();
				}
			}, this);
			RES.loadGroup("preload");
		});
	}

	private async loadAniResource() {
		const s = this;
		return new Promise(function (resolve) {
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e: RES.ResourceEvent) {
				GGlobal.aniCfg = RES.getRes("ani_json");
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, s);
				if (e.groupName == "ani") {
					resolve();
				}
			}, this);
			RES.loadGroup("ani");
		});
	}

	private async loadGameCfg(url?) {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_LOADCFG);
		const self = this;
		return new Promise(function (resolve) {
			RES.getResAsync(url, function (data) {
				resolve(data);
			}, self);
		});
	}

	private async decodeImportCfg() {
		return new Promise(function (resolve) {
			Config.daoju_204;
			Config.zhuangbei_204;
			Config.NPC_200;
			resolve();
		});
	}

	private cfg1; cfg2; cfg3; cfg4; cfg5; cfg6;
	private async parseConfig() {
		const self = this;
		return new Promise(function (resolve) {
			Config.init(self.cfg1);
			RES.destroyRes("config0_json");
			resolve();
		});
	}

	private concactCFG(data: any[]) {
		let ret = {};
		for (var i = 0; i < data.length; i++) {
			let data1 = data[i];
			for (let key in data1) {
				ret[key] = data1[key];
			}
		}
		return ret;
	}

	public prepareRoleInfo() {
		const self = this;
		return new Promise(function (resolve) {
			GGlobal.control.listenonce(Enum_MsgType.ENTER_GAME_READY, function () {
				resolve();
			});
			GGlobal.modelLogin.cs_prepareInfo();
		});
	}

	/**加载角色资源 */
	private _preLoadList = [];
	private async loadRoleResource() {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_PRELOAD);
		const self = this;
		let job = ModelLogin.job;
		// let tempMap = ["resource/map/3102/bgs512/0_0.png","resource/map/3102/bgs512/0_1.png","resource/map/3102/bgs512/0_2.png","resource/map/3102/bgs512/0_3.png",
		// "resource/map/3102/bgs512/1_0.png","resource/map/3102/bgs512/1_1.png","resource/map/3102/bgs512/1_2.png","resource/map/3102/bgs512/1_3.png",
		// "resource/map/3102/bgs512/2_0.png","resource/map/3102/bgs512/2_1.png","resource/map/3102/bgs512/2_2.png","resource/map/3102/bgs512/2_3.png"
		// ];
		let tempMap = ["resource/map/3102/clipmap/0_0.png"];
		self._preLoadList = (Enum_Path.PRELOAD_MONSTER + "," + Enum_Path["PRELOAD_ROLE" + job]).split(",");
		self._preLoadList = self._preLoadList.concat(tempMap);
		return new Promise(function (resolve) {
			GGlobal.control.listenonce(Enum_MsgType.PRELOAD_COMPLETE, function () {
				resolve();
			});
			if (self._preLoadList.length) {
				self.preload_model();
			} else {
				resolve();
			}
		});
	}

	private loadCount = 0;
	private preload_model() {
		let self = this;
		if (self.loadCount > 2) {
			return;
		}
		for (let i = 0; i < 2; i++) {
			if (!self._preLoadList.length) break;
			self.loadCount++;
			let url = self._preLoadList.shift();
			if (url.indexOf('map') == -1) {
				url = Enum_Path.getModelPath(url);
			} else {
				url = RESManager.getVersionUrl(url);
			}
			RES.getResByUrl(url, function onloadAni(e: RES.ResourceEvent) {
				self.loadCount--;
				if (self._preLoadList.length) {
					self.preload_model();
				} else {
					GGlobal.control.notify(Enum_MsgType.PRELOAD_COMPLETE);
					RES.removeEventListener(RES.ResourceEvent.COMPLETE, onloadAni, self);
				}
			}, this);
		}
	}

	private async checkCreateRole() {
		//检测创建角色
		var self = this;
		return new Promise(function (resolve) {
			GGlobal.control.listenonce(Enum_MsgType.ROLE_CREATE_COMPLETE, function (arg) {
				self.setloadVis(true);
				resolve();
			}, self);
			GGlobal.modelLogin.cs_loginInfo();
		});
	}
	private async playCartong() {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_ANI);
		const self = this;
		return new Promise(function (resolve) {
			GGlobal.control.listenonce(Enum_MsgType.CARTONGEND, function () {
				resolve();
				GGlobal.layerMgr.open(UIConst.LOGINVIP);
			}, self);
			GGlobal.layerMgr.register(UIConst.CARTOON, CartoonManager, null, GGlobal.layerMgr.UI_OFFLINE);
			GGlobal.layerMgr.close(UIConst.STORE_ANI);
			GGlobal.layerMgr.open(UIConst.CARTOON);
		});
	}

	public setloadVis(v) {
		(window as any).setLoadVis(v);
	}

	public getLoginArg() {
		return (window as any).loginArg;
	}

	public hideLoading() {
		(window as any).diposeLoadView();
	}

	public static showGame() {
		(window as any).showGame();
	}

	public showPro(per: number, tips: string) {
		per = per * 100;
		(window as any).showLoadProgress(tips, per, 0);
	}

	public hideLoadBg() {
		window && (window as any).hideServerBg();//不知为什么比游戏大。创角直接移除吧
	}

	public showStoreAni() {
		GGlobal.layerMgr.open(UIConst.STORE_ANI);
	}
}