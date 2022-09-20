class WxMain extends egret.Sprite {
	public constructor() {
		super();
		this.onAddToStage();
	}
	public isTest = false;
	private async onAddToStage() {
		const self = this;
		var verHasUpdate = platform1.checkUpdate();
		if (verHasUpdate) {
			await platform1.update();
		}
		self.initialize();
		const url = RESManager.getVersionUrl("resource/default.res.json");
		await RES.loadConfig(url, GGlobal.resHead + "resource/");
		GameLoadingView.getInst().showPro(0.5, "初始化SDK");
		if (self.isTest) {
			await GGlobal.sdk.Login();
		}
		GameLoadingView.getInst().showPro(1, "获取服务器列表");
		await RES.getResAsync("Login");
		await RES.getResAsync("Login_atlas0");
		await self.getphpData();
		GameLoadingView.getInst().hide();
		self.enterGame();
	}
	private async getphpData() {
		let self = this;
		return new Promise(function (resolve) {
			if (DEBUG) {
				let loader: egret.URLLoader = new egret.URLLoader();
				loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
				loader.addEventListener(egret.Event.COMPLETE, function comp(evt: egret.Event) {
					loader.removeEventListener(egret.Event.COMPLETE, comp, self);
					GameLoginView1.getInst().serverdata = JSON.parse(evt.currentTarget.data);
					resolve();
				}, self);
				loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function IOError(evt: egret.Event) {
					loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, IOError, self);
					GameLoadingView.getInst().showPro(1, "获取服务器列表错误");
				}, self);
				let url: string = GGlobal.resHead + "loginlib/servList.php";
				let request: egret.URLRequest = new egret.URLRequest(url);
				//开始加载
				loader.load(request);
			} else {
				let request;
				if (GGlobal.sdk) {
					request = Model_UserData.getServerListPanel(Model_UserData.SERVERLIST, GGlobal.loginArg.open_id);
				} else {
					request = Model_UserData.getServerListPanel(Model_UserData.SERVERLIST);
				}
				this.request = request;
				request.addEventListener(egret.Event.COMPLETE, function onGetComplete(evt: egret.Event) {
					var request = <egret.HttpRequest>evt.currentTarget;
					egret.log("get data : ", request.response);
					GameLoginView1.getInst().setServerDate(JSON.parse(request.response));
					request.removeEventListener(egret.Event.COMPLETE, onGetComplete, self);
					resolve();
				}, self);
				request.addEventListener(egret.IOErrorEvent.IO_ERROR, function onGetIOError(evt: egret.Event) {
					request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onGetIOError, self);
					GameLoadingView.getInst().showPro(1, "服务器维护中");
					if (GGlobal.sdk && wx) {
						wx.showModal({
							title: '提示',
							content: '服务器维护中，请稍后连接。',
							success: function (res) {
								if (res.confirm) {
									GGlobal.sdk.exitApp();
									resolve();
								}
							}
						})
					}
				}, self);
			}
		});
	}

	private initialize() {
		App.init();
		GGlobal.main.addChild(fairygui.GRoot.inst.displayObject);
		GGlobal.loginArg.pfcode = "wxsgzj01";
		if (this.isTest) {
			ResourceVersionConfig.initialize();
			GGlobal.resHead = "https://cdnali.sgzj.ptxlw.com/";
			Model_UserData.PHPURL = "https://neice.sgzj.ptyu.net:7004";
			GGlobal.sdk = new HLSDK();
		} else {

		}
		commonBinder.bindAll();
	}

	public async enterGame() {
		const self = this;
		await GameLoginView1.getInst().show().loginEnd();
		GGlobal.init();
		GameLoadingView.getInst().showPro(0.1, "链接服务器");
		await self.connectServer(GGlobal.loginArg.ip, GGlobal.loginArg.port);
		await self.loadAniResource();
		GameLoadingView.getInst().showPro(0.2, "检查角色信息");
		await self.checkCreateRole();
		GameLoadingView.getInst().showPro(0.5, "加载游戏必要资源");
		await self.loadCommonResource();

		GameLoadingView.getInst().showPro(0.6, "加载游戏配置1");
		self.cfg1 = await self.loadGameCfg("config0_json");
		await self.parseConfig();
		await self.decodeImportCfg();
		GameLoadingView.getInst().showPro(0.9, "获取角色信息");
		await self.prepareRoleInfo();
		if (GGlobal.main.isNewRole) {
			await self.loadRoleResource();
			GameLoadingView.getInst().showPro(1, "加载动画");
			await RES.getResAsync("CartoonManager");
			await RES.getResAsync("CartoonManager_atlas0");
			self.hideLoading();
			await self.playCartong();
		} else {
			self.hideLoading();
		}
		self.createGameScene();
		self.initGMEntrance();
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

	private initGMEntrance() {
		var _gmSpr = new egret.Sprite();
		GGlobal.main.addChild(_gmSpr);

		var spr: egret.Sprite = new egret.Sprite();
		spr.graphics.beginFill(0x9370DB);
		spr.graphics.drawRect(0, 0, 50, 30);
		spr.graphics.endFill();
		_gmSpr.addChild(spr);
		spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			GGlobal.layerMgr.open(UIConst.GM);
		}, this);
		spr.touchEnabled = true;
		var gmTxt: egret.TextField = new egret.TextField();
		gmTxt.text = "外挂";
		gmTxt.x = (50 - gmTxt.textWidth) / 2;
		gmTxt.y = (30 - gmTxt.textHeight) / 2;
		spr.addChild(gmTxt);

		spr = new egret.Sprite();
		spr.graphics.beginFill(0x9370DB);
		spr.graphics.drawRect(0, 0, 50, 30);
		spr.graphics.endFill();
		spr.y = 80;
		_gmSpr.addChild(spr);
		spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			_gmSpr.parent.removeChild(_gmSpr);

		}, this);
		spr.touchEnabled = true;
		var gmTxt: egret.TextField = new egret.TextField();
		gmTxt.text = "关闭";
		gmTxt.x = (50 - gmTxt.textWidth) / 2
		gmTxt.y = (30 - gmTxt.textHeight) / 2
		spr.addChild(gmTxt);
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
				GGlobal.aniCfg = RES.getRes("ani_json");
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, s);
				if (e.groupName == "preload") {
					resolve();
				}
			}, this);
			RES.loadGroup("preload");
		});
	}

	private async loadGameCfg(url?) {
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

	private cfg1;
	private async parseConfig() {
		const self = this;
		return new Promise(function (resolve) {
			Config.init(self.cfg1);
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

	private _preLoadList = [];
	private async loadRoleResource() {
		GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_PRELOAD);
		const self = this;
		let job = ModelLogin.job;
		self._preLoadList = (Enum_Path.PRELOAD_MONSTER + "," + Enum_Path["PRELOAD_ROLE" + job]).split(",");
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

	private preload_model() {
		let self = this;
		for (let i = 0; i < 2; i++) {
			if (!self._preLoadList.length) break;
			let url = self._preLoadList.shift();
			url = Enum_Path.getModelPath(url);
			RES.getResByUrl(url, function onloadAni(e: RES.ResourceEvent) {
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
				resolve();
			}, self);
			GGlobal.modelLogin.cs_loginInfo();
		});
	}
	private async playCartong() {
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

	public hideLoading() {
		GameLoadingView.getInst().clearMemTaken();
		GameLoginView1.getInst().uidispose();
	}

	public setloadVis(v) {
		if (!v)
			GameLoadingView.getInst().hide();
	}

	public hideLoadBg() {
		GameLoadingView.getInst().hideBg(false);
	}

	public showStoreAni() {
		GGlobal.layerMgr.open(UIConst.STORE_ANI);
	}

}