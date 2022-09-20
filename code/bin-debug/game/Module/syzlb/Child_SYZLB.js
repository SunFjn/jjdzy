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
var Child_SYZLB = (function (_super) {
    __extends(Child_SYZLB, _super);
    function Child_SYZLB() {
        var _this = _super.call(this) || this;
        _this._isLeader = false;
        _this._first = true;
        _this.lastTime = 0;
        return _this;
    }
    Child_SYZLB.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "Child_SYZLB"));
    };
    Child_SYZLB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.listTeam.callbackThisObj = s;
        s.listTeam.itemRenderer = s.renderTeam;
        s.listJoin.callbackThisObj = s;
        s.listJoin.itemRenderer = s.renderJoin;
        s.listRew.callbackThisObj = s;
        s.listRew.itemRenderer = s.renderRew;
        s.txtDes.text = HtmlUtil.createLink("玩法说明");
    };
    Child_SYZLB.prototype.initView = function (pParent) {
    };
    Child_SYZLB.prototype.openPanel = function (pData) {
        var s = this;
        s.addListen();
        s.update();
        s.onTimer();
    };
    Child_SYZLB.prototype.closePanel = function (pData) {
        var self = this;
        self.removeListen();
        if (!Model_Syzlb.batIng) {
            var m = GGlobal.model_Syzlb;
            if (m.teamMyArr.length > 0) {
                m.CG_LEAVE_TEAM();
            }
        }
        self.listRew.numItems = 0;
    };
    Child_SYZLB.prototype.onTimer = function () {
        GGlobal.model_Syzlb.CG_OPENUI();
    };
    Child_SYZLB.prototype.addListen = function () {
        var s = this;
        IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "syzlb.jpg");
        IconUtil.setImg(s.backImg1, Enum_Path.BACK_URL + "syzlb1.png");
        s.createBt.addClickListener(s.createRoom, s);
        s.battleBt.addClickListener(s.onBattle, s);
        s.exitBt.addClickListener(s.onExit, s);
        s.chatBt.addClickListener(s.onChat, s);
        s.btnAdd.addClickListener(s.onAdd, s);
        s.yaoQingBt.addClickListener(s.onYaoQing, s);
        s.tabBtn0.addClickListener(s.selTab, s);
        s.tabBtn1.addClickListener(s.selTab, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.openui, s.update, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.room_data, s.update, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.teamui, s.update, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_invite, s.onInvite, s);
        s.txtDes.addEventListener(egret.TextEvent.LINK, s.onLink, s);
        s._first = true;
    };
    Child_SYZLB.prototype.removeListen = function () {
        var s = this;
        IconUtil.setImg(s.backImg, null);
        IconUtil.setImg(s.backImg1, null);
        s.createBt.removeClickListener(s.createRoom, s);
        s.battleBt.removeClickListener(s.onBattle, s);
        s.exitBt.removeClickListener(s.onExit, s);
        s.chatBt.removeClickListener(s.onChat, s);
        s.yaoQingBt.removeClickListener(s.onYaoQing, s);
        s.btnAdd.removeClickListener(s.onAdd, s);
        s.tabBtn0.removeClickListener(s.selTab, s);
        s.tabBtn1.removeClickListener(s.selTab, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.openui, s.update, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.room_data, s.update, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.teamui, s.update, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_invite, s.onInvite, s);
        s.txtDes.removeEventListener(egret.TextEvent.LINK, s.onLink, s);
        Timer.instance.remove(s.onTimer, s);
    };
    Child_SYZLB.prototype.onLink = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SYZLB);
    };
    Child_SYZLB.prototype.onAdd = function () {
        var m = GGlobal.model_Syzlb;
        var maxCt = m.batBuyMaxCt;
        var lastBuy = maxCt - m.batBuy;
        if (lastBuy <= 0) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        var cost = m.batBuyCost;
        if (cost > 0) {
            ViewSYZLBCtBuy.show(cost, lastBuy, maxCt, "", Handler.create(null, this.okHandle));
        }
        else {
            ViewCommonWarn.text("已达购买上限");
        }
    };
    Child_SYZLB.prototype.okHandle = function (count) {
        var m = GGlobal.model_Syzlb;
        var cost = 0;
        for (var i = 0; i < count; i++) {
            var v = Config.sycs_762[m.batBuy + 1 + i];
            if (v) {
                cost += Number(JSON.parse(v.xh)[0][2]);
            }
        }
        if (Model_player.voMine.yuanbao < cost) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        var maxCt = m.batBuyMaxCt;
        var lastBuy = maxCt - m.batBuy;
        if (count > lastBuy) {
            ViewCommonWarn.text("购买次数不足");
            return;
        }
        GGlobal.model_Syzlb.CG_BUY_CHA_NUM(count);
    };
    ;
    Child_SYZLB.prototype.update = function () {
        var s = this;
        var m = GGlobal.model_Syzlb;
        if (m.teamMyArr.length > 0) {
            s.c1.selectedIndex = 1;
            var isLeader = false;
            for (var i = 0; i < m.teamMyArr.length; i++) {
                var team = m.teamMyArr[i];
                if (team.pId == Model_player.voMine.id) {
                    if (team.type == 1)
                        isLeader = true;
                    break;
                }
            }
            if (isLeader) {
                s.yaoQingBt.visible = true;
                s.battleBt.visible = true;
                s.exitBt.visible = false;
            }
            else {
                s.yaoQingBt.visible = false;
                s.battleBt.visible = false;
                s.exitBt.visible = true;
            }
            s._teamMyArr = m.teamMyArr;
            s._isLeader = isLeader;
            s.listTeam.numItems = s._teamMyArr.length;
            Timer.instance.remove(s.onTimer, s);
        }
        else {
            s.c1.selectedIndex = 0;
            Timer.instance.listen(s.onTimer, s, 10000, 0, false);
        }
        var itemCt = Model_Bag.getItemCount(Model_Syzlb.ITEM_BATCT);
        if (m.batCt == 0 && itemCt > 0) {
            s.lbBat.text = "";
            s.btnAdd.visible = false;
            s.groupItem.visible = true;
            s.itemLb.text = "三英令：";
            s.itemCt.text = "" + itemCt;
            var icon = Config.daoju_204[Model_Syzlb.ITEM_BATCT].icon;
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", s.itemIcon);
        }
        else {
            s.lbBat.text = "挑战次数：" + HtmlUtil.fontNoSize(m.batCt + "/" + ConfigHelp.getSystemNum(7501), m.batCt > 0 ? Color.GREENSTR : Color.REDSTR);
            s.btnAdd.visible = true;
            s.groupItem.visible = false;
        }
        //难度
        if (m.hard <= 1) {
            s.tabBtn0.visible = false;
            s.tabBtn1.visible = false;
            s.c2.selectedIndex = 0;
            s.selHandle();
        }
        else {
            s.tabBtn0.visible = true;
            s.tabBtn1.visible = true;
            if (m.teamMyArr.length > 0) {
                s.c2.selectedIndex = m.teamHard - 1;
                s.selHandle();
            }
            else {
                if (s._first && m.hard > 0) {
                    s._first = false;
                    s.c2.selectedIndex = m.hard - 1;
                    s.selHandle();
                }
                else {
                    s.selHandle();
                }
            }
        }
    };
    Child_SYZLB.prototype.createRoom = function () {
        var hard = this.c2.selectedIndex + 1; //1普通2困难 3地狱 4恶魔
        GGlobal.model_Syzlb.CG_CREATE_TEAM(hard);
    };
    Child_SYZLB.prototype.onBattle = function () {
        if (TimeUitl.cool("Child_SYZLB", 3000)) {
            GGlobal.model_Syzlb.CG_CHALLENGE();
        }
    };
    Child_SYZLB.prototype.onExit = function () {
        var m = GGlobal.model_Syzlb;
        if (m.teamMyArr.length > 0) {
            m.CG_LEAVE_TEAM();
        }
    };
    Child_SYZLB.prototype.renderTeam = function (index, obj) {
        var v = obj;
        v.setVo(this._teamMyArr[index], this._isLeader);
    };
    Child_SYZLB.prototype.onChat = function () {
        GGlobal.layerMgr.open(UIConst.CHAT);
    };
    Child_SYZLB.prototype.onYaoQing = function () {
        if (this.yaoQingBt.enabled == false) {
            ViewCommonWarn.text("请稍等!");
            return;
        }
        GGlobal.model_Syzlb.CG_BROADCAST_INVITE();
    };
    Child_SYZLB.prototype.onInvite = function (time) {
        this.lastTime = time;
        this.yaoQingBt.enabled = false;
        Timer.instance.listen(function onT() {
            this.lastTime--;
            if (this.lastTime < 0) {
                this.yaoQingBt.enabled = true;
                this.yaoQingBt.text = "邀请协助";
                Timer.instance.remove(onT, this);
            }
            else {
                this.yaoQingBt.text = "\u7B49\u5F85(" + this.lastTime + ")";
            }
        }, this, 1000);
    };
    Child_SYZLB.prototype.renderJoin = function (index, obj) {
        var v = obj;
        v.vo = this._joinArr[index];
    };
    Child_SYZLB.prototype.renderRew = function (index, obj) {
        obj.tipEnabled = true;
        obj.isShowEff = true;
        obj.vo = this.rewArr[index];
    };
    Child_SYZLB.prototype.selTab = function (e) {
        var s = this;
        var m = GGlobal.model_Syzlb;
        if (m.teamMyArr.length > 0) {
            ViewCommonWarn.text("请先退出当前队伍");
            s.c2.selectedIndex = m.teamHard - 1;
        }
        s.selHandle();
    };
    Child_SYZLB.prototype.selHandle = function () {
        var s = this;
        var m = GGlobal.model_Syzlb;
        var hard = s.c2.selectedIndex + 1;
        var v = Config.syzlbyl_762[hard];
        s.rewArr = ConfigHelp.makeItemListArr(JSON.parse(v.jlyl));
        s.listRew.numItems = s.rewArr.length;
        s._joinArr = [];
        for (var i = 0; i < m.teamJoinArr.length; i++) {
            if (m.teamJoinArr[i].hard == hard) {
                s._joinArr.push(m.teamJoinArr[i]);
            }
        }
        s.listJoin.numItems = s._joinArr.length;
        s.lbNoTeam.visible = s._joinArr.length == 0;
    };
    Child_SYZLB.URL = "ui://3o8q23uuhfuw9";
    return Child_SYZLB;
}(fairygui.GComponent));
__reflect(Child_SYZLB.prototype, "Child_SYZLB", ["IPanel"]);
