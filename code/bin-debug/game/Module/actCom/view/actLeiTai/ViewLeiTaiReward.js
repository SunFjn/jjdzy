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
var ViewLeiTaiReward = (function (_super) {
    __extends(ViewLeiTaiReward, _super);
    function ViewLeiTaiReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewLeiTaiReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReward"));
    };
    ViewLeiTaiReward.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReward").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    ViewLeiTaiReward.prototype.onShown = function () {
        var s = this;
        var vo = s._args;
        // let cfg = Config.leitai_500[11];
        var cfg = vo.cfg;
        //npc
        ConfigHelp.createViewGridList(s.list2, cfg.reward1, s);
        //擂主
        ConfigHelp.createViewGridList(s.list0, cfg.reward2, s);
        //协助
        ConfigHelp.createViewGridList(s.list1, cfg.reward3, s);
    };
    ViewLeiTaiReward.prototype.onHide = function () {
        var s = this;
        s.list0.numItems = 0;
        s.list1.numItems = 0;
        s.list2.numItems = 0;
    };
    ViewLeiTaiReward.URL = "ui://rhfap29iut4i9";
    return ViewLeiTaiReward;
}(UIModalPanel));
__reflect(ViewLeiTaiReward.prototype, "ViewLeiTaiReward");
