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
var ChildBaZhenTu = (function (_super) {
    __extends(ChildBaZhenTu, _super);
    function ChildBaZhenTu() {
        var _this = _super.call(this) || this;
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.btnWear, EventUtil.TOUCH, self.onWear, self);
            event(t, self.btnChange, EventUtil.TOUCH, self.onWear, self);
            event(t, self.btnUp, EventUtil.TOUCH, self.onUpLevel, self);
            event(t, self.btnStar, EventUtil.TOUCH, self.onUpStar, self);
            event(t, self.btnShow, EventUtil.TOUCH, self.onShow, self);
            event(t, self.btnFast, EventUtil.TOUCH, self.onFast, self);
            event(t, self.btnDaShi, EventUtil.TOUCH, self.openDashi, self);
            for (var i = 0; i < self.gridArr.length; i++) {
                event(t, self.gridArr[i], EventUtil.TOUCH, self.OnChange, self);
            }
        };
        return _this;
    }
    ChildBaZhenTu.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTu"));
    };
    ChildBaZhenTu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.gridArr = [];
        for (var i = 0; i < 10; i++) {
            this.gridArr[i] = (this.getChild("grid" + i));
            this.gridArr[i].index = i + 1;
        }
    };
    ChildBaZhenTu.prototype.open = function () {
        var self = this;
        var modelBaZhenTu = GGlobal.modelBaZhenTu;
        self.eventFunction(1);
        self.grid.tipEnable = true;
        modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, self.openUI, self);
        modelBaZhenTu.listen(Model_BaZhenTu.UP_STAR, self.upStar, self);
        modelBaZhenTu.listen(Model_BaZhenTu.UP_LEVEL, self.upStar, self);
        modelBaZhenTu.listen(Model_BaZhenTu.DA_SHI, self.upDashi, self);
        GGlobal.modelPlayer.listen(Model_player.FUWEN_UPDATE, self.upFuwen, self);
        modelBaZhenTu.listen(Model_BaZhenTu.JIESUO, self.openUI, self);
        IconUtil.setImg(self.dizuoIcon, Enum_Path.BAZHENTU_URL + "dizuo.png");
        self.update();
    };
    ChildBaZhenTu.prototype.close = function () {
        var self = this;
        var modelBaZhenTu = GGlobal.modelBaZhenTu;
        self.eventFunction(0);
        self.grid.tipEnable = false;
        self.grid.showEff(false);
        modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, self.openUI, self);
        modelBaZhenTu.remove(Model_BaZhenTu.UP_STAR, self.upStar, self);
        modelBaZhenTu.remove(Model_BaZhenTu.UP_LEVEL, self.upStar, self);
        modelBaZhenTu.remove(Model_BaZhenTu.DA_SHI, self.upDashi, self);
        GGlobal.modelPlayer.remove(Model_player.FUWEN_UPDATE, self.upFuwen, self);
        modelBaZhenTu.remove(Model_BaZhenTu.JIESUO, self.openUI, self);
        IconUtil.setImg(self.dizuoIcon, null);
        IconUtil.setImg1(null, self.imgName);
    };
    ChildBaZhenTu.prototype.onWear = function () {
        GGlobal.layerMgr.open(UIConst.BAZHENTU_BAG, this._selectVo.index);
    };
    ChildBaZhenTu.prototype.onUpLevel = function () {
        var v = this._selectVo.vo;
        if (!v) {
            return;
        }
        if (!Model_BaZhenTu.canUpLevel(v, true)) {
            return;
        }
        GGlobal.modelBaZhenTu.CGUplevel4405(this._selectVo.index);
    };
    ChildBaZhenTu.prototype.onUpStar = function () {
        var v = this._selectVo.vo;
        if (!v) {
            return;
        }
        if (!Model_BaZhenTu.canUpStar(v, true)) {
            return;
        }
        GGlobal.modelBaZhenTu.CGUpstar4407(this._selectVo.index);
    };
    ChildBaZhenTu.prototype.OnChange = function () {
        var index = this.c2.selectedIndex;
        this.upSelect(this.gridArr[index]);
        if (this.c1.selectedIndex == 0) {
            GGlobal.layerMgr.open(UIConst.BAZHENTU_BAG, this._selectVo.index);
        }
    };
    ChildBaZhenTu.prototype.openUI = function () {
        this.update();
    };
    ChildBaZhenTu.prototype.upStar = function () {
        for (var i = 0; i < this.gridArr.length; i++) {
            this.gridArr[i].setVo(Model_BaZhenTu.equipArr[i]);
        }
        this.upPower();
        if (this._selectVo) {
            this.c2.selectedIndex = this._selectVo.index - 1;
            this.upSelect(this._selectVo);
        }
        else {
            this.c2.selectedIndex = 0;
            this.upSelect(this.gridArr[0]);
        }
        this.upFuwen();
    };
    ChildBaZhenTu.prototype.update = function () {
        for (var i = 0; i < this.gridArr.length; i++) {
            this.gridArr[i].setVo(Model_BaZhenTu.equipArr[i]);
        }
        this.c2.selectedIndex = 0;
        this.upSelect(this.gridArr[0]);
        this.upPower();
        this.upFuwen();
        this.upDashi();
    };
    ChildBaZhenTu.prototype.upDashi = function () {
        var m = GGlobal.modelBaZhenTu;
        this.lbDaShi.text = m.dsId + "阶";
        this.btnDaShi.checkNotice = m.dsSt == 1 || m.dsSt == 3;
    };
    ChildBaZhenTu.prototype.upSelect = function (v) {
        var self = this;
        self._selectVo = v;
        self.iyuan.visible = false;
        if (Model_BaZhenTu.getIsLock(v.index)) {
            self.c1.selectedIndex = 2;
            var cfg = Config.bzt_261[v.index];
            IconUtil.setImg1(Enum_Path.BAZHENTU_URL + cfg.id + ".png", self.imgName);
            if (v.index > 8) {
                var totol = Model_BaZhenTu.getTotalLv();
                var color = totol < cfg.fw ? Color.REDSTR : Color.GREENSTR;
                self.lbLock1.text = "解锁条件：符文总等级" + HtmlUtil.fontNoSize(cfg.fw + "级", color);
                self.iyuan.visible = true;
                var cost = Number(JSON.parse(cfg.xh)[0][2]);
                color = Model_player.voMine.yuanbao < cost ? Color.REDSTR : Color.GREENSTR;
                self.lbLock2.text = "解锁消耗：        " + HtmlUtil.fontNoSize(cost + "", color);
                self.btnFast.text = "解锁";
                self.btnFast.checkNotice = ((totol >= cfg.fw) && (Model_player.voMine.yuanbao >= cost));
                self.lbProgress.text = totol + "/" + cfg.fw;
                self.lbProgress.color = totol < cfg.fw ? Color.REDINT : Color.GREENINT;
            }
            else {
                self.lbLock1.text = "解锁：玩家达到" + HtmlUtil.fontNoSize(cfg.lv + "级", Color.REDSTR);
                self.lbLock2.text = "快速解锁：VIP" + HtmlUtil.fontNoSize(cfg.vip + "级", Color.REDSTR);
                self.btnFast.text = "快速解锁";
                self.btnFast.checkNotice = false;
                self.lbProgress.text = "";
            }
        }
        else if (v.vo == null || v.vo.id == 0) {
            self.c1.selectedIndex = 0;
            self.btnWear.checkNotice = v.checkNotice;
        }
        else {
            self.c1.selectedIndex = 1;
            self.grid.isShowEff = true;
            self.grid.vo = v.vo;
            self.lbName.text = v.vo.colorName;
            // self.lbName.color = Color.QUALITYCOLOR[v.vo.pz];
            self.lbLv.text = "Lv." + v.vo.level + "/" + v.vo.maxLv;
            self.lbAttr.text = ConfigHelp.attrStringQian(v.vo.attr, "+", null, "#15f234");
            //升星
            var isMaxStar = v.vo.starLv >= v.vo.maxStar;
            self.lbMaxStar.visible = isMaxStar;
            self.btnStar.visible = !isMaxStar;
            self.lbCostStar.visible = !isMaxStar;
            self.lbCostStarBg.visible = !isMaxStar;
            if (!isMaxStar) {
                var itemCt = Model_BaZhenTu.getItemCt(v.vo.id);
                var colorStr;
                if (itemCt > 0) {
                    colorStr = '#00FF00';
                }
                else {
                    colorStr = '#FF0000';
                }
                self.lbCostStar.text = v.vo.colorName + HtmlUtil.fontNoSize("(" + itemCt + "/1)", colorStr);
                self.btnStar.checkNotice = itemCt > 0;
            }
            if (v.vo.maxStar <= 1) {
                self.lbMaxStar.text = "不可升星";
            }
            else {
                self.lbMaxStar.text = "已满星";
            }
            //升级消耗
            var isMaxLv = v.vo.level >= v.vo.maxmaxLv;
            self.lbMaxLv.visible = isMaxLv;
            self.btnUp.visible = !isMaxLv;
            self.lbCostUp.visible = !isMaxLv;
            if (!isMaxLv) {
                var costUp = Config.bztlv_261[v.vo.level];
                var cost = Number(costUp["exp" + v.vo.pz]);
                self.lbCostUp.setCount(HtmlUtil.fontNoSize(cost + "", Model_player.voMine.fuwen >= cost ? Color.GREENSTR : Color.REDSTR));
                self.btnUp.checkNotice = Model_BaZhenTu.canUpLevel(v.vo);
                self.lbCostUp.setImgUrl(Enum_Attr.FUWEN);
            }
            self.btnChange.checkNotice = Model_BaZhenTu.canUpPower(v.index - 1);
        }
    };
    ChildBaZhenTu.prototype.onShow = function () {
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(9, this._selectVo.index);
    };
    ChildBaZhenTu.prototype.onFast = function () {
        if (this._selectVo.index > 8) {
            var cfg = Config.bzt_261[this._selectVo.index];
            var totol = Model_BaZhenTu.getTotalLv();
            if (totol < cfg.fw) {
                ViewCommonWarn.text("符文总等级不足");
                return;
            }
            var cost = Number(JSON.parse(cfg.xh)[0][2]);
            if (Model_player.voMine.yuanbao < cost) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelBaZhenTu.CGJieSuo4415(this._selectVo.index);
        }
        else {
            GGlobal.layerMgr.open(UIConst.VIP);
        }
    };
    ChildBaZhenTu.prototype.upPower = function () {
        var total = 0;
        for (var i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
            var eq = Model_BaZhenTu.equipArr[i];
            if (!eq || eq.id == 0)
                continue;
            total += eq.power;
        }
        this.lbPower.text = total + '';
    };
    ChildBaZhenTu.prototype.upFuwen = function () {
        this.vChip.text = ConfigHelp.numToStr(Model_player.voMine.fuwen);
    };
    ChildBaZhenTu.prototype.openDashi = function () {
        GGlobal.layerMgr.open(UIConst.BAZHENTU_DASHI);
    };
    ChildBaZhenTu.URL = "ui://xrzn9ppaf8nk1";
    return ChildBaZhenTu;
}(fairygui.GComponent));
__reflect(ChildBaZhenTu.prototype, "ChildBaZhenTu");
