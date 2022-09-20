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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var Child_ActCom_TianJiangHL = (function (_super) {
    __extends(Child_ActCom_TianJiangHL, _super);
    function Child_ActCom_TianJiangHL() {
        return _super.call(this) || this;
    }
    Child_ActCom_TianJiangHL.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComTianJiangHaoli", "Child_ActCom_TianJiangHL"));
    };
    Child_ActCom_TianJiangHL.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_TianJiangHL.URL, Item_TianJiangHL);
    };
    Child_ActCom_TianJiangHL.prototype.initView = function (pParent) {
        var self = this;
    };
    Child_ActCom_TianJiangHL.prototype.itemTender = function (idx, obj) {
        var self = this;
        var item = obj;
        item.setdata(self.listdata[idx]);
    };
    Child_ActCom_TianJiangHL.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_TianJiangHL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemTender;
        self.list.setVirtual();
    };
    Child_ActCom_TianJiangHL.prototype.update = function () {
        var self = this;
        var model = GGlobal.model_actCom;
        var data = model.tianJiangHl_data;
        var chargeValue = model.tianJiangHl_rechargeValue;
        self.listdata = [];
        var bol = false;
        for (var i = 0; i < self.tianjiangHL_CFG.length; i++) {
            var item = self.tianjiangHL_CFG[i];
            var obj = {};
            obj.id = item.id;
            obj.cfg = item;
            var st = 0;
            var stweight = 0;
            if (chargeValue >= item.lj) {
                if (data.indexOf(item.id) != -1) {
                    st = 2;
                    stweight = 10000;
                }
                else {
                    st = 1;
                    bol = true;
                    stweight = -10000;
                }
            }
            obj.st = st;
            obj.weight = item.id + stweight;
            self.listdata.push(obj);
        }
        var reddot = GGlobal.reddot;
        reddot.setCondition(UIConst.ACTCOM_TJHB, 0, bol);
        reddot.notifyMsg(UIConst.ACTCOM_TJHB);
        self.listdata.sort(function (a, b) {
            return a.weight < b.weight ? -1 : 1;
        });
        self.list.numItems = self.listdata.length;
    };
    Child_ActCom_TianJiangHL.prototype.onUpdate = function () {
        var end = this._vo ? this._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    Child_ActCom_TianJiangHL.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        if (!self.tianjiangHL_CFG || self.tianjiangHL_CFG[0].qishu != pData.qs) {
            self.tianjiangHL_CFG = [];
            var libn = Config.tjhl_335;
            for (var i in libn) {
                if (libn[i].qishu == pData.qs) {
                    self.tianjiangHL_CFG.push(libn[i]);
                }
            }
        }
        GGlobal.modelActivity.CG_OPENACT(pData.id);
        Timer.instance.listen(self.onUpdate, self);
        IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "tianjianghl.jpg");
        GGlobal.control.listen(UIConst.ACTCOM_TIANJIANGHL, self.update, self);
    };
    /**销毁 */
    Child_ActCom_TianJiangHL.prototype.closePanel = function () {
        var self = this;
        IconUtil.setImg(self.imgBg, null);
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.ACTCOM_TIANJIANGHL, self.update, self);
    };
    Child_ActCom_TianJiangHL.URL = "ui://gy3mzfqr7jlm0";
    Child_ActCom_TianJiangHL.pkg = "actComTianJiangHaoli";
    return Child_ActCom_TianJiangHL;
}(fairygui.GComponent));
__reflect(Child_ActCom_TianJiangHL.prototype, "Child_ActCom_TianJiangHL", ["IPanel"]);
