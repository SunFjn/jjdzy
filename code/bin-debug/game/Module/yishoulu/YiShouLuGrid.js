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
 * 异兽录item
 */
var YiShouLuGrid = (function (_super) {
    __extends(YiShouLuGrid, _super);
    function YiShouLuGrid() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        return _this;
    }
    YiShouLuGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YiShouLuGrid.prototype.setVo = function (vo, index) {
        var self = this;
        self.vo = vo;
        self.index = index;
        IconUtil.setImg(self.imgIcon, Enum_Path.YISHOULU_URL + vo.cfg.tubiao + ".png");
        if (vo.lvUpId == (100000 * (index + 1))) {
            self.maskBg.visible = true;
        }
        else {
            self.maskBg.visible = false;
        }
        self.noticeImg.visible = Model_YiShouLu.checkYiShouNotice(index);
        self.nameGroup.visible = false;
        self.qdImg.visible = false;
    };
    YiShouLuGrid.prototype.setTFVo = function (vo) {
        var self = this;
        self.vo = vo;
        self.text = vo.cfg.mingzi;
        self.nameGroup.visible = true;
        IconUtil.setImg(self.imgIcon, Enum_Path.YISHOULU_URL + vo.cfg.tubiao + ".png");
        self.qdImg.visible = self.maskBg.visible = !vo.cfg.tianfu;
    };
    YiShouLuGrid.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    YiShouLuGrid.prototype.choose = function (value) {
        this.selectImg.visible = value;
    };
    YiShouLuGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.imgIcon, null);
        self.choose(false);
    };
    YiShouLuGrid.URL = "ui://7y83phvni1zv0";
    return YiShouLuGrid;
}(fairygui.GLabel));
__reflect(YiShouLuGrid.prototype, "YiShouLuGrid");
