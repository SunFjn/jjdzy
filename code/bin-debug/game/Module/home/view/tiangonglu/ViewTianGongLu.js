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
var ViewTianGongLu = (function (_super) {
    __extends(ViewTianGongLu, _super);
    function ViewTianGongLu() {
        var _this = _super.call(this) || this;
        _this.__awardsViewGrid = [];
        _this.isEnough = true;
        _this.UpHD = function () {
            if (!_this.isEnough) {
                ViewCommonWarn.text("材料不足");
                return;
            }
            GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.TIANGONGLU);
        };
        _this.page0Update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = model.getBuildCfgIDByType(HomeModel.TIANGONGLU);
            var level = 0;
            var lib = Config.fdzssj_019;
            var cfg = lib[id];
            self._cfgid = self.nowCFGID = id;
            var godLib = Config.fdtgl_019[id];
            var godNextLib = Config.fdtgl_019[id + 1];
            self.lbFull.text = self.lbNow.text = "巧夺天工次数：" + godLib.cishu + "次";
            if (godNextLib) {
                self.lbNext.text = "巧夺天工次数：" + godNextLib.cishu + "次";
            }
            var nameStr = HtmlUtil.makeRowText(cfg.zsmz);
            self.lbName.text = nameStr;
            self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
            self.n6.text = cfg.zhanli + "";
            self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);
            IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
            var nextCFG = lib[id + 1];
            self.lbNext.visible = Boolean(nextCFG);
            self.lbNextAtt.visible = Boolean(nextCFG);
            self.isEnough = true;
            if (nextCFG) {
                var items = JSON.parse(cfg.xiaohao);
                self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
                var itemCOunt = Model_Bag.getItemCount(items[0][1]);
                self.n17.setLb(itemCOunt, items[0][2]);
                self.n17.setItemId(items[0][1]);
                self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
                self.isEnough = itemCOunt >= items[0][2];
                self.groupAtt.visible = true;
                self.groupFull.visible = false;
            }
            else {
                self.groupAtt.visible = false;
                self.groupFull.visible = true;
            }
            self.btnLevelup.visible = model.isSelfHome;
            self.showCFG(0);
            self.lbxixi.text = "";
        };
        _this._awards = [];
        _this.page1Update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = Number(self._args);
            var cfg = Config.fddc_019[model.home_type];
            var score = cfg.tglxh;
            self.lbCurrentPool.text = "当前奖池：" + cfg.jcmz;
            self.lbCount.text = '今日剩余抽取次数：' + model.lucky_count;
            self.lbCount.color = model.lucky_count != 0 ? Color.GREENINT : Color.REDINT;
            self.lbScore.text = ConfigHelp.numToStr(model.score) + "/" + ConfigHelp.numToStr(score);
            self.lbScore.color = model.score >= score ? Color.GREENINT : Color.REDINT;
            self._awards = ConfigHelp.makeItemListArr(cfg.qdzs);
            for (var i = 0; i < 8; i++) {
                self.__awardsViewGrid[i].grid.vo = self._awards[i];
                self.__awardsViewGrid[i].grid.tipEnabled = true;
                self.__awardsViewGrid[i].grid.showEff(true);
            }
            IconUtil.setImg(self.n47, Enum_Path.BACK_URL + "tgl.jpg");
        };
        _this.openBag = function () {
            var self = _this;
            GGlobal.layerMgr.open(UIConst.HOME_TIANGONG_bag_UI);
        };
        _this.openPreView = function () {
            GGlobal.layerMgr.open(UIConst.HOME_PRE);
        };
        _this.update = function () {
            var self = _this;
            if (self.c1.selectedIndex == 0) {
                self.page0Update();
                self.frame.text = "天工炉升级";
            }
            else {
                self.page1Update();
                self.frame.text = "天工造物";
            }
        };
        _this.luckyHD = function () {
            if (TimeUitl.cool("CG_House_drawAward_11115", 1000)) {
                GGlobal.homemodel.CG_House_drawAward_11115();
            }
        };
        _this.awards = [];
        _this.turnBack = function (items) {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = Number(self._args);
            var cfg = Config.fddc_019[model.home_type];
            var score = cfg.tglxh;
            self.lbCount.text = '今日剩余抽取次数：' + model.lucky_count;
            self.lbScore.text = ConfigHelp.numToStr(model.score) + "/" + ConfigHelp.numToStr(score);
            var pos = (Math.random() * 6) >> 0;
            _this.awards = ConfigHelp.makeItemListArr([items]);
            // for (let i = 0; i < 8; i++) {
            // 	let vo = self.__awardsViewGrid[i].grid.vo;
            // 	if (vo.id == items[1]) {
            // 		pos = i;
            // 		this.awards = [vo];
            // 		break;
            // 	}
            // }
            egret.Tween.get(_this).to({ xx: pos + 8 }, 1200).call(self.overTurn, self);
        };
        _this._xx = 0;
        _this.openLog = function () {
            GGlobal.layerMgr.open(UIConst.HOME_LOG_UI, 2);
        };
        _this.leftHD = function () {
            _this.showCFG(-1);
        };
        _this.rightHD = function () {
            _this.showCFG(1);
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
                        if (Config.fdtgl_019[testid] && Config.fdzssj_019[testid]) {
                            if (nowModel != Config.fdzssj_019[testid].moxing) {
                                self.nowCFGID = testid;
                                var godNextLib = Config.fdzssj_019[testid];
                                IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
                                showDJ = godNextLib.mxdj;
                                if (dj < showDJ)
                                    self.lbxixi.text = godNextLib.zsdj + "级后可使用";
                                else
                                    self.lbxixi.text = "";
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
        _this.childrenCreated();
        return _this;
    }
    ViewTianGongLu.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewTianGongLu"));
    };
    ViewTianGongLu.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewTianGongLu").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.n25.text = HtmlUtil.createLink("奖励预览", true);
        self.__awardsViewGrid = [self.n26, self.n27, self.n28, self.n29, self.n30, self.n31, self.n32, self.n42];
    };
    Object.defineProperty(ViewTianGongLu.prototype, "xx", {
        get: function () {
            return this._xx;
        },
        set: function (v) {
            var self = this;
            v = v >> 0;
            v = v % 8;
            for (var i = 0; i < 8; i++) {
                self.__awardsViewGrid[i].showBg(i == v);
            }
            this._xx = v;
        },
        enumerable: true,
        configurable: true
    });
    ViewTianGongLu.prototype.overTurn = function () {
        var self = this;
        for (var i = 0; i < 8; i++) {
            self.__awardsViewGrid[i].showBg(false);
        }
        this._xx = 0;
        View_Reward_Show4.show(UIConst.HOME, "再來一次", Handler.create(self, function () {
            GGlobal.homemodel.CG_House_drawAward_11115();
        }), this.awards, function () {
            var t_color = Color.GREENSTR;
            if (GGlobal.homemodel.lucky_count <= 0)
                t_color = Color.REDSTR;
            var t_countStr = HtmlUtil.font(GGlobal.homemodel.lucky_count + "", t_color);
            return "\u62BD\u5956\u5269\u4F59\u6B21\u6570\uFF1A" + t_countStr;
        }, self);
    };
    /**
     * 传入1是注册事件 0为移除
     */
    ViewTianGongLu.prototype.eventFunction = function (type) {
        var self = this;
        EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
        EventUtil.register(type, self.n35, EventUtil.TOUCH, self.openBag, self);
        EventUtil.register(type, self.btnGO, EventUtil.TOUCH, self.luckyHD, self);
        EventUtil.register(type, self.n25, EventUtil.LINK, self.openPreView, self);
        EventUtil.register(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.update, self);
        EventUtil.register(type, self.btnLog, EventUtil.TOUCH, self.openLog, self);
        EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
        EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
    };
    ViewTianGongLu.prototype.onShown = function () {
        var self = this;
        if (GGlobal.homemodel.isSelfHome) {
            self.c1.setSelectedIndex(0);
            self.tab0.visible = true;
        }
        else {
            self.c1.setSelectedIndex(1);
            self.tab0.visible = false;
        }
        self.update();
        self.btnLog.visible = Model_player.isMineID(GGlobal.homemodel.home_masterID);
        var control = GGlobal.control;
        control.listen(HomeModel.HOME_UI_DATA_RE, self.update, self);
        control.listen(HomeModel.CHOUJIANG_RE, self.turnBack, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewTianGongLu.prototype.onHide = function () {
        var self = this;
        var control = GGlobal.control;
        control.remove(HomeModel.CHOUJIANG_RE, self.turnBack, self);
        control.remove(HomeModel.HOME_UI_DATA_RE, self.update, self);
        control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
        for (var i = 0; i < 8; i++) {
            self.__awardsViewGrid[i].grid.vo = null;
        }
        egret.Tween.removeTweens(this);
        GGlobal.layerMgr.close(UIConst.HOME_TIANGONG_UI);
        IconUtil.setImg(self.n47, null);
    };
    ViewTianGongLu.URL = "ui://y0plc878ye036";
    return ViewTianGongLu;
}(UIModalPanel));
__reflect(ViewTianGongLu.prototype, "ViewTianGongLu");
