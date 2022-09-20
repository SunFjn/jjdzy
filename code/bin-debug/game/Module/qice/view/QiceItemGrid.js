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
 * @date: 2019-10-21 22:05:01
 */
var QiceItemGrid = (function (_super) {
    __extends(QiceItemGrid, _super);
    function QiceItemGrid() {
        return _super.call(this) || this;
    }
    QiceItemGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "QiceItemGrid"));
    };
    QiceItemGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    QiceItemGrid.prototype.setData = function (pType, pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.tfName.text = HtmlUtil.font(pData.cfg.name, Color.getColorStr(pData.cfg.pz));
            if (pData.isActive) {
                t.stateCtrl.selectedIndex = 1;
            }
            else {
                t.stateCtrl.selectedIndex = 0;
            }
            t.tfStar.text = pData.star + "";
            if (pType == 0) {
                //升星
                if (pData.checkCanStarUp(false)
                    || pData.checkHunCanUp(EnumQice.HUN_TYPE_BH, false)
                    || pData.checkHunCanUp(EnumQice.HUN_TYPE_JH, false))
                    t.noticeImg.visible = true;
                else
                    t.noticeImg.visible = false;
            }
            else {
                //升级
                t.noticeImg.visible = pData.checkCanLevelUp(false);
            }
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + pData.cfg.icon + ".png", t.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + pData.cfg.pz + ".png", t.bg);
        }
        else {
            t.registerEvent(false);
            t.noticeImg.visible = false;
            ImageLoader.instance.removeLoader(t.imgIcon);
            ImageLoader.instance.removeLoader(t.bg);
        }
    };
    QiceItemGrid.prototype.getData = function () {
        return this._curData;
    };
    QiceItemGrid.prototype.clean = function () {
        var t = this;
        t.setData(0, null);
        _super.prototype.clean.call(this);
    };
    //===================================== private method =====================================
    QiceItemGrid.prototype.registerEvent = function (pFlag) {
    };
    //>>>>end
    QiceItemGrid.URL = "ui://cokk050nx49y8";
    return QiceItemGrid;
}(fairygui.GButton));
__reflect(QiceItemGrid.prototype, "QiceItemGrid");
