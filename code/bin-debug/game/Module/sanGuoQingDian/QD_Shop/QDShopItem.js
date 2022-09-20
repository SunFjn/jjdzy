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
var QDShopItem = (function (_super) {
    __extends(QDShopItem, _super);
    function QDShopItem() {
        return _super.call(this) || this;
    }
    QDShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "QDShopItem"));
    };
    QDShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.grid.isShowEff = true;
        self.dataLb.leading = 10;
        self.buyBt.addClickListener(self.buyHandle, this);
    };
    QDShopItem.prototype.buyHandle = function () {
        var a = this;
        if (this.grid.vo.gType == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
            GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
            return;
        }
        if (a.vo.cfg.time - a.vo.buyNum <= 0 && a.vo.cfg.time != 0) {
            ViewCommonWarn.text("该商品已售罄");
            return;
        }
        var moneyArr = JSON.parse(a.vo.cfg.money);
        var voMine = Model_player.voMine;
        switch (moneyArr[0][0]) {
            case Enum_Attr.yuanBao:
                if (voMine.yuanbao < moneyArr[0][2]) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
                break;
            case Enum_Attr.TONGBI:
                if (voMine.tongbi < moneyArr[0][2]) {
                    ViewCommonWarn.text("铜币不足");
                    return;
                }
                break;
        }
        GGlobal.modelSGQD.CG_SGQD_BUYITEM(a.vo.cfg.id);
    };
    QDShopItem.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        if (vo) {
            var itemArr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.item));
            var gridVo = itemArr[0];
            a.grid.vo = gridVo;
            a.grid.tipEnabled = true;
            a.nameLb.text = gridVo.name;
            a.nameLb.color = Color.getColorInt(gridVo.quality);
            var oldmoneyArr = JSON.parse(vo.cfg.oldmoney);
            var moneyArr = JSON.parse(vo.cfg.money);
            var voMine = Model_player.voMine;
            var color = void 0;
            switch (moneyArr[0][0]) {
                case Enum_Attr.yuanBao:
                    if (voMine.yuanbao < moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
                case Enum_Attr.TONGBI:
                    if (voMine.tongbi < moneyArr[0][2]) {
                        color = 6;
                    }
                    else {
                        color = 1;
                    }
                    break;
            }
            a.buyBt.visible = true;
            a.buyImg.visible = false;
            var color1 = void 0;
            if (vo.cfg.time - vo.buyNum > 0 || vo.cfg.time == 0) {
                color1 = 2;
            }
            else {
                color1 = 6;
                a.buyImg.visible = true;
                a.buyBt.visible = false;
            }
            if (vo.cfg.time == 0) {
                a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
                    HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
            }
            else {
                a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
                    HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color)) + "\n" +
                    HtmlUtil.fontNoSize("限购(" + (vo.cfg.time - vo.buyNum) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
            }
            a.typeImg0.url = CommonManager.getMoneyUrl(oldmoneyArr[0][0]);
            a.typeImg1.url = CommonManager.getMoneyUrl(moneyArr[0][0]);
            if (vo.cfg.off > 0) {
                a.disLb.text = (vo.cfg.off / 100) + "折";
                a.disImg.visible = a.disLb.visible = true;
            }
            else {
                a.disImg.visible = a.disLb.visible = false;
            }
            a.promptLb.visible = false;
        }
    };
    QDShopItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    QDShopItem.URL = "ui://kdt501v2qrkf1r";
    return QDShopItem;
}(fairygui.GComponent));
__reflect(QDShopItem.prototype, "QDShopItem");
