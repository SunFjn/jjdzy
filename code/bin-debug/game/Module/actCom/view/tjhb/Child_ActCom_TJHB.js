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
 * 新活动-天降红包
 */
var Child_ActCom_TJHB = (function (_super) {
    __extends(Child_ActCom_TJHB, _super);
    function Child_ActCom_TJHB() {
        return _super.call(this) || this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_TJHB.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(TJHBItem.URL, TJHBItem);
        f(ItemHBRecord.URL, ItemHBRecord);
        f(ItemFHB.URL, ItemFHB);
    };
    Child_ActCom_TJHB.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_TJHB", "Child_ActCom_TJHB"));
    };
    Child_ActCom_TJHB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
        s.list.setVirtual();
    };
    Child_ActCom_TJHB.prototype.initView = function (pParent) {
    };
    Child_ActCom_TJHB.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao.jpg");
        self.y = 264;
        self.show();
    };
    Child_ActCom_TJHB.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
        IconUtil.setImg(self.bgImg, null);
        self.btnFHB.removeClickListener(self.onFHB, self);
        Model_ActComTJHB.id = 0;
    };
    Child_ActCom_TJHB.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_TJHB.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.ACTCOM_TJHB, self.updateView, self);
        GGlobal.reddot.remove(UIConst.ACTCOM_TJHB, self.updateFaRed, self);
        GGlobal.control.remove(UIConst.TJHB_FHB, self.updateFaRed, self);
    };
    Child_ActCom_TJHB.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.onUpdate, self);
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        GGlobal.control.listen(UIConst.ACTCOM_TJHB, self.updateView, self);
        self.btnFHB.addClickListener(self.onFHB, self);
        GGlobal.model_TJHB.CG_SEND_UI();
        GGlobal.reddot.listen(UIConst.ACTCOM_TJHB, self.updateFaRed, self);
        GGlobal.control.listen(UIConst.TJHB_FHB, self.updateFaRed, self);
    };
    Child_ActCom_TJHB.prototype.onUpdate = function () {
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
    Child_ActCom_TJHB.prototype.renderHandle = function (index, obj) {
        var v = obj;
        var vo = GGlobal.model_TJHB.hbArr[index];
        v.setVo(vo, Model_ActComTJHB.id == vo.hbId);
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_TJHB.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_TJHB;
        self.list.numItems = model.hbArr.length;
        var total = Config.xtcs_004[8420].num;
        if (model.residue > 0) {
            self.labCount.text = "今日可抢红包数：<font color='#00FF00'>" + model.residue + "/" + total + "</font>";
        }
        else {
            self.labCount.text = "今日可抢红包数：<font color='#ed1414'>" + model.residue + "/" + total + "</font>";
        }
        if (model.nextId > 0) {
            var cfg = Config.tjhbsys_296[model.nextId];
            self.nextTimeTxt.text = "下次系统天降红包时间  " + cfg.time;
        }
        else {
            self.nextTimeTxt.text = "下次系统天降红包时间  00:00";
        }
        self.updateFaRed();
    };
    /**
     * 打开发红包界面
     */
    Child_ActCom_TJHB.prototype.onFHB = function () {
        GGlobal.layerMgr.open(UIConst.TJHB_FHB);
    };
    /**
     * 更新发红包红点
     */
    Child_ActCom_TJHB.prototype.updateFaRed = function () {
        var self = this;
        var bol = false;
        var model = GGlobal.model_TJHB;
        var len = model.fhbArr.length;
        for (var i = 0; i < len; i++) {
            var vo = model.fhbArr[i];
            if (vo.sendStatus == 1) {
                bol = true;
                break;
            }
        }
        self.btnFHB.checkNotice = bol;
        // self.btnFHB.checkNotice = GGlobal.reddot.checkCondition(UIConst.ACTCOM_TJHB, 1);
    };
    Child_ActCom_TJHB.URL = "ui://fm0lrzcttl0c0";
    Child_ActCom_TJHB.pkg = "ActCom_TJHB";
    return Child_ActCom_TJHB;
}(fairygui.GComponent));
__reflect(Child_ActCom_TJHB.prototype, "Child_ActCom_TJHB");
