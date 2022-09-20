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
var Child_Sign = (function (_super) {
    __extends(Child_Sign, _super);
    function Child_Sign() {
        var _this = _super.call(this) || this;
        _this.boxArr = [];
        _this.drawImgArr = [];
        _this.noticeImgArr = [];
        return _this;
    }
    Child_Sign.createInstance = function () {
        if (!Child_Sign.instance)
            Child_Sign.instance = (fairygui.UIPackage.createObject("Welfare", "Child_Sign"));
        return Child_Sign.instance;
    };
    Child_Sign.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.list = (a.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.setVirtual();
        for (var i = 0; i < 5; i++) {
            var box = (a.getChild("box" + i));
            box.data = i;
            box.addClickListener(a.onBox, a);
            a.boxArr.push(box);
            var drawImg = (a.getChild("drawImg" + i));
            a.drawImgArr.push(drawImg);
            var noticeImg = (a.getChild("noticeImg" + i));
            a.noticeImgArr.push(noticeImg);
        }
        a.expbar = (a.getChild("expbar"));
        a.expbar.max = 30;
        a.jihuoBt = (a.getChild("jihuoBt"));
        a.jihuoLb = (a.getChild("jihuoLb"));
        a.resetLb = (a.getChild("resetLb"));
        a.lbImg = (a.getChild("lbImg"));
        a.jihuoBt.addClickListener(a.onJiHuo, a);
        GGlobal.modelwelfare.CG_OPEN_SIGN();
    };
    Child_Sign.prototype.onJiHuo = function () {
        if (GGlobal.isIOS) {
            ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
        }
        else {
            GGlobal.layerMgr.open(UIConst.TEQUAN);
        }
    };
    Child_Sign.prototype.onBox = function (evt) {
        var index = evt.target.data;
        var arr = [3, 5, 7, 15, 30];
        var cfg = Config.qdbaoxiang_720[arr[index]];
        var rewardArr = JSON.parse(cfg.AWARD);
        var reward = ConfigHelp.makeItemListArr(rewardArr);
        var color = 0;
        var text1 = "";
        if (Model_Welfare.signNum >= arr[index]) {
            color = 2;
        }
        else {
            color = 6;
        }
        var state = Model_Welfare.signBoxArr[index];
        switch (Model_Welfare.signBoxArr[index]) {
            case 0:
                text1 = HtmlUtil.fontNoSize("满足条件后可领取", Color.getColorStr(6));
                break;
            case 1:
                text1 = null;
                break;
            case 2:
                text1 = null;
                break;
        }
        View_Reward_Show.show(reward, "累计签到达到" + arr[index] + "天可领取" + HtmlUtil.fontNoSize("(" + Model_Welfare.signNum + "/" + arr[index] + ")", Color.getColorStr(color)), text1, Handler.create(this, this.onDraw, [arr[index]]), state);
    };
    Child_Sign.prototype.onDraw = function (index) {
        GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
        GGlobal.modelwelfare.CG_SIGN_DRAW_BOXREWARD(index);
    };
    Child_Sign.prototype.listHandle = function (evt) {
        var grid = evt.itemObject;
        switch (grid.state) {
            case 0:
                break;
            case 1:
                GGlobal.modelwelfare.CG_SIGN_BYDAY(grid.day);
                break;
            case 2:
                break;
            case 3:
                var money = Config.xtcs_004[2002].num;
                ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(money + "元宝", Color.getColorStr(5)) + "进行补签", Handler.create(this, this.okHandle, [money, grid.day]));
                break;
        }
    };
    Child_Sign.prototype.okHandle = function (money, day) {
        if (Model_player.voMine.yuanbao < money) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelwelfare.CG_REPAIRSIGN_BYDAY(day);
    };
    Child_Sign.prototype.renderHandle = function (index, obj) {
        var grid = obj;
        var cfg = Config.qiandao_720[Model_Welfare.qishu * 1000 + index + 1];
        var arr = Model_Welfare.signArr;
        var arr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
        if (index < arr.length) {
            grid.show(arr1[0], arr[index], index + 1);
        }
        else {
            grid.show(arr1[0], 0, index + 1);
        }
    };
    Child_Sign.prototype.updateShow = function () {
        var a = this;
        if (Model_Welfare.qishu <= 0)
            return;
        a.list.numItems = 30;
        var arr = [3, 5, 7, 15, 30];
        for (var i = 0; i < a.drawImgArr.length; i++) {
            a.drawImgArr[i].visible = Model_Welfare.signBoxArr[i] == 2;
            a.noticeImgArr[i].visible = Model_Welfare.signBoxArr[i] == 1 || (Model_Welfare.signNum >= arr[i] && Model_Welfare.signBoxArr[i] == 0);
        }
        a.expbar.value = Model_Welfare.signNum;
        if (GGlobal.isIOS) {
            a.jihuoLb.visible = false;
            a.lbImg.visible = a.jihuoBt.visible = false;
        }
        else if (GGlobal.modelvip.getTeQuan(3)) {
            a.jihuoLb.visible = true;
            a.lbImg.visible = a.jihuoBt.visible = false;
        }
        else {
            a.jihuoLb.visible = false;
            a.lbImg.visible = a.jihuoBt.visible = true;
        }
        a.resetLb.text = Model_Welfare.resetDay + "天后重置签到信息";
    };
    Child_Sign.prototype.show = function () {
        var a = this;
        a.updateShow();
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.listen(UIConst.WELFARE, a.updateShow, a);
    };
    Child_Sign.prototype.clean = function () {
        var a = this;
        a.list.numItems = 0;
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.remove(UIConst.WELFARE, a.updateShow, a);
    };
    Child_Sign.URL = "ui://ye1luhg3r6x4d";
    return Child_Sign;
}(fairygui.GComponent));
__reflect(Child_Sign.prototype, "Child_Sign");
