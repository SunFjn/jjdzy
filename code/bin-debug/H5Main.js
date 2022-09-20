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
var H5Main = (function (_super) {
    __extends(H5Main, _super);
    function H5Main() {
        var _this = _super.call(this) || this;
        _this.GAME_CFG_URL = "resource/gameCFG.json";
        _this.hasWxSdk = false;
        _this.createGrid = function (txt, posy) {
            var self = _this;
            var spr = new egret.Sprite();
            spr.graphics.beginFill(0x9370DB);
            spr.graphics.drawRect(0, 0, 50, 30);
            spr.graphics.endFill();
            spr.y = posy;
            self._gmSpr.addChild(spr);
            spr.touchEnabled = true;
            var gmTxt = new egret.TextField();
            gmTxt.text = txt;
            gmTxt.x = (50 - gmTxt.textWidth) / 2;
            gmTxt.y = (30 - gmTxt.textHeight) / 2;
            spr.addChild(gmTxt);
            return spr;
        };
        _this.isLoginAwait = false;
        /**加载角色资源 */
        _this._preLoadList = [];
        _this.loadCount = 0;
        ResourceVersionConfig.initialize();
        _this.onAddToStage();
        return _this;
    }
    H5Main.prototype.onAddToStage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        GGlobal.loginArg = self.getLoginArg();
                        GGlobal.deCodeLogin(GGlobal.loginArg);
                        RES.getVirtualUrl = RESManager.getGameCFGUrl;
                        return [4 /*yield*/, self.initialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, self.loadGlobalCFG()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadConfig(RESManager.getVersionUrl("resource/default.res.json"), GGlobal.resHead + "resource/")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, self.loadVersionConfig("version_json")];
                    case 4:
                        _a.sent();
                        self.enterGame();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**加载版本文件*/
    H5Main.prototype.loadVersionConfig = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        RES.getResAsync(url, function (data) {
                            ResourceVersionConfig.urlDic = RES.getRes(url);
                            resolve(data);
                        }, self);
                    })];
            });
        });
    };
    H5Main.prototype.loadGlobalCFG = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        var rawFile = new XMLHttpRequest();
                        rawFile.overrideMimeType("application/json");
                        rawFile.open("GET", GGlobal.resHead + self.GAME_CFG_URL + "?" + Math.random(), true);
                        rawFile.onreadystatechange = function () {
                            if (rawFile.readyState === 4 && rawFile.status == 200) {
                                console.log("game cfg:" + rawFile.responseText);
                                var data = JSON.parse(rawFile.responseText);
                                Model_GlobalMsg.decode(data);
                                resolve();
                            }
                        };
                        rawFile.send(null);
                    })];
            });
        });
    };
    H5Main.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                App.init();
                GGlobal.main.addChild(fairygui.GRoot.inst.displayObject);
                if (true) {
                    GGlobal.resHead = "";
                }
                else {
                    GGlobal.resHead = GGlobal.loginArg.resHead;
                    Model_UserData.PHPURL = GGlobal.loginArg.serverHttpUrl;
                }
                commonBinder.bindAll();
                return [2 /*return*/, new Promise(function (resolve) {
                        resolve();
                    })];
            });
        });
    };
    H5Main.prototype.enterGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        GGlobal.init();
                        self.showPro(0.3, "链接服务器");
                        return [4 /*yield*/, self.connectServer(GGlobal.loginArg.ip, GGlobal.loginArg.port)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, self.loadAniResource()];
                    case 2:
                        _b.sent();
                        self.showPro(0.4, "检查角色信息");
                        return [4 /*yield*/, self.checkCreateRole()];
                    case 3:
                        _b.sent();
                        self.showPro(0.5, "加载游戏必要资源");
                        return [4 /*yield*/, self.loadCommonResource()];
                    case 4:
                        _b.sent();
                        self.showPro(0.7, "加载游戏配置");
                        _a = self;
                        return [4 /*yield*/, self.loadGameCfg("config0_json")];
                    case 5:
                        _a.cfg1 = _b.sent();
                        self.showPro(0.8, "解析配置中");
                        return [4 /*yield*/, self.parseConfig()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, self.decodeImportCfg()];
                    case 7:
                        _b.sent();
                        self.showPro(0.9, "获取角色信息");
                        return [4 /*yield*/, self.prepareRoleInfo()];
                    case 8:
                        _b.sent();
                        if (!GGlobal.main.isNewRole) return [3 /*break*/, 13];
                        return [4 /*yield*/, self.loadRoleResource()];
                    case 9:
                        _b.sent();
                        self.showPro(1, "加载角色资源");
                        return [4 /*yield*/, RES.getResAsync("CartoonManager")];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, RES.getResAsync("CartoonManager_atlas0")];
                    case 11:
                        _b.sent();
                        self.hideLoading();
                        return [4 /*yield*/, self.playCartong()];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        self.hideLoading();
                        _b.label = 14;
                    case 14:
                        self.createGameScene();
                        if (true) {
                            self.initGMEntrance();
                        }
                        if (GGlobal.loginArg.isTest) {
                            self.initGMEntrance();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    H5Main.prototype.createGameScene = function () {
        GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_ENTER);
        var layermgr = GGlobal.layerMgr;
        GGlobal.mapscene = new MapScene();
        layermgr.GameMain.addChildAt(GGlobal.mapscene.mapView, 0);
        GGlobal.mainUICtr.init();
        GGlobal.initData();
        GGlobal.isEnterGame = true;
        GGlobal.layerMgr.removeMainBg();
        GGlobal.modelGlobalMsg.enterGame();
    };
    H5Main.openGM = function () {
        GGlobal.main.entrance.initGMEntrance();
    };
    H5Main.prototype.initGMEntrance = function () {
        var self = this;
        self._gmSpr = new egret.Sprite();
        GGlobal.main.addChild(self._gmSpr);
        var spr = self.createGrid("外挂", 0);
        spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            GGlobal.layerMgr.open(UIConst.GM);
        }, self);
        spr = self.createGrid("关闭", 40);
        spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self._gmSpr.parent.removeChild(self._gmSpr);
        }, self);
    };
    H5Main.prototype.connectServer = function (ip, port) {
        return __awaiter(this, void 0, void 0, function () {
            var self, socketMgr;
            return __generator(this, function (_a) {
                self = this;
                socketMgr = GGlobal.socketMgr;
                socketMgr.init();
                return [2 /*return*/, new Promise(function (resolve) {
                        var socketConnected = function (mgr, e) {
                            self.isLoginAwait = false;
                            self.mainResolve = null;
                            resolve();
                        };
                        var socketError = function (mgr, e) {
                            console.log("连不上服务器");
                        };
                        self.isLoginAwait = true;
                        self.mainResolve = resolve;
                        socketMgr.connectCallBack = socketConnected;
                        socketMgr.errorCallBack = socketError;
                        socketMgr.connect(ip, port);
                    })];
            });
        });
    };
    H5Main.prototype.loadCommonResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_LOADMAINUI);
                s = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e) {
                            GGlobal.commonpkg = GGlobal.createPack("common");
                            GGlobal.createPack("MainUI");
                            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, s);
                            if (e.groupName == "preload") {
                                resolve();
                            }
                        }, this);
                        RES.loadGroup("preload");
                    })];
            });
        });
    };
    H5Main.prototype.loadAniResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                s = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function onLoadedCfg(e) {
                            GGlobal.aniCfg = RES.getRes("ani_json");
                            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadedCfg, s);
                            if (e.groupName == "ani") {
                                resolve();
                            }
                        }, this);
                        RES.loadGroup("ani");
                    })];
            });
        });
    };
    H5Main.prototype.loadGameCfg = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_LOADCFG);
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        RES.getResAsync(url, function (data) {
                            resolve(data);
                        }, self);
                    })];
            });
        });
    };
    H5Main.prototype.decodeImportCfg = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        Config.daoju_204;
                        Config.zhuangbei_204;
                        Config.NPC_200;
                        resolve();
                    })];
            });
        });
    };
    H5Main.prototype.parseConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        Config.init(self.cfg1);
                        RES.destroyRes("config0_json");
                        resolve();
                    })];
            });
        });
    };
    H5Main.prototype.concactCFG = function (data) {
        var ret = {};
        for (var i = 0; i < data.length; i++) {
            var data1 = data[i];
            for (var key in data1) {
                ret[key] = data1[key];
            }
        }
        return ret;
    };
    H5Main.prototype.prepareRoleInfo = function () {
        var self = this;
        return new Promise(function (resolve) {
            GGlobal.control.listenonce(Enum_MsgType.ENTER_GAME_READY, function () {
                resolve();
            });
            GGlobal.modelLogin.cs_prepareInfo();
        });
    };
    H5Main.prototype.loadRoleResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, job, tempMap;
            return __generator(this, function (_a) {
                GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_PRELOAD);
                self = this;
                job = ModelLogin.job;
                tempMap = ["resource/map/3102/clipmap/0_0.png"];
                self._preLoadList = (Enum_Path.PRELOAD_MONSTER + "," + Enum_Path["PRELOAD_ROLE" + job]).split(",");
                self._preLoadList = self._preLoadList.concat(tempMap);
                return [2 /*return*/, new Promise(function (resolve) {
                        GGlobal.control.listenonce(Enum_MsgType.PRELOAD_COMPLETE, function () {
                            resolve();
                        });
                        if (self._preLoadList.length) {
                            self.preload_model();
                        }
                        else {
                            resolve();
                        }
                    })];
            });
        });
    };
    H5Main.prototype.preload_model = function () {
        var self = this;
        if (self.loadCount > 2) {
            return;
        }
        for (var i = 0; i < 2; i++) {
            if (!self._preLoadList.length)
                break;
            self.loadCount++;
            var url = self._preLoadList.shift();
            if (url.indexOf('map') == -1) {
                url = Enum_Path.getModelPath(url);
            }
            else {
                url = RESManager.getVersionUrl(url);
            }
            RES.getResByUrl(url, function onloadAni(e) {
                self.loadCount--;
                if (self._preLoadList.length) {
                    self.preload_model();
                }
                else {
                    GGlobal.control.notify(Enum_MsgType.PRELOAD_COMPLETE);
                    RES.removeEventListener(RES.ResourceEvent.COMPLETE, onloadAni, self);
                }
            }, this);
        }
    };
    H5Main.prototype.checkCreateRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        GGlobal.control.listenonce(Enum_MsgType.ROLE_CREATE_COMPLETE, function (arg) {
                            self.setloadVis(true);
                            resolve();
                        }, self);
                        GGlobal.modelLogin.cs_loginInfo();
                    })];
            });
        });
    };
    H5Main.prototype.playCartong = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_ANI);
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        GGlobal.control.listenonce(Enum_MsgType.CARTONGEND, function () {
                            resolve();
                            GGlobal.layerMgr.open(UIConst.LOGINVIP);
                        }, self);
                        GGlobal.layerMgr.register(UIConst.CARTOON, CartoonManager, null, GGlobal.layerMgr.UI_OFFLINE);
                        GGlobal.layerMgr.close(UIConst.STORE_ANI);
                        GGlobal.layerMgr.open(UIConst.CARTOON);
                    })];
            });
        });
    };
    H5Main.prototype.setloadVis = function (v) {
        window.setLoadVis(v);
    };
    H5Main.prototype.getLoginArg = function () {
        return window.loginArg;
    };
    H5Main.prototype.hideLoading = function () {
        window.diposeLoadView();
    };
    H5Main.showGame = function () {
        window.showGame();
    };
    H5Main.prototype.showPro = function (per, tips) {
        per = per * 100;
        window.showLoadProgress(tips, per, 0);
    };
    H5Main.prototype.hideLoadBg = function () {
        window && window.hideServerBg(); //不知为什么比游戏大。创角直接移除吧
    };
    H5Main.prototype.showStoreAni = function () {
        GGlobal.layerMgr.open(UIConst.STORE_ANI);
    };
    return H5Main;
}(egret.Sprite));
__reflect(H5Main.prototype, "H5Main");
