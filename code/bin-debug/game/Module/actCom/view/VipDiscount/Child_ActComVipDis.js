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
 * vip折扣活动
 */
var Child_ActComVipDis = (function (_super) {
    __extends(Child_ActComVipDis, _super);
    function Child_ActComVipDis() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this._sortDta = [];
        _this._vip = 0;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActComVipDis.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        fairygui.UIObjectFactory.setPackageItemExtension(VipDiscountItem.URL, VipDiscountItem);
    };
    Child_ActComVipDis.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComVipDis", "Child_ActComVipDis"));
    };
    Child_ActComVipDis.prototype.initView = function (pParent) {
        var self = this;
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.tabHD;
    };
    Child_ActComVipDis.prototype.openPanel = function (pData) {
        var self = this;
        self.datas = [];
        var role = Model_player.voMine;
        for (var key in Config.xhdvip_402) {
            var cfg = Config.xhdvip_402[key];
            if (role.viplv + 3 >= cfg.ID) {
                self.datas.push(Config.xhdvip_402[key]);
            }
        }
        // self.list.numItems = self.datas.length;
        self._act = pData; // GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_VIPZK);
        GGlobal.modelVipDiscount.CG_OPEN_UI();
        GGlobal.control.listen(UIConst.ACTCOM_VIPZK, self.updateChildShow, self);
        Timer.instance.listen(this.onUpdate, this);
    };
    Child_ActComVipDis.prototype.closePanel = function (pData) {
        var self = this;
        self.datas = [];
        GGlobal.control.remove(UIConst.ACTCOM_VIPZK, self.updateChildShow, self);
        Timer.instance.remove(this.onUpdate, this);
    };
    Child_ActComVipDis.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComVipDis.prototype.onUpdate = function () {
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.timeTxt.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.timeTxt.text = "00:00:00";
        }
    };
    Child_ActComVipDis.prototype.tabHD = function (idx, obj) {
        var item = obj;
        item.setdata(this.datas[idx], this._vip == this.datas[idx].ID);
    };
    /**
     * 更新页面数据
     */
    Child_ActComVipDis.prototype.updateChildShow = function (vip) {
        if (vip === void 0) { vip = 0; }
        var self = this;
        self._vip = vip;
        // let noGetArr = [];//可领取数组
        // let hasGetArr = [];//已领取数组
        // let len:number = self.datas.length;
        // for(let i:number = 0;i < len;i ++)
        // {
        //     let cfg:Ixhdvip_402 = self.datas[i];
        //     let vo:Vo_VipDisData = Model_VipDiscount.getVipDisData(cfg.ID);
        //     if(!vo)
        //     {
        //         noGetArr.push(cfg);
        //     }else{
        //         if(vo.buyCount < cfg.time)
        //         {
        //             noGetArr.push(cfg);
        //         }else
        //         {
        //             hasGetArr.push(cfg);
        //         }
        //     }
        // }
        // self._sortDta = noGetArr.concat(hasGetArr);
        self.list.numItems = self.datas.length;
    };
    Child_ActComVipDis.URL = "ui://mpjztentog19r";
    /** 设置包名（静态属性） */
    Child_ActComVipDis.pkg = "actComVipDis";
    return Child_ActComVipDis;
}(fairygui.GComponent));
__reflect(Child_ActComVipDis.prototype, "Child_ActComVipDis", ["IPanel"]);
