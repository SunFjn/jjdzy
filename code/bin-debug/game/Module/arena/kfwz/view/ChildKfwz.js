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
/**
 * 跨服王者主界面
 * @author: lujiahao
 * @date: 2019-12-04 18:05:15
 */
var ChildKfwz = (function (_super) {
    __extends(ChildKfwz, _super);
    function ChildKfwz() {
        var _this = _super.call(this) || this;
        _this._gradeGridList = [];
        _this._teamItemList = [];
        _this._teamItemBgList = [];
        _this._boxItemPool = [];
        _this._boxItemList = [];
        return _this;
    }
    ChildKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ChildKfwz"));
    };
    ChildKfwz.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        var t_model = GGlobal.modelKfwz;
        for (var i = 0; i < 10; i++) {
            var t_grid = t.getChild("gradeGrid" + i);
            t._gradeGridList.push(t_grid);
        }
        var t_dragRect = t.teamListBg.localToGlobalRect(0, 0, t.teamListBg.width, t.teamListBg.height);
        for (var i = 0; i < 3; i++) {
            var t_teamItem = t.getChild("teamItem" + i);
            t._teamItemList.push(t_teamItem);
            t_teamItem.setPos(i);
            t_teamItem.dragBounds = t_dragRect;
            var t_itemBg = t.getChild("teamItemBg" + i);
            t._teamItemBgList.push(t_itemBg);
            t_itemBg.setPos(i);
        }
        t.teamListList.itemRenderer = t.onItemRender;
        t.teamListList.callbackThisObj = t;
        t.btnAuto.title = "<font color='#00ff00'>" + t_model.autoStartTime + "\u79D2</font>\u540E\u81EA\u52A8\u5339\u914D";
    };
    ChildKfwz.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_dataList = t_model.teamList;
        if (t_dataList) {
            pItem.setData(t_dataList[pIndex]);
        }
    };
    ChildKfwz.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildKfwz.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        var t_model = GGlobal.modelKfwz;
        if (t_model.actState) {
            t_model.cmdSendEnter();
        }
        else {
            t_model.cmdSendExit();
        }
        t_model.CG_CrossTeamKing_openUi_10821();
        SimpleTimer.ins().addTimer(t.onTimerCallback, t, 30000, 0, null, true);
        t.refreshData();
        t.btnAuto.selected = t_model.autoStartFlag;
    };
    ChildKfwz.prototype.closePanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.registerEvent(false);
        t.clearAllBoxItemList();
        if (!t_model.isInBattle) {
            t_model.cmdSendExit();
        }
        SimpleTimer.ins().removeTimer(t.onDateUpdate, t);
        SimpleTimer.ins().removeTimer(t.onTimerCallback, t);
        SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
    };
    ChildKfwz.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildKfwz.prototype.onTimerCallback = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t_model.actState) {
            t_model.CG_CrossTeamKing_openUi_10821();
        }
    };
    ChildKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.refreshBoxItemList();
        t.pb.max = t_model.maxTargetCount;
        t.pb.value = t_model.winCount;
        var t_voGrade = t_model.getGradeVoByGrade(t_model.myGrade);
        var t_lastGrade = t_model.myGrade - 1;
        var t_lastVo;
        if (t_lastGrade > 0) {
            t_lastVo = t_model.getGradeVoByGrade(t_lastGrade);
        }
        var t_curScore = t_model.myScore;
        var t_maxScore = t_voGrade.cfg.jf;
        if (t_maxScore == 0) {
            //最高段位
            for (var _i = 0, _a = t._gradeGridList; _i < _a.length; _i++) {
                var v = _a[_i];
                v.grayed = false;
            }
            t.tfScore.text = "\u6700\u9AD8\u6BB5\u4F4D";
        }
        else {
            var t_maxValue = t_maxScore;
            var t_curValue = t_curScore;
            if (t_lastVo) {
                t_maxValue = t_maxScore - t_lastVo.cfg.jf;
                t_curValue = t_curScore - t_lastVo.cfg.jf;
            }
            var t_gridCount = ~~(t_curValue * 10 / t_maxValue);
            for (var i = 0; i < t._gradeGridList.length; i++) {
                var t_grid = t._gradeGridList[i];
                if (i < t_gridCount) {
                    t_grid.grayed = false;
                }
                else {
                    t_grid.grayed = true;
                }
            }
            t.tfScore.text = t_curScore + "/" + t_maxScore;
        }
        t.gradeCtrl.selectedIndex = t_model.myGrade - 1;
        t.tfSScore.text = "\u672C\u8D5B\u5B63\u79EF\u5206\uFF1A" + t_model.myScore;
        var t_strRank = "10+";
        if (t_model.myRank > 0) {
            t_strRank = t_model.myRank + "";
        }
        t.tfSRank.text = "\u672C\u8D5B\u5B63\u6392\u540D\uFF1A" + t_strRank;
        // let t_strGrade = t_voGrade.cfg.name;
        var t_strGrade = "跨服王者";
        var t_rangeId = t_model.getRangeId();
        var t_rangeCfg = Config.kfwzqj_770[t_rangeId];
        if (t_rangeCfg)
            t_strGrade += "\uFF08" + t_rangeCfg.ms + "\uFF09";
        t.tfGrade.text = t_strGrade;
        if (t_model.combo > 1) {
            t.tfCombo.text = t_model.combo + "";
            t.groupCombo.visible = true;
        }
        else {
            t.tfCombo.text = "";
            t.groupCombo.visible = false;
        }
        t.refreshRemainCount();
        t.refreshTeamData();
        t.refreshTeamList();
        t.refreshDate();
    };
    ChildKfwz.prototype.refreshTeamList = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t_model.actState && !t_model.isInTeam) {
            t.teamListList.visible = true;
            t.teamListList.numItems = t_model.teamList.length;
            if (t_model.teamList.length > 0)
                t.tfSate.text = "";
            else
                t.tfSate.text = "暂无队伍";
        }
        else {
            t.teamListList.visible = false;
            t.teamListList.numItems = 0;
        }
    };
    ChildKfwz.prototype.refreshRemainCount = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.tfRemain.text = "\u5269\u4F59\u6311\u6218\u6B21\u6570\uFF1A" + t_model.remain;
    };
    /** 刷新宝箱列表 */
    ChildKfwz.prototype.refreshBoxItemList = function () {
        var t = this;
        t.clearAllBoxItemList();
        var t_model = GGlobal.modelKfwz;
        var t_voList = t_model.getTargetVoList();
        var t_lastRight = 0;
        var t_half = t.tempBoxItem.width / 2;
        var t_maxValue = t_model.maxTargetCount;
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            var t_boxItem = t.getBoxItemFromPool();
            t_boxItem.setData(v);
            t.addChild(t_boxItem);
            t_boxItem.y = t.tempBoxItem.y;
            t_boxItem.x = t.pb.x + (v.cfg.cs / t_maxValue) * t.pb.width - t_half;
            if (t_boxItem.x - t_half < t_lastRight) {
                t_boxItem.x = t_lastRight + t_half + 3;
            }
            t_lastRight = t_boxItem.x + t_half;
            t._boxItemList.push(t_boxItem);
        }
    };
    ChildKfwz.prototype.clearAllBoxItemList = function () {
        var t = this;
        for (var i = t._boxItemList.length - 1; i >= 0; i--) {
            t.recycleBoxItem(t._boxItemList[i]);
            t._boxItemList.splice(i, 1);
        }
    };
    ChildKfwz.prototype.getBoxItemFromPool = function () {
        var t_vo = this._boxItemPool.pop();
        if (!t_vo) {
            t_vo = KfwzBoxItem.createInstance();
        }
        return t_vo;
    };
    ChildKfwz.prototype.recycleBoxItem = function (pItem) {
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        this._boxItemPool.push(pItem);
    };
    ChildKfwz.prototype.refreshDate = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t_model.actState == 0) {
            SimpleTimer.ins().addTimer(t.onDateUpdate, t, 500, 0, null, true);
        }
        else {
            SimpleTimer.ins().removeTimer(t.onDateUpdate, t);
            t.tfDate.text = "";
        }
    };
    ChildKfwz.prototype.onDateUpdate = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_isInAct = false;
        var t_nextOpenTs = 0;
        var t_firstHours = -1;
        var t_firstMin = -1;
        var t_firstTs = 0;
        var t_serverTs = Model_GlobalMsg.getServerTime();
        var t_serverDate = new Date();
        t_serverDate.setTime(t_serverTs);
        for (var _i = 0, _a = t_model.openTsList; _i < _a.length; _i++) {
            var v = _a[_i];
            var t_openDate = new Date(t_serverDate.getFullYear(), t_serverDate.getMonth(), t_serverDate.getDate());
            t_openDate.setHours(v[0]);
            t_openDate.setMinutes(v[1]);
            if (t_firstHours == -1)
                t_firstHours = v[0];
            if (t_firstMin == -1)
                t_firstMin = v[1];
            var t_openTs = t_openDate.getTime();
            var t_endTs = t_openTs + EnumKfwz.ACT_LAST_TIME * 1000;
            if (t_firstTs == 0)
                t_firstTs = t_openTs;
            if (t_serverTs < t_openTs) {
                t_nextOpenTs = t_openTs;
                break;
            }
            else if (t_serverTs >= t_openTs && t_serverTs < t_endTs) {
                t_isInAct = true;
                break;
            }
        }
        if (t_isInAct) {
            //活动开启中
            t.tfDate.text = "";
        }
        else {
            //活动未开启
            if (t_nextOpenTs) {
            }
            else {
                //没有下次开启时间，则当天的开启时间加一天
                t_nextOpenTs = t_firstTs + 60 * 60 * 24 * 1000;
            }
            var t_remainS = (t_nextOpenTs - t_serverTs) / 1000 >> 0;
            var t_dateStr = "";
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "跨服王者将在hh小时uu分ss秒后开启");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "跨服王者将在dd天hh小时后开启");
                }
            }
            t.tfDate.text = t_dateStr;
        }
    };
    ChildKfwz.prototype.refreshTeamData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_voList = t_model.teamVo.memberList;
        for (var i = 0; i < t._teamItemList.length; i++) {
            var t_item = t._teamItemList[i];
            t_item.setData(t_voList[i]);
            var t_bg = t._teamItemBgList[i];
            t_bg.setData(t_voList[i]);
        }
        t.btnCreate.visible = false;
        t.btnFast.visible = false;
        t.btnInvite.visible = false;
        t.btnExit.visible = false;
        t.btnStart.visible = false;
        t.tfTips.visible = false;
        t.btnAuto.visible = true;
        t.tfAuto.visible = false;
        if (t_model.actState == 1) {
            //活动已开启
            if (t_model.isInTeam) {
                t.tfSate.text = "";
                if (t_model.areYouLeader) {
                    t.btnInvite.visible = true;
                    t.btnStart.visible = true;
                    t.tfTips.visible = true;
                    // t.btnAuto.visible = true;
                }
                else {
                    t.btnExit.visible = true;
                    t.btnAuto.visible = false;
                }
            }
            else {
                t.tfSate.text = "暂无队伍";
                t.btnCreate.visible = true;
                // t.btnFast.visible = true;
            }
        }
        else {
            //活动尚未开启
            t.tfSate.text = "\u6D3B\u52A8\u5C1A\u672A\u5F00\u542F";
        }
        SimpleTimer.ins().addTimer(this.onAutoStartTimer, this, 500, 0, null, true);
    };
    ChildKfwz.prototype.onAutoStartTimer = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_remain = t_model.teamVo.remainAutoEnterSeconds;
        if (t_model.isInTeam
            && t_model.areYouLeader
            && (t_model.autoStartFlag)
            && t_model.teamVo.canEnter
            && t_remain > 0) {
            t.tfAuto.visible = true;
            t.tfAuto.text = t_remain + "s\u540E\u81EA\u52A8\u5339\u914D";
            if (t_remain <= 0) {
                SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
            }
        }
        else {
            t.tfAuto.visible = false;
            SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
        }
    };
    ChildKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_ACT_STATE_CHANGE, t.onActChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_TEAM_DATA_UPDATE, t.onTeamDataUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_TEAM_LIST_UPDATE, t.onTeamListUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_AUTO_START_TIMER_CHANGE, t.onAutoStartTimerChange, t);
        EventUtil.register(pFlag, t.btnLog, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRank, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnInvite, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnFast, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnStart, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCreate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAuto, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnChat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildKfwz.prototype.onAutoStartTimerChange = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.btnAuto.selected = t_model.autoStartFlag;
        SimpleTimer.ins().addTimer(t.onAutoStartTimer, t, 500, 0, null, true);
    };
    ChildKfwz.prototype.onActChange = function () {
        var t = this;
        t.refreshData();
    };
    ChildKfwz.prototype.onTeamListUpdate = function () {
        var t = this;
        t.refreshTeamList();
    };
    ChildKfwz.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildKfwz.prototype.onTeamDataUpdate = function () {
        var t = this;
        t.refreshTeamData();
    };
    ChildKfwz.prototype.onBtnClick = function (e) {
        var _this = this;
        var t = this;
        var t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnLog:
                GGlobal.layerMgr.open(UIConst.KFWZ_LOG);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.KFWZ_GRADE_REWARD);
                break;
            case t.btnRank:
                GGlobal.layerMgr.open(UIConst.KFWZ_RANK);
                break;
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.KFWZ);
                break;
            case t.btnInvite:
                t_model.CG_CrossTeamKing_invitation_10825();
                break;
            case t.btnFast:
                break;
            case t.btnStart:
                t_model.CG_CrossTeamKing_marryBattle_10839();
                break;
            case t.btnCreate:
                t_model.CG_CrossTeamKing_createteam_10823();
                break;
            case t.btnExit:
                t_model.CG_CrossTeamKing_exitteam_10835();
                break;
            case t.btnAdd:
                var t_canBuy_1 = t_model.vipBuyLimit - t_model.buyCount;
                if (t_canBuy_1 > 0) {
                    // let t_need = 0;
                    // if (t_model.vipBuyNeedConsume)
                    //     t_need = t_model.vipBuyNeedConsume.count;
                    // if (t_need > 0)
                    //     ViewAlertBuy.show(t_need, t_canBuy, t_canBuy, "", Handler.create(t, t.onBuyCountOk));
                    ViewAlertBuy2.show(1, t_canBuy_1, Enum_Attr.yuanBao, function (pData) {
                        pData.desStr = "\u4ECA\u65E5\u5269\u4F59\u8D2D\u4E70\u6B21\u6570\uFF1A<font color='" + Color.GREENSTR + "'>" + t_canBuy_1 + "</font>";
                        var t_total = t_model.getBuyCountNeedByCount(pData.value);
                        pData.totalPrice = t_total;
                    }, function (pData) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            t.onBuyCountOk(pData.value);
                            return [2 /*return*/, true];
                        });
                    }); }, t);
                }
                else {
                    ViewCommonWarn.text("已达购买上限，提升VIP可增加更多购买次数");
                }
                break;
            case t.btnChat:
                if (Model_GlobalMsg.kaifuDay > 7)
                    GGlobal.layerMgr.open(UIConst.CHAT);
                else
                    GGlobal.layerMgr.open(UIConst.CHAT, 1);
                break;
            case t.btnAuto:
                t_model.setAutoStartFlag(t.btnAuto.selected);
                break;
        }
    };
    ChildKfwz.prototype.onBuyCountOk = function (pCount) {
        if (pCount <= 0)
            return;
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_need = t_model.getBuyCountNeedByCount(pCount);
        if (!FastAPI.checkItemEnough(Enum_Attr.yuanBao, t_need, true))
            return;
        t_model.CG_CrossTeamKing_buyCount_10861(pCount);
    };
    //>>>>end
    ChildKfwz.URL = "ui://me1skowln9yf6d";
    return ChildKfwz;
}(fairygui.GComponent));
__reflect(ChildKfwz.prototype, "ChildKfwz", ["IPanel"]);
