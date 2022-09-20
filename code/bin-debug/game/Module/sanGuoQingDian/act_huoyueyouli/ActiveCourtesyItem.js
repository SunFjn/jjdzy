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
var ActiveCourtesyItem = (function (_super) {
    __extends(ActiveCourtesyItem, _super);
    function ActiveCourtesyItem() {
        return _super.call(this) || this;
    }
    ActiveCourtesyItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "ActiveCourtesyItem"));
    };
    ActiveCourtesyItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.bgImg = (s.getChild("bgImg"));
        s.grid0 = (s.getChild("grid0"));
        s.grid1 = (s.getChild("grid1"));
        s.grid0.isShowEff = true;
        s.grid1.isShowEff = true;
        s.goBt = (s.getChild("goBt"));
        s.goBt.addClickListener(s.goHandler, s);
    };
    ActiveCourtesyItem.prototype.goHandler = function () {
        GGlobal.layerMgr.open(this.cfg.open);
    };
    ActiveCourtesyItem.prototype.setData = function (value) {
        var s = this;
        var cfg = Config.sghyyl_261[value];
        s.cfg = cfg;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        s.grid0.vo = rewardArr[0];
        s.grid1.vo = rewardArr[1];
        s.grid0.tipEnabled = true;
        s.grid1.tipEnabled = true;
        IconUtil.setImg(s.bgImg, "resource/image/sanGuoQD/" + cfg.sys + ".png");
    };
    ActiveCourtesyItem.prototype.clean = function () {
        IconUtil.setImg(this.bgImg, null);
        this.grid0.clean();
        this.grid1.clean();
    };
    ActiveCourtesyItem.URL = "ui://kdt501v2tq2ht";
    return ActiveCourtesyItem;
}(fairygui.GComponent));
__reflect(ActiveCourtesyItem.prototype, "ActiveCourtesyItem");
