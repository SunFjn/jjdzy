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
var View_SevenDayLogin_Panel = (function (_super) {
    __extends(View_SevenDayLogin_Panel, _super);
    function View_SevenDayLogin_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.drawImgArr = [];
        _this.gridArr = [];
        _this.curDay = 0;
        _this.setSkin("sevenDayLogin", "sevenDayLogin_atlas0", "View_SevenDayLogin_Panel");
        return _this;
    }
    View_SevenDayLogin_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        for (var i = 0; i < 7; i++) {
            if (i < 3) {
                var grid = a["grid" + i];
                grid.isShowEff = true;
                a.gridArr.push(grid);
            }
            var drawImg = a["drawImg" + i];
            a.drawImgArr.push(drawImg);
            var tab = a["tab" + i];
            tab.data = i;
            tab.isShowEff = true;
            tab.addClickListener(a.onTab, a);
            a.tabArr.push(tab);
        }
        a.drawBt.addClickListener(a.drawHandle, a);
        GGlobal.modelsevent.CG_OPEN_SEVENDAY_LOGIN();
    };
    View_SevenDayLogin_Panel.prototype.drawHandle = function () {
        var sf = this;
        if (sf.drawBt.checkNotice) {
            GGlobal.modelsevent.CG_SEVENDAY_LOGIN_DRAW(sf.curDay);
        }
        else {
            ViewCommonWarn.text("累计登录" + sf.curDay + "天可领取");
        }
    };
    View_SevenDayLogin_Panel.prototype.onTab = function (evt) {
        var sf = this;
        var tab = evt.target;
        var day = tab.data + 1;
        if (day == sf.curDay)
            return;
        sf.curDay = day;
        sf.curTab = tab;
        sf.updateShow();
    };
    View_SevenDayLogin_Panel.prototype.updateTabShow = function () {
        var sf = this;
        for (var i = 0; i < sf.tabArr.length; i++) {
            var tab = sf.tabArr[i];
            var cfg = Config.qrdl_717[i + 1];
            var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
            tab.vo = reward[0];
            if (Model_SevenDayLogin.drawArr[i]) {
                sf.drawImgArr[i].visible = true;
            }
            else {
                sf.drawImgArr[i].visible = false;
                tab.checkNotice = Model_SevenDayLogin.curDay >= i + 1;
            }
        }
        sf.updateShow();
    };
    View_SevenDayLogin_Panel.prototype.updateShow = function () {
        var sf = this;
        sf.selImg.x = sf.curTab.x - 10;
        sf.selImg.y = sf.curTab.y - 7;
        var cfg = Config.qrdl_717[sf.curDay];
        var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
        var len = sf.gridArr.length;
        for (var i = 0; i < len; i++) {
            var grid = sf.gridArr[i];
            if (i < reward.length) {
                grid.vo = reward[i];
                grid.tipEnabled = true;
                grid.visible = true;
            }
            else {
                grid.visible = false;
                grid.vo = null;
            }
        }
        if (Model_SevenDayLogin.drawArr[sf.curDay - 1]) {
            sf.drawImg.visible = true;
            sf.drawBt.visible = false;
            sf.curTab.checkNotice = false;
        }
        else {
            sf.drawImg.visible = false;
            sf.drawBt.visible = true;
            sf.drawBt.enabled = sf.drawBt.checkNotice = Model_SevenDayLogin.curDay >= sf.curDay;
        }
    };
    View_SevenDayLogin_Panel.prototype.updateDay = function () {
        var sf = this;
        sf.curDay = Model_SevenDayLogin.curDay;
        for (var i = 0; i < sf.tabArr.length; i++) {
            if (Model_SevenDayLogin.drawArr[i]) {
                sf.tabArr[i].checkNotice = false;
            }
        }
        for (var i = 0; i < 7; i++) {
            if (Model_SevenDayLogin.curDay > i && !Model_SevenDayLogin.drawArr[i]) {
                sf.curDay = i + 1;
                break;
            }
        }
        sf.curTab = sf.tabArr[sf.curDay - 1];
        sf.updateTabShow();
    };
    View_SevenDayLogin_Panel.prototype.onShown = function () {
        var sf = this;
        sf.updateDay();
        IconUtil.setImg(sf.backImg, Enum_Path.BACK_URL + "sevenDayLogin.jpg");
        GGlobal.control.listen(Enum_MsgType.SEVENDAY_LOGIN, sf.updateDay, sf);
    };
    View_SevenDayLogin_Panel.prototype.onHide = function () {
        var sf = this;
        GGlobal.layerMgr.close(UIConst.SEVENDAY_LOGIN);
        ConfigHelp.cleanGridEff(sf.gridArr);
        ConfigHelp.cleanGridEff(sf.tabArr);
        IconUtil.setImg(sf.backImg, null);
        GGlobal.control.remove(Enum_MsgType.SEVENDAY_LOGIN, sf.updateDay, sf);
    };
    View_SevenDayLogin_Panel.URL = "ui://cg6stvjxmbqo0";
    return View_SevenDayLogin_Panel;
}(UIPanelBase));
__reflect(View_SevenDayLogin_Panel.prototype, "View_SevenDayLogin_Panel");
