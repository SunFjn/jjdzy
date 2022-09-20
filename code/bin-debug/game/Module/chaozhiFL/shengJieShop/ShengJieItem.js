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
var ShengJieItem = (function (_super) {
    __extends(ShengJieItem, _super);
    function ShengJieItem() {
        return _super.call(this) || this;
    }
    ShengJieItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ShengJieItem"));
    };
    ShengJieItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.grid = (a.getChild("grid"));
        a.grid.isShowEff = true;
        a.buyBt = (a.getChild("buyBt"));
        a.typeImg0 = (a.getChild("typeImg0"));
        a.typeImg1 = (a.getChild("typeImg1"));
        a.buyImg = (a.getChild("buyImg"));
        a.disImg = (a.getChild("disImg"));
        a.nameLb = (a.getChild("nameLb"));
        a.dataLb = (a.getChild("dataLb"));
        a.dataLb.leading = 10;
        a.promptLb = (a.getChild("promptLb"));
        a.disLb = (a.getChild("disLb"));
        a.buyBt.addClickListener(a.buyHandle, this);
    };
    ShengJieItem.prototype.buyHandle = function () {
        var a = this;
        if (this.grid.vo.gType == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
            GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
            return;
        }
        if (a.vo.buyNum <= 0 && a.vo.buyNum != -1) {
            ViewCommonWarn.text("该商品已售罄");
            return;
        }
        var moneyArr = JSON.parse(a.vo.money);
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
        GGlobal.modelCZFL.CG_SHENGJIESHOP_BUY(a.vo.id);
    };
    ShengJieItem.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        if (vo) {
            var itemArr = ConfigHelp.makeItemListArr(JSON.parse(vo.item));
            var gridVo = itemArr[0];
            a.grid.isShowEff = true;
            a.grid.vo = gridVo;
            a.grid.tipEnabled = true;
            a.nameLb.text = gridVo.name;
            a.nameLb.color = Color.getColorInt(gridVo.quality);
            var oldmoneyArr = JSON.parse(vo.oldmoney);
            var moneyArr = JSON.parse(vo.money);
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
            if (vo.buyNum > 0 || vo.buyNum == -1) {
                color1 = 2;
            }
            else {
                color1 = 6;
                a.buyImg.visible = true;
                a.buyBt.visible = false;
            }
            if (vo.buyNum == -1) {
                a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
                    HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
            }
            else {
                a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
                    HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
            }
            a.typeImg0.url = CommonManager.getMoneyUrl(oldmoneyArr[0][0]);
            a.typeImg1.url = CommonManager.getMoneyUrl(moneyArr[0][0]);
            if (vo.off > 0) {
                a.disLb.text = vo.off + "折";
                a.disImg.visible = a.disLb.visible = true;
            }
            else {
                a.disImg.visible = a.disLb.visible = false;
            }
            var arr = ["", "武将", "宝物", "天书", "神剑", "异宝", "战甲", "兵法"];
            var arr1 = [0, Model_WuJiang.jieShu, Model_BaoWu.level, GGlobal.modeltianshu.level, Model_BySys.sysJie(Model_BySys.SHEN_JIAN),
                Model_BySys.sysJie(Model_BySys.YI_BAO), Model_ZhanJia.jieShu, Model_BySys.sysJie(Model_BySys.BING_FA)];
            var jieshu = arr1[vo.day];
            if (jieshu < vo.lv) {
                a.promptLb.visible = true;
                a.buyBt.visible = false;
                a.promptLb.text = arr[vo.day] + Math.floor(vo.lv / 10) + "阶可购买";
            }
            else {
                a.promptLb.visible = false;
            }
        }
    };
    ShengJieItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    ShengJieItem.URL = "ui://qzsojhcrpdbd1i";
    return ShengJieItem;
}(fairygui.GComponent));
__reflect(ShengJieItem.prototype, "ShengJieItem");
