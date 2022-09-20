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
var VWuJiangGrid = (function (_super) {
    __extends(VWuJiangGrid, _super);
    function VWuJiangGrid() {
        return _super.call(this) || this;
    }
    VWuJiangGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "VWuJiangGrid"));
    };
    VWuJiangGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Object.defineProperty(VWuJiangGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var self = this;
            self._vo = v;
            var star = Model_WuJiang.wuJiangStar[v.type];
            self.labName.text = Model_WuJiang.createWuJiangColorName(v.type);
            self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(v));
            self.imgBattle.visible = v.type == Model_player.voMine.job;
            if (Model_WuJiang.isActivation(v.type)) {
                self.starLb.text = star + "";
                self.starGroup.visible = true;
                if (Model_WuJiang.isGodWuJiang(v.type)) {
                    self.starGroup.visible = false;
                }
                self.maskBg.visible = false;
                self.sourceGroup.visible = false;
            }
            else {
                self.starGroup.visible = false;
                self.sourceGroup.visible = false;
                self.maskBg.visible = true;
                self.sourceLb.text = v.way;
            }
            ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", self.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(v) + ".png", self.bg);
            self.setNot();
        },
        enumerable: true,
        configurable: true
    });
    VWuJiangGrid.prototype.setNot = function () {
        var v = this.vo;
        if (ViewWuJiangPanel._selPage == 0) {
            this.noticeImg.visible = Model_WuJiang.checkStarVo(v) || GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, v.type) || GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, v.type);
        }
        else if (ViewWuJiangPanel._selPage == 2) {
            this.noticeImg.visible = ModelGodWuJiang.checkJiHuoNotice(v.type) || ModelGodWuJiang.checkXiulianNotice(v.type);
        }
        else {
            if (Model_WuJiang.hasShiZhuang(v.type)) {
                this.noticeImg.visible = Model_WuJiang.SZCheck(v) && (Model_WuJiang.wuJiangStar[v.type] || ModelGodWuJiang.getWuJiangIsActivation(v.type));
            }
            else {
                this.noticeImg.visible = false;
            }
        }
    };
    VWuJiangGrid.prototype.setSuitVo = function (v) {
        this.vo = v;
        this.imgBattle.visible = false;
        this.noticeImg.visible = false;
    };
    VWuJiangGrid.URL = "ui://zyx92gzwtht45";
    return VWuJiangGrid;
}(fairygui.GButton));
__reflect(VWuJiangGrid.prototype, "VWuJiangGrid");
