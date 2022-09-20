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
var ChildCrossTeam = (function (_super) {
    __extends(ChildCrossTeam, _super);
    function ChildCrossTeam() {
        var _this = _super.call(this) || this;
        _this.roleItemArr = [];
        _this.checkTime01 = 51;
        _this.robotTime = -1;
        _this.checkTime00 = 6;
        _this.checkTime0 = 11;
        _this.isFirst = true;
        _this.isInit = false;
        return _this;
    }
    ChildCrossTeam.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossTeam"));
    };
    ChildCrossTeam.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list0.callbackThisObj = s;
        s.list0.itemRenderer = s.fubenRenderFun;
        s.check0.selected = true;
        s.list1.callbackThisObj = s;
        s.list1.itemRenderer = s.teamRenderFun;
        s.roleItemArr = [s.roleItem0, s.roleItem1, s.roleItem2];
        GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
        CommonManager.listPageChange("ChildCrossTeam", s.list0, s.pageLeft, s.pageRight, 3, Handler.create(s, s.setPageNotice));
    };
    ChildCrossTeam.prototype.initView = function () {
    };
    ChildCrossTeam.prototype.chatHandler = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = UIConst.CROSS_TEAM + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        egret.localStorage.setItem(key, "crossTeam_Chat_Notice");
        this.chatBt.checkNotice = false;
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.layerMgr.open(UIConst.CHAT);
        }
        else {
            GGlobal.layerMgr.open(UIConst.CHAT, 1);
        }
    };
    ChildCrossTeam.prototype.setPageNotice = function (_curpage) {
    };
    ChildCrossTeam.prototype.checkHandler = function (event) {
        var s = this;
        var check = event.target;
        switch (check.id) {
            case s.check0.id:
                if (s.check0.selected) {
                    s.checkTime0 = 11;
                    if (!Timer.instance.has(s.checkTimeHandler0, s)) {
                        Timer.instance.listen(s.checkTimeHandler0, s, 1000);
                    }
                }
                else {
                    if (Timer.instance.has(s.checkTimeHandler0, s)) {
                        Timer.instance.remove(s.checkTimeHandler0, s);
                    }
                }
                break;
            case s.check00.id:
                if (s.check00.selected && Model_CrossTeam.myTeamArr.length >= 3) {
                    s.checkTime00 = 6;
                    if (!Timer.instance.has(s.checkTimeHandler00, s)) {
                        Timer.instance.listen(s.checkTimeHandler00, s, 1000);
                    }
                }
                else {
                    if (Timer.instance.has(s.checkTimeHandler00, s)) {
                        Timer.instance.remove(s.checkTimeHandler00, s);
                    }
                }
                break;
            case s.check01.id:
                if (s.check01.selected) {
                    s.checkTime01 = 51;
                    if (!Timer.instance.has(s.checkTimeHandler01, s)) {
                        Timer.instance.listen(s.checkTimeHandler01, s, 1000);
                    }
                }
                else {
                    if (Timer.instance.has(s.checkTimeHandler01, s)) {
                        Timer.instance.remove(s.checkTimeHandler01, s);
                    }
                }
                break;
            case s.check02.id:
                if (s.check02.selected) {
                    GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
                }
                else {
                    GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(1);
                }
                break;
        }
    };
    ChildCrossTeam.prototype.checkTimeHandler01 = function () {
        var s = this;
        s.checkTime01--;
        s.check01.text = s.checkTime01 + "秒后开始挑战";
        if (s.checkTime01 <= 0) {
            GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
            Timer.instance.remove(s.checkTimeHandler00, s);
            Timer.instance.remove(s.checkTimeHandler01, s);
        }
    };
    ChildCrossTeam.prototype.sendJoinRobot = function () {
        if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
            this.robotTime++;
            if (this.robotTime % 5 == 0 && this.robotTime != 0) {
                GGlobal.modelCrossTeam.CG_TEAM_JOINROBOT();
            }
        }
    };
    ChildCrossTeam.prototype.checkTimeHandler00 = function () {
        var s = this;
        s.checkTime00--;
        s.check00.text = "满员自动开始(" + s.checkTime00 + "s)";
        if (s.checkTime00 <= 0) {
            GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
            Timer.instance.remove(s.checkTimeHandler00, s);
            Timer.instance.remove(s.checkTimeHandler01, s);
        }
    };
    ChildCrossTeam.prototype.checkTimeHandler0 = function () {
        var s = this;
        s.checkTime0--;
        s.check0.text = s.checkTime0 + "秒后自动加入";
        if (s.checkTime0 <= 0 && Model_CrossTeam.teamId <= 0) {
            Timer.instance.remove(s.checkTimeHandler0, s);
            GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(2, s.curSelFB.vo.id);
        }
    };
    ChildCrossTeam.prototype.battleHandler = function () {
        var s = this;
        Timer.instance.remove(s.checkTimeHandler00, s);
        Timer.instance.remove(s.checkTimeHandler01, s);
        Timer.instance.remove(s.sendJoinRobot, s);
        GGlobal.modelCrossTeam.CG_TEAM_START_BATTLE();
    };
    ChildCrossTeam.prototype.openPanel = function () {
        var s = this;
        s.registerEvent(true);
        s.isInit = true;
        if (Model_CrossTeam.surNum <= 0) {
            s.check0.selected = false;
        }
        if (Model_CrossTeam.surNum <= 0) {
            s.check02.selected = false;
            GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(1);
        }
        if (Model_CrossTeam.surNum > 0 /**&& Model_CrossTeam.isZero*/) {
            s.check02.selected = true;
            GGlobal.modelCrossTeam.CG_TEAM_USE_SHOUYI(0);
            Model_CrossTeam.isZero = false;
        }
        s.checkTime0 = 11;
        s.checkTime01 = 51;
        s.checkTime00 = 6;
        s.check00.text = "满员自动开始";
        IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "crossTeam.png");
        if (Model_CrossTeam.teamId <= 0) {
            var value_1 = Math.floor(Model_player.voMine.zsID / 1000);
            Model_CrossTeam.fubenID = value_1;
            if (s.isFirst) {
                s.isFirst = false;
                GGlobal.modelCrossTeam.CG_TEAM_LOGINCROSSSEVER(value_1, 0);
            }
            else {
                GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(value_1);
            }
        }
        s.updateFubenData();
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = UIConst.CROSS_TEAM + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        s.chatBt.checkNotice = !value;
    };
    ChildCrossTeam.prototype.enterScene = function () {
        var s = this;
        s.checkTime01 = 51;
        s.checkTime00 = 6;
        s.checkTime0 = 11;
    };
    ChildCrossTeam.prototype.closePanel = function () {
        var s = this;
        s.registerEvent(false);
        s.isFirst = true;
        if (s.curSelFB)
            s.curSelFB.selected = false;
        s.curSelFB = null;
        s.list0.numItems = 0;
        Timer.instance.remove(s.checkTimeHandler0, s);
        Timer.instance.remove(s.checkTimeHandler00, s);
        Timer.instance.remove(s.checkTimeHandler01, s);
        Timer.instance.remove(s.sendJoinRobot, s);
        s.isInit = false;
        IconUtil.setImg(s.backImg, null);
        if (GGlobal.sceneType != SceneCtrl.CROSS_TEAM && GGlobal.sceneType != SceneCtrl.CROSS_SJMJ) {
            ChildCrossTeam.hide();
        }
    };
    ChildCrossTeam.hide = function () {
        Model_CrossTeam.teamId = 0;
        Model_CrossTeam.myTeamArr.length = 0;
        Model_CrossTeam.teamArr.length = 0;
        GGlobal.modelCrossTeam.CG_TEAM_LEAVETEAM();
        WorldSocketMgr.instance.close();
    };
    /**快速加入 */
    ChildCrossTeam.prototype.joinHandler = function () {
        var s = this;
        if (Timer.instance.has(s.checkTimeHandler0, s)) {
            Timer.instance.remove(s.checkTimeHandler0, s);
        }
        GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(2, s.curSelFB.vo.id);
    };
    /**创建房间 */
    ChildCrossTeam.prototype.roomHandler = function () {
        var s = this;
        if (Timer.instance.has(s.checkTimeHandler0, s)) {
            Timer.instance.remove(s.checkTimeHandler0, s);
        }
        GGlobal.modelCrossTeam.CG_TEAM_JOINORCREATE(1, s.curSelFB.vo.id);
    };
    ChildCrossTeam.prototype.teamRenderFun = function (index, obj) {
        var arr = Model_CrossTeam.teamArr[index];
        obj.setVo(arr[0], arr[1], arr[2], arr[3], arr[4]);
    };
    ChildCrossTeam.prototype.listHandle = function (event) {
        var item = event.itemObject;
        if (item.vo.id == Model_CrossTeam.fubenID)
            return;
        if (Math.floor(Model_player.voMine.zsID / 1000) < item.vo.id) {
            this.curSelFB.selected = true;
            item.selected = false;
            ViewCommonWarn.text("副本尚未开启");
            return;
        }
        else if (Model_CrossTeam.teamId > 0) {
            this.curSelFB.selected = true;
            item.selected = false;
            ViewCommonWarn.text("退出组队才能更换副本");
            return;
        }
        item.selected = true;
        this.curSelFB = item;
        Model_CrossTeam.fubenID = item.vo.id;
        GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(item.vo.id);
    };
    ChildCrossTeam.prototype.pageHandle = function (event) {
    };
    ChildCrossTeam.prototype.fubenRenderFun = function (index, obj) {
        var s = this;
        var cfg = Model_CrossTeam.fuBenData[index];
        obj.setVo(cfg);
        if (cfg.id == Model_CrossTeam.fubenID) {
            if (s.curSelFB)
                s.curSelFB.selected = false;
            obj.selected = true;
            s.curSelFB = obj;
        }
    };
    ChildCrossTeam.prototype.updateFubenData = function () {
        var s = this;
        s.list0.numItems = Model_CrossTeam.fuBenData.length;
        s.list0.scrollToView(Model_CrossTeam.fubenID - 1, false);
        s.updateCurFuBen();
    };
    ChildCrossTeam.prototype.updateCurFuBen = function () {
        var s = this;
        if (GGlobal.sceneType == SceneCtrl.CROSS_TEAM)
            return;
        if (!s.curSelFB)
            return;
        var vo = s.curSelFB.vo;
        s.nameIcon.url = CommonManager.getUrl("crossKing", "fuben" + vo.id);
        s.teamRoleGroup.visible = true;
        s.teamDataGroup.visible = true;
        if (Model_CrossTeam.teamId > 0) {
            s.teamDataGroup.visible = false;
            Model_CrossTeam.isLeader = 0;
            s.checkTime0 = 11;
            for (var i = 0; i < s.roleItemArr.length; i++) {
                var roleItem = s.roleItemArr[i];
                if (i < Model_CrossTeam.myTeamArr.length) {
                    if (i == 0 && Model_CrossTeam.myTeamArr[i][2] == Model_player.voMine.id) {
                        Model_CrossTeam.isLeader = 1;
                    }
                    roleItem.visible = true;
                    roleItem.setVo(Model_CrossTeam.myTeamArr[i]);
                }
                else {
                    roleItem.visible = false;
                }
            }
            s.battleBt.visible = Model_CrossTeam.isLeader == 1;
            s.check00.visible = s.check01.visible = Model_CrossTeam.isLeader == 1;
            if (Model_CrossTeam.isLeader == 1) {
                s.check02.setXY(256, 878);
            }
            else {
                s.check02.setXY(203, 855);
            }
            if (s.check00.selected && Model_CrossTeam.myTeamArr.length >= 3) {
                if (!Timer.instance.has(s.checkTimeHandler00, s)) {
                    Timer.instance.listen(s.checkTimeHandler00, s, 1000);
                }
            }
            else {
                s.checkTime00 = 6;
                if (Timer.instance.has(s.checkTimeHandler00, s)) {
                    Timer.instance.remove(s.checkTimeHandler00, s);
                }
            }
            if (s.check01.selected) {
                if (!Timer.instance.has(s.checkTimeHandler01, s)) {
                    Timer.instance.listen(s.checkTimeHandler01, s, 1000);
                }
            }
            else {
                if (Timer.instance.has(s.checkTimeHandler01, s)) {
                    Timer.instance.remove(s.checkTimeHandler01, s);
                }
            }
            if (Model_CrossTeam.myTeamArr.length < 3) {
                s.robotTime = -1;
                if (!Timer.instance.has(s.sendJoinRobot, s)) {
                    Timer.instance.listen(s.sendJoinRobot, s, 1000);
                }
            }
            else {
                if (Timer.instance.has(s.sendJoinRobot, s)) {
                    Timer.instance.remove(s.sendJoinRobot, s);
                }
            }
            s.check02.text = "使用收益次数" + Model_CrossTeam.surNum + "/" + Config.xtcs_004[4001].num;
        }
        else {
            s.teamRoleGroup.visible = false;
            if (Model_CrossTeam.teamArr.length > 0) {
                s.list1.numItems = Model_CrossTeam.teamArr.length;
                s.list1.visible = true;
                s.promptBt.visible = false;
            }
            else {
                s.promptBt.visible = true;
                s.list1.visible = false;
            }
            if (s.check0.selected) {
                if (!Timer.instance.has(s.checkTimeHandler0, s)) {
                    Timer.instance.listen(s.checkTimeHandler0, s, 1000);
                }
            }
            else {
                if (Timer.instance.has(s.checkTimeHandler0, s)) {
                    Timer.instance.remove(s.checkTimeHandler0, s);
                }
            }
            s.numLb.text = "剩余收益次数" + Model_CrossTeam.surNum + "/" + Config.xtcs_004[4001].num;
            if (Timer.instance.has(s.sendJoinRobot, s)) {
                Timer.instance.remove(s.sendJoinRobot, s);
            }
        }
    };
    ChildCrossTeam.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.list0, fairygui.ItemEvent.CLICK, self.listHandle, self);
        EventUtil.register(pFlag, self.pageLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandle, self);
        EventUtil.register(pFlag, self.pageRight, egret.TouchEvent.TOUCH_TAP, self.pageHandle, self);
        EventUtil.register(pFlag, self.roomBt, egret.TouchEvent.TOUCH_TAP, self.roomHandler, self);
        EventUtil.register(pFlag, self.joinBt, egret.TouchEvent.TOUCH_TAP, self.joinHandler, self);
        EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.battleHandler, self);
        EventUtil.register(pFlag, self.chatBt, egret.TouchEvent.TOUCH_TAP, self.chatHandler, self);
        EventUtil.register(pFlag, self.check0, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
        EventUtil.register(pFlag, self.check00, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
        EventUtil.register(pFlag, self.check01, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
        EventUtil.register(pFlag, self.check02, fairygui.StateChangeEvent.CHANGED, self.checkHandler, self);
        GGlobal.control.register(pFlag, Enum_MsgType.CROSS_TEAM_UPDATE, self.updateFubenData, self);
        GGlobal.control.register(pFlag, Enum_MsgType.CROSS_TEAM_ENTER_SCENE, self.enterScene, self);
    };
    ChildCrossTeam.URL = "ui://yqpfulefoiih30";
    return ChildCrossTeam;
}(fairygui.GComponent));
__reflect(ChildCrossTeam.prototype, "ChildCrossTeam", ["IPanel"]);
