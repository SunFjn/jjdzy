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
 * 新活动-对对联
 */
var Child_ActCom_DDL = (function (_super) {
    __extends(Child_ActCom_DDL, _super);
    function Child_ActCom_DDL() {
        var _this = _super.call(this) || this;
        _this._curSelect = 0;
        _this._rewardArr = [];
        _this._xialianStr = "";
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_DDL.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(DDLItem.URL, DDLItem);
        f(ItemRankDDL.URL, ItemRankDDL);
        f(DDLRewardItem.URL, DDLRewardItem);
    };
    Child_ActCom_DDL.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_DDL", "Child_ActCom_DDL"));
    };
    Child_ActCom_DDL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_DDL.prototype.initView = function (pParent) {
        var s = this;
        s.itemArr = [s.item0, s.item1, s.item2, s.item3, s.item4, s.item5, s.item6];
        s._rewardArr = [s.rewardItem0, s.rewardItem1, s.rewardItem2, s.rewardItem3, s.rewardItem4];
    };
    Child_ActCom_DDL.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "duiduilian.jpg");
        self.y = 264;
        self.show();
    };
    Child_ActCom_DDL.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
        IconUtil.setImg(self.bgImg, null);
    };
    Child_ActCom_DDL.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_DDL.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.ACTCOM_DDL, self.updateView, self);
        var len = self.itemArr.length;
        for (var i = 0; i < len; i++) {
            self.itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onXialian, self);
        }
        self.againBtn.removeClickListener(self.onAgain, self);
        self.okBtn.removeClickListener(self.onOK, self);
        self.btnRank.removeClickListener(self.onBtnRank, self);
        self._xialianStr = "";
        self.xialianPos = [];
        self.xialian.text = "";
    };
    Child_ActCom_DDL.prototype.show = function () {
        var self = this;
        self.vres.setType(1);
        Timer.instance.listen(self.onUpdate, self, 1000);
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        GGlobal.control.listen(UIConst.ACTCOM_DDL, self.updateView, self);
        var len = self.itemArr.length;
        for (var i = 0; i < len; i++) {
            self.itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onXialian, self);
        }
        self.againBtn.addClickListener(self.onAgain, self);
        self.okBtn.addClickListener(self.onOK, self);
        self.btnRank.addClickListener(self.onBtnRank, self);
    };
    Child_ActCom_DDL.prototype.onUpdate = function () {
        var self = this;
        var end = self._vo ? self._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            self.labTime.text = "00:00:00";
        }
        if (GGlobal.model_DDL.remainTime > 0) {
            GGlobal.model_DDL.remainTime--;
            self.labRecover.text = "恢复时间：<font color='#15f234'>" + DateUtil.getMSBySec3(GGlobal.model_DDL.remainTime) + "</font>";
        }
        else {
            self.labRecover.text = "";
        }
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_DDL.prototype.updateView = function (bol) {
        if (bol === void 0) { bol = false; }
        var model = GGlobal.model_DDL;
        var self = this;
        self._cfg = Config.ddl_297[model.id];
        if (!self._cfg)
            return;
        self.hengfu.text = self._cfg.name;
        self.shanglian.text = self._cfg.up;
        self.okBtn.checkNotice = false;
        var itemCount = Model_Bag.getItemCount(410429);
        if (model.duilianCount > 0 || (itemCount <= 0 && model.duilianCount <= 0)) {
            self.vres.visible = false;
            self.labCount.text = "剩余对联次数：" + model.duilianCount + "/10";
            // self.okBtn.checkNotice = true;
        }
        else {
            self.vres.visible = true;
            self.labCount.text = "对联：";
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "410429.png", self.vres.getChild("icon").asLoader);
            self.vres.text = "" + itemCount;
            // if(itemCount > 0)
            // {
            // 	self.okBtn.checkNotice = true;
            // }
        }
        var len = model.rewardArr.length;
        var max = 0;
        for (var i = 0; i < len; i++) {
            var vo = model.rewardArr[i];
            self._rewardArr[i].setVo(vo);
            var cfg = Config.ddlreward_297[vo.id];
            max = cfg.num;
        }
        self.expBar.max = max;
        self.expBar.value = model.correctCount;
        if (bol) {
            self.resetItem();
        }
    };
    Child_ActCom_DDL.prototype.onXialian = function (e) {
        var v = e.currentTarget;
        var self = this;
        self._curSelect = v.index;
        var len = self.itemArr.length;
        for (var i = 0; i < len; i++) {
            var item = self.itemArr[i];
            if (item.index == v.index) {
                item.setSelect(true);
            }
            else {
                item.setSelect(false);
            }
        }
        var cfg = v.cfg;
        if (cfg == null)
            return;
        var index = self.xialianPos.indexOf((v.index + 1));
        if (index >= 0)
            return;
        self.xialianPos.push((v.index + 1));
        self._xialianStr += v.str;
        self.xialian.text = self._xialianStr;
        v.content.text = "";
    };
    /**
     * 重来
     */
    Child_ActCom_DDL.prototype.onAgain = function () {
        var self = this;
        self.resetItem();
    };
    /**
     * 重置
     */
    Child_ActCom_DDL.prototype.resetItem = function () {
        var self = this;
        self.xialianPos = [];
        self._xialianStr = "";
        self.xialian.text = "";
        var model = GGlobal.model_DDL;
        var len = self.itemArr.length;
        for (var i = 0; i < len; i++) {
            var item = self.itemArr[i];
            item.setData(self._cfg, model.xiaLians[i], i);
            if (item.index == self._curSelect) {
                item.setSelect(true);
            }
            else {
                item.setSelect(false);
            }
        }
    };
    /**
     * 确定
     */
    Child_ActCom_DDL.prototype.onOK = function () {
        var self = this;
        var len = self.xialianPos.length;
        var arr = [];
        var model = GGlobal.model_DDL;
        model.CG_COMMIT(self.xialianPos);
    };
    /**
     * 打开排名奖励界面
     */
    Child_ActCom_DDL.prototype.onBtnRank = function () {
        GGlobal.layerMgr.open(UIConst.DDL_RANK, { qs: this._vo.qs });
    };
    Child_ActCom_DDL.URL = "ui://ke8qv0ckehld0";
    Child_ActCom_DDL.pkg = "ActCom_DDL";
    return Child_ActCom_DDL;
}(fairygui.GComponent));
__reflect(Child_ActCom_DDL.prototype, "Child_ActCom_DDL");
