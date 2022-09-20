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
/**
 * 六道套装查看界面
 */
var SixWayCheckView = (function (_super) {
    __extends(SixWayCheckView, _super);
    function SixWayCheckView() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    SixWayCheckView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("lunhui", "SixWayCheckView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    SixWayCheckView.prototype.onShown = function () {
        var self = this;
        var type = self._args;
        self._listData = [];
        for (var key in Config.sixdaotz_505) {
            var cfg = Config.sixdaotz_505[key];
            if (cfg.type == type) {
                self._listData.push(cfg);
            }
        }
        self.list.numItems = self._listData ? self._listData.length : 0;
    };
    SixWayCheckView.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
    };
    SixWayCheckView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx]);
    };
    SixWayCheckView.URL = "ui://ehelf5bhv97gw1x";
    return SixWayCheckView;
}(UIModalPanel));
__reflect(SixWayCheckView.prototype, "SixWayCheckView");
