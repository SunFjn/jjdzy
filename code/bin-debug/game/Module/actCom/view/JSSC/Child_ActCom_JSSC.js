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
var Child_ActCom_JSSC = (function (_super) {
    __extends(Child_ActCom_JSSC, _super);
    function Child_ActCom_JSSC() {
        return _super.call(this) || this;
    }
    Child_ActCom_JSSC.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_JSSC", "Child_ActCom_JSSC"));
    };
    Child_ActCom_JSSC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.t0 = self.getTransition("t0");
    };
    Child_ActCom_JSSC.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_ActCom_JSSC.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelJSSC;
        var cfg = Config.jssc_774[model.numMax];
        var cfg1 = Config.jssc_774[model.buyNum + 1];
        var num = model.numMax - model.buyNum > 0 ? model.numMax - model.buyNum : 0;
        if (!cfg) {
            cfg = Config.jssc_774[model.numMax + 1];
            self.numLb.text = "投资次数：" + num + "\n再充值" + HtmlUtil.fontNoSize((cfg.cz - model.chongzhiNum) + "元", Color.getColorStr(2)) + "可投资1次";
        }
        else {
            if (!Config.jssc_774[model.numMax + 1]) {
                self.numLb.text = "投资次数：" + num + "\n已达最大投资次数";
            }
            else {
                var cfg2 = Config.jssc_774[model.numMax + 1];
                self.numLb.text = "投资次数：" + num + "\n再充值" + HtmlUtil.fontNoSize((cfg2.cz - model.chongzhiNum) + "元", Color.getColorStr(2)) + "可投资1次";
            }
        }
        if (!cfg1) {
            cfg1 = Config.jssc_774[model.buyNum];
        }
        var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh))[0];
        self.moneyBt.text = "    " + costItem.count;
        self.flLb.text = "至少返利\n" + cfg1.min + "元宝";
        self.moneyBt.checkNotice = num > 0 && Model_player.voMine.yuanbao >= costItem.count;
    };
    Child_ActCom_JSSC.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.moneyBt.touchable = true;
        self.t0.setPaused(true);
        Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(pData.id);
        Timer.instance.listen(self.timeHandler, self, 1000);
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "jssc.jpg");
        self.moneyBt.addClickListener(self.moneyHandler, self);
        GGlobal.control.listen(UIConst.ACTCOM_JSSC, self.updateShow, self);
        GGlobal.control.listen(UIConst.ACTCOM_JSSC_EFF, self.showEff, self);
    };
    Child_ActCom_JSSC.prototype.moneyHandler = function () {
        var self = this;
        var model = GGlobal.modelJSSC;
        if (self.moneyBt.checkNotice) {
            GGlobal.modelJSSC.CG_GoldenMouse_buy_11581();
        }
        else {
            var num = model.numMax - model.buyNum > 0 ? model.numMax - model.buyNum : 0;
            if (num <= 0) {
                ViewCommonWarn.text("已无投资次数");
            }
            else {
                ModelChongZhi.guideToRecharge();
            }
        }
    };
    Child_ActCom_JSSC.prototype.showEff = function (money) {
        var self = this;
        self.moneyBt.touchable = false;
        self.t0.setPaused(false);
        EffectMgr.addEff("uieff/10093", self.boxImg.displayObject, self.boxImg.width / 2, self.boxImg.height / 2, 900, 900, false);
        var times = setTimeout(function () {
            clearTimeout(times);
            self.moneyBt.touchable = true;
            self.t0.setPaused(true);
            var vo = Vo_Currency.create(Enum_Attr.yuanBao);
            vo.count = money;
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, [vo]);
        }, 900);
    };
    Child_ActCom_JSSC.prototype.closePanel = function () {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        GGlobal.control.remove(UIConst.ACTCOM_JSSC, self.updateShow, self);
        GGlobal.control.remove(UIConst.ACTCOM_JSSC_EFF, self.showEff, self);
    };
    Child_ActCom_JSSC.prototype.timeHandler = function () {
        var self = this;
        var times = self.vo.getSurTime();
        if (times > 0) {
            self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(times);
        }
        else {
            self.timeLb.text = "活动已结束";
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ActCom_JSSC.URL = "ui://yug4d48utidc1";
    Child_ActCom_JSSC.pkg = "ActCom_JSSC";
    return Child_ActCom_JSSC;
}(fairygui.GComponent));
__reflect(Child_ActCom_JSSC.prototype, "Child_ActCom_JSSC", ["IPanel"]);
