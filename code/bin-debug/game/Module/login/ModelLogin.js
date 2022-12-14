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
var ModelLogin = (function (_super) {
    __extends(ModelLogin, _super);
    function ModelLogin() {
        var _this = _super.call(this) || this;
        /**??????????????????*/
        _this.enableSound = true;
        _this.handList = []; //??????????????????????????????????????????????????????????????????????????????
        _this.cmdHDList = []; //??????????????????
        _this.offlineTime = 0; //???????????????
        _this.ctTime = 5;
        _this.isRelogin = false;
        return _this;
    }
    ModelLogin.prototype.loginSendcmd = function () {
        var adder = this.addCmdHD;
        if (ModuleManager.isOpen(UIConst.DUANZAO_STRENG)) {
            adder(GGlobal.modelDuanZao.CG_GET_EQUIPMESSAGE, GGlobal.modelDuanZao); //??????????????????
        }
        if (ModuleManager.isOpen(UIConst.BAOWU)) {
            adder(GGlobal.modelbw.CG_OPEN_BAOWU, GGlobal.modelbw); //????????????????????????
            adder(function () {
                GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BAO_WU);
            }, GGlobal.modelBySys);
            adder(function () {
                GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_BAOWU); //??????
            }, GGlobal.modelBySys);
        }
        if (ModuleManager.isOpen(UIConst.TIANSHU)) {
            adder(GGlobal.modeltianshu.CG_OPENUI_971, GGlobal.modeltianshu); //????????????????????????
            adder(function () {
                GGlobal.modelBySys.CGGetinfobysys(Model_BySys.TIAN_SHU);
            }, GGlobal.modelBySys);
            adder(function () {
                GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_TIANSHU); //??????
            }, GGlobal.modelBySys);
        }
        if (ModuleManager.isOpen(UIConst.TITLE))
            adder(GGlobal.modeltitle.CG_INFO_501, GGlobal.modeltitle);
        if (ModuleManager.isOpen(UIConst.GUANXIAN))
            adder(GGlobal.modelguanxian.csGuanxian, GGlobal.modelguanxian);
        if (ModuleManager.isOpen(UIConst.BINGFA)) {
            adder(GGlobal.modelBingFa.CG_INFO_901, GGlobal.modelBingFa);
            adder(function () {
                GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BING_FA);
            }, GGlobal.modelBySys);
        }
        if (ModuleManager.isOpen(UIConst.VIP))
            adder(GGlobal.modelvip.CG_OPENUI_2061, GGlobal.modelvip);
        if (ModuleManager.isOpen(UIConst.TEQUAN))
            adder(GGlobal.modelvip.CG_TQ_2171, GGlobal.modelvip);
        if (ModuleManager.isOpen(UIConst.BOSS))
            adder(GGlobal.modelBoss.CG_DATA_1251, GGlobal.modelBoss);
        if (ModuleManager.isOpen(UIConst.SHEN_JIAN)) {
            adder(GGlobal.modelsj.CG_OPEN_SHENJIAN, GGlobal.modelsj);
            adder(function () {
                GGlobal.modelBySys.CGGetinfobysys(Model_BySys.SHEN_JIAN);
            }, GGlobal.modelBySys);
            adder(function () {
                GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_SHENJIAN); //??????
            }, GGlobal.modelBySys);
        }
        if (ModuleManager.isOpen(UIConst.YIBAO)) {
            adder(GGlobal.modelYiBao.CG_OPEN_YIBAO, GGlobal.modelYiBao);
            adder(function () {
                GGlobal.modelBySys.CGGetinfobysys(Model_BySys.YI_BAO);
            }, GGlobal.modelBySys);
            adder(function () {
                GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_YIBAO); //??????
            }, GGlobal.modelBySys);
        }
        if (ModuleManager.isOpen(UIConst.GOD_EQUIP)) {
            adder(function () {
                GGlobal.modelEquip.CGGetEquips(2); //??????
            }, GGlobal.modelEquip);
            adder(GGlobal.modelGodEquip.CGGetJieOrange, GGlobal.modelGodEquip);
        }
        if (ModuleManager.isOpen(UIConst.ZHAN_JIA))
            adder(GGlobal.modelZhanJia.CGGetZhanJiaUi, GGlobal.modelZhanJia); //??????
        if (ModuleManager.isOpen(UIConst.WU_JIANG)) {
            adder(GGlobal.modelWuJiang.CGGetWuJiang, GGlobal.modelWuJiang); //??????
            adder(function () {
                GGlobal.modelEquip.CGGetEquips(3); //??????
            }, GGlobal.modelEquip);
            adder(function () {
                GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_WUJIANG); //??????
            }, GGlobal.modelBySys);
            adder(GGlobal.modelWuJiang.CG3509, GGlobal.modelWuJiang); //??????
        }
        if (ModuleManager.isOpen(UIConst.REBIRTH)) {
            adder(GGlobal.modelPeacock.CG_OPENUI, GGlobal.modelPeacock); //???????????????????????????
            adder(GGlobal.modelEquip.lHDaShiLv, GGlobal.modelEquip); //??????????????????
        }
        if (ModuleManager.isOpen(UIConst.RUNMAN)) {
            adder(GGlobal.modelRunMan.CG_OPENUI, GGlobal.modelRunMan); //????????????????????????
        }
        if (ModuleManager.isOpen(UIConst.TUJIAN)) {
            adder(GGlobal.modelTuJian.CG_OPEN_TUJIAN, GGlobal.modelTuJian);
        }
        if (ModuleManager.isOpen(UIConst.SHOULING)) {
            adder(GGlobal.modelsl.CG_OPEN_SHOULING, GGlobal.modelsl);
        }
        if (ModuleManager.isOpen(UIConst.SH_HUANX)) {
            adder(function () {
                for (var i = 0; i < 4; i++) {
                    GGlobal.modelSHJX.CGHXUI_5695(i + 1);
                }
            }, GGlobal.modelSHJX);
        }
        if (ModuleManager.isOpen(UIConst.COUNTRY_SKILL)) {
            adder(GGlobal.modelCouSkill.CG_OPENUI, GGlobal.modelCouSkill);
        }
        if (ModuleManager.isOpen(UIConst.SHAOZHU)) {
            adder(GGlobal.modelShaoZhu.CG_OPEN_SHAOZHU_5101, GGlobal.modelShaoZhu);
        }
        if (ModuleManager.isOpen(UIConst.ZS_GODWEAPON)) {
            adder(GGlobal.modelGodWeapon.CG_OPENUI_7871, GGlobal.modelGodWeapon);
        }
        if (ModuleManager.isOpen(UIConst.YISHOULU)) {
            adder(GGlobal.modelYiShouLu.CG_OPEN_UI, GGlobal.modelYiShouLu);
        }
        if (ModuleManager.isOpen(UIConst.QICE_STAR)) {
            adder(GGlobal.modelQice.CG_QiCe_openQiCe_9701, GGlobal.modelQice);
        }
        if (ModuleManager.isOpen(UIConst.QICE_LOTTERY)) {
            adder(GGlobal.modelQice.CG_QiCeDraw_openUI_9751, GGlobal.modelQice);
        }
        if (ModuleManager.isOpen(UIConst.GOD_WUJIANG)) {
            adder(GGlobal.modelGodWuJiang.CG_WuJiang_getShenJiang_677, GGlobal.modelGodWuJiang);
        }
        if (ModuleManager.isOpen(UIConst.ZHENYAN)) {
            adder(GGlobal.modelZhenYan.CGOPENUI10251, GGlobal.modelZhenYan);
        }
        if (ModuleManager.isOpen(UIConst.JUEXING)) {
            adder(function () {
                for (var i = 1; i <= 8; i++) {
                    if (ModuleManager.isOpen(Model_JueXing.panelIDArr[i])) {
                        GGlobal.modeljx.CG_OPEN_JUEXING_819(i);
                    }
                }
            }, GGlobal.modeljx);
        }
        if (ModuleManager.isOpen(UIConst.ZS_GODWEAPON)) {
            adder(GGlobal.modelGodWeapon.CG_OPENUI_7871, GGlobal.modelGodWeapon);
        }
        if (ModuleManager.isOpen(UIConst.HORSE)) {
            adder(GGlobal.model_Horse.CG_OPENUI_11021, GGlobal.model_Horse);
        }
        if (ModuleManager.isOpen(UIConst.HORSE_HH)) {
            adder(GGlobal.model_Horse.CG_Mount_openMountUnrealUI_11029, GGlobal.model_Horse);
        }
        if (ModuleManager.isOpen(UIConst.HOME_MAID)) {
            adder(GGlobal.model_HomeMaid.CG_OPENUI_11301, GGlobal.model_HomeMaid);
        }
        Timer.instance.listen(this.executeCMD, this, 100);
    };
    ModelLogin.prototype.addCmdHD = function (func, thisObj) {
        var hd = Handler.create(thisObj, func);
        GGlobal.modelLogin.cmdHDList.push(hd);
    };
    ModelLogin.prototype.executeCMD = function () {
        var arr = this.cmdHDList;
        for (var i = 0; i < 5; i++) {
            if (arr.length) {
                var hd = arr.shift();
                hd.run();
            }
            else {
                Timer.instance.remove(this.executeCMD, this);
                break;
            }
        }
    };
    ModelLogin.prototype.doDelayEvent = function () {
        while (this.handList.length) {
            var hd = this.handList.shift();
            hd.run();
        }
    };
    ModelLogin.prototype.setSound = function (v) {
        if (v != this.enableSound) {
            this.enableSound = v;
            SoundManager.getInstance().setSoundEnable(v);
            this.notify(ModelLogin.MSG_SOUND, v);
        }
    };
    ModelLogin.prototype.cg_loginFlag = function (step) {
        if (!GGlobal.main.isNewRole)
            return;
        var ba = this.getBytes();
        ba.writeByte(step);
        this.sendSocket(171, ba);
    };
    /** ????????????*/
    ModelLogin.prototype.cs_loginInfo = function () {
        var self = this;
        self.requesLogin();
    };
    ModelLogin.prototype.requesLogin = function () {
        var ba = this.getBytes();
        var loginArg = GGlobal.loginArg;
        var info = {
            binVersion: loginArg.binVersion,
            account: loginArg.account,
            zoneid: loginArg.zoneid + "",
            pf: GameConfig.pf + "",
            openkey: loginArg.openkey,
            platform: loginArg.platform,
            os: loginArg.os,
            openid: loginArg.open_id + "",
            app_custom: loginArg.app_custom,
            pfcode: GameConfig.pf
        };
        GGlobal.zone = loginArg.zoneid;
        var str = JSON.stringify(info);
        ba.writeUTF(str);
        this.sendSocket(101, ba);
    };
    /** ??????????????????????????????*/
    ModelLogin.prototype.cs_prepareInfo = function () {
        var ba = this.getBytes();
        this.sendSocket(103, ba);
    };
    /** ??????????????????*/
    ModelLogin.prototype.requestCreateRole = function (job, name) {
        var ba = this.getBytes();
        ba.writeByte(job);
        ba.writeUTF(name);
        this.sendSocket(105, ba);
    };
    //CG ?????????????????????????????? 
    ModelLogin.prototype.CG_CreateEnter_Complete = function () {
        var ba = this.getBytes();
        this.sendSocket(133, ba);
    };
    /*135 I-I ???????????? B:?????? 1????????????2????????????3????????????I:?????? ?????????**/
    ModelLogin.prototype.CG_Request_ChongZhi = function (type, value) {
        var ba = this.getBytes();
        ba.writeInt(type);
        ba.writeInt(value);
        this.sendSocket(135, ba);
    };
    ModelLogin.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.listen(egret.Event.CLOSE, this.onSocketClose, this);
        mgr.regHand(102, this.scLoginInfo, this);
        mgr.regHand(104, this.scHeroInfo, this);
        mgr.regHand(106, this.scCreateRole, this);
        mgr.regHand(140, this.GCOffLine, this);
        // mgr.regHand(136, this.scChongZhiInfo, this);
        // mgr.regHand(138, this.scChongZhiRet, this);
        mgr.regHand(142, this.GCFengHao, this);
        mgr.regHand(148, this.GCSetting, this);
    };
    ModelLogin.prototype.onSocketClose = function () {
        if (GGlobal.isEnterGame) {
            this.openOffLine();
        }
        else {
            if (GGlobal.sdk) {
                GGlobal.sdk.offline();
            }
            else {
                // window.location.reload();
            }
        }
    };
    /**?????? CMD 102?????? */
    ModelLogin.prototype.scLoginInfo = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            //pop createRole
            // Main.showGame();
            //Main.setLoadingVis(false);
            // GGlobal.main.hideLoading();
            GGlobal.main.isNewRole = true;
            GGlobal.main.setloadVis(false);
            GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_CREATE_START);
            GGlobal.layerMgr.register(UIConst.CREATEROLE, ViewCreateRolePanel);
            GGlobal.layerMgr.register(UIConst.STORE_ANI, ViewNebieLoading);
            GGlobal.layerMgr.open(UIConst.CREATEROLE);
        }
        else if (ret == 1) {
            GGlobal.control.notify(Enum_MsgType.ROLE_CREATE_COMPLETE);
        }
        else if (ret == 2) {
            ViewCommonWarn.text("id?????????????????????");
        }
        else if (ret == 3) {
            window.location.reload();
        }
    };
    /**?????? CMD 104?????? */
    ModelLogin.prototype.scHeroInfo = function (self, data) {
        GGlobal.control.notify(Enum_MsgType.ENTER_GAME_READY);
        self.loginSendcmd();
    };
    /**?????? CMD 106??????  ?????????????????? B:?????? 1?????????????????????2????????????,3????????????B:????????????L:??????id I:????????????I:?????????????????????????????????*/
    ModelLogin.prototype.scCreateRole = function (self, bytes) {
        var ret = bytes.readByte();
        var job = bytes.readByte();
        var roleId = bytes.readLong();
        ModelLogin.roleID = roleId;
        ModelLogin.kfDay = bytes.readInt();
        ModelLogin.nowTime = bytes.readInt();
        if (ret == 1) {
            GGlobal.layerMgr.close(UIConst.CREATEROLE);
            GGlobal.main.showStoreAni();
            if (GGlobal.sdk) {
                GGlobal.sdk.ReportData({
                    action: 'createRole',
                    roleId: '' + roleId
                });
            }
            else if (HLSDK.whalePbSDK) {
                HLSDK.roleupdate(true);
            }
            ModelLogin.job = job;
            GGlobal.modelLogin.cg_loginFlag(ModelLogin.LOGIN_CREATE_END);
            GGlobal.control.notify(Enum_MsgType.ROLE_CREATE_COMPLETE);
        }
        else if (ret == 2) {
            //????????????
            self.notify("createRoleResult", -2);
        }
        else if (ret == 3) {
            //????????????
            self.notify("createRoleResult", -3);
        }
    };
    ModelLogin.initTSMsg = function () {
        //???????????? ?????????
        if (GGlobal.main.isNewRole) {
            ChildTuiSongMsg.initTSMsg(ModelLogin.kfDay, ModelLogin.nowTime);
        }
    };
    //B:0???????????? 1???????????????
    ModelLogin.prototype.GCOffLine = function (self, bytes) {
        var status = bytes.readByte();
        if (GGlobal.isEnterGame) {
            if (status == 0) {
                self.isOffLine = true;
                // self.openOffLine();
                ViewOffLine1.show("????????????????????????????????????", 1);
            }
            else {
                if (GGlobal.sdk) {
                    ViewOffLine.show("?????????????????????");
                }
                else {
                    ViewOffLine1.show("?????????????????????", 1);
                }
            }
        }
        else {
            if (GGlobal.sdk) {
                GGlobal.sdk.offline();
            }
            else {
                window.location.reload();
            }
        }
    };
    ModelLogin.prototype.GCFengHao = function (self, bytes) {
        var ret = bytes.readByte();
        self.isFengHao = ret;
    };
    ModelLogin.prototype.CGSetting = function (key, value) {
        var ba = this.getBytes();
        ba.writeUTF(key);
        ba.writeUTF(value);
        this.sendSocket(147, ba);
    };
    ModelLogin.prototype.GCSetting = function (self, bytes) {
        var sound = bytes.readByte();
        var skillauto = bytes.bytesAvailable ? bytes.readByte() : 0; //= bytes.readByte();
        self.setSound(sound != 0);
        // GGlobal.modelskill.sceneAuto = (skillauto != 0);
    };
    ModelLogin.prototype.openOffLine = function () {
        if (this.isFengHao > 0) {
            // GGlobal.layerMgr.open(UIConst.OFFLINE, 3);
        }
        else {
            this.offlineTime = egret.getTimer();
            if (GGlobal.sdk) {
                ViewOffLine.show("????????????????????????????????????????????????");
            }
            else {
                ViewOffLine1.show("????????????????????????????????????");
            }
        }
    };
    /**????????????*/
    ModelLogin.prototype.reLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, now, connectSt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        self.ctTime = 5;
                        now = egret.getTimer();
                        if (now - this.offlineTime > 180000) {
                            self.exiteGame();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, self.reConnect()];
                    case 1:
                        connectSt = _a.sent();
                        if (!connectSt) {
                            self.exiteGame();
                        }
                        else {
                            if (GGlobal.main.isLoginAwait) {
                                GGlobal.main.mainResolve();
                                GGlobal.main.isLoginAwait = false;
                                GGlobal.main.mainResolve = null;
                                GGlobal.layerMgr.close2(UIConst.OFFLINE);
                            }
                            else {
                                self.reEnterGame();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ModelLogin.prototype.reConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        var socketmgr = GGlobal.socketMgr;
                        socketmgr.clear();
                        if (socketmgr.webSocket.connected) {
                            socketmgr.close();
                        }
                        socketmgr.connectCallBack = function () {
                            resolve(1);
                        };
                        socketmgr.errorCallBack = function () {
                            resolve(0);
                        };
                        socketmgr.connect(GGlobal.loginArg.ip, GGlobal.loginArg.port);
                    })];
            });
        });
    };
    ModelLogin.prototype.exiteGame = function () {
        if (GGlobal.sdk) {
            GGlobal.sdk.exitApp();
        }
        else if (HLSDK.whalePbSDK) {
            window.location.reload();
        }
        else {
            window.location.reload();
        }
    };
    ModelLogin.prototype.reEnterGame = function () {
        var self = this;
        GGlobal.layerMgr.close2(UIConst.OFFLINE);
        GGlobal.control.listenonce(Enum_MsgType.ROLE_CREATE_COMPLETE, self.reLoginCreateComplete, self);
        GGlobal.control.listenonce(Enum_MsgType.ENTER_GAME_READY, self.reLoginEnterGame, self);
        self.cs_loginInfo();
    };
    // /**136 B-U ?????????????????? B:?????? 1????????????2??????????????????U:????????????*/
    // public scChongZhiInfo(self: ModelLogin, data: egret.ByteArray) {
    // 	var result = data.readByte();
    // 	var content = data.readUTF();
    // 	if (result == 1) {
    // 		Main.requestRecharge(content);
    // 	} else {
    // 		ViewCommonWarn.text("????????????");
    // 	}
    // }
    // /**138 B ???????????? B:1??????????????????2???????????????*/
    // public scChongZhiRet(self: ModelLogin, data: egret.ByteArray) {
    // 	var result = data.readByte();
    // 	if (result == 2) {
    // 		ViewCommonWarn.text("????????????");
    // 	}
    // }
    ModelLogin.prototype.reLoginCreateComplete = function () {
        this.cs_prepareInfo();
        GGlobal.mapscene.enterScene(-1);
        // if (Model_player.voMine) Model_player.voMine.clean();
    };
    ModelLogin.prototype.reLoginEnterGame = function () {
        this.isRelogin = false;
        GGlobal.layerMgr.close2(UIConst.OFFLINE);
        GGlobal.modelScene.returnMainScene();
    };
    ModelLogin.prototype.reLoginTime = function () {
        var now = egret.getTimer();
        if (now - this.oldTime >= 15000) {
            this.isRelogin = false;
            Timer.instance.remove(this.reLoginTime, this);
        }
    };
    ModelLogin.LOGIN_CREATE_START = 1; //?????? ??????????????????
    ModelLogin.LOGIN_CREATE_END = 2; //?????? ??????????????????
    ModelLogin.LOGIN_LOADMAINUI = 3; //?????? ??????????????????
    ModelLogin.LOGIN_LOADCFG = 4; //?????? ????????????
    ModelLogin.LOGIN_PRELOAD = 5; //?????? ???????????????
    ModelLogin.LOGIN_ANI = 6; //?????? ??????????????
    ModelLogin.LOGIN_ENTER = 7; //?????? ???????????????????????????
    ModelLogin.ENTER_GQ_1 = 8; //????????????1 BOSS??????
    ModelLogin.EXITE_GQ_1 = 9; //????????????1 BOSS??????
    ModelLogin.ENTER_GQ_2 = 10; //????????????2 BOSS??????
    ModelLogin.EXITE_GQ_2 = 11; //????????????2 BOSS??????
    ModelLogin.ENTER_GQ_3 = 12; //????????????3 BOSS??????
    ModelLogin.EXITE_GQ_3 = 13; //????????????3 BOSS??????
    ModelLogin.MSG_SOUND = "msg_s";
    ModelLogin.job = 0;
    ModelLogin.roleName = "";
    return ModelLogin;
}(BaseModel));
__reflect(ModelLogin.prototype, "ModelLogin");
