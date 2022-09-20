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
var Child_LiuYi = (function (_super) {
    __extends(Child_LiuYi, _super);
    function Child_LiuYi() {
        var _this = _super.call(this) || this;
        _this._openSix = {};
        _this._kaoShiYQ = true;
        return _this;
    }
    Child_LiuYi.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "Child_LiuYi"));
    };
    Child_LiuYi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s._btnArr = [];
        for (var i = 0; i < 7; i++) {
            var v = s["btn" + i];
            s._btnArr.push(v);
            v.data = i;
        }
    };
    Child_LiuYi.prototype.open = function (vo) {
        var m = GGlobal.model_LiuYi;
        var s = this;
        s._vo = vo;
        m.CG_OPENUI_5125();
        s.registerEvent(true);
    };
    Child_LiuYi.prototype.close = function () {
        var m = GGlobal.model_LiuYi;
        var s = this;
        s.registerEvent(false);
        IconUtil.setImg(s.imgSel, null);
    };
    Child_LiuYi.prototype.upVo = function (vo) {
        var s = this;
        s._vo = vo;
        s.upView();
    };
    Child_LiuYi.prototype.registerEvent = function (pFlag) {
        var m = GGlobal.model_LiuYi;
        var r = GGlobal.reddot;
        var self = this;
        m.register(pFlag, Model_LiuYi.OPENUI, self.upView, self);
        m.register(pFlag, Model_LiuYi.UPLEVEL, self.upLevel, self);
        r.register(pFlag, UIConst.SHAOZHU_LIUYI, self.upRed, self);
        EventUtil.register(pFlag, self.btnLY, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
        EventUtil.register(pFlag, self.btnXT, egret.TouchEvent.TOUCH_TAP, self.onXueTang, self);
        for (var i = 0; i < self._btnArr.length; i++) {
            EventUtil.register(pFlag, self._btnArr[i], egret.TouchEvent.TOUCH_TAP, self.onClickBtn, self);
        }
    };
    Child_LiuYi.prototype.upView = function () {
        var m = GGlobal.model_LiuYi;
        var s = this;
        s._xtVo = m.liuyiObj[s._vo.shaozhuID];
        var school;
        if (!s._xtVo) {
            school = Config.sonsixschool_267[1];
            //开启列表
            s._openSix = {};
            var openSix = JSON.parse(school.six)[0];
            for (var i = 0; i < openSix.length; i++) {
                s._openSix[openSix[i]] = true;
            }
        }
        else {
            school = s._xtVo.cfg;
            s._openSix = s._xtVo.openSix;
        }
        s.lbName.text = school.name;
        if (!s._xtVo) {
            s.btn0.cfg = school;
            for (var i = 0; i < s._btnArr.length - 1; i++) {
                s._btnArr[i + 1].lyId = i + 1;
                s._btnArr[i + 1].open = false;
                s._btnArr[i + 1].vo = null;
            }
            s.lbPower.text = 0 + "";
        }
        else {
            s.btn0.vo = s._xtVo;
            for (var i = 0; i < s._btnArr.length - 1; i++) {
                s._btnArr[i + 1].vo = s._xtVo.lyArr[i];
                s._btnArr[i + 1].open = s._openSix[i + 1];
                ;
            }
            s.upAllPower();
        }
        s.upRed();
        s.upKaoShi();
        s.c1.selectedIndex = 0;
        s.c2.selectedIndex = 0;
        // s.upXueTang()
    };
    Child_LiuYi.prototype.upAllPower = function () {
        var s = this;
        var power = 0;
        var xtCfg = s._xtVo.cfg;
        power += xtCfg.power;
        for (var i = 0; i < s._xtVo.lyArr.length; i++) {
            var ly = s._xtVo.lyArr[i];
            if (!ly.cfg)
                continue;
            power += ly.cfg.power;
        }
        s.lbPower.text = "" + power;
    };
    Child_LiuYi.prototype.upKaoShi = function () {
        var s = this;
        s._kaoShiYQ = true;
        var cfg;
        var lyArr;
        if (!s._xtVo) {
            cfg = Config.sonsixschool_267[1];
            lyArr = [];
            for (var i = 0; i < 6; i++) {
                lyArr.push({ lyId: i + 1, lyLv: 0, st: 0, ks: 0 });
            }
        }
        else {
            cfg = s._xtVo.cfg;
            lyArr = s._xtVo.lyArr;
        }
        if (cfg.yq == "0") {
            s.lbYaoqiu.text = "";
            s.imgYaoqiu.visible = false;
            return;
        }
        var cfgYQ = {};
        var yqArr = JSON.parse(cfg.yq);
        for (var i = 0; i < yqArr.length; i++) {
            cfgYQ[yqArr[i][0]] = yqArr[i][1];
        }
        var str = HtmlUtil.fontNoSize("考试要求：", Color.GREENSTR);
        for (var i = 0; i < lyArr.length; i++) {
            var ly = lyArr[i];
            var isOpen = s._openSix[ly.lyId] ? true : false;
            var max = cfgYQ[ly.lyId];
            if (!isOpen) {
                continue;
            }
            str += "\n";
            if (ly.lyId == 1) {
                str += "礼：";
            }
            else if (ly.lyId == 2) {
                str += "乐：";
            }
            else if (ly.lyId == 3) {
                str += "射：";
            }
            else if (ly.lyId == 4) {
                str += "御：";
            }
            else if (ly.lyId == 5) {
                str += "书：";
            }
            else if (ly.lyId == 6) {
                str += "数：";
            }
            str += HtmlUtil.fontNoSize("Lv" + ly.lyLv + "/" + max, ly.lyLv >= max ? Color.GREENSTR : Color.WHITESTR);
            if (s._kaoShiYQ) {
                s._kaoShiYQ = ly.lyLv >= max;
            }
        }
        s.lbYaoqiu.text = str;
        s.imgYaoqiu.visible = true;
    };
    Child_LiuYi.prototype.onClickBtn = function (evt) {
        var s = this;
        var btn = evt.currentTarget;
        if (btn.data == 0) {
            s.upXueTang();
            s.c2.selectedIndex = 0;
        }
        else {
            s._selVo = btn.vo;
            if (!s._selVo) {
                s._selVo = new Vo_LiuYi_LY();
                s._selVo.initData(btn.lyId);
            }
            s.upLiuYi();
            s.c2.selectedIndex = 1;
        }
    };
    Child_LiuYi.prototype.upLevel = function () {
        var s = this;
        s.upLiuYi();
        s.upKaoShi();
        s.upAllPower();
    };
    Child_LiuYi.prototype.upRed = function () {
        var s = this;
        var m = GGlobal.model_LiuYi;
        if (!s._xtVo) {
            s.btn0.checkNotice = false;
            for (var i = 0; i < s._btnArr.length - 1; i++) {
                s._btnArr[i + 1].checkNotice = false;
            }
        }
        else {
            s.btn0.checkNotice = m.checkXTKaoShi(s._xtVo);
            for (var i = 0; i < s._btnArr.length - 1; i++) {
                var open_1 = s._openSix[i + 1];
                s._btnArr[i + 1].checkNotice = open_1 ? m.checkLyUpLv(s._vo, s._xtVo, s._xtVo.lyArr[i]) : false;
            }
        }
        if (s.c1.selectedIndex == 0) {
            s.upXueTang();
        }
        else {
            s.upLiuYi();
        }
    };
    Child_LiuYi.prototype.upLiuYi = function () {
        var s = this;
        var m = GGlobal.model_LiuYi;
        if (!s._vo || !s._selVo) {
            return;
        }
        var isOpen = s._openSix[s._selVo.lyId] ? true : false;
        s.lbMaxLv.text = "";
        s.lbCanUp.text = "";
        s.lbRes.text = "";
        if (isOpen) {
            s.lbOpen.text = "";
            var cfg = s._selVo.cfg;
            IconUtil.setImg(s.imgSel, Enum_Path.SHAOZHU_URL + s._selVo.lyId + "b.png");
            var nextCfg = Config.sonsix_267[cfg.next];
            var cfgYQ = m.getStarMaxCfg(s._vo.starLv);
            s.lbLvSel.text = "Lv." + s._selVo.lyLv + "/" + cfgYQ["max" + s._selVo.lyId];
            s.lbPowerSel.text = "战力：" + cfg.power;
            var nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null;
            s.lbAttrSel.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);
            //消耗
            if (cfg.consume == "0") {
                s.itRes = null;
                s.vres.visible = false;
                s.btnLY.visible = false;
                s.lbMaxLv.text = HtmlUtil.fontNoSize("已满级", Color.GREENSTR);
            }
            else {
                s.itRes = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume))[0];
                s.vres.setItemId(s.itRes.id);
                var hasCt = Model_Bag.getItemCount(s.itRes.id);
                s.vres.setLb(hasCt, s.itRes.count);
                s.vres.visible = true;
                s.lbRes.text = HtmlUtil.fontNoSize(s.itRes.name, Color.getColorStr(s.itRes.quality));
                if (s._vo.starLv < nextCfg.star) {
                    s.lbCanUp.text = HtmlUtil.fontNoSize(s._vo.cfg.name + ConfigHelp.NumberToChinese(nextCfg.star) + "星可升级", Color.REDSTR);
                    s.btnLY.enabled = false;
                    s.btnLY.checkNotice = false;
                }
                else {
                    s.btnLY.enabled = true;
                    s.btnLY.checkNotice = hasCt >= s.itRes.count;
                }
                s.btnLY.visible = true;
            }
        }
        else {
            var openXtT = s.openXT(s._selVo.lyId);
            s.lbOpen.text = "提升到" + (openXtT ? openXtT.name : "高级") + "可学习六艺·" + s._selVo.cfg.name;
            IconUtil.setImg(s.imgSel, null);
            s.lbLvSel.text = "";
            s.lbPowerSel.text = "";
            s.lbAttrSel.text = "";
            s.vres.visible = false;
            s.vres.visible = false;
            s.btnLY.visible = false;
        }
    };
    Child_LiuYi.prototype.openXT = function (lyId, xtId) {
        if (xtId === void 0) { xtId = 1; }
        while (true) {
            var school = Config.sonsixschool_267[xtId];
            if (!school) {
                return null;
            }
            var openSix = JSON.parse(school.six)[0];
            for (var i = 0; i < openSix.length; i++) {
                if (openSix[i] == lyId) {
                    return school;
                }
            }
            xtId = school.next;
        }
    };
    //学堂
    Child_LiuYi.prototype.upXueTang = function () {
        var s = this;
        var m = GGlobal.model_LiuYi;
        var cfg;
        if (!s._xtVo) {
            cfg = Config.sonsixschool_267[1];
        }
        else {
            cfg = s._xtVo.cfg;
        }
        var nextCfg = Config.sonsixschool_267[cfg.next];
        var nextStr = nextCfg ? "(+" + (nextCfg.jc / 1000) + "%)" : "";
        s.lbPowerXT.text = "战力：" + cfg.power;
        var nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null;
        s.lbAttrXT.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);
        s.lbXT.text = HtmlUtil.fontNoSize(cfg.name + "：", "#1E9CED") + s._vo.cfg.name + "升星基础属性+" + (cfg.jc / 1000) + "%" + HtmlUtil.fontNoSize(nextStr, Color.GREENSTR);
        s.btnXT.visible = (nextCfg != null);
        s.btnXT.checkNotice = m.checkXTKaoShi(s._xtVo);
    };
    Child_LiuYi.prototype.onUp = function () {
        var s = this;
        if (!s._selVo) {
            return;
        }
        if (!s.btnLY.checkNotice) {
            View_CaiLiao_GetPanel.show(s.itRes);
            return;
        }
        GGlobal.model_LiuYi.CG_UPLV_5127(s._vo.shaozhuID, s._selVo.lyId);
    };
    Child_LiuYi.prototype.onXueTang = function () {
        var s = this;
        if (!s._xtVo) {
            ViewCommonWarn.text("未激活少主");
            return;
        }
        if (!s._kaoShiYQ) {
            ViewCommonWarn.text("六艺等级未达到要求");
            return;
        }
        var cfg = s._xtVo.cfg;
        if (Number(cfg.next) == 0) {
            ViewCommonWarn.text("已满级");
            return;
        }
        GGlobal.layerMgr.open(UIConst.SHAOZHU_LIUYI_KAOSHI, s._xtVo);
    };
    Child_LiuYi.URL = "ui://p83wyb2bad1l1h";
    return Child_LiuYi;
}(fairygui.GComponent));
__reflect(Child_LiuYi.prototype, "Child_LiuYi", ["ChildShaoZhu"]);
