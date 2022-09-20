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
var ZFZJSceneInfo = (function (_super) {
    __extends(ZFZJSceneInfo, _super);
    function ZFZJSceneInfo() {
        return _super.call(this) || this;
    }
    ZFZJSceneInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZFZJ", "ZFZJSceneInfo"));
    };
    ZFZJSceneInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.setXY(fairygui.GRoot.inst.width - self.width, 350);
    };
    ZFZJSceneInfo.prototype.updateMyHurt = function () {
        var self = this;
        var m = GGlobal.modelCaoCao;
        var d = m.rankData;
        if (d.length) {
            self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt) +
                "       <font color='#ffc334'>1st:</font>" + d[0][1] + "   " + ConfigHelp.getYiWanText(d[0][2]);
        }
        else {
            self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt);
        }
    };
    ZFZJSceneInfo.prototype.onopen = function () {
        var self = this;
        MainUIController.addChildToUI(ZFZJSceneInfo.instance, 1);
        self.updateMyHurt();
        GGlobal.control.listen(Enum_MsgType.ZFZJ_UPDATEHURT, self.updateMyHurt, self);
    };
    ZFZJSceneInfo.prototype.onclose = function () {
        var self = this;
        MainUIController.removeUI(ZFZJSceneInfo.instance);
        GGlobal.control.remove(Enum_MsgType.ZFZJ_UPDATEHURT, self.updateMyHurt, self);
    };
    Object.defineProperty(ZFZJSceneInfo, "instance", {
        get: function () {
            if (!ZFZJSceneInfo._instance)
                ZFZJSceneInfo._instance = ZFZJSceneInfo.createInstance();
            return ZFZJSceneInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    ZFZJSceneInfo.URL = "ui://4h4iwgjrr3jen";
    return ZFZJSceneInfo;
}(fairygui.GComponent));
__reflect(ZFZJSceneInfo.prototype, "ZFZJSceneInfo");
