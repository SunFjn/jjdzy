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
var View_LiuChuQS_Panel = (function (_super) {
    __extends(View_LiuChuQS_Panel, _super);
    function View_LiuChuQS_Panel() {
        var _this = _super.call(this) || this;
        _this._isLeader = false;
        _this.lastTime = 0;
        _this._curpage = 0;
        _this.setSkin("zjyw", "zjyw_atlas0", "View_LiuChuQS_Panel");
        return _this;
    }
    View_LiuChuQS_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ItemLCQSMap.URL, ItemLCQSMap);
        f.setPackageItemExtension(ItemLCQSMapDetail.URL, ItemLCQSMapDetail);
        f.setPackageItemExtension(ItemLCQSTeam.URL, ItemLCQSTeam);
        f.setPackageItemExtension(ItemLCQSTeamJoin.URL, ItemLCQSTeamJoin);
        f.setPackageItemExtension(ItemLCQSTitle.URL, ItemLCQSTitle);
    };
    View_LiuChuQS_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.listTeam.callbackThisObj = s;
        s.listTeam.itemRenderer = s.renderTeam;
        s.listJoin.callbackThisObj = s;
        s.listJoin.itemRenderer = s.renderJoin;
        s.listMap.callbackThisObj = s;
        s.listMap.itemRenderer = s.renderMap;
        s.listMap.setVirtual();
        s.listMap.scrollItemToViewOnClick = false;
        s.listMap.selectionMode = fairygui.ListSelectionMode.Single;
    };
    View_LiuChuQS_Panel.prototype.onShown = function () {
        var s = this;
        s._index = s._args;
        s._guanArr = GGlobal.model_LiuChuQS.getGuanArr(s._index);
        s.addListen();
        s.upGuanSel();
        s.update();
        s.checkNotice();
        GGlobal.model_LiuChuQS.CG_OPENUI_8201();
        s.c2.selectedIndex = s._guanArr[0].hard;
    };
    View_LiuChuQS_Panel.prototype.onHide = function () {
        this.removeListen();
        if (!Model_LiuChuQS.batIng) {
            var m = GGlobal.model_LiuChuQS;
            if (m.teamMyArr.length > 0) {
                m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
            }
        }
    };
    View_LiuChuQS_Panel.prototype.closeEventHandler = function (evt) {
        _super.prototype.closeEventHandler.call(this, evt);
        GGlobal.layerMgr.open(UIConst.CHILD_LCQS);
    };
    View_LiuChuQS_Panel.prototype.addListen = function () {
        var s = this;
        var backImg = s.frame.getChild("backImg").asLoader;
        IconUtil.setImg(backImg, Enum_Path.GUAN_QIA_URL + "lcqsFrame.jpg");
        IconUtil.setImg(s.imgMapBg, Enum_Path.GUAN_QIA_URL + "lcqsMapBg.png");
        var v = s._guanArr[0];
        IconUtil.setImg(s.imapName, Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png");
        s.vTitle.addListen();
        s.createBt.addClickListener(s.createRoom, s);
        s.battleBt.addClickListener(s.onBattle, s);
        s.exitBt.addClickListener(s.onExit, s);
        s.saoDanBt.addClickListener(s.onSaoDan, s);
        s.chatBt.addClickListener(s.onChat, s);
        s.yaoQingBt.addClickListener(s.onYaoQing, s);
        s.btnLeft.addClickListener(s.pageHandler, s);
        s.btnRight.addClickListener(s.pageHandler, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.openui, s.upOpenUI, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.room_data, s.update, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.teamui, s.upTeam, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.guan_sel_msg, s.guanSel, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_invite, s.onInvite, s);
        GGlobal.reddot.listen(UIConst.CHILD_LCQS, s.checkNotice, s);
    };
    View_LiuChuQS_Panel.prototype.removeListen = function () {
        var s = this;
        var backImg = s.frame.getChild("backImg").asLoader;
        IconUtil.setImg(backImg, null);
        IconUtil.setImg(s.imapName, null);
        IconUtil.setImg(s.imgMapBg, null);
        s.listMap.numItems = 0;
        s.vTitle.removeListen();
        s.createBt.removeClickListener(s.createRoom, s);
        s.battleBt.removeClickListener(s.onBattle, s);
        s.exitBt.removeClickListener(s.onExit, s);
        s.saoDanBt.removeClickListener(s.onSaoDan, s);
        s.chatBt.removeClickListener(s.onChat, s);
        s.yaoQingBt.removeClickListener(s.onYaoQing, s);
        s.btnLeft.addClickListener(s.pageHandler, s);
        s.btnRight.addClickListener(s.pageHandler, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, s.upOpenUI, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.room_data, s.update, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.teamui, s.upTeam, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.guan_sel_msg, s.guanSel, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_invite, s.onInvite, s);
        GGlobal.reddot.remove(UIConst.CHILD_LCQS, s.checkNotice, s);
    };
    View_LiuChuQS_Panel.prototype.upOpenUI = function () {
        var s = this;
        s.upGuanSel();
        GGlobal.model_LiuChuQS.CG_TEAM_DATA_8203(s._selId);
    };
    View_LiuChuQS_Panel.prototype.upTeam = function () {
        var s = this;
        s.update();
        s.upGuanSel();
        GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel, s._selId);
    };
    View_LiuChuQS_Panel.prototype.upGuanSel = function () {
        var s = this;
        var srollTo = -1;
        var m = GGlobal.model_LiuChuQS;
        var mustTo = m.curGuan;
        if (m.teamMyArr.length > 0) {
            mustTo = m.teamMyArr[0].guan; //组队后定位到相应关卡
        }
        for (var i = 0; i < s._guanArr.length; i++) {
            if (s._guanArr[i].id >= mustTo) {
                srollTo = i;
                break;
            }
        }
        if (srollTo == -1) {
            srollTo = s._guanArr.length - 1;
        }
        s._selId = s._guanArr[srollTo].id;
        //列表
        s.listMap.numItems = s._guanArr.length;
        //选中
        s.listMap.scrollToView(srollTo);
    };
    View_LiuChuQS_Panel.prototype.guanSel = function (id) {
        this._selId = id;
        GGlobal.model_LiuChuQS.CG_TEAM_DATA_8203(id);
    };
    ;
    View_LiuChuQS_Panel.prototype.update = function () {
        var s = this;
        var m = GGlobal.model_LiuChuQS;
        if (m.teamMyArr.length > 0) {
            s.c1.selectedIndex = 1;
            var isLeader = false;
            for (var i = 0; i < m.teamMyArr.length; i++) {
                var team = m.teamMyArr[i];
                if (team.plyId == Model_player.voMine.id) {
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
            this._teamMyArr = m.teamMyArr;
            this._isLeader = isLeader;
            s.listTeam.numItems = this._teamMyArr.length;
        }
        else {
            s.c1.selectedIndex = 0;
            this._joinArr = m.teamJoinArr;
            s.listJoin.numItems = this._joinArr.length;
            this.lbNoTeam.visible = this._joinArr.length == 0;
        }
    };
    View_LiuChuQS_Panel.prototype.createRoom = function () {
        GGlobal.model_LiuChuQS.CG_BUILD_TEAM_8205(this._selId);
    };
    View_LiuChuQS_Panel.prototype.onBattle = function () {
        GGlobal.model_LiuChuQS.CG_BATTLE_8215();
    };
    View_LiuChuQS_Panel.prototype.onExit = function () {
        var m = GGlobal.model_LiuChuQS;
        if (m.teamMyArr.length > 0) {
            m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
        }
    };
    View_LiuChuQS_Panel.prototype.onSaoDan = function () {
        GGlobal.model_LiuChuQS.CG_SAO_DANG_8225();
    };
    View_LiuChuQS_Panel.prototype.renderTeam = function (index, obj) {
        var v = obj;
        v.setVo(this._teamMyArr[index], this._isLeader);
    };
    View_LiuChuQS_Panel.prototype.onChat = function () {
        GGlobal.layerMgr.open(UIConst.CHAT);
    };
    View_LiuChuQS_Panel.prototype.onYaoQing = function () {
        if (this.yaoQingBt.enabled == false) {
            ViewCommonWarn.text("请稍等!");
            return;
        }
        if (GGlobal.model_LiuChuQS.helpMeCt <= 0) {
            ViewCommonWarn.text("今日求助次数已用完");
            return;
        }
        GGlobal.model_LiuChuQS.CG_BROAD_CAST_8209();
    };
    View_LiuChuQS_Panel.prototype.onInvite = function (time) {
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
    View_LiuChuQS_Panel.prototype.checkNotice = function () {
        var boo = GGlobal.model_LiuChuQS.checkSaiDan();
        this.saoDanBt.checkNotice = boo;
        this.saoDanBt.enabled = boo;
    };
    View_LiuChuQS_Panel.prototype.renderJoin = function (index, obj) {
        var v = obj;
        v.vo = this._joinArr[index];
    };
    View_LiuChuQS_Panel.prototype.renderMap = function (index, obj) {
        var v = obj;
        v.setVo(this._guanArr[index], this._selId);
    };
    View_LiuChuQS_Panel.prototype.pageHandler = function (event) {
        var btn = event.target;
        var curpage = this.listMap.getFirstChildInView();
        switch (btn.id) {
            case this.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case this.btnRight.id:
                if (curpage < this.listMap.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= this.listMap.numItems - 1)
                        curpage = this.listMap.numItems - 1;
                }
                break;
        }
        this._curpage = curpage;
        if (this.listMap.numItems > 0)
            this.listMap.scrollToView(curpage, true, true);
    };
    return View_LiuChuQS_Panel;
}(UIPanelBase));
__reflect(View_LiuChuQS_Panel.prototype, "View_LiuChuQS_Panel");
