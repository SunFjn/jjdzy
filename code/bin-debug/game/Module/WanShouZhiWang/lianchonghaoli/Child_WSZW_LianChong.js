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
 * 万兽之王-连充豪礼
 */
var Child_WSZW_LianChong = (function (_super) {
    __extends(Child_WSZW_LianChong, _super);
    function Child_WSZW_LianChong() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.tabArr = [];
        _this._bigAwards = [];
        return _this;
    }
    Child_WSZW_LianChong.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActLCHL", "Child_WSZW_LianChong"));
    };
    Child_WSZW_LianChong.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_WSZW_LianChong.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(WSZW_LianChong_Item.URL, WSZW_LianChong_Item);
        f(WSZWListGrid.URL, WSZWListGrid);
    };
    Child_WSZW_LianChong.prototype.initView = function (pParent) {
        var self = this;
        self.titleList.callbackThisObj = self;
        self.titleList.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandle1;
        self.list.setVirtual();
        self.bpList.itemRenderer = self.itemRender;
        self.bpList.callbackThisObj = self;
    };
    Child_WSZW_LianChong.prototype.openPanel = function (pData) {
        this.y = 264;
        this._act = pData;
        if (this._act.id == UIConst.WSZW_LIANCHONGHAOLI) {
            this.tabArr = Model_WanShouZhiWang.getIlchlzs_756s(this._act.qs);
            GGlobal.modelEightLock.CG4571(this._act.id);
        }
        else if (this._act.id == UIConst.XINHD_LXCZ) {
            this.tabArr = Model_WanShouZhiWang.getIlxczzs_764(this._act.qs);
            GGlobal.modelActivity.CG_OPENACT(this._act.id);
        }
        this.titleList.numItems = this.tabArr.length;
        this.show();
    };
    Child_WSZW_LianChong.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_WSZW_LianChong.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    /**注销事件 */
    Child_WSZW_LianChong.prototype.disposePanel = function () {
        var self = this;
        self.list.numItems = 0;
        self.titleList.numItems = 0;
        self.bpList.numItems = 0;
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.WSZW_LIANCHONGHAOLI, self.updateList, self);
        self.titleList.removeEventListener(fairygui.ItemEvent.CLICK, self.tabHandle, self);
        IconUtil.setImg(self.imgHeadbg, null);
    };
    Child_WSZW_LianChong.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.onUpdate, self);
        GGlobal.control.listen(UIConst.WSZW_LIANCHONGHAOLI, self.updateList, self);
        self.titleList.addEventListener(fairygui.ItemEvent.CLICK, self.tabHandle, self);
        this.titleList.selectedIndex = 0;
        self._index = 0;
        IconUtil.setImg1(Enum_Path.ACTCOM_URL + "lianchonghaoli.jpg", this.imgHeadbg);
    };
    Child_WSZW_LianChong.prototype.onUpdate = function () {
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    Child_WSZW_LianChong.prototype.renderHandle = function (index, obj) {
        var tab = obj;
        tab.text = this.tabArr[index].rmb + "元";
        tab.data = index;
        tab.getChild("noticeImg").visible = Model_WanShouZhiWang.checkNoticeLCHLByTab(index);
    };
    Child_WSZW_LianChong.prototype.renderHandle1 = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._act.id, this._index);
    };
    /**
     * 顶部list点击事件
     */
    Child_WSZW_LianChong.prototype.tabHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a._index = tab.data;
        a.updateList();
    };
    Child_WSZW_LianChong.prototype.updateList = function () {
        var self = this;
        var cfg;
        if (this._act.id == UIConst.WSZW_LIANCHONGHAOLI) {
            cfg = Model_WanShouZhiWang.getIlchlzs_756(this._act.qs, this.tabArr[self._index].rmb);
        }
        else if (this._act.id == UIConst.XINHD_LXCZ) {
            cfg = Model_WanShouZhiWang.getIIlxczzs_764(this._act.qs, this.tabArr[self._index].rmb);
        }
        self._bigAwards = JSON.parse(cfg.jl);
        self.bpList.numItems = self._bigAwards.length;
        self.titleList.numItems = self.tabArr.length;
        this.labTips.text = "今日已充：" + Model_WanShouZhiWang.topUpNum + "元";
        IconUtil.setImg(self.moneyIcon, Enum_Path.ACTCOM_URL + cfg.tpz + ".png");
        self._listData = [];
        self._listData = Model_WanShouZhiWang.getListData(Model_WanShouZhiWang.rewardArr[self._index]);
        self.list.numItems = self._listData ? self._listData.length : 0;
        if (self.list.numItems > 0) {
            self.list.scrollToView(0);
        }
    };
    Child_WSZW_LianChong.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setVo(this._bigAwards[idx], true);
    };
    Child_WSZW_LianChong.pkg = "WSZWActLCHL";
    Child_WSZW_LianChong.URL = "ui://niyo89miq6qw0";
    return Child_WSZW_LianChong;
}(fairygui.GComponent));
__reflect(Child_WSZW_LianChong.prototype, "Child_WSZW_LianChong", ["IPanel"]);
