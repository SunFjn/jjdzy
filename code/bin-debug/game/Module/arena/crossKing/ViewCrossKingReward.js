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
var ViewCrossKingReward = (function (_super) {
    __extends(ViewCrossKingReward, _super);
    function ViewCrossKingReward() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossKingReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingReward"));
    };
    ViewCrossKingReward.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingReward").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.tab0 = (this.view.getChild("tab0"));
        this.tab1 = (this.view.getChild("tab1"));
        this.tab2 = (this.view.getChild("tab2"));
        this.viewReward = (this.view.getChild("viewReward"));
        this.viewPoint = (this.view.getChild("viewPoint"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossKingReward.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCrossKingReward.prototype.onShown = function () {
        this.addListen();
        this.selectPage();
        GGlobal.modelCrossKing.CG_OPEN_REWARDS();
    };
    ViewCrossKingReward.prototype.onHide = function () {
        this.removeListen();
        this.viewReward.closeHD();
        this.viewPoint.closeHD();
    };
    ViewCrossKingReward.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.CROSSKING_POINT_REWARD, this.update, this);
    };
    ViewCrossKingReward.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.CROSSKING_POINT_REWARD, this.update, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_REWARD);
    };
    ViewCrossKingReward.prototype.selectPage = function () {
        if (this.c1.selectedIndex == 0) {
            this.viewReward.update(0);
            this.frame.text = this.tab0.text;
        }
        else if (this.c1.selectedIndex == 1) {
            this.viewReward.update(1);
            this.frame.text = this.tab1.text;
        }
        else if (this.c1.selectedIndex == 2) {
            this.viewPoint.update();
            this.frame.text = this.tab2.text;
        }
        this.tab2.checkNotice = Model_CrossKing.checkReward();
    };
    ViewCrossKingReward.prototype.update = function () {
        if (this.c1.selectedIndex == 2) {
            this.selectPage();
        }
    };
    ViewCrossKingReward.URL = "ui://yqpfulefj9wf5";
    return ViewCrossKingReward;
}(UIModalPanel));
__reflect(ViewCrossKingReward.prototype, "ViewCrossKingReward");
