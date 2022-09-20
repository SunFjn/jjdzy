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
var Child_NZBZ = (function (_super) {
    __extends(Child_NZBZ, _super);
    function Child_NZBZ() {
        return _super.call(this) || this;
    }
    Child_NZBZ.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "Child_NZBZ"));
    };
    Child_NZBZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headItem = (this.getChild("headItem"));
        this.guanxianLb = (this.getChild("guanxianLb"));
        this.gongxunLb = (this.getChild("gongxunLb"));
        this.prestigeLb = (this.getChild("prestigeLb"));
        this.myRankLb = (this.getChild("myRankLb"));
        this.countryLb = (this.getChild("countryLb"));
        this.expLb = (this.getChild("expLb"));
        this.battleLb = (this.getChild("battleLb"));
        this.timeLb = (this.getChild("timeLb"));
        this.powerLb = (this.getChild("powerLb"));
        this.expBar = (this.getChild("expBar"));
        this.rankBt = (this.getChild("rankBt"));
        this.jifenBt = (this.getChild("jifenBt"));
        this.addBt = (this.getChild("addBt"));
        this.resBt = (this.getChild("resBt"));
        this.item0 = (this.getChild("item0"));
        this.item1 = (this.getChild("item1"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.addBt.addClickListener(this.addHandler, this);
        this.rankBt.addClickListener(this.rankHandler, this);
        this.jifenBt.addClickListener(this.jifenHandler, this);
        this.resBt.addClickListener(this.resHandler, this);
    };
    Child_NZBZ.prototype.resHandler = function () {
        GGlobal.modelnzbz.CG_NZBZ_RES_ENEMY();
    };
    Child_NZBZ.prototype.jifenHandler = function () {
        GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_JIFEN);
    };
    Child_NZBZ.prototype.rankHandler = function () {
        GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_RANK);
    };
    Child_NZBZ.prototype.addHandler = function () {
        Model_NZBZ.addHandler();
        // if (Model_NZBZ.battleNum >= 5) {
        // 	ViewCommonWarn.text("挑战次数已达上限");
        // 	return;
        // }
        // if (Model_NZBZ.buyNum <= 0) {
        // 	ViewCommonWarn.text("已达购买上限");
        // 	return;
        // }
        // var cost = 100
        // // const battleMax = 5 - Model_NZBZ.battleNum
        // ViewAlertBuy.show(cost, Model_NZBZ.buyNum, Model_NZBZ.buyNum, "", Handler.create(this, this.okHandle));
        // ViewAlert.show("是否花费" + HtmlUtil.fontNoSize("100元宝", Color.getColorStr(2)) + "购买1次挑战次数？\n今日剩余购买次数" +
        // 	HtmlUtil.fontNoSize("(" + Model_NZBZ.buyNum + "/10" + ")", Color.getColorStr(2)), Handler.create(this, this.okHandle));
    };
    // private okHandle(count): void {
    // 	if (Model_player.voMine.yuanbao < 100 * count) {
    // 		ModelChongZhi.guideToRecharge();
    // 		return;
    // 	}
    // 	GGlobal.modelnzbz.CG_NZBZ_BUY_BATTLENUM(count);
    // }
    Child_NZBZ.prototype.updateShow = function () {
        var vomine = Model_player.voMine;
        if (vomine) {
            //头像
            this.headItem.show(Model_Setting.headId, Model_Setting.frameId, vomine.country, vomine.level);
            if (GGlobal.modelguanxian.guanzhi <= 1) {
                this.guanxianLb.text = vomine.name;
            }
            else {
                this.guanxianLb.text = "【" + (GGlobal.modelguanxian.guanzhi - 1) + "阶·" + Config.guanxian_701[GGlobal.modelguanxian.guanzhi].name + "】" + vomine.name;
            }
            this.gongxunLb.text = "功勋         " + vomine.gongxun;
            this.prestigeLb.text = "声望         " + vomine.prestige;
            this.powerLb.text = "战力：" + vomine.str;
            if (Model_NZBZ.myRank == 0) {
                this.myRankLb.text = "个人排名：10+";
            }
            else {
                this.myRankLb.text = "个人排名：" + Model_NZBZ.myRank;
            }
            this.countryLb.text = "国家排名：" + Model_NZBZ.countryRank;
            var expMax = 0;
            for (var i = 0; i < Model_NZBZ.jifenArr.length; i++) {
                if (Model_NZBZ.myJiFen < Model_NZBZ.jifenArr[i].point || i == Model_NZBZ.jifenArr.length - 1) {
                    expMax = Model_NZBZ.jifenArr[i].point;
                    break;
                }
            }
            this.expBar.max = expMax;
            this.expBar.value = Model_NZBZ.myJiFen;
            if (Model_NZBZ.battleNum <= 0) {
                this.battleLb.text = "挑战次数: " + HtmlUtil.fontNoSize(Model_NZBZ.battleNum + "/5", Color.getColorStr(6));
            }
            else {
                this.battleLb.text = "挑战次数: " + HtmlUtil.fontNoSize(Model_NZBZ.battleNum + "/5", Color.getColorStr(2));
            }
            if (Model_NZBZ.coolTime > 0) {
                this.timeLb.text = DateUtil.getHMSBySecond2(Model_NZBZ.coolTime) + "后恢复一次";
                this.timeLb.visible = true;
                if (!Timer.instance.has(this.timeHandle, this)) {
                    Timer.instance.listen(this.timeHandle, this, 1000);
                }
            }
            else {
                this.timeLb.visible = false;
                Timer.instance.remove(this.timeHandle, this);
            }
            if (Model_NZBZ.enemyArr[0]) {
                this.item0.vo = Model_NZBZ.enemyArr[0];
            }
            else {
                this.item0.vo = null;
            }
            if (Model_NZBZ.enemyArr[1]) {
                this.item1.vo = Model_NZBZ.enemyArr[1];
            }
            else {
                this.item1.vo = null;
            }
            this.noticeImg.visible = Model_NZBZ.checkJiFenNotice();
        }
    };
    Child_NZBZ.prototype.timeHandle = function () {
        Model_NZBZ.coolTime--;
        this.timeLb.text = DateUtil.getHMSBySecond2(Model_NZBZ.coolTime) + "后恢复一次";
        if (Model_NZBZ.coolTime <= 0) {
            Model_NZBZ.battleNum++;
            this.battleLb.text = "挑战次数：" + Model_SGZS.battleNum + "/5";
            if (Model_NZBZ.battleNum < 5) {
                Model_NZBZ.coolTime = 3600;
            }
            else {
                this.timeLb.visible = false;
                Timer.instance.remove(this.timeHandle, this);
            }
        }
    };
    Child_NZBZ.prototype.show = function () {
        this.updateShow();
    };
    Child_NZBZ.prototype.clean = function () {
        Timer.instance.remove(this.timeHandle, this);
    };
    Child_NZBZ.prototype.guide_NZBZ_battle = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.item0.battleBt, self.item0.battleBt.width / 2, self.item0.battleBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.item0.battleBt, 0, self.item0.battleBt.height / 2, 180, -250, -35);
        if (self.item0.battleBt.parent)
            self.item0.battleBt.parent.setChildIndex(self.item0.battleBt, self.item0.battleBt.parent.numChildren - 1);
    };
    Child_NZBZ.URL = "ui://xzyn0qe3nb1u7";
    return Child_NZBZ;
}(fairygui.GComponent));
__reflect(Child_NZBZ.prototype, "Child_NZBZ");
