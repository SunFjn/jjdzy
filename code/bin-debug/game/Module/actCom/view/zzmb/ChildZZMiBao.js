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
var ChildZZMiBao = (function (_super) {
    __extends(ChildZZMiBao, _super);
    function ChildZZMiBao() {
        var _this = _super.call(this) || this;
        _this.getHd = function () {
            if (!TimeUitl.cool("zzmb", 1000)) {
                return;
            }
            var b = 0;
            var model = GGlobal.model_actCom;
            var data = model.zzmb_data;
            var hasChance = false;
            for (var i = 0; i < 8; i++) {
                if (data[i][4] > 0) {
                    b = 1;
                    break;
                }
            }
            if (b) {
                GGlobal.model_actCom.CG_ZZMB_GETAWARDS();
            }
            else {
                ViewCommonWarn.text("奖励已抽完，请重置秘宝");
            }
        };
        _this.resetHD = function () {
            GGlobal.model_actCom.CG_ZZMB_RESET();
        };
        _this.update = function (f) {
            var self = _this;
            var model = GGlobal.model_actCom;
            var data = model.zzmb_data;
            var hasChance = false;
            for (var i = 0; i < 8; i++) {
                if (data[i]) {
                    hasChance = hasChance || data[i][4] > 0;
                    _this["n" + i].setdata(data[i], f);
                }
            }
            self.cost0.setLb(Model_Bag.getItemCount(410436), 1);
            self.cost0.setItemId(410436);
            self.lbItemName0.text = ConfigHelp.getItemColorName(410436);
            var bol = false;
            var count = model.zzmbcount + 1;
            var config = Config.zzmbxh_503[count];
            if (config) {
                var items = JSON.parse(config.consume);
                self.cost1.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
                self.cost1.setItemId(items[0][1]);
                self.lbItemName1.text = ConfigHelp.getItemColorName(items[0][1]);
                if (hasChance) {
                    bol = Model_Bag.getItemCount(items[0][1]) >= items[0][2];
                }
            }
            else {
                var config_1 = Config.zzmbxh_503[1];
                var items = JSON.parse(config_1.consume);
                self.cost1.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
                self.cost1.setItemId(items[0][1]);
                self.lbItemName1.text = ConfigHelp.getItemColorName(items[0][1]);
            }
            if (!hasChance) {
                bol = Model_Bag.getItemCount(410436) > 0;
            }
            var reddot = GGlobal.reddot;
            reddot.setCondition(UIConst.ACTCOMzzmb, 0, bol);
            reddot.notifyMsg(UIConst.ACTCOMzzmb);
        };
        _this.eventFun = function (v) {
            var self = _this;
            var fun = EventUtil.register;
            fun(v, self.btnGet, EventUtil.TOUCH, self.getHd, self);
            fun(v, self.btnReset, EventUtil.TOUCH, self.resetHD, self);
            fun(v, self.linkLb, EventUtil.TOUCH, self.openGaiLV, self);
        };
        return _this;
    }
    ChildZZMiBao.createInstance = function () {
        return (fairygui.UIPackage.createObject("zhizhunmibao", "ChildZZMiBao"));
    };
    ChildZZMiBao.prototype.initView = function (pParent) { };
    ChildZZMiBao.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ChildZZMiBao.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemZZmiBao.URL, ItemZZmiBao);
    };
    ChildZZMiBao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ChildZZMiBao.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        self.eventFun(1);
        GGlobal.modelActivity.CG_OPENACT(pData.id);
        Timer.instance.listen(self.onUpdate, self);
        IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "zzmb.png");
        GGlobal.control.listen(UIConst.ACTCOMzzmb, self.update, self);
    };
    ChildZZMiBao.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 11);
    };
    /**销毁 */
    ChildZZMiBao.prototype.closePanel = function () {
        var self = this;
        self.eventFun(0);
        for (var i = 0; i < 8; i++) {
            if (this["n" + i]) {
                this["n" + i]["clean"]();
            }
        }
        IconUtil.setImg(self.imgBg, null);
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.ACTCOMzzmb, self.update, self);
    };
    ChildZZMiBao.prototype.onUpdate = function () {
        var end = this._vo ? this._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    ChildZZMiBao.URL = "ui://swuqw468x9uy0";
    ChildZZMiBao.pkg = "zhizhunmibao";
    return ChildZZMiBao;
}(fairygui.GComponent));
__reflect(ChildZZMiBao.prototype, "ChildZZMiBao", ["IPanel"]);
