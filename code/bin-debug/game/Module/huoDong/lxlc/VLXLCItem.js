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
var VLXLCItem = (function (_super) {
    __extends(VLXLCItem, _super);
    function VLXLCItem() {
        return _super.call(this) || this;
    }
    VLXLCItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDong", "VLXLCItem"));
    };
    VLXLCItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.imgGray = (this.getChild("imgGray"));
        this.imgLig = (this.getChild("imgLig"));
        this.lab = (this.getChild("lab"));
    };
    Object.defineProperty(VLXLCItem.prototype, "vo", {
        //id	qishu	tianshu	jiangli	zhanshi
        set: function (v) {
            this.lab.text = "累充" + v.tianshu + "天";
            var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.jiangli));
            this.grid.tipEnabled = true;
            this.grid.isShowEff = true;
            this.grid.vo = arr[0];
            if (Model_HuoDong.sevenKfCount < v.tianshu) {
                this.imgGray.visible = true;
                this.imgLig.visible = false;
            }
            else {
                this.imgGray.visible = false;
                this.imgLig.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    VLXLCItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.tipEnabled = false;
        this.grid.showEff(false);
    };
    VLXLCItem.URL = "ui://vrw7je9recsa13";
    return VLXLCItem;
}(fairygui.GComponent));
__reflect(VLXLCItem.prototype, "VLXLCItem");
