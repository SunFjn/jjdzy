class OldMain extends egret.Sprite {

    public constructor() {
        super();
        this.onAddToStage();
    }
    private readonly hasWxSdk = false;
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
        if (self.hasWxSdk) {
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
                    } else {
                        // if (window) {
                        //     window.location.reload();
                        // }
                    }
                }, self);
            }
        });
    }

    private initialize() {
        App.init();
        GGlobal.main.addChild(fairygui.GRoot.inst.displayObject);
        GGlobal.loginArg.pfcode = "wxsgzj01";
        if (DEBUG) {
            GGlobal.resHead = "";
        } else {
            ResourceVersionConfig.initialize();
            GGlobal.resHead = "http://neice.sgzj.shqi2.net/";
            Model_UserData.PHPURL = "http://neice.sgzj.shqi2.net:7002/";
            if (this.hasWxSdk) {
                GGlobal.resHead = "https://cdnali.sgzj.shqi2.net/";
                Model_UserData.PHPURL = "https://houtaiquick.sgzj.shqi2.net:5001";
                GGlobal.sdk = new HLSDK();
            } else {
                App.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
        }
        commonBinder.bindAll();
    }
    public async enterGame() {
        const self = this;
        await GameLoginView1.getInst().show().loginEnd();
        GGlobal.init();
        GameLoadingView.getInst().showPro(0.1, "链接服务器");
        await self.connectServer(GGlobal.loginArg.ip, GGlobal.loginArg.port);
        GameLoadingView.getInst().showPro(0.2, "检查角色信息");
        await self.checkCreateRole();
        GameLoadingView.getInst().showPro(0.5, "加载游戏必要资源");
        await self.loadCommonResource();

        GameLoadingView.getInst().showPro(0.6, "加载游戏配置1");
        self.cfg1 = await self.loadGameCfg("config0_json");
        GameLoadingView.getInst().showPro(0.65, "加载游戏配置1");
        self.cfg2 = await self.loadGameCfg("config1_json");
        GameLoadingView.getInst().showPro(0.7, "加载游戏配置2");
        self.cfg3 = await self.loadGameCfg("config2_json");
        GameLoadingView.getInst().showPro(0.75, "加载游戏配置2");
        self.cfg4 = await self.loadGameCfg("config3_json");
        GameLoadingView.getInst().showPro(0.8, "加载游戏配置3");
        self.cfg5 = await self.loadGameCfg("config4_json");
        GameLoadingView.getInst().showPro(0.85, "加载游戏配置3");
        self.cfg6 = await self.loadGameCfg("config5_json");
        await self.parseConfig();
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
        // if(DEBUG) {
        self.initGMEntrance();
        // }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        var layermgr = GGlobal.layerMgr;
        GGlobal.mapscene = new MapScene();
        layermgr.GameMain.addChildAt(GGlobal.mapscene.view, 0);

        GGlobal.mainUICtr.init();
        GGlobal.initData();
        GGlobal.isEnterGame = true;
    }
    private initGMEntrance() {
        var _gmSpr = new egret.Sprite();
        GGlobal.main.addChild(_gmSpr);

        var spr: egret.Sprite = new egret.Sprite();
        spr.graphics.beginFill(0xFF00FF);
        spr.graphics.drawRect(0, 0, 50, 30);
        spr.graphics.endFill();
        _gmSpr.addChild(spr);
        spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => { GGlobal.layerMgr.open(UIConst.GM); }, this);
        spr.touchEnabled = true;
        var gmTxt: egret.TextField = new egret.TextField();
        gmTxt.text = "外挂";
        gmTxt.x = (50 - gmTxt.textWidth) / 2;
        gmTxt.y = (30 - gmTxt.textHeight) / 2;
        spr.addChild(gmTxt);

        spr = new egret.Sprite();
        spr.graphics.beginFill(0xFF00FF);
        spr.graphics.drawRect(0, 0, 50, 30);
        spr.graphics.endFill();
        spr.y = 80;
        _gmSpr.addChild(spr);
        spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => { _gmSpr.parent.removeChild(_gmSpr); }, this);
        spr.touchEnabled = true;
        var gmTxt: egret.TextField = new egret.TextField();
        gmTxt.text = "关闭";
        gmTxt.x = (50 - gmTxt.textWidth) / 2
        gmTxt.y = (30 - gmTxt.textHeight) / 2
        spr.addChild(gmTxt);
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
        const self = this;
        return new Promise(function (resolve) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e: RES.ResourceEvent) {
                GGlobal.commonpkg = GGlobal.createPack("common");
                GGlobal.createPack("MainUI");
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, self);
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
    private cfg1; cfg2; cfg3; cfg4; cfg5; cfg6;
    private async parseConfig() {
        const self = this;
        return new Promise(function (resolve) {
            var cfg = self.concactCFG([self.cfg1, self.cfg2, self.cfg3, self.cfg4, self.cfg5, self.cfg6]);
            Config.init(cfg);
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
    private async loadRoleResource() {
        const self = this;
        return new Promise(function (resolve) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e: RES.ResourceEvent) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, self);
                if (e.groupName == "role" + ModelLogin.job) {
                    resolve();
                }
            }, this);
            RES.loadGroup("role" + ModelLogin.job);
        });
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

    public hideLoadBg(){
		window && (window as any).hideServerBg();//不知为什么比游戏大。创角直接移除吧
	}

	public showStoreAni(){
        GGlobal.layerMgr.open(UIConst.STORE_ANI);
    }w
}