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
var Child_ActComBuyLimit = (function (_super) {
    __extends(Child_ActComBuyLimit, _super);
    function Child_ActComBuyLimit() {
        var _this = _super.call(this) || this;
        _this._tabHor = 0;
        _this._nowHor = 0;
        return _this;
    }
    Child_ActComBuyLimit.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComBuyLimit", "Child_ActComBuyLimit"));
    };
    Child_ActComBuyLimit.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComBuyLimit.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemActComBuyLimit.URL, ItemActComBuyLimit);
        f(ActComBuyLTab.URL, ActComBuyLTab);
    };
    Child_ActComBuyLimit.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        // s.list.setVirtual();
        s.tabList.callbackThisObj = s;
        s.tabList.itemRenderer = s.tabRender;
        s.tabList.setVirtual();
    };
    Child_ActComBuyLimit.prototype.openPanel = function (pData) {
        var s = this;
        s.y = 268;
        s._off = Math.floor(new Date().getTimezoneOffset() / 60);
        s._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_BUYLIMIT);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BUYLIMIT);
        Timer.instance.listen(s.onUpdate, s);
        s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.itemHandler, s);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_LIMIT_BUY, s.upView, s);
        s.upView();
        IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "buylimit.jpg");
    };
    Child_ActComBuyLimit.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        s.tabList.numItems = 0;
        Timer.instance.remove(s.onUpdate, s);
        s.tabList.removeEventListener(fairygui.ItemEvent.CLICK, s.itemHandler, s);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_LIMIT_BUY, s.upView, s);
        IconUtil.setImg(s.imgBg, null);
    };
    Child_ActComBuyLimit.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActComBuyLimit.prototype.upView = function () {
        var s = this;
        if (GGlobal.model_actCom.limBuyQS == 0)
            return;
        var arr = GGlobal.model_actCom.getBuyLimitCfg(GGlobal.model_actCom.limBuyQS);
        s._tabHor = arr[0][0].opentime;
        s._tabArr = [];
        var d = new Date(Model_GlobalMsg.getServerTime());
        this._nowHor = d.getUTCHours() - s._off; //当前时区小时
        var h = d.getUTCHours() + 8; //转换8区小时数
        if (h >= 24) {
            h -= 24;
        }
        for (var i = 0; i < arr.length; i++) {
            var opT = arr[i][0].opentime;
            if (opT < h) {
                continue;
            }
            if (opT == h) {
                this._tabHor = arr[i][0].opentime;
            }
            this._tabArr.push(arr[i]);
        }
        this.tabList.numItems = this._tabArr.length;
        if (this._tabArr.length > 0) {
            this.tabList.selectedIndex = 0;
            this.tabList.scrollToView(0);
        }
        this._lisArr = this._tabArr[0] ? this._tabArr[0] : [];
        this._lisArr.sort(function (a, b) { return a.ID - b.ID; });
        this.list.numItems = this._lisArr.length;
    };
    Child_ActComBuyLimit.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setVo(this._lisArr[idx], this._nowHor, this._off);
    };
    Child_ActComBuyLimit.prototype.tabRender = function (idx, obj) {
        var item = obj;
        item.setVo(this._tabArr[idx], this._nowHor, this._off);
    };
    Child_ActComBuyLimit.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        var s = this;
        s._lisArr = grid.vo;
        s._lisArr.sort(function (a, b) { return a.ID - b.ID; });
        s.list.numItems = this._lisArr.length;
        s.list.scrollToView(0);
        s._tabHor = s._lisArr[0].opentime;
    };
    Child_ActComBuyLimit.prototype.onUpdate = function () {
        var s = this;
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
        if (end - servTime < 0 || this._tabHor == 0) {
            this.tabTime.text = "";
        }
        else {
            var d = new Date(servTime * 1000);
            d.setHours(this._tabHor);
            d.setSeconds(0);
            d.setMinutes(0);
            var t = (d.getTime() / 1000 >> 0) + 3600 - servTime - (s._off + 8) * 60 * 60;
            if (t > 3600) {
                this.tabTime.text = "本场即将开始:    " + DateUtil.getMSBySecond4(t - 3600);
            }
            else {
                this.tabTime.text = "本场抢购剩余:    " + DateUtil.getMSBySecond4(t);
            }
            d.setUTCHours(this._nowHor + s._off);
            t = (d.getTime() / 1000 >> 0) + 3600 - servTime;
            if (t <= 0) {
                this.upView();
            }
        }
    };
    Child_ActComBuyLimit.URL = "ui://vagtkxbkqsq26";
    Child_ActComBuyLimit.pkg = "actComBuyLimit";
    return Child_ActComBuyLimit;
}(fairygui.GComponent));
__reflect(Child_ActComBuyLimit.prototype, "Child_ActComBuyLimit", ["IPanel"]);
