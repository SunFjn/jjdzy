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
var HOnlyShopItem = (function (_super) {
    __extends(HOnlyShopItem, _super);
    function HOnlyShopItem() {
        return _super.call(this) || this;
    }
    HOnlyShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDOnly", "HOnlyShopItem"));
    };
    HOnlyShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(this, this);
        a.grid.isShowEff = true;
        a.dataLb.leading = 10;
        a.buyBt.addClickListener(a.buyHandle, a);
    };
    HOnlyShopItem.prototype.buyHandle = function () {
        var a = this;
        if (a.vo.itemArr[0][0] == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
            GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
            return;
        }
        if (a.vo.buyNum >= a.vo.time && a.vo.time != 0) {
            ViewCommonWarn.text("该商品已售罄");
            return;
        }
        var voMine = Model_player.voMine;
        switch (a.vo.moneyArr[0][0]) {
            case Enum_Attr.yuanBao:
                if (voMine.yuanbao < a.vo.moneyArr[0][2]) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
                break;
            case Enum_Attr.TONGBI:
                if (voMine.tongbi < a.vo.moneyArr[0][2]) {
                    ViewCommonWarn.text("铜币不足");
                    return;
                }
                break;
            case Enum_Attr.PRESTIGE:
                if (voMine.prestige < a.vo.moneyArr[0][2]) {
                    ViewCommonWarn.text("声望不足");
                    return;
                }
                break;
            case Enum_Attr.ITEM:
                var itemVo = VoItem.create(a.vo.moneyArr[0][1]);
                if (Model_Bag.getItemCount(a.vo.moneyArr[0][1]) < a.vo.moneyArr[0][2]) {
                    ViewCommonWarn.text(itemVo.name + "不足");
                    return;
                }
                break;
            case Enum_Attr.BOSSJF:
                if (voMine.bossZCScore < a.vo.moneyArr[0][2]) {
                    ViewCommonWarn.text("BOSS积分不足");
                    return;
                }
                break;
        }
        GGlobal.modelHuoDOnly.CG_SHOP_BUY_8161(a._act.id, a.vo.id);
    };
    HOnlyShopItem.prototype.setVo = function (vo, act) {
        var a = this;
        a.vo = vo;
        a._act = act;
        if (vo) {
            var gridVo = void 0;
            if (vo.itemArr[0][0] == Enum_Attr.ITEM) {
                gridVo = VoItem.create(vo.itemArr[0][1]);
            }
            else if (vo.itemArr[0][0] == Enum_Attr.EQUIP) {
                gridVo = VoEquip.create(vo.itemArr[0][1]);
            }
            else {
                gridVo = Vo_Currency.create(vo.itemArr[0][0]);
            }
            gridVo.count = vo.itemArr[0][2];
            a.grid.vo = gridVo;
            a.grid.tipEnabled = true;
            a.nameLb.text = gridVo.name;
            a.nameLb.color = Color.getColorInt(gridVo.quality);
            var voMine = Model_player.voMine;
            var color = void 0;
            switch (a.vo.moneyArr[0][0]) {
                case Enum_Attr.yuanBao:
                    if (voMine.yuanbao < a.vo.moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
                case Enum_Attr.TONGBI:
                    if (voMine.tongbi < a.vo.moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
                case Enum_Attr.PRESTIGE:
                    if (voMine.prestige < a.vo.moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
                case Enum_Attr.ITEM:
                    var itemVo = VoItem.create(a.vo.moneyArr[0][1]);
                    if (Model_Bag.getItemCount(a.vo.moneyArr[0][1]) < a.vo.moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
            }
            if (vo.store == 3 && vo.buyNum < vo.time && ((vo.condition.length > 0 && voMine.viplv >= vo.condition[0][1]) || vo.condition.length <= 0)) {
                this.buyBt.checkNotice = color != 6;
            }
            else {
                this.buyBt.checkNotice = false;
            }
            a.buyImg.visible = false;
            a.buyBt.visible = true;
            var buyVisSig = false;
            var color1 = void 0;
            if (vo.time == 0 || vo.time - vo.buyNum > 0) {
                color1 = 2;
                buyVisSig = true;
            }
            else {
                color1 = 6;
                a.buyImg.visible = true;
                a.buyBt.visible = false;
                buyVisSig = false;
            }
            a.typeImg0.url = CommonManager.getMoneyUrl(vo.moneyArr[0][0], vo.moneyArr[0][1]);
            a.disImg.visible = a.disLb.visible = false;
            if (vo.time == 0) {
                a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(vo.moneyArr[0][2]);
            }
            else {
                a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(vo.moneyArr[0][2]) + "\n\n" +
                    HtmlUtil.fontNoSize("限购(" + (vo.time - vo.buyNum) + "/" + vo.time + ")", Color.getColorStr(color1));
            }
            a.typeImg1.visible = false;
            a.lineImg.visible = false;
            if (vo.condition.length > 0 && voMine.viplv < vo.condition[0][1]) {
                a.promptLb.visible = true;
                a.buyBt.visible = false;
                a.promptLb.text = vo.tips;
            }
            else {
                a.promptLb.visible = false;
                a.buyBt.visible = true && buyVisSig;
            }
        }
    };
    HOnlyShopItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    HOnlyShopItem.URL = "ui://mk3gp0vrujy06";
    return HOnlyShopItem;
}(fairygui.GComponent));
__reflect(HOnlyShopItem.prototype, "HOnlyShopItem");
