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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var Child_WeekVip = (function (_super) {
    __extends(Child_WeekVip, _super);
    function Child_WeekVip() {
        return _super.call(this) || this;
    }
    Child_WeekVip.createInstance = function () {
        if (!this._ins)
            this._ins = (fairygui.UIPackage.createObject("tequan", "Child_WeekVip"));
        return this._ins;
    };
    Child_WeekVip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n5 = (this.getChild("n5"));
        this.n13 = (this.getChild("n13"));
        this.n16 = (this.getChild("n16"));
        this.n11 = (this.getChild("n11"));
        this.n17 = (this.getChild("n17"));
        this.n12 = (this.getChild("n12"));
        this.lbTime = (this.getChild("lbTime"));
        this._grids = [this.n1, this.n2, this.n3];
    };
    Child_WeekVip.prototype.onClick = function () {
        if (Model_Welfare.weekVip_remainTime > 0) {
            GGlobal.modelwelfare.CG_WEEK_VIP_LQ();
        }
        else {
            GGlobal.modelchongzhi.CG_CHONGZHI_135(51);
        }
    };
    Child_WeekVip.prototype.renewHD = function () {
        var cfg1 = Config.shop_011[51];
        var tips = "续费成功可立即获得<font color='#15f234'>" + cfg1.num + "元宝</font>\n" + cfg1.name + "有效期延长7天";
        GGlobal.modelchongzhi.CG_CHONGZHI_135(51, tips);
    };
    Child_WeekVip.prototype.setNotice = function () {
        this.n5.checkNotice = GGlobal.reddot.checkCondition(UIConst.WEEK_VIP);
    };
    Child_WeekVip.prototype.updateX = function () {
        if (Model_Welfare.weekVip_remainTime > Model_GlobalMsg.getServerTime()) {
            var t = Model_Welfare.weekVip_remainTime - Model_GlobalMsg.getServerTime();
            this.lbTime.text = "" + TimeUitl.getRemainingTime(t, 0);
        }
    };
    Child_WeekVip.prototype.updateUI = function () {
        this.n11.visible = Model_Welfare.weekVip_remainTime > 0 && Model_Welfare.weekVip_Awards == 2;
        var price = Config.shop_011[51].rmb / 100;
        this.n5.text = Model_Welfare.weekVip_remainTime > 0 ? "领取" : price + "元";
        this.n13.visible = Model_Welfare.weekVip_remainTime > 0;
        this.n5.visible = !this.n11.visible;
        this.n5.checkNotice = Model_Welfare.weekVip_remainTime > 0;
        this.lbTime.text = Model_Welfare.weekVip_remainTime > 0 ? "" : "尚未激活";
    };
    Child_WeekVip.prototype.open = function () {
        var a = this;
        var cfg = Config.weekcard_267[1];
        var vos = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < a._grids.length; i++) {
            var grid = a._grids[i];
            grid.tipEnabled = true;
            grid.vo = vos[i];
            grid.showEff(true);
        }
        a.updateUI();
        GGlobal.modelwelfare.CG_OPEN_WEEKVIP();
        a.n5.addClickListener(a.onClick, a);
        a.n13.addClickListener(a.renewHD, a);
        GGlobal.reddot.listen(UIConst.WEEK_VIP, a.setNotice, a);
        GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_LQ, a.updateUI, a);
        Timer.instance.listen(this.updateX, this, 1000);
        IconUtil.setImg(this.n12, Enum_Path.PIC_URL + "card4.png");
        GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_OPEN, a.updateUI, a);
    };
    Child_WeekVip.prototype.close = function () {
        var a = this;
        IconUtil.setImg(this.n12, null);
        Timer.instance.remove(this.updateX, this);
        GGlobal.reddot.remove(UIConst.WEEK_VIP, a.setNotice, a);
        a.n5.removeClickListener(a.onClick, a);
        a.n13.removeClickListener(a.renewHD, a);
        if (a._grids) {
            for (var i = 0; i < a._grids.length; i++) {
                var grid = a._grids[i];
                grid.tipEnabled = false;
                grid.showEff(false);
            }
        }
        GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_LQ, a.updateUI, a);
        GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_OPEN, a.updateUI, a);
    };
    Child_WeekVip.URL = "ui://k82cjspuhcde21";
    return Child_WeekVip;
}(fairygui.GComponent));
__reflect(Child_WeekVip.prototype, "Child_WeekVip");
