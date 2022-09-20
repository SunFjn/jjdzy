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
var View_ShaoZhu_QianNeng = (function (_super) {
    __extends(View_ShaoZhu_QianNeng, _super);
    function View_ShaoZhu_QianNeng() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ShaoZhu_QianNeng.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QianNeng"));
    };
    View_ShaoZhu_QianNeng.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QianNeng").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.list.itemRenderer = self.renderHandler;
        self.list.callbackThisObj = self;
        self.imgGArr = [];
        self.imgLArr = [];
        self.lineArr = [];
        self.lbArr = [];
        self.lbBgArr = [];
        for (var i = 0; i < 8; i++) {
            self.imgGArr.push(self["imgG" + i]);
            self.imgLArr.push(self["imgL" + i]);
            if (i < 7) {
                self.lineArr.push(self["img" + i]);
            }
            self.lbArr.push(self["lb" + i]);
            self.lbBgArr.push(self["lbBg" + i]);
        }
    };
    View_ShaoZhu_QianNeng.prototype.onShown = function () {
        var self = this;
        var m = GGlobal.model_QianNeng;
        self._lisDat = [];
        var arr = GGlobal.modelShaoZhu.shaoZhuArr;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].starcfg.next <= 0) {
                self._lisDat.push(arr[i]);
            }
        }
        var selIndex = 0;
        if (self._args) {
            for (var i = 0; i < self._lisDat.length; i++) {
                if (self._lisDat[i].shaozhuID == self._args) {
                    selIndex = i;
                    break;
                }
            }
        }
        self._sz = self._lisDat[selIndex];
        self.list.numItems = self._lisDat.length;
        m.CG_OPENUI_5133();
        self.upView();
        self.registerEvent(true);
        IconUtil.setImg(self.imgBg, Enum_Path.SHAOZHU_URL + "qnBg.jpg");
    };
    View_ShaoZhu_QianNeng.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        if (self.curItem) {
            self.curItem.choose(false);
            self.curItem = null;
        }
        self.list.numItems = 0;
        IconUtil.setImg(self.imgBg, null);
    };
    View_ShaoZhu_QianNeng.prototype.registerEvent = function (pFlag) {
        var m = GGlobal.model_QianNeng;
        var r = GGlobal.reddot;
        var self = this;
        m.register(pFlag, Model_QianNeng.OPENUI, self.upView, self);
        EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.onListClick, self);
        EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
        EventUtil.register(pFlag, self.btnGrid0, egret.TouchEvent.TOUCH_TAP, self.onGrid0, self);
        EventUtil.register(pFlag, self.btnGrid1, egret.TouchEvent.TOUCH_TAP, self.onGrid1, self);
        GGlobal.reddot.register(pFlag, UIConst.SHAOZHU_QIANNENG, self.upRed, self);
    };
    View_ShaoZhu_QianNeng.prototype.upRed = function () {
        var self = this;
        self.list.numItems = self._lisDat.length;
    };
    View_ShaoZhu_QianNeng.prototype.renderHandler = function (index, obj) {
        var self = this;
        var sz = this._lisDat[index];
        obj.setVo(sz);
        if (!self.curItem && self._sz.shaozhuID == sz.shaozhuID) {
            self.curItem = obj;
            self.curItem.choose(true);
        }
        obj.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, sz.shaozhuID);
    };
    View_ShaoZhu_QianNeng.prototype.onListClick = function (evt) {
        var self = this;
        var item = evt.itemObject;
        if (self.curItem && self.curItem.hashCode == item.hashCode)
            return;
        if (self.curItem)
            self.curItem.choose(false);
        item.choose(true);
        self.curItem = item;
        self._sz = item.vo;
        self.upView();
    };
    View_ShaoZhu_QianNeng.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_QianNeng;
        var model = GGlobal.modelShaoZhu;
        var qn = m.qianNObj[s._sz.shaozhuID];
        if (!qn) {
            return;
            // qn = Vo_QianNeng.createVo(s._sz.shaozhuID)
        }
        s._qn = qn;
        //战力
        s.powerLb.text = qn.cfg.power + "";
        //重
        var chong = Math.floor(qn.qianNId % 100000 / 10);
        //等级
        var level = Math.floor(qn.qianNId % 10);
        //重数
        s.lbLv.text = "d" + chong + "c";
        s.lbLv1.text = "d" + chong + "c";
        //丹药
        var ct0 = 0;
        var ct1 = 0;
        for (var i = 0; i < qn.danArr.length; i++) {
            var dan = qn.danArr[i];
            if (dan.ty == Model_QianNeng.TYPE_DAN0) {
                ct0 = dan.ct;
            }
            else if (dan.ty == Model_QianNeng.TYPE_DAN1) {
                ct1 = dan.ct;
            }
        }
        s.btnGrid0.text = ct0 + "/" + qn.cfg.max1;
        s.btnGrid1.text = ct1 + "/" + qn.cfg.max2;
        var hasCt0 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN0);
        var hasCt1 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN1);
        s.btnGrid0.checkNotice = (hasCt0 > 0 && ct0 < qn.cfg.max1);
        s.btnGrid1.checkNotice = (hasCt1 > 0 && ct1 < qn.cfg.max2);
        var nextCfg = Config.sonqn_267[qn.cfg.next];
        var nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null;
        s.lbAttr.text = ConfigHelp.attrString(JSON.parse(qn.cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);
        if (nextCfg == null) {
            s.imgMax.visible = true;
            s.btnUp.visible = false;
            s.vRes.visible = false;
            s.lbRes.text = "";
        }
        else {
            s.imgMax.visible = false;
            s.btnUp.visible = true;
            s.vRes.visible = true;
            s.itRes = ConfigHelp.makeItemListArr(JSON.parse(qn.cfg.consume))[0];
            var hasCt = Model_Bag.getItemCount(s.itRes.id);
            s.lbRes.text = HtmlUtil.fontNoSize(s.itRes.name, Color.getColorStr(s.itRes.quality));
            s.vRes.setItemId(s.itRes.id);
            s.vRes.setLb(hasCt, s.itRes.count);
            s.btnUp.checkNotice = (qn.act && hasCt >= s.itRes.count);
            if (level == 8) {
                s.btnUp.text = "突破";
            }
            else {
                s.btnUp.text = "冲穴";
            }
        }
        //下一重属性
        var nextChongId = s._sz.shaozhuID * 100000 + (chong + 1) * 10;
        var nextChongCfg = Config.sonqn_267[nextChongId];
        var nextStr = nextChongCfg ? "(+" + (nextChongCfg.jc / 1000) + "%)" : "";
        s.lbName.text = s._sz.cfg.name + "升星基础属性+" + (qn.cfg.jc / 1000) + "%" + HtmlUtil.fontNoSize(nextStr, Color.GREENSTR);
        //展示
        for (var i = 0; i < 8; i++) {
            if (level > i) {
                s.lbArr[i].color = 0xffffff;
                s.imgGArr[i].visible = false;
                s.imgLArr[i].visible = true;
                s.lbBgArr[i].url = "ui://p83wyb2bo89h3v";
            }
            else {
                s.lbArr[i].color = 0x9AB1DE;
                s.imgGArr[i].visible = true;
                s.imgLArr[i].visible = false;
                s.lbBgArr[i].url = "ui://p83wyb2bo89h3u";
            }
            if (i == 7)
                continue;
            if (level > i + 1) {
                s.lineArr[i].url = "ui://p83wyb2bo89h3t"; //亮条
            }
            else {
                s.lineArr[i].url = "ui://p83wyb2bo89h3w"; //灰条
            }
        }
    };
    View_ShaoZhu_QianNeng.prototype.onUp = function () {
        var s = this;
        if (!s._sz) {
            return;
        }
        if (!s._qn.act) {
            ViewCommonWarn.text("少主未激活");
            return;
        }
        if (!s.btnUp.checkNotice) {
            View_CaiLiao_GetPanel.show(s.itRes);
            return;
        }
        GGlobal.model_QianNeng.CG_UP_LEVEL_5135(s._sz.shaozhuID);
    };
    View_ShaoZhu_QianNeng.prototype.onGrid0 = function () {
        var s = this;
        if (!s._qn) {
            return;
        }
        if (!s._qn.act) {
            ViewCommonWarn.text("少主未激活");
            return;
        }
        var it = VoItem.create(Model_QianNeng.EAT_DAN0);
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QIANNENG_DAN, [this._sz, it]);
    };
    View_ShaoZhu_QianNeng.prototype.onGrid1 = function () {
        var s = this;
        if (!s._qn) {
            return;
        }
        if (!s._qn.act) {
            ViewCommonWarn.text("少主未激活");
            return;
        }
        var it = VoItem.create(Model_QianNeng.EAT_DAN1);
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QIANNENG_DAN, [this._sz, it]);
    };
    View_ShaoZhu_QianNeng.URL = "ui://p83wyb2bo89h2d";
    return View_ShaoZhu_QianNeng;
}(UIModalPanel));
__reflect(View_ShaoZhu_QianNeng.prototype, "View_ShaoZhu_QianNeng");
