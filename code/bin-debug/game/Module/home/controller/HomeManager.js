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
var HomeManager = (function (_super) {
    __extends(HomeManager, _super);
    /**家园场景管理器*/
    function HomeManager() {
        return _super.call(this) || this;
    }
    HomeManager.getInstance = function () {
        return HomeManager.instance || (HomeManager.instance = new HomeManager());
    };
    HomeManager.prototype.binder = function () {
        GGlobal.createPack("home");
        var fc = this.setPackageItemExtension;
        fc(HomeUI);
        fc(PoolPreItem);
        fc(TianGongItem);
        fc(HomeUI);
        fc(TianGongItem);
        fc(TianGongLuItem);
        fc(ItemHomeRank);
        fc(ItemLog);
        fc(ChildMoneyTreeProgress);
        fc(ChildHomeEventTip);
        fc(ChildFurnitureName);
        fc(VHomeBtnMaid);
        fc(VHomeBtnMaidWel);
        fc(TianGLPlug);
    };
    //院子和庭院做区分
    HomeManager.prototype.enter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, reddot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.enter.call(this);
                        return [4 /*yield*/, RES.getResAsync("home")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("home_atlas0")];
                    case 2:
                        _a.sent();
                        this.binder();
                        GGlobal.mainUICtr.setState(MainUIController.HOME);
                        HomeUI.show();
                        self = this;
                        self.updateScene();
                        reddot = GGlobal.reddot;
                        GGlobal.control.listen(HomeModel.HOME_SCENE_UPDATE, self.updateScene, self);
                        GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScene, self);
                        reddot.listen(UIConst.HOME_JIADING, self.updateJiaDing, self);
                        Timer.listen(self.timeUpdate, self, 4000);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeManager.prototype.exite = function () {
        _super.prototype.exite.call(this);
        HomeUI.hide();
        var self = this;
        var reddot = GGlobal.reddot;
        GGlobal.control.remove(HomeModel.HOME_SCENE_UPDATE, self.updateScene, self);
        GGlobal.control.remove(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScene, self);
        reddot.listen(UIConst.HOME_JIADING, self.updateJiaDing, self);
        Timer.remove(self.timeUpdate, self);
        GGlobal.layerMgr.close2(UIConst.MAP);
    };
    HomeManager.prototype.timeUpdate = function () {
        if (HomeModel.isTimeIn()) {
            GGlobal.homemodel.CG_House_outHouse_11103();
            ViewCommonWarn.text("府邸数据重置中,0:06开启");
        }
    };
    HomeManager.prototype.updateJiaDing = function () {
        var model = GGlobal.homemodel;
        if (!model.isSelfHome) {
            return;
        }
        var list = GameUnitManager.list;
        for (var i = 0; i < list.length; i++) {
            var role = list[i];
            if (role) {
                if (role instanceof ARPGNpc) {
                    //金库事件货币收取事件 别人家的需要读取常数表计算
                    var cfgID = role.cfgID;
                    var per = ConfigHelp.getSystemNum(7114);
                    var npcLib = Config.NPC_200[cfgID];
                    if (npcLib.type == Enum_NpcType.JIADING) {
                        if (GGlobal.modelHouseKeeper.jdID) {
                            role.removePlugBytype(ChildHomeEventTip);
                            var v = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING);
                            if (v) {
                                var plug = ChildHomeEventTip.create(role);
                                role.addSinglePlug(plug, ChildHomeEventTip);
                                plug.setJiaDingState();
                            }
                        }
                        break;
                    }
                }
            }
        }
    };
    HomeManager.prototype.updateScene = function () {
        if (!HomeModel.inHome) {
            return;
        }
        var self = this;
        var model = GGlobal.homemodel;
        var list = GameUnitManager.list;
        for (var i = 0; i < list.length; i++) {
            var role = list[i];
            if (role) {
                if (role instanceof ARPGNpc) {
                    var cfgID = role.cfgID;
                    if (cfgID == HomeModel.NPC_JINKU) {
                        var plug = ChildMoneyTreeProgress.create(role);
                        role.addSinglePlug(plug, ChildMoneyTreeProgress);
                    }
                    role.removePlugBytype(TianGLPlug);
                    if (cfgID == HomeModel.NPC_TGL && !model.isSelfHome) {
                        var plug = TianGLPlug.create(role);
                        role.addSinglePlug(plug, TianGLPlug);
                    }
                    var buildId = HomeModel.getFurnitureLevelByNpcId(cfgID);
                    var lib = void 0;
                    if (buildId) {
                        lib = Config.fdzssj_019[buildId];
                    }
                    //其他随机事件
                    role.removePlugBytype(ChildHomeEventTip);
                    if (GGlobal.homemodel.getRoleEventState(cfgID) && ((model.isSelfHome && model.remaindEventAward) || (!model.isSelfHome && model.helpTime))) {
                        var plug = ChildHomeEventTip.create(role);
                        role.addSinglePlug(plug, ChildHomeEventTip);
                        if (buildId) {
                            plug.setPos(lib.sjwz);
                        }
                    }
                    role.removePlugBytype(ChildFurnitureName);
                    var npcLib = Config.NPC_200[cfgID];
                    if (npcLib.type == Enum_NpcType.JIADING) {
                        if (GGlobal.modelHouseKeeper.jdID) {
                            var lib_1 = Config.jdjins_021[GGlobal.modelHouseKeeper.jdID];
                            role.setBody(lib_1.moxing);
                            role.setName(lib_1.mingzi);
                            role.removePlugBytype(ChildHomeEventTip);
                            var v = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING);
                            if (v && model.isSelfHome) {
                                var plug = ChildHomeEventTip.create(role);
                                role.addSinglePlug(plug, ChildHomeEventTip);
                                plug.setJiaDingState();
                            }
                        }
                    }
                    else if (buildId) {
                        // (role as ARPGNpc).setName(lib.zsmz);
                        role.setBody(lib.moxing);
                        //名字特殊处理
                        var plug = ChildFurnitureName.create(role);
                        plug.setPos(lib.mzwz);
                        plug.setImage(lib.zslx);
                        role.addSinglePlug(plug, ChildFurnitureName);
                        var arr = ["", "cjzb", "zjzb", "gjzb", "hhzb"];
                        if (lib[arr[model.home_type]] != "0") {
                            var posArr = JSON.parse(lib[arr[model.home_type]]);
                            role.setXY(posArr[0][0], posArr[0][1]);
                        }
                    }
                }
            }
        }
    };
    HomeManager.leavelHome = function () {
        GGlobal.layerMgr.closeAllPanel();
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    //府邸特殊家具交互
    HomeManager.interaction = function (npc) {
        var id = npc.cfgID;
        var self = GGlobal.homemodel;
        if (TimeUitl.cool("homemodel", 1000)) {
            var layerMgr = GGlobal.layerMgr;
            if (self.isHomeMonster(id)) {
                id = 1; //强盗默认为这个玩意
            }
            switch (id) {
                case 1:
                    self.CG_House_fight_11127(npc.id);
                    break;
                default://随机事件需要判断点击区域
                    var posx = ModelArpgMap.touchPoint.x; //stageXY
                    var posy = ModelArpgMap.touchPoint.y;
                    var npoint = npc.getGlobalXY();
                    var nx = npoint.x;
                    var ny = npoint.y;
                    var eventid = self.getEventByNpcID(npc.cfgID);
                    if (npc.cfgID == HomeModel.NPC_JINKU) {
                        var clz = npc.getPlugBytype(ChildMoneyTreeProgress);
                        if (clz.displayObject.hitTestPoint(posx, posy)) {
                            if (GGlobal.homemodel.isCanCollect) {
                                self.CG_House_harvestMoney_11113();
                            }
                            else {
                                ViewCommonWarn.text("暂无府邸币可收集");
                            }
                            return;
                        }
                    }
                    if (((self.isSelfHome && self.remaindEventAward > 0) || (!self.isSelfHome && self.helpTime > 0))
                        && eventid) {
                        layerMgr.open(UIConst.HOME_EVENT_UI, eventid);
                    }
                    else {
                        switch (npc.cfgID) {
                            case HomeModel.JIADING:
                                if (self.isSelfHome) {
                                    layerMgr.open(UIConst.HOME_JIADING);
                                }
                                break;
                            case HomeModel.NPC_TGL:
                                layerMgr.open(UIConst.HOME_TIANGONG_UI);
                                break;
                            case HomeModel.NPC_MONEYTREE:
                                layerMgr.open(UIConst.HOME_MONEYTREE_UI);
                                break;
                            case HomeModel.NPC_JINKU:
                                layerMgr.open(UIConst.HOME_GOD_UI);
                                break;
                            default:
                                layerMgr.open(UIConst.HOME_JIAJU_UI, id);
                                break;
                        }
                    }
                    break;
            }
        }
    };
    return HomeManager;
}(BaseARPGManager));
__reflect(HomeManager.prototype, "HomeManager");
