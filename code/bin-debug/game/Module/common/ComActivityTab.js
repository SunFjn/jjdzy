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
var ComActivityTab = (function (_super) {
    __extends(ComActivityTab, _super);
    function ComActivityTab() {
        var _this = _super.call(this) || this;
        /**活动 */
        _this.actId = 0;
        return _this;
    }
    ComActivityTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ActivityTab"));
    };
    ComActivityTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(ComActivityTab.prototype, "checkNotice", {
        set: function (val) {
            this.noticeImg.visible = val;
        },
        enumerable: true,
        configurable: true
    });
    ComActivityTab.prototype.setIcon = function (iconUrl) {
        IconUtil.setImg(this._iconObject.asLoader, iconUrl);
    };
    ComActivityTab.prototype.setActivityIcon = function (iconID) {
        IconUtil.setImg(this._iconObject.asLoader, Enum_Path.MAINUI_URL + iconID + ".png");
    };
    ComActivityTab.prototype.setData = function (pData) {
        var self = this;
        if (pData) {
            //有数据
            self.actId = pData.id;
            var icon = Config.xitong_001[self.actId].icon;
            if (self.actId == UIConst.DISCOUNT_SHOP) {
                icon = "4605_1";
            }
            else if (self.actId == UIConst.JiJin) {
                icon = UIConst.JiJin + "" + pData.qs;
            }
            if (pData.icon) {
                IconUtil.setImg(self._iconObject.asLoader, Enum_Path.ACTCOM_URL + pData.icon + "_icon.png");
            }
            else {
                console.log("huodong_009 no find activityIndex：" + pData.index + "activityID：" + pData.id);
            }
        }
        else {
            //无数据
            self.actId = 0;
            self.icon = null;
        }
    };
    ComActivityTab.prototype.clean = function () {
        IconUtil.setImg(this._iconObject.asLoader, null);
    };
    ComActivityTab.URL = "ui://jvxpx9emr9to3he";
    return ComActivityTab;
}(fairygui.GButton));
__reflect(ComActivityTab.prototype, "ComActivityTab");
