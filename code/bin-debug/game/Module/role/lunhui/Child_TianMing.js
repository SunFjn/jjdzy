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
var Child_TianMing = (function (_super) {
    __extends(Child_TianMing, _super);
    function Child_TianMing() {
        return _super.call(this) || this;
    }
    Child_TianMing.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "Child_TianMing"));
    };
    Child_TianMing.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_TianMing.prototype.openPanel = function (pData) {
        this.onShown();
    };
    Child_TianMing.prototype.closePanel = function (pData) {
        this.onHide();
    };
    Child_TianMing.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.gridArr = [s.grid0, s.grid1, s.grid2, s.grid3, s.grid4, s.grid5];
    };
    Child_TianMing.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.modellh;
        var r = GGlobal.reddot;
        m.CG_OPENTM_10591();
        r.listen(UIConst.TIANMING, s.upView, s);
        // m.listen(Model_LunHui.OPENUI_TM, s.upView, s)
        // m.listen(Model_LunHui.UP_TM, s.upView, s)
        s.c1.selectedIndex = 0;
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.upControl, s);
        s.btnLv.addClickListener(s.onUp, s);
        s.btnPin.addClickListener(s.onUp, s);
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "tianming.jpg");
    };
    Child_TianMing.prototype.onHide = function () {
        var s = this;
        var m = GGlobal.modellh;
        var r = GGlobal.reddot;
        r.remove(UIConst.TIANMING, s.upView, s);
        // m.remove(Model_LunHui.OPENUI_TM, s.upView, s)
        // m.remove(Model_LunHui.UP_TM, s.upView, s)
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.upControl, s);
        s.btnLv.removeClickListener(s.onUp, s);
        s.btnPin.removeClickListener(s.onUp, s);
        IconUtil.setImg(s.imgBg, null);
        for (var i = 0; i < s.gridArr.length; i++) {
            s.gridArr[i].clean();
        }
        s.grid.clean();
    };
    Child_TianMing.prototype.upView = function () {
        var s = this;
        var m = GGlobal.modellh;
        var power = 0;
        for (var i = 0; i < 6; i++) {
            var v = m.tmArr[i];
            s.gridArr[i].vo = v;
            power += ((v.cfgPin ? v.cfgPin.power : 0) + (v.cfgLv ? v.cfgLv.power : 0));
        }
        s.upSel(m.tmArr[s.c1.selectedIndex]);
        s.powerLb.text = power + "";
    };
    Child_TianMing.prototype.upControl = function () {
        var s = this;
        var m = GGlobal.modellh;
        s.upSel(m.tmArr[s.c1.selectedIndex]);
    };
    Child_TianMing.prototype.upSel = function (v) {
        var s = this;
        s._selVo = v;
        s.upDate();
    };
    Child_TianMing.prototype.upDate = function () {
        var s = this;
        var v = s._selVo;
        if (!v)
            return;
        s.lbName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.pinId % 10));
        if (v.lvId == 0) {
            s.lbPower.text = "";
            s.lbAttr.text = "";
        }
        else {
            s.lbPower.text = "战力+" + (v.cfgPin.power + v.cfgLv.power);
            //合并属性
            var attrPin = JSON.parse(v.cfgPin.attr);
            var attrLv = JSON.parse(v.cfgLv.attr);
            for (var i = 0; i < attrPin.length; i++) {
                var type = attrPin[i][0];
                for (var j = 0; j < attrLv.length; j++) {
                    var type1 = attrLv[j][0];
                    var val1 = attrLv[j][1];
                    if (type == type1) {
                        attrPin[i][1] += val1;
                        break;
                    }
                }
            }
            s.lbAttr.text = ConfigHelp.attrString(attrPin);
        }
        //详情
        s.grid.vo1 = v;
        if (v.lvId == 0) {
            s.lbJiHuo.visible = true;
            s.boxUp.visible = false;
            s.imgMax.visible = false;
            s.lbJiHuo.text = v.cfg.lh + "世轮回开启";
        }
        else if (v.cfgLv.next == 0) {
            s.lbJiHuo.visible = false;
            s.boxUp.visible = false;
            s.imgMax.visible = true;
        }
        else {
            s.lbJiHuo.visible = false;
            s.imgMax.visible = false;
            s.boxUp.visible = true;
            var pin = Config.tmlv_292[v.cfgLv.next].pin;
            var consume = void 0;
            if ((v.pinId % 10) >= pin) {
                s.lb.text = "天命升级";
                s.btnPin.visible = false;
                s.btnLv.visible = true;
                s._itres = ConfigHelp.makeItemListArr(JSON.parse(v.cfgLv.consume))[0];
                consume = v.cfgLv.consume;
            }
            else {
                s.lb.text = "天命升品";
                s.btnLv.visible = false;
                s.btnPin.visible = true;
                s._itres = ConfigHelp.makeItemListArr(JSON.parse(v.cfgPin.consume))[0];
                consume = v.cfgPin.consume;
            }
            s.lbres.text = HtmlUtil.fontNoSize(s._itres.name, Color.getColorStr(s._itres.quality));
            s.vres.setItemId(s._itres.id);
            var bagCt = Model_Bag.getItemCount(s._itres.id);
            s.vres.setLb(bagCt, s._itres.count);
            s.btnPin.checkNotice = s.btnLv.checkNotice = ConfigHelp.checkEnough(consume, false);
        }
    };
    Child_TianMing.prototype.onUp = function (e) {
        var s = this;
        var m = GGlobal.modellh;
        if (!s._selVo) {
            return;
        }
        var lh = Model_player.voMine.reincarnationLevel;
        if (lh < s._selVo.cfg.lh) {
            ViewCommonWarn.text("轮回等级不足");
            return;
        }
        var btn = e.currentTarget;
        if (!btn.checkNotice) {
            View_CaiLiao_GetPanel.show(s._itres);
            return;
        }
        m.CG_UPTM_10593(s._selVo.id);
    };
    Child_TianMing.URL = "ui://ehelf5bhh2o6l";
    return Child_TianMing;
}(fairygui.GComponent));
__reflect(Child_TianMing.prototype, "Child_TianMing", ["IPanel"]);
