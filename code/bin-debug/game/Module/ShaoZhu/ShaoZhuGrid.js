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
var ShaoZhuGrid = (function (_super) {
    __extends(ShaoZhuGrid, _super);
    function ShaoZhuGrid() {
        return _super.call(this) || this;
    }
    ShaoZhuGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuGrid"));
    };
    ShaoZhuGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        self.bg = (self.getChild("bg"));
        self.imgIcon = (self.getChild("imgIcon"));
        self.wearImg = (self.getChild("wearImg"));
        self.maskBg = (self.getChild("maskBg"));
        self.sourceLb = (self.getChild("sourceLb"));
        self.sourceGroup = (self.getChild("sourceGroup"));
        self.starLb = (self.getChild("starLb"));
        self.starGroup = (self.getChild("starGroup"));
        self.nameLb = (self.getChild("nameLb"));
        self.selectImg = (self.getChild("selectImg"));
        self.noticeImg = (self.getChild("noticeImg"));
    };
    ShaoZhuGrid.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.cfg.pz + ".png");
        IconUtil.setImg(self.imgIcon, Enum_Path.HEAD_URL + vo.cfg.head + ".png");
        self.wearImg.visible = vo.shaozhuID == Model_player.voMine.shaozhuID;
        self.sourceGroup.visible = self.maskBg.visible = vo.starLv == 0;
        self.sourceLb.text = vo.cfg.way;
        self.starLb.text = vo.starLv + "";
        self.starGroup.visible = vo.starLv > 0;
        self.nameLb.text = vo.cfg.name;
        self.nameLb.color = Color.getColorInt(vo.cfg.pz);
    };
    ShaoZhuGrid.prototype.choose = function (value) {
        this.selectImg.visible = value;
    };
    ShaoZhuGrid.URL = "ui://p83wyb2bh7p81";
    return ShaoZhuGrid;
}(fairygui.GComponent));
__reflect(ShaoZhuGrid.prototype, "ShaoZhuGrid");
