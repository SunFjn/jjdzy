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
var ViewGmPanel = (function (_super) {
    __extends(ViewGmPanel, _super);
    function ViewGmPanel() {
        var _this = _super.call(this) || this;
        _this.gmConfig = [];
        _this.setSkin("GM", "", "ViewGmPanel");
        Timer.instance.listen(_this.autoWork, _this, 5000);
        return _this;
    }
    ViewGmPanel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildGm.URL, ChildGm);
        fairygui.UIObjectFactory.setPackageItemExtension(ViewGmTip.URL, ViewGmTip);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildGmTip.URL, ChildGmTip);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_SkillTest.URL, Child_SkillTest);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildActivityGm.URL, ChildActivityGm);
        fairygui.UIObjectFactory.setPackageItemExtension(GmBar.URL, GmBar);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildTest.URL, ChildTest);
    };
    ViewGmPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.proBt.addClickListener(this.openPro, this);
        this.c1.selectedIndex = -1;
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.activityList.itemRenderer = this.renderHandler;
        this.activityList.callbackThisObj = this;
        this.activityList.setVirtual();
        this.initConfig();
    };
    ViewGmPanel.prototype.openPro = function () {
        GGlobal.layerMgr.open(UIConst.GM_PROTOCOL);
    };
    ViewGmPanel.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(this._cfgArr[index]);
    };
    ViewGmPanel.prototype.onShown = function () {
        this.addListen();
        this.updateSelect(0);
        this.c1.selectedIndex = 0;
    };
    ViewGmPanel.prototype.onHide = function () {
        this.removeListen();
    };
    ViewGmPanel.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onTouchTapHandler, this);
    };
    ViewGmPanel.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onTouchTapHandler, this);
        GGlobal.layerMgr.close(UIConst.GM);
    };
    ViewGmPanel.prototype.initConfig = function () {
        var self = this;
        GGlobal.modelGM.listen(Model_GM.jsonReady, self.initGMData, self);
        RES.getResByUrl(RESManager.getVersionUrl("resource/config/gm.json"), function (dt) {
            GGlobal.modelGM.notify(Model_GM.jsonReady, dt);
        }, self, RES.ResourceItem.TYPE_JSON);
        //style  bar?????? 1:?????????????????????????????? 2.????????? ???????????? 3?????????????????? 5????????????????????????
        //type ?????????
        //index ?????????
        //title ?????? ??????2???
        //text ??????????????????
        // this.gmConfig = []
        // var roleConfig = [];
        // roleConfig.push({ style: 1, type: 1, index: 10001, title: ["????????????", "?????????"], text: ["?????????", "1"] });
        // roleConfig.push({ style: 3, type: 1, index: 10002, title: ["????????????"] });
        // //????????????
        // roleConfig.push({ style: 2, type: 1, index: 3, title: ["????????????"], text: ["1000"] });
        // roleConfig.push({ style: 2, type: 1, index: 4, title: ["????????????id"], text: ["1"] });
        // roleConfig.push({ style: 2, type: 1, index: 5, title: ["????????????"], text: ["1"] });
        // roleConfig.push({ style: 2, type: 1, index: 6, title: ["????????????"], text: ["1000"] });
        // roleConfig.push({ style: 2, type: 1, index: 99, title: ["????????????"], text: ["1001"] });
        // roleConfig.push({ style: 2, type: 1, index: 9, title: ["??????"], text: ["100"] });
        // roleConfig.push({ style: 2, type: 1, index: 13, title: ["???????????????"], text: ["100"] });
        // roleConfig.push({ style: 2, type: 1, index: 0, title: ["??????????????????", "??????"], text: ["1", "1000"] });
        // var sysConfig = []; //??????GM
        // sysConfig.push({ style: 2, type: 2, index: 1, title: ["????????????"], text: ["1001"] });
        // sysConfig.push({ style: 1, type: 2, index: 2, title: ["??????????????????", "?????????"], text: ["?????????", "1"] });
        // sysConfig.push({ style: 1, type: 2, index: 3, title: ["??????????????????", "?????????"], text: ["?????????", "1"] });
        // sysConfig.push({ style: 3, type: 2, index: 4, title: ["??????????????????"], text: [""] });
        // sysConfig.push({ style: 2, type: 2, index: 14, title: ["???????????????"], text: ["10"] });
        // sysConfig.push({ style: 2, type: 2, index: 15, title: ["?????????"], text: ["10"] });
        // sysConfig.push({ style: 2, type: 2, index: 16, title: ["??????????????????", "??????"], text: ["1", "1001"] });
        // sysConfig.push({ style: 2, type: 2, index: 17, title: ["??????????????????", "????????????"], text: ["1", "1"] });
        // sysConfig.push({ style: 2, type: 2, index: 18, title: ["????????????", "???????????????"], text: ["1"] });
        // sysConfig.push({ style: 2, type: 2, index: 19, title: ["??????cdkey"], text: [""] });
        // sysConfig.push({ style: 2, type: 2, index: 20, title: ["bsh????????????id", "???????????????"], text: ["1", "1"] });
        // var actConfig = []; //??????GM
        // actConfig.push({ style: 3, type: 3, index: 1, break: 1, title: ["?????????????????????:"] });
        // actConfig.push({ style: 4, type: 3, index: 1, title: ["?????????????????????:"], text: ["2017-04-04 00:01:00"] });
        // actConfig.push({ style: 3, type: 3, index: 2, break: 1, title: ["??????????????????:"] });
        // actConfig.push({ style: 4, type: 3, index: 2, title: ["??????????????????:"], text: ["2017-04-04 00:01:00"] });
        // actConfig.push({ style: 2, type: 3, index: 3, title: ["??????0,1,2"], text: ["1"] });
        // actConfig.push({ style: 2, type: 3, index: 4, title: ["??????????????????0,1,2"], text: ["0"] });
        // actConfig.push({ style: 3, type: 3, index: 5, break: 1, title: ["??????????????????:"] });
        // actConfig.push({ style: 4, type: 3, index: 5, title: ["??????????????????:"], text: ["2017-04-04 00:01:00"] });
        // actConfig.push({ style: 3, type: 3, index: 6, break: 1, title: ["??????????????????"] });
        // actConfig.push({ style: 2, type: 3, index: 7, title: ["?????????", "???1???2"], text: ["1", "1"] });
        // actConfig.push({ style: 2, type: 3, index: 7, title: ["?????????", "????????????"], text: ["2", "100"] });
        // actConfig.push({ style: 2, type: 3, index: 8, title: ["?????????", "???1???0"], text: ["1", "1"] });
        // actConfig.push({ style: 2, type: 3, index: 9, title: ["????????????", "0??????1???2???"], text: ["1"] });
        // actConfig.push({ style: 2, type: 3, index: 10, title: ["????????????", "0??????1??????2??????3??????4??????"], text: ["1"] });
        // actConfig.push({ style: 2, type: 3, index: 11, title: ["??????????????????", "??????"], text: ["13", "1"] });
        // actConfig.push({ style: 2, type: 3, index: 12, title: ["??????0,1"], text: ["1"] });
        // var battleConfig = []; //??????GM
        // battleConfig.push({ style: 1, type: 4, index: 1, title: ["??????"], text: ["1000"] });
        // battleConfig.push({ style: 2, type: "addEnemy", index: 2, title: ["????????????"], text: ["32009"] });
        // battleConfig.push({ style: 2, type: "removeEnemys", index: 2, title: ["????????????????????????"], text: [] });
        // var ontherConfig = []; //??????GM
        // ontherConfig.push({ style: 3, type: 5, index: 1, title: ["??????????????????"] });
        // ontherConfig.push({ style: 2, type: 5, index: 2, title: ["????????????"], text: ["1"] });
        // ontherConfig.push({ style: 2, type: 5, index: 3, title: ["??????????????????", "????????????"], text: ["1", "1"] });
        // ontherConfig.push({ style: 2, type: 5, index: 4, title: ["??????????????????", "????????????"], text: ["1", "1"] });
        // ontherConfig.push({ style: 3, type: 5, index: 5, title: ["????????????"] });
        // var activityConfig = []; //??????GM
        // activityConfig.push({ style: 2, type: 6, index: 1, title: ["??????Id", "??????", "????????????", "????????????"], text: ["1", "1", "time", "time"] });
        // activityConfig.push({ style: 2, type: 6, index: 2, title: ["??????Id", "??????", "1??????2??????"], text: ["1", "1", "1"] });
        // activityConfig.push({ style: 2, type: 6, index: 3, title: ["??????Id", "??????", "????????????", "????????????", "??????"], text: ["1", "1", "time", "time", "1"] });
        // activityConfig.push({ style: 2, type: 6, index: 4, title: ["1:??????2:??????", "??????", "state: ?????? 1????????????2?????????"], text: ["1", "1", "1"] });
        // activityConfig.push({ style: 2, type: 6, index: 5, title: ["?????????????????????"], text: ["1"] });
        // this.gmConfig.push(roleConfig);
        // this.gmConfig.push(sysConfig);
        // this.gmConfig.push(actConfig);
        // this.gmConfig.push(battleConfig);
        // this.gmConfig.push(ontherConfig);
        // this.gmConfig.push(activityConfig);
    };
    ViewGmPanel.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.vo = this._cfgArr[index];
    };
    ViewGmPanel.prototype.onTouchTapHandler = function () {
        this.updateSelect(this.c1.selectedIndex);
    };
    ViewGmPanel.prototype.updateSelect = function (index) {
        this.updateConfig(index);
    };
    ViewGmPanel.updateSeverInfo = function (arg1, arg2, arg3) {
        var type = arg1;
        var content = arg2;
        var index = arg3;
        var slef = GGlobal.layerMgr.getView(UIConst.GM);
        var info = slef.gmConfig[type - 1];
        for (var i = 0; i < info.length; i++) {
            var data = info[i];
            if (data.index == index && data.break != 1) {
                if (index == 5) {
                    var cStr = "";
                    var cArr = content.split(":");
                    for (var k = 0; k < cArr.length; k++) {
                        if (cArr[k] == "" || cArr[k] == null)
                            continue;
                        var kArr = cArr[k].split("_");
                        cStr += "??????" + kArr[0] + ",??????id" + kArr[1] + ",??????" + kArr[2] + ",????????????" + DateUtil.getYMDHMS(Number(kArr[3])) + ",????????????" + DateUtil.getYMDHMS(Number(kArr[4])) + ",??????" + kArr[5];
                        if (k < cArr.length - 1) {
                            cStr += ";";
                        }
                    }
                    data.text = [cStr];
                }
                else {
                    data.text = content;
                }
            }
        }
        slef.reflash();
    };
    ViewGmPanel.prototype.reflash = function () {
        var index = this.c1.selectedIndex;
        this.updateConfig(index);
    };
    ViewGmPanel.prototype.updateConfig = function (index) {
        this._cfgArr = this.gmConfig[index];
        if (!this._cfgArr)
            return;
        if (index < 5) {
            this.list.numItems = this._cfgArr.length;
        }
        else {
            this.activityList.numItems = this._cfgArr.length;
        }
    };
    ViewGmPanel.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewGmPanel.prototype.initGMData = function (data) {
        var self = this;
        var groups = data.groups;
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var title = group.title;
            self.gmConfig.push(group.data);
        }
        self.onShown();
    };
    ViewGmPanel.prototype.autoWork = function () {
        // GMAutoWork.autoWork();
    };
    ViewGmPanel.URL = "ui://vm9a8xq87jrg0";
    return ViewGmPanel;
}(UIPanelBase));
__reflect(ViewGmPanel.prototype, "ViewGmPanel");
