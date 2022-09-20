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
var Item_ActCom_LJFL = (function (_super) {
    __extends(Item_ActCom_LJFL, _super);
    function Item_ActCom_LJFL() {
        return _super.call(this) || this;
    }
    Item_ActCom_LJFL.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_LJFL", "Item_ActCom_LJFL"));
    };
    Item_ActCom_LJFL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnGo.addClickListener(s.onGo, s);
        s.btnGet.addClickListener(s.onGet, s);
    };
    Item_ActCom_LJFL.prototype.setVo = function (v, flag) {
        var s = this;
        s._vo = v;
        s._flag = flag;
        var rmb = Config.shop_011[v.id].RMB;
        s.lbTitle.text = "单笔充值<font color='#F5CA0C'>" + rmb + "</font>元";
        // let lj = v.lj > v.cfg.sx ? v.cfg.sx : v.lj
        // s.lbLi.text = lj + "% / " + v.cfg.sx + "%"
        s.lbLi.text = v.lj + "%";
        // s.lb.text = v.lj + "天后充值可激活"
        s.grid.tipEnabled = s.grid.isShowEff = true;
        var cy = Vo_Currency.create(Enum_Attr.yuanBao);
        cy.count = rmb * v.lj;
        s.grid.vo = cy;
        s.grid.showText = cy.count + "";
        v.st = 0;
        if (v.st == 2) {
            s.imgHas.visible = true;
            s.btnGo.visible = false;
            s.btnGet.visible = false;
        }
        else if (v.st == 1) {
            s.imgHas.visible = false;
            s.btnGo.visible = false;
            s.btnGet.visible = s.btnGet.checkNotice = true;
        }
        else {
            s.imgHas.visible = false;
            s.btnGo.visible = true;
            s.btnGet.visible = false;
        }
    };
    Item_ActCom_LJFL.prototype.onGo = function () {
        var s = this;
        if (!s._flag) {
            ViewCommonWarn.text("未到充值时间");
            return;
        }
        if (!s._vo) {
            return;
        }
        // ViewChongZhi.tryToOpenCZ();
        GGlobal.modelchongzhi.CG_CHONGZHI_135(s._vo.id, null, false);
    };
    Item_ActCom_LJFL.prototype.onGet = function () {
        var s = this;
        if (!s._vo)
            return;
        GGlobal.model_ActLJFL.CG_GET_10751(s._vo.id);
    };
    Item_ActCom_LJFL.prototype.clean = function () {
        var s = this;
        s.grid.clean();
    };
    Item_ActCom_LJFL.URL = "ui://y35rlqhydufs6";
    return Item_ActCom_LJFL;
}(fairygui.GComponent));
__reflect(Item_ActCom_LJFL.prototype, "Item_ActCom_LJFL");
