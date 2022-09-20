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
var Child_DFZJ_SeaSel = (function (_super) {
    __extends(Child_DFZJ_SeaSel, _super);
    function Child_DFZJ_SeaSel() {
        return _super.call(this) || this;
    }
    Child_DFZJ_SeaSel.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "Child_DFZJ_SeaSel"));
    };
    Child_DFZJ_SeaSel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s._plyArr = [s.ply0, s.ply1, s.ply2, s.ply3, s.ply4, s.ply5];
        s.btnSM.text = HtmlUtil.createLink("玩法说明");
    };
    Child_DFZJ_SeaSel.prototype.show = function () {
        var s = this;
        s.registerEvent(true);
        var m = GGlobal.modelDengFengZJ;
        s.zeroReset();
        m.CG_POINT_DAT();
        s.labTips.text = "本批全部战胜额外获得" + ConfigHelp.getSystemNum(8309) + "积分";
        s.lbCge.text = JSON.parse(ConfigHelp.getSystemDesc(8301))[0][2] + "";
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "dfzj1.jpg");
    };
    Child_DFZJ_SeaSel.prototype.hide = function () {
        var s = this;
        s.registerEvent(false);
        for (var i = 0; i < s._plyArr.length; i++) {
            s._plyArr[i].clean();
        }
        IconUtil.setImg(s.imgBg, null);
    };
    Child_DFZJ_SeaSel.prototype.registerEvent = function (pFlag) {
        var self = this;
        var m = GGlobal.modelDengFengZJ;
        m.register(pFlag, Model_DengFengZJ.SEA_UI, self.updateShow, self);
        GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_SEA, self.upRed, self);
        EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
        EventUtil.register(pFlag, self.btnPoint, egret.TouchEvent.TOUCH_TAP, self.onPoint, self);
        EventUtil.register(pFlag, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.onRank, self);
        EventUtil.register(pFlag, self.btnCge, egret.TouchEvent.TOUCH_TAP, self.onChage, self);
        EventUtil.register(pFlag, self.btnSM, egret.TextEvent.LINK, self.onLink, self);
        GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
    };
    Child_DFZJ_SeaSel.prototype.zeroReset = function () {
        GGlobal.modelDengFengZJ.CG_OPENUI(0);
    };
    Child_DFZJ_SeaSel.prototype.onLink = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.DENG_FENG_SEA);
    };
    Child_DFZJ_SeaSel.prototype.onAdd = function () {
        var m = GGlobal.modelDengFengZJ;
        var s = this;
        if (m.status != 1) {
            ViewCommonWarn.text("本周赛事已结束");
            return;
        }
        ViewDengFengBuy.show(m.hasSeaBuy, Config.dfzjhx3_261, Handler.create(null, s.sureAdd));
    };
    Child_DFZJ_SeaSel.prototype.sureAdd = function (ct) {
        GGlobal.modelDengFengZJ.CG_BUY_TIME(0, ct);
    };
    Child_DFZJ_SeaSel.prototype.updateShow = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        s.lbPower.text = "" + ConfigHelp.getYiWanText(m.seaPower);
        s.lbMyRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR));
        s.lbMyPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR);
        s.upRed();
        if (m.seaData.length == 0) {
            return;
        }
        //0   1,2,   3,4,5
        var unBatIdx = -1; //未挑战序号
        for (var i = m.seaData.length - 1; i >= 0; i--) {
            var v = m.seaData[i];
            if (v.st == 0) {
                unBatIdx = i;
                break;
            }
        }
        for (var i = 0; i < s._plyArr.length; i++) {
            s._plyArr[i].seaVo(m.seaData[i], i, unBatIdx);
        }
        if (m.seaFreEff) {
            Timer.instance.callLater(s.showEff, 300, s, 0, false, false, true);
            m.seaFreEff = false;
        }
        var itemCt = Model_Bag.getItemCount(Model_DengFengZJ.ITEM_BATCT);
        if (m.seaBatCt == 0 && itemCt > 0) {
            var itemCfg = Config.daoju_204[Model_DengFengZJ.ITEM_BATCT];
            s.lbBatCt.text = "";
            s.btnAdd.visible = false;
            s.groupItem.visible = true;
            s.itemLb.text = itemCfg.name + "：";
            s.itemCt.text = HtmlUtil.fontNoSize(itemCt + "/1", Color.GREENSTR);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.itemIcon);
        }
        else {
            s.lbBatCt.text = "今日挑战次数：" + HtmlUtil.fontNoSize(m.seaBatCt + "", m.seaBatCt > 0 ? Color.GREENSTR : Color.REDSTR);
            s.btnAdd.visible = true;
            s.groupItem.visible = false;
        }
    };
    Child_DFZJ_SeaSel.prototype.upRed = function () {
        var s = this;
        s.btnPoint.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 1);
    };
    Child_DFZJ_SeaSel.prototype.showEff = function () {
        var s = this;
        for (var i = 0; i < s._plyArr.length; i++) {
            s._plyArr[i].plyEff();
        }
    };
    Child_DFZJ_SeaSel.prototype.onPoint = function () {
        GGlobal.layerMgr.open(UIConst.DENG_FENG_POINT);
    };
    Child_DFZJ_SeaSel.prototype.onRank = function () {
        GGlobal.layerMgr.open(UIConst.DENG_FENG_RANK, 0);
    };
    Child_DFZJ_SeaSel.prototype.onChage = function () {
        var m = GGlobal.modelDengFengZJ;
        // if (m.status != 1) {
        // 	ViewCommonWarn.text("本周赛事已结束");
        // 	return;
        // }
        GGlobal.modelDengFengZJ.CG_REPLACE(0);
    };
    Child_DFZJ_SeaSel.URL = "ui://3o8q23uujo891o";
    return Child_DFZJ_SeaSel;
}(fairygui.GComponent));
__reflect(Child_DFZJ_SeaSel.prototype, "Child_DFZJ_SeaSel");
