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
 * @date: 2019-12-16 14:39:48
 */
var KfwzHeadBattle = (function (_super) {
    __extends(KfwzHeadBattle, _super);
    function KfwzHeadBattle() {
        return _super.call(this) || this;
    }
    KfwzHeadBattle.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzHeadBattle"));
    };
    KfwzHeadBattle.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzHeadBattle.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            if (pData.headGrid)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            if (pData.head)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);
            t.tfIndex.text = (pData.index + 1) + "";
            if (pData.isDead)
                t.groupDie.visible = true;
            else
                t.groupDie.visible = false;
            var t_flag = ~~t.data; //来自元件的自定义数据
            t.dirCtrl.selectedIndex = t_flag;
        }
        else {
            t.visible = false;
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    };
    //>>>>end
    KfwzHeadBattle.URL = "ui://me1skowlfyft86";
    return KfwzHeadBattle;
}(fairygui.GComponent));
__reflect(KfwzHeadBattle.prototype, "KfwzHeadBattle");
