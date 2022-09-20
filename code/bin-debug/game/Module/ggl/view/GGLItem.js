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
 * @author: lujiahao
 * @date: 2020-02-20 13:55:55
 */
var GGLItem = (function (_super) {
    __extends(GGLItem, _super);
    function GGLItem() {
        return _super.call(this) || this;
    }
    GGLItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ggl", "GGLItem"));
    };
    GGLItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.pointList = [
            egret.Point.create(t.p0.x, t.p2.y),
            egret.Point.create(t.p1.x, t.p1.y),
            egret.Point.create(t.p2.x, t.p2.y)
        ];
    };
    //=========================================== API ==========================================
    GGLItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            if (pData.itemVo) {
                t.item.isShowEff = true;
                t.item.tipEnabled = true;
                t.item.vo = pData.itemVo;
            }
        }
        else {
            t.showEffect(false);
            t.item.vo = null;
        }
    };
    GGLItem.prototype.showEffect = function (pFlag) {
        var t = this;
        if (pFlag) {
            if (!t._mc1) {
                t._mc1 = EffectMgr.addEff("uieff/10096", t.displayListContainer, t.width / 2, t.height / 2, 300, 300, false);
                t._mc1.refThis = t;
                t._mc1.refKey = "_mc1";
            }
            SimpleTimer.ins().addTimer(t.onMc1Complete, t, 300, 1);
        }
        else {
            if (t._mc1) {
                EffectMgr.instance.removeEff(t._mc1);
                t._mc1 = null;
            }
            if (t._mc2) {
                EffectMgr.instance.removeEff(t._mc2);
                t._mc2 = null;
            }
            SimpleTimer.ins().removeTimer(t.onMc1Complete, t);
        }
    };
    GGLItem.prototype.onMc1Complete = function () {
        var t = this;
        if (t._mc1) {
            EffectMgr.instance.removeEff(t._mc1);
            t._mc1 = null;
        }
        if (!t._mc2) {
            t._mc2 = EffectMgr.addEff("uieff/10095", t.displayListContainer, t.item.x, t.item.y, 500, -1, true);
            t._mc2.refThis = t;
            t._mc2.refKey = "_mc2";
        }
    };
    GGLItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    //>>>>end
    GGLItem.URL = "ui://wnqj5rwkloxzc";
    return GGLItem;
}(fairygui.GComponent));
__reflect(GGLItem.prototype, "GGLItem");
