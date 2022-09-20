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
var LiangCaoSceneBottomPanel = (function (_super) {
    __extends(LiangCaoSceneBottomPanel, _super);
    function LiangCaoSceneBottomPanel() {
        var _this = _super.call(this) || this;
        _this.udpate = function () {
            var self = _this;
            self.btnRank.checkNotice = GGlobal.reddot.checkCondition(UIConst.LIANGCAO_RANK);
        };
        _this.cickDescriptHD = function () {
            GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.LIANGCAO);
        };
        _this.cickRankHD = function () {
            GGlobal.layerMgr.open(UIConst.LIANGCAO_RANK);
        };
        _this.cickExiteHD = function () {
            ViewAlert.show("退出后需要等待30秒才可以重新进入\n是否退出?", Handler.create(_this, function () {
                GGlobal.modelLiangCao.CG_BattleGoods_getreward_10127();
            }), ViewAlert.OKANDCANCEL);
        };
        _this.evntFun = function (v) {
            var self = _this;
            var event = EventUtil.register;
            event(v, self.btnRank, EventUtil.TOUCH, self.cickRankHD, self);
            event(v, self.n4, EventUtil.TOUCH, self.cickExiteHD, self);
            event(v, self.n2, EventUtil.LINK, self.cickDescriptHD, self);
        };
        _this.cShow = function () {
            var self = _this;
            var pat = GGlobal.layerMgr.UI_MainBottom;
            pat.addChild(self);
            self.setXY((fairygui.GRoot.inst.width - self.width) / 2, fairygui.GRoot.inst.height - self.height);
            self.evntFun(1);
            self.udpate();
            GGlobal.reddot.listen(UIConst.LIANGCAO_RANK, self.udpate, self);
        };
        _this.cHide = function () {
            var self = _this;
            self.evntFun(0);
            self.removeFromParent();
            GGlobal.reddot.remove(UIConst.LIANGCAO_RANK, self.udpate, self);
        };
        return _this;
    }
    LiangCaoSceneBottomPanel.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("liangcao", "LiangCaoSceneBottomPanel"));
        }
        return this._inst;
    };
    LiangCaoSceneBottomPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.n2.text = HtmlUtil.createLink("玩法说明");
    };
    LiangCaoSceneBottomPanel.URL = "ui://mbcu0qc0hd206";
    return LiangCaoSceneBottomPanel;
}(fairygui.GComponent));
__reflect(LiangCaoSceneBottomPanel.prototype, "LiangCaoSceneBottomPanel");
