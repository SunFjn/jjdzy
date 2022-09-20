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
 * @date: 2019-12-10 17:12:13
 */
var KfwzHead = (function (_super) {
    __extends(KfwzHead, _super);
    function KfwzHead() {
        return _super.call(this) || this;
    }
    KfwzHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzHead"));
    };
    KfwzHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzHead.prototype.setData = function (pData) {
        var t = this;
        if (pData) {
            if (pData.headGrid)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            if (pData.head)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);
            if ("roleId" in pData) {
                if (pData["roleId"] == Model_player.voMine.id)
                    t.lbName.text = HtmlUtil.font(pData.name, Color.GREENSTR);
                else
                    t.lbName.text = pData.name;
            }
            else {
                t.lbName.text = pData.name;
            }
            if (pData instanceof VoTeamMemberKfwz) {
                t.tfLevel.text = "Lv." + pData.level;
                t.tfPower.text = "战力：" + ConfigHelp.getYiWanText(pData.power);
            }
            else if (pData instanceof VoTeamListKfwz) {
                t.tfLevel.text = "\u961F\u4F0D\u4EBA\u6570\uFF1A<font color='" + Color.GREENSTR + "'>" + pData.count + "/3</font>";
                t.tfPower.text = "";
            }
            else {
                t.tfLevel.text = "";
                t.tfPower.text = "";
            }
        }
        else {
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    };
    //>>>>end
    KfwzHead.URL = "ui://me1skowln9yf72";
    return KfwzHead;
}(fairygui.GComponent));
__reflect(KfwzHead.prototype, "KfwzHead");
