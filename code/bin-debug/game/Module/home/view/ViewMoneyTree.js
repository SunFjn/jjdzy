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
var ViewMoneyTree = (function (_super) {
    __extends(ViewMoneyTree, _super);
    function ViewMoneyTree() {
        var _this = _super.call(this) || this;
        _this.yaoHD = function () {
            GGlobal.homemodel.CG_House_shakeTree_11111();
        };
        _this.isMaxLevel = 0;
        _this.isEnoungh = true;
        _this.UpHD = function () {
            if (!_this.isEnoungh) {
                ViewCommonWarn.text("材料不足");
                return;
            }
            GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.MONEY_TREE);
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = model.getBuildCfgIDByType(HomeModel.MONEY_TREE);
            var level = 0;
            var lib = Config.fdzssj_019;
            var cfg = lib[id];
            self._cfgid = self.nowCFGID = id;
            var godLib = Config.fdyqs_019[id];
            var godNextLib = Config.fdyqs_019[id + 1];
            self.lbFull.text = self.lbNow.text = "摇钱基数：" + godLib.xiaxian + "-" + godLib.shangxian + "元宝";
            if (godNextLib) {
                self.lbNext.text = "摇钱基数：" + godNextLib.xiaxian + "-" + godNextLib.shangxian + "元宝";
            }
            var nameStr = HtmlUtil.makeRowText(cfg.zsmz);
            self.lbName.text = nameStr;
            self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
            self.n2.text = cfg.zhanli + "";
            self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);
            IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
            var nextCFG = lib[id + 1];
            self.n13.visible = Boolean(nextCFG);
            self.lbCondition.visible = !Boolean(nextCFG);
            self.isEnoungh = true;
            if (nextCFG) {
                var items = JSON.parse(cfg.xiaohao);
                self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
                var itemcount = Model_Bag.getItemCount(items[0][1]);
                self.n13.setLb(itemcount, items[0][2]);
                self.n13.setItemId(items[0][1]);
                self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
                self.isEnoungh = itemcount >= items[0][2];
                self.groupAtt.visible = true;
                self.groupFull.visible = false;
            }
            else {
                self.groupAtt.visible = false;
                self.groupFull.visible = true;
            }
            var max = model.buildTopLvel;
            if (max <= level) {
                self.lbCondition.text = "府邸" + (model.home_level + 1) + "级可继续升级";
            }
            self.showCFG(0);
            self.btnLevelup.visible = model.isSelfHome;
            self.btnYao.visible = model.isSelfHome;
            self.lbItem.visible = model.isSelfHome;
            self.n13.visible = model.isSelfHome;
        };
        _this._cfgid = 0;
        _this.nowCFGID = 0;
        _this.showCFG = function (v) {
            var self = _this;
            if (self.nowCFGID) {
                var lib = Config.fdzssj_019[self.nowCFGID];
                var nowModel = lib.moxing;
                var showDJ = lib.mxdj;
                var dj = Config.fdzssj_019[self._cfgid].mxdj;
                ;
                if (v != 0) {
                    var testid = self.nowCFGID + v;
                    for (var i = 0; i < 100; i++) {
                        if (Config.fdyqs_019[testid] && Config.fdzssj_019[testid]) {
                            if (nowModel != Config.fdzssj_019[testid].moxing) {
                                self.nowCFGID = testid;
                                var godNextLib = Config.fdzssj_019[testid];
                                IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
                                showDJ = godNextLib.mxdj;
                                self.btnLevelup.enabled = dj == showDJ;
                                break;
                            }
                            else {
                                testid = testid + v;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                self.btnLeft.visible = showDJ != 1;
                self.btnRight.visible = HomeModel.getModelID(self.nowCFGID);
            }
        };
        _this.leftHD = function () {
            _this.showCFG(-1);
        };
        _this.rightHD = function () {
            _this.showCFG(1);
        };
        _this.childrenCreated();
        return _this;
    }
    ViewMoneyTree.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewMoneyTree"));
    };
    ViewMoneyTree.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewMoneyTree").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewMoneyTree.prototype.timeUpdate = function () {
        var self = this;
        var serverT = Model_GlobalMsg.getServerTime();
        var last = GGlobal.homemodel.nextHitTreeTime;
        var time = last - serverT;
        var model = GGlobal.homemodel;
        if (Config.fddc_019[model.home_type].yqsbs == 0) {
            self.lbTime.text = "府邸档次为普通民居可摇钱";
            self.lbTime.color = Color.REDINT;
        }
        else {
            if (time > 0) {
                self.lbTime.text = DateUtil.getHMSBySecond(Math.floor(time / 1000)) + "后可摇钱";
            }
            else {
                self.lbTime.text = "当前可摇钱";
            }
            self.lbTime.color = Color.GREENINT;
        }
    };
    /**
     * 传入1是注册事件 0为移除
     */
    ViewMoneyTree.prototype.eventFunction = function (type) {
        var self = this;
        EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
        EventUtil.register(type, self.btnYao, EventUtil.TOUCH, self.yaoHD, self);
        EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
        EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
    };
    ViewMoneyTree.prototype.onShown = function () {
        var self = this;
        var control = GGlobal.control;
        self.update();
        self.btnLevelup.enabled = true;
        Timer.listen(self.timeUpdate, self, 1000);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewMoneyTree.prototype.onHide = function () {
        var self = this;
        var control = GGlobal.control;
        Timer.remove(self.timeUpdate, self);
        control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
        GGlobal.layerMgr.close(UIConst.HOME_MONEYTREE_UI);
    };
    ViewMoneyTree.URL = "ui://y0plc878ye035";
    return ViewMoneyTree;
}(UIModalPanel));
__reflect(ViewMoneyTree.prototype, "ViewMoneyTree");
