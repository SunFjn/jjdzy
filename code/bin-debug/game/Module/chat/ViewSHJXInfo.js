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
var ViewSHJXInfo = (function (_super) {
    __extends(ViewSHJXInfo, _super);
    function ViewSHJXInfo() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewSHJXInfo.prototype.childrenCreated = function () {
        this.contentPane = this.view = fairygui.UIPackage.createObject("chat", "ViewSHJXInfo").asCom;
        CommonManager.parseChildren(this.view, this);
        this.grid.tipEnabled = true;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSHJXInfo.prototype.onUpdate = function () {
        //装备id_战力_印记位置,印记id,印记类型@印记位置,印记id,印记类型@印记位置,印记id,印记类型@印记位置,印记id,印记类型
        var arr = this._args.content.split("_");
        this.labOwner.text = arr[0];
        var equipID = arr[1];
        this.grid.vo = VoEquip.create(equipID);
        this.grid.showEff(true);
        this.labName.text = this.grid.vo.name;
        this.labPower.text = arr[2];
        if (arr[3]) {
            var ids = arr[3].split(/\@/gi);
            for (var i = 0; i < 4; i++) {
                this["item" + (i + 1)].setData(ids[i]);
            }
        }
    };
    ViewSHJXInfo.prototype.onShown = function () {
        this.onUpdate();
    };
    ViewSHJXInfo.prototype.onHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        ConfigHelp.cleanGridEff(this.grid);
    };
    return ViewSHJXInfo;
}(UIModalPanel));
__reflect(ViewSHJXInfo.prototype, "ViewSHJXInfo");
