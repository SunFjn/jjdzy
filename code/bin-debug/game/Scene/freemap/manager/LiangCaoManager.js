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
var LiangCaoManager = (function (_super) {
    __extends(LiangCaoManager, _super);
    function LiangCaoManager() {
        return _super.call(this) || this;
    }
    LiangCaoManager.getInstance = function () {
        return LiangCaoManager.instance || (LiangCaoManager.instance = new LiangCaoManager());
    };
    LiangCaoManager.prototype.binder = function () {
        GGlobal.createPack("liangcao");
        var fc = fairygui.UIObjectFactory.setPackageItemExtension;
        fc(LiangCaoPersonItem.URL, LiangCaoPersonItem);
        fc(LiangCaoSceneTopPanel.URL, LiangCaoSceneTopPanel);
        fc(LiangCaoSceneBottomPanel.URL, LiangCaoSceneBottomPanel);
        fc(LiangCaoHead.URL, LiangCaoHead);
        fc(LiangCaoScoreBar.URL, LiangCaoScoreBar);
        fc(LiangCaoScoreItem.URL, LiangCaoScoreItem);
        fc(LiangCaoServerItem.URL, LiangCaoServerItem);
    };
    LiangCaoManager.prototype.enter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, modelMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.enter.call(this);
                        return [4 /*yield*/, RES.getResAsync("liangcao")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("liangcao_atlas0")];
                    case 2:
                        _a.sent();
                        this.binder();
                        self = LiangCaoManager;
                        modelMap = ModelArpgMap.getInstance();
                        LiangCaoSceneTopPanel.createInstance().cShow();
                        LiangCaoSceneBottomPanel.createInstance().cShow();
                        ViewMainBottomUI.instance.setExitVis(false);
                        modelMap.listen(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, self.updateScenePlayerState, self);
                        modelMap.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScenePlayerState, self);
                        modelMap.listen(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, self.deleteRoleState, self);
                        modelMap.listen(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, self.deleteRoleState, self);
                        GGlobal.control.listen(LiangCaoManager.UPDATE_SCENE_DATA, self.updateScene, self);
                        GGlobal.socketMgr.registerReconnectHD("LiangCaoManager", Handler.create(this, this.onSocketClose));
                        return [2 /*return*/];
                }
            });
        });
    };
    LiangCaoManager.prototype.exite = function () {
        _super.prototype.exite.call(this);
        var self = LiangCaoManager;
        var modelMap = ModelArpgMap.getInstance();
        LiangCaoSceneTopPanel.createInstance().cHide();
        LiangCaoSceneBottomPanel.createInstance().cHide();
        GGlobal.socketMgr.removeReconnectHD("LiangCaoManager");
        GGlobal.control.remove(LiangCaoManager.UPDATE_SCENE_DATA, self.updateScene, self);
        modelMap.remove(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, self.updateScenePlayerState, self);
        modelMap.remove(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScenePlayerState, self);
        modelMap.remove(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, self.deleteRoleState, self);
        modelMap.remove(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, self.deleteRoleState, self);
        self.playerStateDic = {};
    };
    LiangCaoManager.prototype.onSocketClose = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        console.log("粮草 断开中央服");
    };
    LiangCaoManager.updateScenePlayerState = function () {
        var dic = LiangCaoManager.playerStateDic;
        for (var i in dic) {
            var data = dic[i];
            var state = data.state;
            var cd = data.cd;
            var role = GameUnitManager.findUnitByID(i);
            if (role) {
                //先移除状态显示插件
                role.removePlugBytype(ArpgRoleStatePlug);
                switch (state) {
                    case 0:
                        break;
                    case 1:
                        var plug = ArpgRoleStatePlug.create(role);
                        role.addSinglePlug(plug, ArpgRoleStatePlug);
                        plug.setState(3);
                        break;
                    case 2:
                    case 3:
                    case 4:
                        var plug2 = ArpgRoleStatePlug.create(role);
                        role.addSinglePlug(plug2, ArpgRoleStatePlug);
                        plug2.setState(1);
                        break;
                    case 5:
                        var plug1 = ArpgRoleStatePlug.create(role);
                        role.addSinglePlug(plug1, ArpgRoleStatePlug);
                        plug1.setState(2);
                        var isMine = Model_player.isMineID(i);
                        if (isMine) {
                            RevivePanel.showView(UIConst.LIANGCAO);
                        }
                        break;
                }
                delete LiangCaoManager.playerStateDic[i];
            }
        }
    };
    LiangCaoManager.updateScene = function (data) {
        if (data > 0) {
            LiangCaoManager.deleteRoleState(data);
        }
        else {
            LiangCaoManager.updateScenePlayerState();
        }
    };
    LiangCaoManager.deleteRoleState = function (id) {
        delete LiangCaoManager.playerStateDic[id];
    };
    LiangCaoManager.UPDATE_SCENE_DATA = "LiangCaoManagerUPDATE_SCENE";
    /**后端无法实现状态伴随。前端帮做吧*/
    LiangCaoManager.playerStateDic = {};
    return LiangCaoManager;
}(BaseARPGManager));
__reflect(LiangCaoManager.prototype, "LiangCaoManager");
