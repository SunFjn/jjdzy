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
var LvBuItem = (function (_super) {
    __extends(LvBuItem, _super);
    function LvBuItem() {
        var _this = _super.call(this) || this;
        _this.rank = 0;
        return _this;
    }
    LvBuItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "LvBuItem"));
    };
    LvBuItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
        this.btnCheck = (this.getChild("btnCheck"));
        this.btnCheck.addClickListener(this.onCheck, this);
    };
    LvBuItem.prototype.onCheck = function () {
        var lib = Config.lvbu_224[361001];
        var arr;
        switch (this.rank) {
            case 1:
                arr = JSON.parse(lib["reward1"]);
                break;
            case 2:
                arr = JSON.parse(lib["reward2"]);
                break;
            case 3:
                arr = JSON.parse(lib["reward3"]);
                break;
            default:
                arr = JSON.parse(lib["reward4"]);
                break;
        }
        GGlobal.layerMgr.open(UIConst.LVBUBOX, { rank: this.rank, data: arr });
    };
    LvBuItem.prototype.setdata = function (data) {
        this.rank = data[0];
        this.lbRank.text = "" + data[0];
        this.lbName.text = "" + data[1];
        this.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
    };
    LvBuItem.URL = "ui://47jfyc6eqcyl11";
    return LvBuItem;
}(fairygui.GComponent));
__reflect(LvBuItem.prototype, "LvBuItem");
