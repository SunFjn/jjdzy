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
 * 新活动-貔貅散宝
 */
var Child_ActCom_PXSB = (function (_super) {
    __extends(Child_ActCom_PXSB, _super);
    function Child_ActCom_PXSB() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_PXSB.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_ActCom_PXSB.URL, Item_ActCom_PXSB);
        f(PXSBGrid.URL, PXSBGrid);
    };
    Child_ActCom_PXSB.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_PXSB", "Child_ActCom_PXSB"));
    };
    Child_ActCom_PXSB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_PXSB.prototype.initView = function (pParent) {
        var s = this;
        s._tabArr = [];
        for (var i = 0; i < 3; i++) {
            s._tabArr.push(s["tab" + i]);
        }
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
    };
    Child_ActCom_PXSB.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        self.show();
    };
    Child_ActCom_PXSB.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
    };
    Child_ActCom_PXSB.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_PXSB.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        GGlobal.control.remove(UIConst.ACTCOM_PXSB, self.updateView, self);
        for (var i = 0; i < self._tabArr.length; i++) {
            self._tabArr[i].removeClickListener(self.updateList, self);
        }
        self.btnGet.removeClickListener(self.onGet, self);
        self.disPoAwat();
        IconUtil.setImg(self.iconG, null);
        IconUtil.setImg(self.bgImg, null);
        self.list.numItems = 0;
    };
    Child_ActCom_PXSB.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.onUpdate, self, 1000);
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        GGlobal.control.listen(UIConst.ACTCOM_PXSB, self.updateView, self);
        for (var i = 0; i < self._tabArr.length; i++) {
            self._tabArr[i].addClickListener(self.updateList, self);
        }
        self.c1.selectedIndex = 0;
        self.btnGet.addClickListener(self.onGet, self);
    };
    Child_ActCom_PXSB.prototype.onUpdate = function () {
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
    Child_ActCom_PXSB.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setData(this._listData[index], this._pxsbVO.day);
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_PXSB.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_ActPXSB;
        if (!Model_ActComPXSB.rewardArr || Model_ActComPXSB.rewardArr.length <= 0)
            return;
        var len = Model_ActComPXSB.rewardArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_ActComPXSB.rewardArr[i];
            var cfg = Config.pxsbdj_778[vo.id];
            var btn = self._tabArr[i];
            btn.title = "消费" + model.getWanText1(cfg.xf);
            btn.checkNotice = model.reddotCheckByIndex(i);
        }
        self.xfLab.text = model.xfNum + "";
        self.updateList();
    };
    Child_ActCom_PXSB.prototype.updateList = function () {
        var self = this;
        self._pxsbVO = Model_ActComPXSB.rewardArr[self.c1.selectedIndex];
        self._listData = Model_ActComPXSB.getListData(self._pxsbVO.arr);
        self.list.numItems = self._listData.length;
        self.btnGet.grayed = self._pxsbVO.status == 0 ? true : false;
        self.btnGet.checkNotice = self._pxsbVO.status == 1 ? true : false;
        self.btnGet.visible = self._pxsbVO.status == 0 || self._pxsbVO.status == 1 ? true : false;
        self.imgGet.visible = self._pxsbVO.status == 2 ? true : false;
        var cfg = Config.pxsbdj_778[self._pxsbVO.id];
        // self.showPicsByType(cfg.zs);
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + cfg.tpz + ".jpg");
        var reward = JSON.parse(cfg.jl)[0];
        self.bpReward.setVo(reward, true);
    };
    /**
     * 领取大奖
     */
    Child_ActCom_PXSB.prototype.onGet = function () {
        var self = this;
        var model = GGlobal.model_ActPXSB;
        model.CG_GET(1, self._pxsbVO.id);
    };
    Child_ActCom_PXSB.prototype.showPicsByType = function (arg) {
        var showInfo = JSON.parse(arg)[0];
        var type = showInfo[0];
        var value = showInfo[1];
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
        switch (type) {
            case 1://展示图片
                IconUtil.setImg(self.iconG, Enum_Path.PIC_URL + value + ".png");
                // self.showEff(true, 1);
                self.iconG.visible = true;
                break;
            case 2://展示模型
                var position = null;
                self.iconG.visible = false;
                position = { x: 530, y: 400 };
                // self.showEff(false, 2);
                if (!self.awatar) {
                    self.awatar = UIRole.create();
                    self.awatar.uiparent = self._container;
                    self.awatar.setScaleXY(0.8, 0.8);
                }
                self.awatar.setPos(position.x, position.y);
                self.awatar.setBody(value);
                self.awatar.setWeapon(value);
                self.awatar.onAdd();
                var cfgh = Config.hero_211[value];
                var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
                var secSkill = skillsArr[1][0];
                if (self.secSkill != secSkill) {
                    self.secSkill = secSkill;
                    Timer.instance.remove(self.playSkill, self);
                    self.playSkill();
                }
                break;
            case 3://展示神兵
                self.iconG.visible = true;
                self.godEff = EffectMgr.addEff("uieff/" + value, self.iconG.displayObject, self.iconG.width / 2, self.iconG.height / 2, 1000);
                break;
        }
    };
    Child_ActCom_PXSB.prototype.playSkill = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.playSkillID(self.secSkill, false);
            Timer.instance.callLater(self.playSkill, 5000, self);
        }
    };
    Child_ActCom_PXSB.prototype.disPoAwat = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        Timer.instance.remove(self.playSkill, self);
        self.secSkill = 0;
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
    };
    Child_ActCom_PXSB.URL = "ui://qb4y6bxephch0";
    Child_ActCom_PXSB.pkg = "actCom_PXSB";
    return Child_ActCom_PXSB;
}(fairygui.GComponent));
__reflect(Child_ActCom_PXSB.prototype, "Child_ActCom_PXSB");
