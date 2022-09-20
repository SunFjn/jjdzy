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
 * 武庙十哲
 */
var Child_ActCom_WMSZ = (function (_super) {
    __extends(Child_ActCom_WMSZ, _super);
    function Child_ActCom_WMSZ() {
        var _this = _super.call(this) || this;
        _this._maxRank = 0;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_WMSZ.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_ActCom_WMSZ.URL, Item_ActCom_WMSZ);
        f(WMSZIntegralItem.URL, WMSZIntegralItem);
        f(WMSZ_ShowItem.URL, WMSZ_ShowItem);
    };
    Child_ActCom_WMSZ.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WMSZ", "Child_ActCom_WMSZ"));
    };
    Child_ActCom_WMSZ.prototype.initView = function (pParent) {
        var self = this;
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.showList.itemRenderer = self.itemHandle;
        self.showList.callbackThisObj = self;
    };
    Child_ActCom_WMSZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_WMSZ.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        self.show();
    };
    Child_ActCom_WMSZ.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
    };
    Child_ActCom_WMSZ.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_WMSZ.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.list.numItems = 0;
        self.btnIntegral.removeClickListener(self.onIntegral, self);
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.WMSZ, self.updateView, self);
        GGlobal.control.remove(UIConst.WMSZ_INTEGRAL, self.updateRedDot, self);
        GGlobal.reddot.remove(UIConst.WMSZ, self.updateRedDot, self);
    };
    Child_ActCom_WMSZ.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.onUpdate, self, 1000);
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        self.btnIntegral.addClickListener(self.onIntegral, self);
        GGlobal.model_ActWMSZ.CG_OPEN_TARGETAWARD_UI();
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "wumiaoshizhe.jpg");
        GGlobal.control.listen(UIConst.WMSZ, self.updateView, self);
        GGlobal.control.listen(UIConst.WMSZ_INTEGRAL, self.updateRedDot, self);
        GGlobal.reddot.listen(UIConst.WMSZ, self.updateRedDot, self);
        self._showCfg = [];
        for (var key in Config.wmsz_779) {
            var cfg = Config.wmsz_779[key];
            if (Math.floor(cfg.id / 100) == self._vo.qs) {
                self._showCfg.push(cfg);
            }
        }
        self.showList.numItems = self._showCfg.length;
        self.updateRedDot();
        self.labTips.text = BroadCastManager.reTxt("积分达到<font color='{0}'>{1}</font>可上榜", "#FF9900", Config.xtcs_004[8423].num);
        self.labTips1.text = BroadCastManager.reTxt("建议不要在<font color='{0}'>00:00-00:05</font>使用道具", "#FF9900");
    };
    Child_ActCom_WMSZ.prototype.onUpdate = function () {
        var self = this;
        var end = self._vo ? self._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            self.labTime.text = "00:00:00";
        }
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_WMSZ.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_ActWMSZ;
        var rankCfg = [];
        for (var key in Config.wmpm_779) {
            var cfg = Config.wmpm_779[key];
            if (Math.floor(cfg.id / 100) == self._vo.qs) {
                rankCfg.push(cfg);
            }
        }
        var lastCfg = rankCfg[rankCfg.length - 1];
        self._maxRank = ConfigHelp.SplitStr(lastCfg.rank)[0][1];
        self.list.numItems = self._maxRank;
        self.labIntegral.text = "我的积分：" + model.myIntegral;
        if (model.myRank <= 0) {
            self.labRank.text = "我的排名：" + self._maxRank + "+";
        }
        else {
            self.labRank.text = "我的排名：" + model.myRank;
        }
    };
    Child_ActCom_WMSZ.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setData(index, this._vo.qs);
    };
    Child_ActCom_WMSZ.prototype.itemHandle = function (index, obj) {
        var v = obj;
        v.setData(this._showCfg[index]);
    };
    /**
     * 打开积分界面
     */
    Child_ActCom_WMSZ.prototype.onIntegral = function () {
        GGlobal.layerMgr.open(UIConst.WMSZ_INTEGRAL, { qs: this._vo.qs, maxRank: this._maxRank });
    };
    /**
     * 更新积分奖励红点
     */
    Child_ActCom_WMSZ.prototype.updateRedDot = function () {
        this.btnIntegral.checkNotice = GGlobal.reddot.checkCondition(UIConst.WMSZ, 0);
    };
    Child_ActCom_WMSZ.URL = "ui://5na9ulpx8a0y0";
    Child_ActCom_WMSZ.pkg = "ActCom_WMSZ";
    return Child_ActCom_WMSZ;
}(fairygui.GComponent));
__reflect(Child_ActCom_WMSZ.prototype, "Child_ActCom_WMSZ");
