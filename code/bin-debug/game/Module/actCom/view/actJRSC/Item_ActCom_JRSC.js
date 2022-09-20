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
var Item_ActCom_JRSC = (function (_super) {
    __extends(Item_ActCom_JRSC, _super);
    function Item_ActCom_JRSC() {
        return _super.call(this) || this;
    }
    Item_ActCom_JRSC.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_JRSC", "Item_ActCom_JRSC"));
    };
    Item_ActCom_JRSC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        a.dataLb.leading = 10;
        a.buyBt.addClickListener(a.buyHandle, a);
    };
    Item_ActCom_JRSC.prototype.buyHandle = function () {
        var a = this;
        var itemArr = JSON.parse(a.vo.cfg.dj);
        if (itemArr[0][0] == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
            GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
            return;
        }
        if (a.vo.ct >= a.vo.cfg.time && a.vo.cfg.time != 0) {
            ViewCommonWarn.text("该商品已售罄");
            return;
        }
        var moneyArr = JSON.parse(a.vo.cfg.yj);
        var voMine = Model_player.voMine;
        var money = moneyArr[0][2] * a.off / 10;
        if (voMine.yuanbao < money) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.model_ActJRSC.CG_BUY_10805(a.vo.id);
    };
    Item_ActCom_JRSC.prototype.setVo = function (vo, off) {
        var a = this;
        a.off = off;
        a._vo = vo;
        if (vo) {
            var gridVo = void 0;
            var itemArr = JSON.parse(vo.cfg.dj);
            if (itemArr[0][0] == Enum_Attr.ITEM) {
                gridVo = VoItem.create(itemArr[0][1]);
            }
            else if (itemArr[0][0] == Enum_Attr.EQUIP) {
                gridVo = VoEquip.create(itemArr[0][1]);
            }
            else {
                gridVo = Vo_Currency.create(itemArr[0][0]);
            }
            gridVo.count = itemArr[0][2];
            a.grid.vo = gridVo;
            a.grid.tipEnabled = true;
            a.nameLb.text = gridVo.name;
            a.nameLb.color = Color.getColorInt(gridVo.quality);
            var voMine = Model_player.voMine;
            var color = void 0;
            var moneyArr = JSON.parse(vo.cfg.yj);
            var newItem = ConfigHelp.makeItemListArr(moneyArr)[0];
            var money = moneyArr[0][2] * a.off / 10;
            if (voMine.yuanbao < money) {
                color = 6;
            }
            else {
                color = 1;
            }
            a.buyImg.visible = false;
            a.buyBt.visible = true;
            var buyVisSig = false;
            var color1 = void 0;
            if (vo.cfg.time == 0 || vo.cfg.time - vo.ct > 0) {
                color1 = 2;
                buyVisSig = true;
            }
            else {
                color1 = 6;
                a.buyImg.visible = true;
                a.buyBt.visible = false;
                buyVisSig = false;
            }
            IconUtil.setImg(a.typeImg0, Enum_Path.ICON70_URL + newItem.icon + ".png");
            IconUtil.setImg(a.typeImg1, Enum_Path.ICON70_URL + newItem.icon + ".png");
            if (off > 0) {
                a.disLb.text = off + "折";
                a.disImg.visible = a.disLb.visible = true;
                var str = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]), "#999999") + "\n现价：      " +
                    HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2] * off / 10), Color.getColorStr(color));
                if (vo.cfg.time != 0) {
                    str += "\n" + HtmlUtil.fontNoSize("今日(" + (vo.cfg.time - vo.ct) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
                }
                a.dataLb.text = str;
                a.typeImg1.visible = true;
                a.lineImg.visible = true;
            }
            else {
                a.disImg.visible = a.disLb.visible = false;
                if (vo.cfg.time == 0) {
                    a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]);
                }
                else {
                    a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]) + "\n\n" +
                        HtmlUtil.fontNoSize("今日(" + (vo.cfg.time - vo.ct) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
                }
                a.typeImg1.visible = false;
                a.lineImg.visible = false;
            }
            a.promptLb.visible = false;
        }
    };
    Object.defineProperty(Item_ActCom_JRSC.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    Item_ActCom_JRSC.prototype.clean = function () {
        var a = this;
        ConfigHelp.cleanGridEff(a.grid);
        IconUtil.setImg(a.typeImg0, null);
        IconUtil.setImg(a.typeImg1, null);
    };
    Item_ActCom_JRSC.URL = "ui://zq6iymuqocq25";
    return Item_ActCom_JRSC;
}(fairygui.GComponent));
__reflect(Item_ActCom_JRSC.prototype, "Item_ActCom_JRSC");
