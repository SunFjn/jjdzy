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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var LiangCaoSceneTopPanel = (function (_super) {
    __extends(LiangCaoSceneTopPanel, _super);
    function LiangCaoSceneTopPanel() {
        var _this = _super.call(this) || this;
        _this.maxScore = 0;
        _this.serverRenderHD = function (idx, obj) {
            var item = obj;
            item.setdata(idx, 2, _this.maxScore);
        };
        _this.bossRender = function (idx, obj) {
            var item = obj;
            item.setdata(idx);
        };
        _this.udpate = function () {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            self.maxScore = model.getMaxScore();
            self.serverList.numItems = 3;
            self.n24.numItems = 3;
        };
        _this.timerHD = function () {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            var now = Model_GlobalMsg.getServerTime();
            self.lbRefresh.text = "";
            self.lbScore.text = "我的积分：" + model.myScore;
            if (model.remaindTime > now) {
                self.lbTime.text = "活动时间：" + DateUtil.getHMSBySecond2(((model.remaindTime - now) / 1000) >> 0, "::");
            }
            else {
                self.lbTime.text = "已结束，请主动退出活动";
            }
            var cfgTime = ConfigHelp.getSystemNum(7605);
            var monster = cfgTime - (((now - model.monsterFreshTime) / 1000) >> 0) % cfgTime;
            self.lbRefresh.text = "强盗刷新时间：" + DateUtil.getHMSBySecond2(monster, "::");
        };
        _this.cShow = function () {
            var self = _this;
            var pat = GGlobal.layerMgr.UI_MainBottom;
            pat.addChild(self);
            _this.setXY((fairygui.GRoot.inst.width - _this.width) >> 1, GGlobal.layerMgr.uiAlign);
            self.udpate();
            GGlobal.control.listen(UIConst.LIANGCAO, self.udpate, self);
            Timer.listen(self.timerHD, self, 1000);
        };
        _this.cHide = function () {
            var self = _this;
            self.removeFromParent();
            GGlobal.control.remove(UIConst.LIANGCAO, self.udpate, self);
            Timer.remove(self.timerHD, self);
        };
        return _this;
    }
    LiangCaoSceneTopPanel.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("liangcao", "LiangCaoSceneTopPanel"));
        }
        return this._inst;
    };
    LiangCaoSceneTopPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.serverList.callbackThisObj = self;
        self.serverList.itemRenderer = self.serverRenderHD;
        self.n24.callbackThisObj = self;
        self.n24.itemRenderer = self.bossRender;
    };
    LiangCaoSceneTopPanel.URL = "ui://mbcu0qc0hd200";
    return LiangCaoSceneTopPanel;
}(fairygui.GComponent));
__reflect(LiangCaoSceneTopPanel.prototype, "LiangCaoSceneTopPanel");
