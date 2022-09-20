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
var ViewLZDShow = (function (_super) {
    __extends(ViewLZDShow, _super);
    function ViewLZDShow() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.loadRes();
        return _this;
    }
    ViewLZDShow.prototype.childrenCreated = function () {
        GGlobal.createPack("activityHall");
        this.view = fairygui.UIPackage.createObject("activityHall", "ViewLZDShow").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        _super.prototype.resetPosition.call(this);
        _super.prototype.childrenCreated.call(this);
        this.frame.text = "宝箱";
    };
    ViewLZDShow.prototype.onShown = function () {
        var id = this._args;
        var lib = Config.lzdreward_234;
        for (var i in lib) {
            var condition = JSON.parse(lib[i].rank)[0];
            if (id >= condition[0] && id <= condition[1]) {
                id = i;
                break;
            }
        }
        var ward = Config.lzdreward_234[id].reward;
        var vos = ConfigHelp.makeItemListArr(JSON.parse(ward));
        ConfigHelp.cleanGridview(this.grids);
        this.grids = ConfigHelp.addGridview(vos, this, 143, 90, true, true, 3);
        ConfigHelp.centerGrid(this.grids, 100, 90, 3, 120);
    };
    ViewLZDShow.prototype.onHide = function () {
        ConfigHelp.cleanGridview(this.grids);
        GGlobal.layerMgr.close(UIConst.LZDBOX);
    };
    ViewLZDShow.URL = "ui://1xydor24n7ie6";
    return ViewLZDShow;
}(UIModalPanel));
__reflect(ViewLZDShow.prototype, "ViewLZDShow");
