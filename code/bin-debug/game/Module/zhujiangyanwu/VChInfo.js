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
var VChInfo = (function (_super) {
    __extends(VChInfo, _super);
    function VChInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VChInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    VChInfo.prototype.setData = function (value) {
        this._data = value;
        var cfg = Config.zjywdl_005[value.id];
        if (cfg) {
            var drops = cfg.fw.split("_");
            var type = Number(drops[0]);
            var vo = void 0;
            if (type == 1) {
                vo = VoItem.create(drops[1]);
            }
            else if (type == 2) {
                vo = VoEquip.create(drops[1]);
            }
            var low = drops[2];
            var high = drops[3];
            this.grid.vo = vo;
            this.grid.tipEnabled = true;
            this.txtReward.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality)) + low + "~" + high + "个";
        }
    };
    VChInfo.prototype.getData = function () {
        return this._data;
    };
    VChInfo.prototype.clean = function () {
        ConfigHelp.cleanGridEff([this.grid]);
    };
    VChInfo.URL = "ui://7a366usafxp32";
    return VChInfo;
}(fairygui.GComponent));
__reflect(VChInfo.prototype, "VChInfo");
