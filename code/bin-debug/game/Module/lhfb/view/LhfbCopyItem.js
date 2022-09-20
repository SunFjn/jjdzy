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
 * @date: 2020-02-28 22:55:23
 */
var LhfbCopyItem = (function (_super) {
    __extends(LhfbCopyItem, _super);
    function LhfbCopyItem() {
        return _super.call(this) || this;
    }
    LhfbCopyItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "LhfbCopyItem"));
    };
    LhfbCopyItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    LhfbCopyItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_model = GGlobal.modelLhfb;
            var t_vo = t_model.getLevelVoByLunhuiIdAndStar(pData.lunhuiId, 1);
            var t_canEnter = pData.canEnter(false);
            if (t_vo) {
                if (t_canEnter) {
                    t.tfTitle.text = t_vo.name;
                }
                else {
                    t.tfTitle.text = HtmlUtil.font(ConfigHelp.NumberToChinese(pData.lunhuiId) + "\u4E16\u8F6E\u56DE\u5F00\u542F", Color.REDSTR);
                }
                IconUtil.setImg(t.loaderIcon, Enum_Path.IMAGE_URL + "liudao/" + t_vo.cfg.tb + ".png");
            }
            if (pData.remainCount > 0 && t_canEnter)
                t.noticeImg.visible = true;
            else
                t.noticeImg.visible = false;
        }
        else {
            IconUtil.setImg(t.loaderIcon, null);
        }
    };
    LhfbCopyItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    LhfbCopyItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    LhfbCopyItem.URL = "ui://3o8q23uuymt71v";
    return LhfbCopyItem;
}(fairygui.GButton));
__reflect(LhfbCopyItem.prototype, "LhfbCopyItem");
