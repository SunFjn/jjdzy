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
/**
 * 六道印记界面
 */
var SixWayYinJiView = (function (_super) {
    __extends(SixWayYinJiView, _super);
    function SixWayYinJiView() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        _this.setSkin("lunhui", "lunhui_atlas0", "SixWayYinJiView");
        return _this;
    }
    SixWayYinJiView.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayYinJiView"));
    };
    SixWayYinJiView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        // self.gridArr = [];
        // for (let i = 0; i < 6; i++) {
        // 	self.gridArr[i] = <SixWayYinJiItem><any>(self.getChild("grid" + i));
        // 	self.gridArr[i].index = i + 1;
        // }
        // self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4, self.grid5];
    };
    SixWayYinJiView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.linkCheck.text = HtmlUtil.createLink("查看套装");
        self.linkCheck.addEventListener(egret.TextEvent.LINK, self.openGaiLV, self);
    };
    SixWayYinJiView.prototype.onShown = function () {
        var s = this;
        s._type = s._args;
        s.gridArr = [s.grid0, s.grid1, s.grid2, s.grid3, s.grid4, s.grid5];
        IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "bg.jpg");
        // GGlobal.modellh.CG_OPEN_ONEWAY(s._type);
        s.addListen();
        s.updateView();
    };
    SixWayYinJiView.prototype.onHide = function () {
        var s = this;
        s.removeListen();
        // GGlobal.layerMgr.close(UIConst.SIXWAY_YINJI);
        GGlobal.layerMgr.open(UIConst.SIXWAY, 2);
    };
    SixWayYinJiView.prototype.addListen = function () {
        var s = this;
        // GGlobal.control.listen(UIConst.SIXWAY_YINJI, s.updateView, s);
        GGlobal.control.listen(Model_LunHui.UP_STAR, s.upStar, s);
        GGlobal.control.listen(Model_LunHui.UP_LEVEL, s.upStar, s);
        s.btnUp.addClickListener(s.onUpLevel, s);
        s.btnStar.addClickListener(s.onUpStar, s);
        s.btnChange.addClickListener(s.onChange, s);
        for (var i = 0; i < s.gridArr.length; i++) {
            s.gridArr[i].addClickListener(s.OnAdd, s);
        }
        s.btnBag.addClickListener(s.onOpenBag, s);
        GGlobal.reddot.listen(UIConst.SIXWAY, s.upBagBtnRed, s);
        GGlobal.modelPlayer.listen(Model_player.YINJI_UPDATE, s.upYinji, s);
    };
    SixWayYinJiView.prototype.removeListen = function () {
        var s = this;
        var modellh = GGlobal.modellh;
        // GGlobal.control.remove(UIConst.SIXWAY_YINJI, s.updateView, s);
        modellh.remove(Model_LunHui.UP_STAR, s.upStar, s);
        modellh.remove(Model_LunHui.UP_LEVEL, s.upStar, s);
        s.btnUp.removeClickListener(s.onUpLevel, s);
        s.btnStar.removeClickListener(s.onUpLevel, s);
        s.btnChange.removeClickListener(s.onChange, s);
        for (var i = 0; i < s.gridArr.length; i++) {
            s.gridArr[i].removeClickListener(s.OnAdd, s);
        }
        s.btnBag.removeClickListener(s.onOpenBag, s);
        GGlobal.reddot.remove(UIConst.SIXWAY, s.upBagBtnRed, s);
        IconUtil.setImg(s.bgImg, null);
        GGlobal.modelPlayer.remove(Model_player.YINJI_UPDATE, s.upYinji, s);
    };
    SixWayYinJiView.prototype.OnAdd = function () {
        var self = this;
        var index = self.c1.selectedIndex;
        self.upSelect(self.gridArr[index]);
        if (self.c2.selectedIndex == 0) {
            GGlobal.layerMgr.open(UIConst.SIXWAY_BAG, self._selectVo.pos);
        }
    };
    SixWayYinJiView.prototype.upSelect = function (v) {
        var self = this;
        self._selectVo = v;
        if (v.vo == null || v.vo.id == 0) {
            self.c2.selectedIndex = 0;
        }
        else {
            self.c2.selectedIndex = 1;
            self.lbName.text = v.vo.colorName;
            self.lbPower.text = "战力：" + v.vo.power;
            self.lbLv.text = "Lv." + v.vo.lv + "/" + v.vo.maxLv;
            self.lbAttr.text = ConfigHelp.attrStringQian(v.vo.attr, "+", null, "#15f234");
            //升级
            var isMaxLv = v.vo.lv >= v.vo.maxLv;
            self.lbMaxLv.visible = isMaxLv;
            self.btnUp.visible = !isMaxLv;
            self.lbCostUp.visible = !isMaxLv;
            if (!isMaxLv) {
                var cfg = Config.sixdaolv_505[v.vo.lv];
                var cost = 0;
                if (v.vo.pz == 2) {
                    cost = cfg.exp2;
                }
                else if (v.vo.pz == 3) {
                    cost = cfg.exp3;
                }
                else if (v.vo.pz == 4) {
                    cost = cfg.exp4;
                }
                else if (v.vo.pz == 5) {
                    cost = cfg.exp5;
                }
                else if (v.vo.pz == 6) {
                    cost = cfg.exp6;
                }
                else {
                    cost = cfg.exp8;
                }
                self.lbCostUp.setCount(HtmlUtil.fontNoSize(cost + "", Model_player.voMine.yinji >= cost ? Color.GREENSTR : Color.REDSTR));
                self.lbCostUp.setImgUrl(29);
                self.btnUp.checkNotice = Model_LunHui.canUpLevel(v.vo);
            }
            self.btnChange.checkNotice = Model_LunHui.canUpPower(v.vo.pos);
            //升星
            var isMaxStar = v.vo.star >= v.vo.maxStar;
            self.lbMaxStar.visible = isMaxStar;
            self.btnStar.visible = !isMaxStar;
            self.lbCostStar.visible = !isMaxStar;
            self.lbCostStarBg.visible = !isMaxStar;
            if (!isMaxStar) {
                var itemCt = Model_LunHui.getItemCt(v.vo.id);
                var colorStr;
                if (itemCt > 0) {
                    colorStr = '#00FF00';
                }
                else {
                    colorStr = '#FF0000';
                }
                self.lbCostStar.text = v.vo.colorName + HtmlUtil.fontNoSize("(" + itemCt + "/1)", colorStr);
                self.btnStar.checkNotice = Model_LunHui.canUpStar(v.vo);
            }
            if (v.vo.maxStar <= 1) {
                self.lbMaxStar.text = "不可升星";
            }
            else {
                self.lbMaxStar.text = "已满星";
            }
        }
    };
    SixWayYinJiView.prototype.upStar = function () {
        var self = this;
        var model = GGlobal.modellh;
        for (var i = 0; i < self.gridArr.length; i++) {
            var id = self._type * 10 + self.gridArr[i].index;
            self.gridArr[i].setVo(model.equipArr[id], id);
        }
        self.upPower();
        if (self._selectVo) {
            self.c1.selectedIndex = self._selectVo.index - 1;
            self.upSelect(self._selectVo);
        }
        else {
            self.c1.selectedIndex = 0;
            self.upSelect(self.gridArr[0]);
        }
        self.updateAttr();
        self.upYinji();
    };
    /**
     * 更新页面数据
     */
    SixWayYinJiView.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.modellh;
        for (var i = 0; i < self.gridArr.length; i++) {
            var id = self._type * 10 + (i + 1);
            self.gridArr[i].index = i + 1;
            self.gridArr[i].setVo(model.equipArr[id], id);
        }
        // self.c1.selectedIndex = 0;
        // self.upSelect(self.gridArr[0]);
        if (self._selectVo) {
            self.c1.selectedIndex = self._selectVo.index - 1;
            self.upSelect(self._selectVo);
        }
        else {
            self.c1.selectedIndex = 0;
            self.upSelect(self.gridArr[0]);
        }
        self.upPower();
        self.updateAttr();
        self.upBagBtnRed();
        self.upYinji();
    };
    /**
     * 更新背包红点
     */
    SixWayYinJiView.prototype.upBagBtnRed = function () {
        var self = this;
        self.btnBag.checkNotice = Model_LunHui.length >= 250;
    };
    SixWayYinJiView.prototype.onUpLevel = function () {
        var v = this._selectVo.vo;
        if (!v) {
            return;
        }
        if (!Model_LunHui.canUpLevel(v, true)) {
            return;
        }
        GGlobal.modellh.CG_UP_LEVEL(this._selectVo.vo.type);
    };
    SixWayYinJiView.prototype.onUpStar = function () {
        var v = this._selectVo.vo;
        if (!v) {
            return;
        }
        if (!Model_LunHui.canUpStar(v, true)) {
            return;
        }
        GGlobal.modellh.CG_UP_STAR(this._selectVo.vo.type);
    };
    /**
     * 更换
     */
    SixWayYinJiView.prototype.onChange = function () {
        // let posB = -1;
        // for (let i = 1; i < 301; i++) {
        // 	if (Model_LunHui.bagMap[i] == null) {
        // 		posB = i;
        // 		break;
        // 	}
        // }
        // if (posB == -1) {
        // 	ViewCommonWarn.text("符文背包已满");
        // 	return;
        // }
        // GGlobal.modellh.CG_USE_YINGJI(2, this._selectVo.vo.id, posB, this._selectVo.vo.type);
        GGlobal.layerMgr.open(UIConst.SIXWAY_BAG, this._selectVo.pos);
    };
    /**
     * 更新战力
     */
    SixWayYinJiView.prototype.upPower = function () {
        var total = 0;
        var model = GGlobal.modellh;
        for (var key in model.equipArr) {
            var eq = model.equipArr[key];
            if (!eq || eq.id == 0)
                continue;
            if (Math.floor(eq.type / 10) == this._type) {
                total += eq.power;
            }
        }
        var id = model.suitArr[this._type - 1];
        var cfg = Config.sixdaotz_505[id];
        var suitPower = cfg ? cfg.power : 0;
        total += suitPower;
        this.powerLb.text = total + "";
    };
    SixWayYinJiView.prototype.openGaiLV = function (evt) {
        GGlobal.layerMgr.open(UIConst.SIXWAY_CHECK, this._type);
    };
    /**
     * 打开分解背包
     */
    SixWayYinJiView.prototype.onOpenBag = function () {
        // GGlobal.layerMgr.close2(UIConst.SIXWAY_YINJI);
        // GGlobal.layerMgr.close2(UIConst.SIXWAY);
        // GGlobal.layerMgr.close2(UIConst.LUNHUI);
        // GGlobal.layerMgr.close2(UIConst.TIANMING);
        GGlobal.layerMgr.open(UIConst.SIXWAY_FENJIE, UIConst.SIXWAY_YINJI);
    };
    /**更新属性 */
    SixWayYinJiView.prototype.updateAttr = function () {
        var s = this;
        var model = GGlobal.modellh;
        var len = model.suitArr.length;
        var curCfg;
        var id = model.suitArr[s._type - 1];
        if (id <= 0) {
            for (var key in Config.sixdaotz_505) {
                var cfg = Config.sixdaotz_505[key];
                if (cfg.type == s._type) {
                    curCfg = cfg;
                    break;
                }
            }
            s.nameLb.text = HtmlUtil.fontNoSize(curCfg.name + "(2/4/6)", "#666666");
            // let attArr: Array<any> = JSON.parse(curCfg.attr);
            // let attstr:string = "";
            // for (let i = 0; i < attArr.length; i++) {
            // 	attstr += Vo_attr.getShowStr(attArr[i][0], 0);
            // }
            s.proLb.text = "红品及以上印记激活套装";
            s.lbSuitPow.text = "战力：" + curCfg.power;
        }
        else {
            var str = "";
            curCfg = Config.sixdaotz_505[id];
            if (curCfg.num == 2) {
                str = "(" + HtmlUtil.fontNoSize("2", Color.WHITESTR) + "/4/6)";
            }
            else if (curCfg.num == 4) {
                str = "(2/" + HtmlUtil.fontNoSize("4", Color.WHITESTR) + "/6)";
            }
            else {
                str = "(2/4/" + HtmlUtil.fontNoSize("6", Color.WHITESTR) + ")";
            }
            s.nameLb.text = ConfigHelp.createColorName(curCfg.name, curCfg.pz) + str;
            // let attArr: Array<any> = JSON.parse(curCfg.attr);
            // let attstr:string = "";
            // for (let i = 0; i < attArr.length; i++) {
            // 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
            // }
            s.proLb.text = curCfg.tips;
            s.proLb.color = Color.WHITEINT;
            s.lbSuitPow.text = "战力：" + curCfg.power;
            s.lbSuitPow.color = Color.WHITEINT;
        }
    };
    /**更新印记碎片数量 */
    SixWayYinJiView.prototype.upYinji = function () {
        this.vChip.text = ConfigHelp.numToStr(Model_player.voMine.yinji);
    };
    SixWayYinJiView.URL = "ui://ehelf5bh11m1w14";
    return SixWayYinJiView;
}(UIPanelBase));
__reflect(SixWayYinJiView.prototype, "SixWayYinJiView");
