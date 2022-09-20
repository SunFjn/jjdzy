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
var View_ZhiGou_Panel = (function (_super) {
    __extends(View_ZhiGou_Panel, _super);
    function View_ZhiGou_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.moneyTabArr = [];
        _this.curSelDay = 0;
        fairygui.UIObjectFactory.setPackageItemExtension(ZhiGouGrid.URL, ZhiGouGrid);
        _this.loadRes("zhigou", "zhigou_atlas0");
        return _this;
    }
    View_ZhiGou_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("zhigou", "View_ZhiGou_Panel"));
    };
    View_ZhiGou_Panel.prototype.childrenCreated = function () {
        var s = this;
        GGlobal.createPack("zhigou");
        s.view = fairygui.UIPackage.createObject("zhigou", "View_ZhiGou_Panel").asCom;
        s.contentPane = s.view;
        for (var i = 0; i < 7; i++) {
            var tab = (s.view.getChild("tab" + i));
            tab.data = i + 1;
            this.tabArr.push(tab);
            tab.addClickListener(s.tabHandler, s);
            if (i < 3) {
                var moneyTab = (s.view.getChild("moneyTab" + i));
                moneyTab.data = i;
                moneyTab.addClickListener(s.moneyTabHandler, s);
                this.moneyTabArr.push(moneyTab);
            }
        }
        s.list = (s.view.getChild("list"));
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandler;
        s.moneyIcon = (s.view.getChild("moneyIcon"));
        s.drawImg = (s.view.getChild("drawImg"));
        s.moneyLb = (s.view.getChild("moneyLb"));
        s.closeBt = (s.view.getChild("closeBt"));
        s.buyBt = (s.view.getChild("buyBt"));
        s.buyBt.addClickListener(s.buyHandler, s);
        s.icon0 = (s.view.getChild("icon0"));
        s.lb0 = (s.view.getChild("lb0"));
        s.v0 = (s.view.getChild("v0"));
        s.noticeImg0 = (s.view.getChild("noticeImg0"));
        s.icon1 = (s.view.getChild("icon1"));
        s.lb1 = (s.view.getChild("lb1"));
        s.v1 = (s.view.getChild("v1"));
        s.noticeImg1 = (s.view.getChild("noticeImg1"));
        s.icon2 = (s.view.getChild("icon2"));
        s.lb2 = (s.view.getChild("lb2"));
        s.v2 = (s.view.getChild("v2"));
        s.noticeImg2 = (s.view.getChild("noticeImg2"));
        s.expBar = (s.view.getChild("expBar"));
        s.img0 = (s.view.getChild("img0"));
        s.img1 = (s.view.getChild("img1"));
        s.img2 = (s.view.getChild("img2"));
        s.timeTxt = (s.view.getChild("timeTxt"));
        var _act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
        if (Model_GlobalMsg.kaifuDay <= 7) {
            // GGlobal.modelActivity.CG_OPENACT(UIConst.ZHI_GOU);
            GGlobal.modelZhiGou.CG_ZHIGOU_OPEN_UI();
        }
        else if (_act) {
            GGlobal.modelEightLock.CG4571(UIConst.ZHI_GOU828);
        }
        else {
            // GGlobal.modelZhiGou.CG_ZHIGOU_OPEN_UI();
            GGlobal.modelActivity.CG_OPENACT(UIConst.ZHI_GOU);
        }
        s.closeBt.addClickListener(s.closeEventHandler, s);
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "zhigou_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        if (!value) {
            GGlobal.mainUICtr.setIconNotice(UIConst.ZHI_GOU, false);
            egret.localStorage.setItem(key, "zhigou_Notice");
        }
        _super.prototype.childrenCreated.call(this);
    };
    View_ZhiGou_Panel.prototype.buyHandler = function () {
        var s = this;
        if (!s.curcfg)
            return;
        if (s.state == 0) {
            var cfgId = this.curcfg.cz;
            GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgId, null, false, "" + this.curcfg.id);
        }
        else if (s.state == 1) {
            var _act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
            if (Model_GlobalMsg.kaifuDay <= 7) {
                // GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_ACTIVITY(s.curcfg.day, s.curcfg.id);
                GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD(s.curcfg.day, s.curcfg.id);
            }
            else if (_act) {
                GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_828(s.curcfg.id);
            }
            else {
                // GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD(s.curcfg.day, s.curcfg.id);
                GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_ACTIVITY(s.curcfg.day, s.curcfg.id);
            }
        }
    };
    View_ZhiGou_Panel.prototype.moneyTabHandler = function (event) {
        var s = this;
        var tab = event.target;
        if (s.moneyTab && tab.id == s.moneyTab.id)
            return;
        if (s.moneyTab)
            s.moneyTab.selected = false;
        tab.selected = true;
        s.moneyTab = tab;
        s.updateList();
    };
    View_ZhiGou_Panel.prototype.tabHandler = function (event) {
        var s = this;
        var tab = event.target;
        if (s.curTab && tab.data == s.curTab.data)
            return;
        if (s.curTab)
            s.curTab.selected = false;
        tab.selected = true;
        s.curTab = tab;
        s.curSelDay = tab.data;
        if (s.moneyTab)
            s.moneyTab.selected = false;
        s.moneyTab = null;
        s.updateList();
    };
    View_ZhiGou_Panel.prototype.renderHandler = function (index, obj) {
        obj.setVo(this.rewardArr[index]);
    };
    View_ZhiGou_Panel.prototype.updateShow = function () {
        var s = this;
        if (s.curSelDay <= 0) {
            for (var i = 0; i < s.tabArr.length; i++) {
                if (i < Model_ZhiGou.curDay) {
                    s.tabArr[i].visible = true;
                    if (s._args && s._args < Model_ZhiGou.curDay) {
                        s.tabArr[i].selected = i + 1 == s._args;
                    }
                    else {
                        s.tabArr[i].selected = i + 1 == Model_ZhiGou.curDay;
                    }
                }
                else {
                    s.tabArr[i].visible = false;
                }
            }
            s.curSelDay = s._args && s._args.day < Model_ZhiGou.curDay ? s._args.day : Model_ZhiGou.curDay;
            s.curTab = s.tabArr[s.curSelDay - 1];
        }
        s.updateList();
        s.updateReward();
    };
    View_ZhiGou_Panel.prototype.updateList = function () {
        var s = this;
        if (Model_ZhiGou.rewardArr.length <= 0)
            return;
        if (!s.curSelDay)
            return;
        var dataArr = Model_ZhiGou.rewardArr[s.curSelDay - 1];
        for (var i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
            var dataArr_1 = Model_ZhiGou.rewardArr[i];
            for (var j = 0; j < dataArr_1.length; j++) {
                if (dataArr_1[j][1] == 1) {
                    s.tabArr[i].getChild("noticeImg").visible = true;
                    break;
                }
                else {
                    s.tabArr[i].getChild("noticeImg").visible = false;
                }
            }
        }
        var state = 0;
        this._act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
        if (Model_GlobalMsg.kaifuDay <= 7) {
            for (var i = 0; i < dataArr.length; i++) {
                var cfg = Config.mrzg1_256[dataArr[i][0]];
                s.moneyTabArr[i].text = cfg.rmb + "元直购";
                if (dataArr[i][1] == 1) {
                    s.moneyTabArr[i].getChild("noticeImg").visible = true;
                }
                else {
                    s.moneyTabArr[i].getChild("noticeImg").visible = false;
                }
            }
            if (s._args) {
                var cfg = Config.mrzg1_256[dataArr[s._args.type][0]];
                if (s.moneyTab)
                    s.moneyTab.selected = false;
                s.moneyTabArr[s._args.type].selected = true;
                s.moneyTab = s.moneyTabArr[s._args.type];
                s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                s.curcfg = cfg;
                state = dataArr[s._args.type][1];
                s._args = null;
            }
            else {
                for (var i = 0; i < dataArr.length; i++) {
                    var cfg = Config.mrzg1_256[dataArr[i][0]];
                    if (!s.moneyTab && dataArr[i][1] != 2) {
                        s.moneyTabArr[i].selected = true;
                        s.moneyTab = s.moneyTabArr[i];
                        s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                        s.curcfg = cfg;
                        state = dataArr[i][1];
                        break;
                    }
                    else if (s.moneyTab && s.moneyTab.data == i) {
                        s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                        s.curcfg = cfg;
                        state = dataArr[i][1];
                        break;
                    }
                    else if (i == dataArr.length - 1) {
                        if (s.moneyTab)
                            s.moneyTab.selected = false;
                        s.moneyTabArr[i].selected = true;
                        s.moneyTab = s.moneyTabArr[i];
                        s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                        s.curcfg = cfg;
                        state = dataArr[i][1];
                    }
                }
            }
        }
        else if (this._act) {
            for (var i = 0; i < dataArr.length; i++) {
                var cfg = Config.mrzg3_256[dataArr[i][0]];
                s.moneyTabArr[i].text = cfg.rmb + "元直购";
                if (dataArr[i][1] == 1) {
                    s.moneyTabArr[i].getChild("noticeImg").visible = true;
                }
                else {
                    s.moneyTabArr[i].getChild("noticeImg").visible = false;
                }
            }
            for (var i = 0; i < dataArr.length; i++) {
                var cfg = Config.mrzg3_256[dataArr[i][0]];
                if (!s.moneyTab && dataArr[i][1] != 2) {
                    s.moneyTabArr[i].selected = true;
                    s.moneyTab = s.moneyTabArr[i];
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                    break;
                }
                else if (s.moneyTab && s.moneyTab.data == i) {
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                    break;
                }
                else if (i == dataArr.length - 1) {
                    if (s.moneyTab)
                        s.moneyTab.selected = false;
                    s.moneyTabArr[i].selected = true;
                    s.moneyTab = s.moneyTabArr[i];
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                }
            }
        }
        else {
            for (var i = 0; i < dataArr.length; i++) {
                var cfg = Config.mrzg2_256[dataArr[i][0]];
                s.moneyTabArr[i].text = cfg.rmb + "元直购";
                if (dataArr[i][1] == 1) {
                    s.moneyTabArr[i].getChild("noticeImg").visible = true;
                }
                else {
                    s.moneyTabArr[i].getChild("noticeImg").visible = false;
                }
            }
            for (var i = 0; i < dataArr.length; i++) {
                var cfg = Config.mrzg2_256[dataArr[i][0]];
                if (!s.moneyTab && dataArr[i][1] != 2) {
                    s.moneyTabArr[i].selected = true;
                    s.moneyTab = s.moneyTabArr[i];
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                    break;
                }
                else if (s.moneyTab && s.moneyTab.data == i) {
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                    break;
                }
                else if (i == dataArr.length - 1) {
                    if (s.moneyTab)
                        s.moneyTab.selected = false;
                    s.moneyTabArr[i].selected = true;
                    s.moneyTab = s.moneyTabArr[i];
                    s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
                    s.curcfg = cfg;
                    state = dataArr[i][1];
                }
            }
        }
        s.buyBt.visible = true;
        s.moneyLb.visible = true;
        s.drawImg.visible = false;
        s.buyBt.checkNotice = state == 1;
        s.state = state;
        s.moneyIcon.url = CommonManager.getUrl("zhigou", (s.curcfg.cz - 30) + "");
        //0:未购买，1:已购买但未领取，2:已领取
        switch (state) {
            case 0:
                s.moneyLb.text = s.curcfg.rmb + "元直购";
                break;
            case 1:
                s.moneyLb.text = "领取";
                break;
            case 2:
                s.moneyLb.visible = s.buyBt.visible = false;
                s.drawImg.visible = true;
                break;
        }
        s.list.numItems = s.rewardArr.length;
    };
    /**更新奖励 */
    View_ZhiGou_Panel.prototype.updateReward = function () {
        var s = this;
        var arr = Model_ZhiGou.rewarStatedArr;
        if (!arr || arr.length <= 0)
            return;
        var end = Model_ZhiGou.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.timeTxt.text = DateUtil.getMSBySecond5(end - servTime);
            Timer.instance.listen(this.onTick, this, 60000);
        }
        else {
            this.timeTxt.text = "活动已结束";
        }
        var cfgv;
        for (var i = 0; i < 3; i++) {
            var vo = arr[i];
            var cfg = Config.mrzgmb_256[vo.id];
            var icon = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
            s["icon" + i].vo = icon;
            s["icon" + i].tipEnabled = false;
            s["lb" + i].text = "购买" + cfg.cishu + "次";
            if (vo.state == 2) {
                s["img" + i].visible = true;
            }
            else {
                s["img" + i].visible = false;
            }
            if (vo.state == 1) {
                s["noticeImg" + i].visible = true;
            }
            else {
                s["noticeImg" + i].visible = false;
            }
            cfgv = cfg;
        }
        var index = 0;
        var curCfg;
        for (var i = 0; i < 3; i++) {
            var vo = arr[i];
            var cfg = Config.mrzgmb_256[vo.id];
            if (Model_ZhiGou.count <= cfg.cishu) {
                index = i;
                curCfg = cfg;
                break;
            }
        }
        s.expBar.max = 100;
        s.expBar.value = (33 * (index + 1)) * (Model_ZhiGou.count / curCfg.cishu);
        s.expBar._titleObject.text = Model_ZhiGou.count + "/" + cfgv.cishu;
    };
    /**icon点击事件 */
    View_ZhiGou_Panel.prototype.iconClick = function (e) {
        var curTarget = e.currentTarget;
        var index = Number(curTarget.name);
        var vo = Model_ZhiGou.rewarStatedArr[index];
        var pointCfg = Config.mrzgmb_256[vo.id];
        var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward));
        GGlobal.layerMgr.open(UIConst.ZHI_GOU_REWARD, { award: rewardArr, vo: vo });
    };
    View_ZhiGou_Panel.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.ZHIGOU_UPDATE, s.updateShow, s);
        s.updateShow();
        for (var i = 0; i < 3; i++) {
            s["icon" + i].addClickListener(s.iconClick, s);
            s["icon" + i].name = i + "";
        }
    };
    View_ZhiGou_Panel.prototype.onHide = function () {
        var s = this;
        if (s.moneyTab)
            s.moneyTab.selected = false;
        s.moneyTab = null;
        if (s.curTab)
            s.curTab.selected = false;
        s.curTab = null;
        GGlobal.layerMgr.close(UIConst.ZHI_GOU);
        GGlobal.control.remove(Enum_MsgType.ZHIGOU_UPDATE, s.updateShow, s);
        for (var i = 0; i < 3; i++) {
            s["icon" + i].removeClickListener(s.iconClick, s);
        }
        Timer.instance.remove(s.onTick, s);
        s.curSelDay = 0;
        s.list.numItems = 0;
    };
    /**活动时间刷新 */
    View_ZhiGou_Panel.prototype.onTick = function () {
        var end = Model_ZhiGou.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.timeTxt.text = DateUtil.getMSBySecond5(end - servTime);
        }
        else {
            this.timeTxt.text = "活动已结束";
            Timer.instance.remove(this.onTick, this);
        }
    };
    View_ZhiGou_Panel.URL = "ui://42sp9wgri884a";
    return View_ZhiGou_Panel;
}(UIModalPanel));
__reflect(View_ZhiGou_Panel.prototype, "View_ZhiGou_Panel");
