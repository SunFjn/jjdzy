var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var GameLoginView1 = (function (_super) {
    __extends(GameLoginView1, _super);
    function GameLoginView1() {
        var _this = _super.call(this) || this;
        _this.hasInit = false;
        return _this;
    }
    GameLoginView1.getInst = function () {
        return this._inst || (this._inst = new GameLoginView1());
    };
    GameLoginView1.prototype.initView = function () {
        GGlobal.createPack("Login");
        var s = this;
        this.panel = fairygui.UIPackage.createObject("Login", "GameLoginView1").asCom;
        fairygui.UIObjectFactory.setPackageItemExtension(GameServerList.URL, GameServerList);
        fairygui.UIObjectFactory.setPackageItemExtension(ServerBtn.URL, ServerBtn);
        fairygui.UIObjectFactory.setPackageItemExtension(ServerTabbutton.URL, ServerTabbutton);
        fairygui.UIObjectFactory.setPackageItemExtension(GameLoginBroadcast.URL, GameLoginBroadcast);
        s.addChild(s.panel);
        s.lbServer = (s.panel.getChild("lbServer"));
        s.btnChange = (s.panel.getChild("btnChange"));
        s.btnEnter = (s.panel.getChild("btnEnter"));
        s.btnNotice = (s.panel.getChild("btnNotice"));
        s.lbAccounts = (s.panel.getChild("lbAccounts"));
        s.accSelGrp = (s.panel.getChild("accSelGrp"));
        s.newSign = (s.panel.getChild("newSign"));
        this.panel.scaleX = this.panel.scaleY = LayerManager.getFullScreenSc();
        var xx = (App.stage.stageWidth - this.panel.width * this.panel.scaleX) >> 1;
        var yy = (App.stage.stageHeight - this.panel.height * this.panel.scaleY) >> 1;
        this.panel.setXY(xx, yy); //不考虑横屏
        this.lbAccounts.text = "g200";
        if (!GGlobal.sdk) {
            var acc = egret.localStorage.getItem("account");
            this.lbAccounts.text = acc ? acc : "g200";
        }
        s.onListen();
        if (GGlobal.sdk) {
            s.accSelGrp.visible = false;
            if (GGlobal.loginArg && GGlobal.loginArg.account) {
                this.lbAccounts.text = GGlobal.loginArg.account;
            }
        }
        if ((!GGlobal.sdk || Model_UserData.isWhitePlayer) && this.accSelGrp) {
            this.accSelGrp.visible = true;
        }
    };
    GameLoginView1.prototype.setServerDate = function (serverdata) {
        GameLoginView1.getInst().serverdata = serverdata;
        if (serverdata && serverdata.white)
            Model_UserData.isWhitePlayer = serverdata.white == 1;
        if (serverdata && serverdata.black)
            Model_UserData.isBlackPlayer = serverdata.black == 1;
        if (serverdata && serverdata.newPlayer)
            Model_UserData.newPlayer = serverdata.newPlayer == 1;
        if ((!GGlobal.sdk || Model_UserData.isWhitePlayer) && this.accSelGrp) {
            this.accSelGrp.visible = true;
        }
        if (serverdata.newPlayer) {
            this.enterGame();
        }
    };
    GameLoginView1.prototype.resize = function () {
        var sw = App.stage.stageWidth;
        var sh = App.stage.stageHeight;
        var rate = sh / sw;
        var mx = sw / 600;
        var my = sh / 800;
        var sc = Math.max(mx, my);
    };
    /**选择服务器*/
    GameLoginView1.prototype.selectHD = function (data) {
        if (!this.serverdata) {
            return;
        }
        if (!GGlobal.loginArg) {
            GGlobal.loginArg = {};
        }
        var loginArg = GGlobal.loginArg;
        loginArg.ip = data.ip;
        loginArg.zoneid = data.zoneid;
        loginArg.port = data.port;
        loginArg.pf = data.pf;
        loginArg.state = data.state;
        loginArg.platform = data.platform;
        if (!GGlobal.sdk) {
            loginArg.account = this.lbAccounts.text;
        }
        this.lbServer.text = data.alias;
        if (this.newSign) {
            //0维护 1新 2火爆
            this.newSign.url = ["ui://a056duzjpc659", "ui://a056duzjpc657", "ui://a056duzjpc658"][data.state];
        }
    };
    GameLoginView1.prototype.openServerList = function () {
        if (!this.serverPanel) {
            this.serverPanel = GameServerList.createInstance();
            this.serverPanel.selectHD = Handler.create(this, this.selectHD);
        }
        this.serverPanel.scaleX = this.serverPanel.scaleY = LayerManager.getFullScreenSc();
        var xx = (App.stage.stageWidth - this.serverPanel.width * this.serverPanel.scaleX) >> 1;
        var yy = (App.stage.stageHeight - this.serverPanel.height * this.serverPanel.scaleY) >> 1;
        this.serverPanel.setXY(xx, yy); //不考虑横屏
        App.stage.addChild(this.serverPanel.displayObject);
        this.serverPanel.showList(this.serverdata);
    };
    GameLoginView1.prototype.enterGame = function () {
        var state = GGlobal.loginArg.state;
        var loginArg = GGlobal.loginArg;
        if (!GGlobal.sdk || Model_UserData.isWhitePlayer) {
            loginArg.account = this.lbAccounts.text;
            loginArg.open_id = loginArg.account;
        }
        if (GGlobal.sdk && Model_UserData.isBlackPlayer) {
            GGlobal.sdk.blackPlayerWarning();
            return;
        }
        if (state == 0) {
            ViewMaintainServer.getInst().show().onShown();
        }
        else {
            this.directEnterGame();
        }
    };
    GameLoginView1.prototype.directEnterGame = function () {
        var self = this;
        var loginArg = GGlobal.loginArg;
        if (!GGlobal.sdk) {
            loginArg.account = self.lbAccounts.text;
            egret.localStorage.setItem("account", loginArg.account);
        }
        self.hideSomePart();
        if (self.resolve) {
            self.resolve();
        }
    };
    GameLoginView1.prototype.hideSomePart = function () {
        var self = this;
        if (self.displayObject.stage) {
            GGlobal.main.removeChild(self.displayObject);
        }
    };
    GameLoginView1.prototype.openNotice = function () {
        if (!this.broadcastPanel) {
            this.broadcastPanel = GameLoginBroadcast.createInstance();
        }
        App.stage.addChild(this.broadcastPanel.displayObject);
    };
    GameLoginView1.prototype.onListen = function () {
        var s = this;
        s.btnChange.addClickListener(s.openServerList, s);
        s.btnEnter.addClickListener(s.enterGame, s);
        s.btnNotice.addClickListener(s.openNotice, s);
    };
    GameLoginView1.prototype.onRemoveListen = function () {
        var s = this;
        s.btnChange.removeClickListener(s.openServerList, s);
        s.btnEnter.removeClickListener(s.enterGame, s);
        s.btnNotice.removeClickListener(s.openNotice, s);
    };
    GameLoginView1.prototype.uidispose = function () {
        this.onRemoveListen();
        if (this.displayObject && this.displayObject.parent) {
            this.displayObject.parent.removeChild(this.displayObject);
        }
        RES.destroyRes("Login_atlas0");
    };
    GameLoginView1.prototype.show = function () {
        var self = this;
        if (!self.hasInit) {
            self.hasInit = true;
            self.initView();
        }
        GGlobal.main.addChild(this.displayObject);
        //历史服务器存在的话取历史服务器的数据,默认是第一个唉
        var data;
        if (this.serverdata && this.serverdata.recent && this.serverdata.recent[0]) {
            data = this.serverdata.recent[0];
        }
        else {
            data = this.serverdata.formal[0];
        }
        self.selectHD(data);
        return this;
    };
    GameLoginView1.prototype.loginEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        self.resolve = resolve;
                    })];
            });
        });
    };
    GameLoginView1.URL = "ui://a056duzjpc650";
    return GameLoginView1;
}(fairygui.GComponent));
__reflect(GameLoginView1.prototype, "GameLoginView1");
