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
 * 桃园boss item
 */
var TYJY_BossItem = (function (_super) {
    __extends(TYJY_BossItem, _super);
    function TYJY_BossItem() {
        return _super.call(this) || this;
    }
    TYJY_BossItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BossItem"));
    };
    TYJY_BossItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.itemRender;
    };
    TYJY_BossItem.prototype.clean = function () {
        var s = this;
        IconUtil.setImg(s.bgImg, null);
        s.list.numItems = 0;
        if (this.uiRole) {
            this.uiRole.onRemove();
            this.uiRole = null;
        }
    };
    TYJY_BossItem.prototype.setData = function (type) {
        var s = this;
        var cfg;
        if (type == 0) {
            IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "low.jpg");
            cfg = Config.tyjyboss_251[343001];
            s._listdata = ConfigHelp.makeItemListArr(cfg.reward);
        }
        else {
            IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "high.jpg");
            cfg = Config.tyjyboss_251[343002];
            s._listdata = ConfigHelp.makeItemListArr(cfg.reward);
        }
        s.list.numItems = s._listdata.length;
        var boss = Config.NPC_200[cfg.id];
        if (!s.uiRole) {
            s.uiRole = UIRole.create();
            s.uiRole.uiparent = s.displayListContainer;
            s.uiRole.setPos(180, 230);
            s.uiRole.setScaleXY(1, 1);
        }
        s.uiRole.setBody(boss.mod);
        if (boss.weapon) {
            s.uiRole.setWeapon(boss.mod);
        }
        else {
            s.uiRole.setWeapon(null);
        }
        s.uiRole.onAdd();
    };
    TYJY_BossItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._listdata[idx];
    };
    TYJY_BossItem.URL = "ui://m2fm2aiyvfmx10";
    return TYJY_BossItem;
}(fairygui.GComponent));
__reflect(TYJY_BossItem.prototype, "TYJY_BossItem");
