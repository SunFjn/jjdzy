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
var Child_ActCom_JRSC = (function (_super) {
    __extends(Child_ActCom_JRSC, _super);
    function Child_ActCom_JRSC() {
        var _this = _super.call(this) || this;
        _this.zhe = 0;
        return _this;
    }
    Child_ActCom_JRSC.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_JRSC", "Child_ActCom_JRSC"));
    };
    Child_ActCom_JRSC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_JRSC.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_ActCom_JRSC.URL, Item_ActCom_JRSC);
    };
    Child_ActCom_JRSC.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
    };
    Child_ActCom_JRSC.prototype.openPanel = function (pData) {
        var s = this;
        // s.y = 257;
        s._act = pData;
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "jrsc.jpg");
        Timer.instance.listen(s.upTimer, s, 1000);
        s.registerEvent(true);
    };
    Child_ActCom_JRSC.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        IconUtil.setImg(s.imgBg, null);
        Timer.instance.remove(s.upTimer, s);
        s.registerEvent(false);
    };
    Child_ActCom_JRSC.prototype.registerEvent = function (pFlag) {
        var s = this;
        var m = GGlobal.model_ActJRSC;
        m.register(pFlag, Model_ActComJRSC.OPENUI, s.upView, s);
        m.register(pFlag, Model_ActComJRSC.FRESH_ZHE, s.upFreshZhe, s);
        m.register(pFlag, Model_ActComJRSC.FRESH_ITEM, s.upFreshItem, s);
        EventUtil.register(pFlag, s.btnZhe, egret.TouchEvent.TOUCH_TAP, s.onZhe, s);
        EventUtil.register(pFlag, s.btnShop, egret.TouchEvent.TOUCH_TAP, s.onShop, s);
    };
    Child_ActCom_JRSC.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActCom_JRSC.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVo(s._listData[index], s.zhe);
    };
    Child_ActCom_JRSC.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.lbTime.text = "00:00:00";
        }
    };
    Child_ActCom_JRSC.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_ActJRSC;
        s.zhe = Config.jrsczkb_334[m.zhe].zk / 100;
        //时间
        s._listData = m.shopArr;
        s.list.numItems = s._listData.length;
        // if (s._listData.length > 0) {
        // 	s.list.scrollToView(0);
        // }
        var jrscsxb = Config.jrscsxb_334[s._act.qs];
        //刷新商品价格
        s.lbYB.text = JSON.parse(jrscsxb.sp)[0][2] + "";
        s.btnZhe.checkNotice = m.freeCt > 0;
        s.lbZhe.text = "本轮商品折扣：" + HtmlUtil.fontNoSize(s.zhe + "折", Color.GREENSTR);
        // s.lbZheCt.text = "剩余刷新折扣次数：" + HtmlUtil.fontNoSize(m.freshCt + "次", m.freshCt > 0 ? Color.GREENSTR : Color.REDSTR)
        s.lbZheCt.text = "最低折扣：" + (m.getMinZhe(s._act.qs) / 100) + "折";
        if (m.freeCt > 0) {
            s.imgIt.visible = false;
            s.lbIt.text = "";
            s.btnZhe.text = "免费刷新";
        }
        else if (m.itCt > 0) {
            s.lbIt.text = HtmlUtil.fontNoSize(m.itCt + "次", Color.GREENSTR);
            IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + Config.daoju_204[Model_ActComJRSC.ITEM_ID].icon + ".png");
            s.imgIt.visible = true;
            s.btnZhe.text = "刷新折扣";
        }
        else {
            s.imgIt.visible = true;
            s.lbIt.text = m.getAddCtPrice(s._act.qs, m.addCt) + "";
            IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + 4 + ".png");
            s.btnZhe.text = "刷新折扣";
        }
    };
    Child_ActCom_JRSC.prototype.onShop = function () {
        ViewAlert.show("刷新商品会重置折扣，确认刷新商品？", Handler.create(GGlobal.model_ActJRSC, GGlobal.model_ActJRSC.CG_REFRESH_10801));
        // GGlobal.model_ActJRSC.CG_REFRESH_10801();
    };
    Child_ActCom_JRSC.prototype.onZhe = function () {
        GGlobal.model_ActJRSC.CG_REFRESH_ZHE_10803();
    };
    Child_ActCom_JRSC.prototype.upFreshItem = function () {
        for (var i = 0; i < this.list.numChildren; i++) {
            var gridRender = this.list.getChildAt(i);
            if (gridRender && gridRender.vo) {
                var grid = gridRender.grid;
                EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
            }
        }
    };
    Child_ActCom_JRSC.prototype.upFreshZhe = function () {
        for (var i = 0; i < this.list.numChildren; i++) {
            var gridRender = this.list.getChildAt(i);
            if (gridRender && gridRender.vo) {
                var grid = gridRender;
                EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.dataLb.x + 80, grid.dataLb.y + 40, 400, 400, false);
            }
        }
    };
    Child_ActCom_JRSC.URL = "ui://zq6iymuqocq24";
    Child_ActCom_JRSC.pkg = "actCom_JRSC";
    return Child_ActCom_JRSC;
}(fairygui.GComponent));
__reflect(Child_ActCom_JRSC.prototype, "Child_ActCom_JRSC");
