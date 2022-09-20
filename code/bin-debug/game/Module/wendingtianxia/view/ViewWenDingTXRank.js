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
var ViewWenDingTXRank = (function (_super) {
    __extends(ViewWenDingTXRank, _super);
    function ViewWenDingTXRank() {
        var _this = _super.call(this) || this;
        _this._tabArr = [];
        _this.loadRes();
        return _this;
    }
    ViewWenDingTXRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRank"));
    };
    ViewWenDingTXRank.prototype.childrenCreated = function () {
        GGlobal.createPack("wendingTX");
        var s = this;
        s.view = fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRank").asCom;
        s.contentPane = s.view;
        s.c1 = s.view.getController("c1");
        s.n1 = (s.view.getChild("n1"));
        s.n2 = (s.view.getChild("n2"));
        s.n3 = (s.view.getChild("n3"));
        s.n4 = (s.view.getChild("n4"));
        s.n5 = (s.view.getChild("n5"));
        s.n6 = (s.view.getChild("n6"));
        s.n7 = (s.view.getChild("n7"));
        s.n8 = (s.view.getChild("n8"));
        s._tabArr = [s.n2, s.n3, s.n4, s.n7];
        _super.prototype.childrenCreated.call(this);
    };
    ViewWenDingTXRank.prototype.onPage = function () {
        if (this._temp) {
            this._temp.close();
            this._temp = null;
        }
        var idx = this.c1.selectedIndex;
        switch (idx) {
            case 0:
                this._temp = this.n1;
                break;
            case 1:
                this._temp = this.n5;
                break;
            case 2:
                this._temp = this.n6;
                break;
            case 3:
                this._temp = this.n7;
                break;
        }
        this._temp.open();
    };
    ViewWenDingTXRank.prototype.checkNotice = function () {
        this.n4.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1);
        this.n3.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2);
        this.n8.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
    };
    ViewWenDingTXRank.prototype.onShown = function () {
        var s = this;
        s._tabArr[s.c1.selectedIndex].selected = false;
        s.c1.selectedIndex = 0;
        s._tabArr[s.c1.selectedIndex].selected = true;
        this.n1.open();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.onPage, s);
        s.checkNotice();
        GGlobal.reddot.listen(UIConst.WENDINGTX, s.checkNotice, s);
    };
    ViewWenDingTXRank.prototype.onHide = function () {
        var s = this;
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.onPage, s);
        GGlobal.reddot.remove(UIConst.WENDINGTX, s.checkNotice, s);
        GGlobal.layerMgr.close(UIConst.WENDINGTX_RANK);
    };
    ViewWenDingTXRank.URL = "ui://gxs8kn67fl2h4";
    return ViewWenDingTXRank;
}(UIModalPanel));
__reflect(ViewWenDingTXRank.prototype, "ViewWenDingTXRank");
