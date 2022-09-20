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
var ViewHome = (function (_super) {
    __extends(ViewHome, _super);
    function ViewHome() {
        var _this = _super.call(this) || this;
        _this.levelUpHD = function () {
            var model = GGlobal.homemodel;
            var conditionLV = Config.fdsj_019[model.home_level].dc;
            // if(conditionLV>model.home_type){
            // 	let cfg = Config.fddc_019[conditionLV];
            // 	ViewCommonWarn.text("请先将府邸提升至"+cfg.name);
            // }else{
            GGlobal.homemodel.CG_House_upHouseLv_11105();
            // }
        };
        _this.levelStarHD = function () {
            GGlobal.homemodel.CG_House_upHouseDc_11107();
        };
        _this.openPage1 = function () {
            _this.tab1.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        };
        _this.page0Update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var fdMoney = Model_player.voMine.homeMoney;
            var level = model.home_level;
            var star = model.home_type;
            level = level ? level : 1;
            star = star ? star : 1;
            var lib = Config.fddc_019[star];
            var levelLib = Config.fdsj_019[level];
            self.lbName.text = HtmlUtil.makeRowText(lib.name);
            self.lbLevel.text = level + "级";
            IconUtil.setImg(self.imgHouse, Enum_Path.HOME_URL + lib.yuanhua + ".png");
            var color = Color.REDINT;
            self.lbCondition.text = "";
            var levelCondition = Config.fdsj_019[level].fanrongdu;
            if (levelCondition) {
                if (levelCondition <= model.home_exp) {
                    color = Color.GREENINT;
                }
                self.lbCondition.text = BroadCastManager.reTxt("繁荣度达到{0}可继续升级", levelCondition);
            }
            self.lbCondition.color = color;
            var nextTipLv = lib.dengji;
            self.groupTip.visible = nextTipLv > 0 && level >= nextTipLv;
            var nextLevelLib = levelLib;
            var isfull = model.isTopLevel;
            if (!isfull) {
                nextLevelLib = Config.fdsj_019[level + 1];
            }
            //能力展示
            var homeAbility = BroadCastManager.reTxt("府邸装饰可提升到{0}级\n侍女可提升到{1}级\n家丁可提升到{2}阶{3}级\n府邸建筑可提升到{4}级", nextLevelLib.zhuangshi, nextLevelLib.shinv, Math.floor(nextLevelLib.jiading / 10), nextLevelLib.jiading % 10, nextLevelLib.gj);
            self.lbActivation.text = homeAbility;
            //属性显示
            self.groupInfo.visible = !isfull;
            self.lbFullAttribute.visible = isfull;
            self.imgFull.visible = isfull;
            var nowAttribute = ConfigHelp.makeAttrTextArr(levelLib.shuxing);
            self.lbFullAttribute.text = self.lbNow.text = nowAttribute;
            if (!isfull) {
                var nextAttribute = ConfigHelp.makeAttrTextArr(nextLevelLib.shuxing);
                self.lbNext.text = nextAttribute;
                var items = JSON.parse(levelLib.xiaohao);
                var itemID = items[0][1];
                var itemCount = Model_Bag.getItemCount(itemID);
                self.n36.setItemId(itemID);
                self.n36.setLb(itemCount, items[0][2]);
            }
            //战力显示
            self.n3.text = levelLib.zhanli + "";
        };
        _this.page1Update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var fdMoney = Model_player.voMine.homeMoney;
            var star = model.home_type;
            var level = model.home_level;
            star = star ? star : 1;
            var lib = Config.fddc_019[star];
            var nextLib = Config.fddc_019[star + 1];
            var isfull = model.isTopStar;
            self.imgNextHouse.visible = self.lbNextName.visible = self.lbNextAwards.visible = !isfull;
            self.lbNowName.text = lib.name;
            self.lbStarCondition.color = level >= lib.dengji ? Color.GREENINT : Color.REDINT;
            self.lbStarCondition.text = "";
            var nowAward = JSON.parse(lib.zengjia);
            self.lbNowAwards.text = lib.wenzi;
            IconUtil.setImg(self.imgNowHouse, Enum_Path.HOME_URL + lib.yuanhua + ".png");
            if (!isfull) {
                IconUtil.setImg(self.imgNextHouse, Enum_Path.HOME_URL + nextLib.yuanhua + ".png");
                self.lbNextName.text = nextLib.name;
                self.lbNextAwards.text = nextLib.wenzi;
                var levelUpCost = JSON.parse(lib.xiaohao);
                self.n34.setImgUrl1(Enum_Path.ICON70_URL + levelUpCost[0][0] + ".png");
                // self.n34.setLb(Model_player.voMine.yuanbao, levelUpCost[0][2]);
                self.n34.color = Model_player.voMine.yuanbao >= levelUpCost[0][2] ? Color.GREENINT : Color.REDINT;
                self.n34.setCount(levelUpCost[0][2]);
            }
            self.groupNextHome.visible = !isfull;
            self.groupNowHome.x = isfull ? 171 : 32;
            self.lbStarCondition.visible = !isfull;
        };
        _this.childrenCreated();
        return _this;
    }
    ViewHome.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHome"));
    };
    ViewHome.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHome").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewHome.prototype.update = function () {
        var self = this;
        if (self.c1.selectedIndex == 0) {
            self.frame.text = "府邸升级";
            self.page0Update();
        }
        else {
            self.frame.text = "府邸档次";
            self.page1Update();
        }
        var model = GGlobal.homemodel;
        self.btnLevel.visible = model.isSelfHome;
        self.btnStar.visible = model.isSelfHome;
        self.tab0.checkNotice = self.btnLevel.checkNotice = GGlobal.homemodel.checkHomeLevel();
        self.tab1.checkNotice = self.btnStar.checkNotice = GGlobal.homemodel.checkHomeType();
    };
    ViewHome.prototype.eventFunction = function (type) {
        var self = this;
        var event = EventUtil.register;
        event(type, self.btnLevel, EventUtil.TOUCH, self.levelUpHD, self);
        event(type, self.btnStar, EventUtil.TOUCH, self.levelStarHD, self);
        event(type, self.n13, EventUtil.TOUCH, self.openPage1, self);
        event(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.update, self);
    };
    ViewHome.prototype.onShown = function () {
        var self = this;
        var control = GGlobal.control;
        self.update();
        control.listen(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewHome.prototype.onHide = function () {
        var self = this;
        self.n36.setItemId(0);
        IconUtil.setImg(self.imgHouse, null);
        IconUtil.setImg(self.imgNextHouse, null);
        IconUtil.setImg(self.imgNowHouse, null);
        var control = GGlobal.control;
        control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
        GGlobal.layerMgr.close(UIConst.HOME_LEVELUP_UI);
    };
    ViewHome.URL = "ui://y0plc878ye033";
    return ViewHome;
}(UIModalPanel));
__reflect(ViewHome.prototype, "ViewHome");
