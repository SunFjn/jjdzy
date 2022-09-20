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
var Child_ChaoZhiZP = (function (_super) {
    __extends(Child_ChaoZhiZP, _super);
    function Child_ChaoZhiZP() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.startIndex = 0;
        _this.startCount = 0;
        return _this;
    }
    Child_ChaoZhiZP.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "Child_ChaoZhiZP"));
    };
    Child_ChaoZhiZP.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        for (var i = 0; i < 12; i++) {
            var grid = (s.getChild("grid" + i));
            grid.isShowEff = true;
            s.gridArr.push(grid);
        }
        s.expBar = (s.getChild("expBar"));
        s.draw0 = (s.getChild("draw0"));
        s.draw1 = (s.getChild("draw1"));
        s.boxBt = (s.getChild("boxBt"));
        s.chooseImg = (s.getChild("chooseImg"));
        s.chooseImg.visible = false;
        s.noticeImg = (s.getChild("noticeImg"));
        s.drawNumLb = (s.getChild("drawNumLb"));
        s.noteLb = (s.getChild("noteLb"));
        s.timeLb = (s.getChild("timeLb"));
        var promptLb = (s.getChild("promptLb"));
        promptLb.text = "每消费" + Config.xtcs_004[2004].num + "元宝免费抽奖1次";
        s.myNoteLb = (s.getChild("myNoteLb"));
        s.checkBox = (s.getChild("checkBox"));
        s.myNoteLb.text = HtmlUtil.createLink("抽奖记录");
        s.myNoteLb.addEventListener(egret.TextEvent.LINK, s.OnOpenNote, s);
        s.linkLb = (s.getChild("linkLb"));
        s.linkLb.text = HtmlUtil.createLink("概率");
        s.linkLb.addEventListener(egret.TextEvent.LINK, s.openGaiLV, s);
        s.draw0.addClickListener(s.OnDraw, s);
        s.draw1.addClickListener(s.OnDraw, s);
        s.boxBt.addClickListener(s.OnBox, s);
        s.checkBox.addClickListener(s.onCheck, s);
    };
    Child_ChaoZhiZP.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 1);
    };
    Child_ChaoZhiZP.prototype.showGrids = function () {
        for (var i = 0; i < 12; i++) {
            var grid = this.gridArr[i];
            var cfg = Config.czzpreward_726[i + 1];
            var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
            grid.vo = arr[0];
            grid.tipEnabled = true;
        }
    };
    Child_ChaoZhiZP.prototype.OnOpenNote = function (evt) {
        evt.stopPropagation();
        GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_NOTE);
    };
    Child_ChaoZhiZP.prototype.OnBox = function () {
        var vo = ConfigHelp.makeItemListArr(JSON.parse(this.boxcfg.reward))[0];
        var num = Model_ChaoZhiFL.costNum;
        var color = num >= this.boxcfg.coin ? 2 : 6;
        var state = Model_ChaoZhiFL.boxArr[this.boxcfg.id - 1];
        View_Reward_Show.show([vo], "消费元宝达到" + HtmlUtil.fontNoSize(this.boxcfg.coin, Color.getColorStr(5)) + ",可领取" + HtmlUtil.fontNoSize("(" +
            num + "/" + this.boxcfg.coin + ")", Color.getColorStr(color)), null, Handler.create(this, this.drawBox), state);
    };
    Child_ChaoZhiZP.prototype.drawBox = function () {
        if (this.expBar.value < this.expBar.max) {
            ViewCommonWarn.text("未达到领取条件");
            return;
        }
        GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN_BOX(this.boxcfg.id);
    };
    Child_ChaoZhiZP.prototype.OnDraw = function (event) {
        var bt = event.target;
        if (bt.id == this.draw0.id) {
            if (Model_ChaoZhiFL.drawNum > 0) {
                this.draw0.touchable = this.draw1.touchable = false;
                GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(1);
            }
            else {
                ViewCommonWarn.text("抽奖次数不足");
            }
        }
        else {
            if (Model_ChaoZhiFL.drawNum >= 10) {
                this.draw0.touchable = this.draw1.touchable = false;
                GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(2);
            }
            else {
                ViewCommonWarn.text("抽奖次数不足");
            }
        }
    };
    Child_ChaoZhiZP.prototype.show = function () {
        var arr = Model_ChaoZhiFL.boxArr;
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != 2) {
                index = i + 1;
                break;
            }
        }
        var cfg;
        if (index == 0) {
            cfg = Config.czzpbox_726[arr.length];
        }
        else {
            cfg = Config.czzpbox_726[index];
        }
        this.expBar.value = Model_ChaoZhiFL.costNum;
        this.expBar.max = cfg.coin;
        this.boxcfg = cfg;
        var arr1 = Model_ChaoZhiFL.broadcastArr;
        var noteStr = "";
        for (var i = 0; i < arr1.length; i++) {
            var itemVo = VoItem.create(arr1[i][1]);
            if (i == 0) {
                noteStr += HtmlUtil.fontNoSize(arr1[i][0], Color.getColorStr(2)) + "在超值转盘中获得大奖" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + ",羡煞旁人";
            }
            else {
                noteStr += "\n" + HtmlUtil.fontNoSize(arr1[i][0], Color.getColorStr(2)) + "在超值转盘中获得大奖" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + ",羡煞旁人";
            }
        }
        this.noteLb.text = noteStr;
        this.drawNumLb.text = "剩余抽奖次数：" + Model_ChaoZhiFL.drawNum;
        this.draw0.checkNotice = Model_ChaoZhiFL.drawNum > 0;
        this.draw1.checkNotice = Model_ChaoZhiFL.drawNum >= 10;
        var num = Model_ChaoZhiFL.costNum;
        this.noticeImg.visible = (num >= cfg.coin && index != 0);
        // let vo = Model_Activity.getActivty1(UIConst.CHAOZHIFL, UIConst.CHAOZHI_ZHUANPAN);
        var vo = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.CHAOZHI_ZHUANPAN);
        this.surTime = vo.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
        if (this.surTime > 0) {
            if (!Timer.instance.has(this.timeHandle, this)) {
                Timer.instance.listen(this.timeHandle, this, 1000);
            }
        }
        else {
            Timer.instance.remove(this.timeHandle, this);
        }
        if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW)) {
            this.OnBox();
        }
    };
    Child_ChaoZhiZP.prototype.timeHandle = function () {
        this.surTime--;
        if (this.surTime > 0) {
            this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(this.surTime);
        }
        else {
            Timer.instance.remove(this.timeHandle, this);
        }
    };
    Child_ChaoZhiZP.prototype.startDraw = function () {
        if (Model_ChaoZhiFL.zpSkipTween) {
            Timer.instance.remove(this.startEff, this);
            this.draw0.touchable = this.draw1.touchable = true;
            GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_REWARD, Handler.create(this, this.alginFun));
        }
        else {
            this.startIndex = 0;
            this.startCount = 0;
            Timer.instance.listen(this.startEff, this, 50);
        }
    };
    Child_ChaoZhiZP.prototype.startEff = function () {
        this.startIndex++;
        if (this.startIndex >= this.gridArr.length) {
            this.startIndex = 0;
            this.startCount++;
        }
        var grid = this.gridArr[this.startIndex];
        this.chooseImg.visible = true;
        this.chooseImg.setXY(grid.x - 2, grid.y + 3);
        var arr = Model_ChaoZhiFL.zpRewardArr;
        var rewardVo = arr[arr.length - 1];
        if (this.startCount >= 2 && grid.vo.id == rewardVo.id && grid.vo.count == rewardVo.count) {
            Timer.instance.remove(this.startEff, this);
            this.draw0.touchable = this.draw1.touchable = true;
            GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_REWARD, Handler.create(this, this.alginFun));
        }
    };
    Child_ChaoZhiZP.prototype.alginFun = function () {
        var rewardArr = Model_ChaoZhiFL.zpRewardArr;
        if (rewardArr.length > 1) {
            if (Model_ChaoZhiFL.drawNum >= 10) {
                this.draw0.touchable = this.draw1.touchable = false;
                GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(2);
            }
            else {
                ViewCommonWarn.text("抽奖次数不足");
            }
        }
        else {
            if (Model_ChaoZhiFL.drawNum > 0) {
                this.draw0.touchable = this.draw1.touchable = false;
                GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(1);
            }
            else {
                ViewCommonWarn.text("抽奖次数不足");
            }
        }
    };
    Child_ChaoZhiZP.prototype.open = function () {
        GGlobal.modelActivity.CG_OPENACT(UIConst.CHAOZHI_ZHUANPAN);
        this.showGrids();
        GGlobal.control.listen(Enum_MsgType.CHAOZHI_ZHUANPAN, this.show, this);
        GGlobal.control.listen(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF, this.startDraw, this);
        var key = Model_player.voMine.id + "ChaoZhiZPCheck";
        var val = egret.localStorage.getItem(key);
        Model_ChaoZhiFL.zpSkipTween = val == "1" ? true : false;
        this.checkBox.selected = Model_ChaoZhiFL.zpSkipTween;
    };
    Child_ChaoZhiZP.prototype.close = function () {
        GGlobal.control.remove(Enum_MsgType.CHAOZHI_ZHUANPAN, this.show, this);
        GGlobal.control.remove(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF, this.startDraw, this);
        this.draw0.touchable = this.draw1.touchable = true;
        Timer.instance.remove(this.timeHandle, this);
        ConfigHelp.cleanGridEff(this.gridArr);
    };
    Child_ChaoZhiZP.prototype.onCheck = function (e) {
        Model_ChaoZhiFL.zpSkipTween = this.checkBox.selected;
        var key = Model_player.voMine.id + "ChaoZhiZPCheck";
        var val = Model_ChaoZhiFL.zpSkipTween ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    Child_ChaoZhiZP.URL = "ui://qzsojhcrhn3o3";
    return Child_ChaoZhiZP;
}(fairygui.GComponent));
__reflect(Child_ChaoZhiZP.prototype, "Child_ChaoZhiZP", ["ICZFLView"]);
