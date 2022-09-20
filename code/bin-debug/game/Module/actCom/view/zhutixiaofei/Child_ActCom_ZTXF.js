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
 * 主题消费
 */
var Child_ActCom_ZTXF = (function (_super) {
    __extends(Child_ActCom_ZTXF, _super);
    function Child_ActCom_ZTXF() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_ZTXF.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Tab_ZTXF.URL, Tab_ZTXF);
        f(ActCom_ZTXF_Item.URL, ActCom_ZTXF_Item);
    };
    Child_ActCom_ZTXF.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZTXF", "Child_ActCom_ZTXF"));
    };
    Child_ActCom_ZTXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_ZTXF.prototype.initView = function (pParent) {
        var self = this;
        self.tabList.callbackThisObj = self;
        self.tabList.itemRenderer = self.tabHD;
        self.tabList.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        self.btnLeft.displayObject.touchEnabled = true;
        self.btnRight.displayObject.touchEnabled = true;
        CommonManager.listPageChange("Child_ActCom_ZTXF", this.tabList, this.btnLeft, this.btnRight, 3, Handler.create(this, this.setPageNotice));
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
    };
    Child_ActCom_ZTXF.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        GGlobal.model_ZTXF.qs = self._vo.qs;
        self.show();
        self.y = 264;
    };
    Child_ActCom_ZTXF.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_ActCom_ZTXF.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_ZTXF.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.tabList.numItems = 0;
        self.tabList.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.ZTXF, self.updateChildShow, self);
    };
    Child_ActCom_ZTXF.prototype.show = function () {
        var self = this;
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        Timer.instance.listen(self.onUpdate, self);
        self.tabList.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, this);
        GGlobal.control.listen(UIConst.ZTXF, self.updateChildShow, self);
    };
    Child_ActCom_ZTXF.prototype.onUpdate = function () {
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
     * 左右按钮红点
     */
    Child_ActCom_ZTXF.prototype.setPageNotice = function (_curpage) {
        var sf = this;
        var model = GGlobal.model_ZTXF;
        sf.btnLeft.checkNotice = false;
        sf.btnRight.checkNotice = false;
        var cfg;
        for (var i = 0; i < sf.tabVos.length; i++) {
            cfg = sf.tabVos[i];
            var red = model.checkZTXFNoticeByType(sf._vo.qs, cfg.lx);
            if (red && i > _curpage + 2) {
                sf.btnRight.checkNotice = true;
            }
            if (red && i < _curpage) {
                sf.btnLeft.checkNotice = true;
            }
        }
    };
    Child_ActCom_ZTXF.prototype.tabHD = function (index, obj) {
        var item = obj;
        item.setVo(this.tabVos[index], index);
    };
    /**
     * list点击事件
     */
    Child_ActCom_ZTXF.prototype.listHandle = function (e) {
        var s = this;
        s.selectIndex = e.itemObject.idx;
        s.setTabSelected();
        this.updateList();
    };
    Child_ActCom_ZTXF.prototype.scrollComp = function () {
        var curpage = this.tabList.getFirstChildInView();
        this.setPageNotice(curpage);
    };
    Child_ActCom_ZTXF.prototype.setTabSelected = function () {
        var self = this;
        for (var i = 0; i < self.tabList._children.length; i++) {
            var btn = self.tabList._children[i];
            btn.setSelect(self.selectIndex == i);
        }
    };
    Child_ActCom_ZTXF.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx]);
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_ZTXF.prototype.updateChildShow = function () {
        var self = this;
        var model = GGlobal.model_ZTXF;
        var needCharge = Config.xtcs_004[7630].num;
        var color = model.rechargeNum >= needCharge ? Color.GREENSTR : Color.REDSTR;
        self.tipsTxt.text = BroadCastManager.reTxt("活动期间累计充值达到<font color='{0}'>{1}</font>元，可且仅可激活一个消费主题<font color='{2}'>({3}/{4})</font>", Color.GREENSTR, needCharge, color, model.rechargeNum, needCharge);
        self.tabVos = model.getTabVOs(self._vo.qs);
        self.tabList.numItems = self.tabVos.length;
        self.selectIndex = model.type <= 0 ? 0 : model.type - 1;
        self.setTabSelected();
        self.tabList.scrollToView(self.selectIndex);
        self.setPageNotice(self.selectIndex);
        self.updateList();
    };
    /**
     * 更新列表
     */
    Child_ActCom_ZTXF.prototype.updateList = function () {
        var self = this;
        var model = GGlobal.model_ZTXF;
        self._listData = Model_ActCom.getListData(model.getVosByLx(self._vo.qs, self.selectIndex + 1));
        self.list.numItems = self._listData ? self._listData.length : 0;
    };
    Child_ActCom_ZTXF.URL = "ui://904git2zglgpa";
    /** 设置包名（静态属性） */
    Child_ActCom_ZTXF.pkg = "ActCom_ZTXF";
    return Child_ActCom_ZTXF;
}(fairygui.GComponent));
__reflect(Child_ActCom_ZTXF.prototype, "Child_ActCom_ZTXF", ["IPanel"]);
