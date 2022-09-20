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
var ViewFengHuoScoreGet = (function (_super) {
    __extends(ViewFengHuoScoreGet, _super);
    function ViewFengHuoScoreGet() {
        var _this = _super.call(this) || this;
        _this._time = 4;
        _this.loadRes();
        return _this;
    }
    ViewFengHuoScoreGet.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoScoreGet"));
    };
    ViewFengHuoScoreGet.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoScoreGet").asCom;
        s.contentPane = s.view;
        s.frame = (s.view.getChild("frame"));
        s.n4 = (s.view.getChild("n4"));
        s.n2 = (s.view.getChild("n2"));
        s.n5 = (s.view.getChild("n5"));
        s.n6 = (s.view.getChild("n6"));
        s.n6.callbackThisObj = s;
        s.n6.itemRenderer = s.listRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewFengHuoScoreGet.prototype.listRender = function (idx, item) {
        var grid = item;
        grid.isShowEff = true;
        grid.tipEnabled = true;
        grid.vo = this._dta[idx];
    };
    ViewFengHuoScoreGet.prototype.timerHD = function () {
        var s = this;
        s._time--;
        s.n2.text = "确定（" + s._time + "s）";
        if (s._time < 1) {
            GGlobal.layerMgr.close2(UIConst.FHLY_SCORE);
        }
    };
    ViewFengHuoScoreGet.prototype.onClickHD = function () {
        GGlobal.layerMgr.close2(UIConst.FHLY_SCORE);
    };
    ViewFengHuoScoreGet.prototype.onShown = function () {
        var s = this;
        s._time = 4;
        var cfg = GGlobal.modelFengHuoLY.getNowAward();
        if (cfg) {
            s._dta = ConfigHelp.makeItemListArr(JSON.parse(cfg[0]));
            s.n5.text = "积分+" + cfg[1];
            s.n6.numItems = s._dta.length;
        }
        s.n2.addClickListener(s.onClickHD, s);
        Timer.instance.listen(s.timerHD, s, 1000);
    };
    ViewFengHuoScoreGet.prototype.onHide = function () {
        var s = this;
        s.n6.numItems = 0;
        s.n2.removeClickListener(s.onClickHD, s);
        Timer.instance.remove(s.timerHD, s);
        GGlobal.layerMgr.close(UIConst.FHLY_SCORE);
    };
    ViewFengHuoScoreGet.URL = "ui://edvdots4lkikw1z";
    return ViewFengHuoScoreGet;
}(UIModalPanel));
__reflect(ViewFengHuoScoreGet.prototype, "ViewFengHuoScoreGet");
