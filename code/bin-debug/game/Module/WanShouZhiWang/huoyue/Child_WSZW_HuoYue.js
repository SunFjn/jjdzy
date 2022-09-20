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
 * 万兽之王-每日活跃
 */
var Child_WSZW_HuoYue = (function (_super) {
    __extends(Child_WSZW_HuoYue, _super);
    function Child_WSZW_HuoYue() {
        var _this = _super.call(this) || this;
        _this._preIndex = 0;
        return _this;
    }
    Child_WSZW_HuoYue.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActMRHY", "Child_WSZW_HuoYue"));
    };
    Child_WSZW_HuoYue.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_WSZW_HuoYue.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(WSZW_HuoYue_Item.URL, WSZW_HuoYue_Item);
    };
    Child_WSZW_HuoYue.prototype.initView = function (pParent) {
        var self = this;
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        this._tabArr = [];
        for (var i = 0; i < 4; i++) {
            this._tabArr.push((this.getChild("tab" + i)));
        }
    };
    Child_WSZW_HuoYue.prototype.openPanel = function (pData) {
        this.y = 264;
        this._act = pData;
        this.show();
        GGlobal.modelEightLock.CG4571(UIConst.WSZW_HUOYUE);
    };
    Child_WSZW_HuoYue.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_WSZW_HuoYue.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    /**注销事件 */
    Child_WSZW_HuoYue.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.upTimer, self);
        self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, self.selHandle, self);
        // GGlobal.reddot.remove(UIConst.WSZW_HUOYUE, self.checkTab, self);
        GGlobal.control.remove(UIConst.WSZW_HUOYUE, self.upView, self);
        self.list.numItems = 0;
        IconUtil.setImg(self.imgHeadbg, null);
    };
    Child_WSZW_HuoYue.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.upTimer, self, 1000);
        self.c1.selectedIndex = 0;
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selHandle, self);
        self.upView();
        for (var i = 0; i < self._tabArr.length; i++) {
            var iconObject = self._tabArr[i].getChild("icon").asLoader;
            ImageLoader.instance.loader(Enum_Path.MAINUI_URL + "64060" + (i + 1) + ".png", iconObject);
        }
        // self.checkTab();
        // GGlobal.reddot.listen(UIConst.WSZW_HUOYUE, self.checkTab, self);
        GGlobal.control.listen(UIConst.WSZW_HUOYUE, self.upView, self);
        GGlobal.modelEightLock.CG4571(UIConst.WSZW_HUOYUE);
        IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[UIConst.WSZW_HUOYUE].icon + ".jpg", self.imgHeadbg);
    };
    Child_WSZW_HuoYue.prototype.upView = function () {
        this.upTimer();
        this.upList();
        this.checkTab();
    };
    Child_WSZW_HuoYue.prototype.selHandle = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = new Date(ms);
        var week = data.getDay();
        if (week == 0 && this.c1.selectedIndex == 1) {
            this.c1.selectedIndex = this._preIndex;
            ViewCommonWarn.text("周日单刀赴会不开放");
            return;
        }
        this._preIndex = this.c1.selectedIndex;
        this.upList();
    };
    Child_WSZW_HuoYue.prototype.upList = function () {
        var model = GGlobal.modelWanShouZhiWang;
        var index = this.c1.selectedIndex;
        this._listData = Model_WanShouZhiWang.getListData(model.huoYObj[index + 1]);
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
    };
    Child_WSZW_HuoYue.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], UIConst.WSZW_HUOYUE);
    };
    Child_WSZW_HuoYue.prototype.upTimer = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_WSZW_HuoYue.prototype.checkTab = function () {
        for (var i = 0; i < this._tabArr.length; i++) {
            var btn = this._tabArr[i];
            // let red = GGlobal.reddot.checkCondition(UIConst.WSZW_HUOYUE, i + 1);
            var red = GGlobal.modelWanShouZhiWang.checkNoticeMRHY(i + 1);
            if (btn)
                btn.getChild("noticeImg").visible = red;
        }
    };
    Child_WSZW_HuoYue.pkg = "WSZWActMRHY";
    Child_WSZW_HuoYue.URL = "ui://6aqn8xprhx4m2";
    return Child_WSZW_HuoYue;
}(fairygui.GComponent));
__reflect(Child_WSZW_HuoYue.prototype, "Child_WSZW_HuoYue", ["IPanel"]);
