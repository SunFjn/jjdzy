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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewYSSL = (function (_super) {
    __extends(ViewYSSL, _super);
    function ViewYSSL() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this._tabs = [];
        _this._lstDta = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ViewYSSL.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var fac = fairygui.UIObjectFactory.setPackageItemExtension;
        fac(ViewYSSL.URL, ViewYSSL);
        fac(ItemYSSL.URL, ItemYSSL);
        fac(YSTab.URL, YSTab);
    };
    ViewYSSL.createInstance = function () {
        return (fairygui.UIPackage.createObject("yssl", "ViewYSSL"));
    };
    ViewYSSL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    ViewYSSL.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
        // self._tabs = [self.n6, self.n7, self.n8, self.n9];
        // for (let i = 0; i < 4; i++) {
        // 	self._tabs[i].setIdx(i);
        // }
        self.n13.callbackThisObj = self;
        self.n13.itemRenderer = self.itemRender;
        self.n13.scrollItemToViewOnClick = false;
    };
    ViewYSSL.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._lstDta[idx], this._curActVo.id);
    };
    ViewYSSL.prototype.setTabSelected = function () {
        var self = this;
        for (var i = 0; i < 4; i++) {
            // self._tabs[i].setSelect(self.selectIndex == i);
            self._tabs[i].setSelect(self.selectIndex == self._tabs[i].idx);
        }
    };
    ViewYSSL.prototype.updateReddot = function () {
        var self = this;
        var redCtr = GGlobal.reddot;
        // for (let i = 0; i < 4; i++) {
        // 	self._tabs[i].updateDot(redCtr.checkCondition(UIConst.YSSL, i + 1));
        // }
        for (var i = 0; i < 4; i++) {
            self._tabs[i].updateDot(redCtr.checkCondition(self._curActVo.id, self._tabs[i].idx + 1));
        }
    };
    ViewYSSL.prototype.onTabClick = function (e) {
        var s = this;
        s.selectIndex = e.currentTarget.idx;
        s.setTabSelected();
        s.updateView();
    };
    ViewYSSL.prototype.updateView = function () {
        var self = this;
        var m = GGlobal.modelYSSL;
        // let data = m.getCFGByIndex(self.selectIndex + 1);
        var data;
        var priceCFG;
        var today_recharge_val;
        if (self._curActVo.id == UIConst.YSSL) {
            data = m.getCFGByIndex(self.selectIndex + 1);
            priceCFG = m.getPriceByType(self.selectIndex + 1);
            self.n11.visible = m.act_data[self.selectIndex + 1] != 0 ? false : true;
            self.n11.checkNotice = m.today_recharge_val >= priceCFG.rmb;
            today_recharge_val = m.today_recharge_val;
        }
        else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
            data = m.getCFGByIndex1(self.selectIndex + 1, self._curActVo.qs);
            priceCFG = m.getPriceByType1(self.selectIndex + 1);
            self.n11.visible = m.qcyl_act_data[self.selectIndex + 1] != 0 ? false : true;
            self.n11.checkNotice = m.qcyl_recharge_val >= priceCFG.rmb;
            today_recharge_val = m.qcyl_recharge_val;
        }
        data = data.sort(function (a, b) {
            // let data = GGlobal.modelYSSL.task_data;
            var data;
            if (self._curActVo.id == UIConst.YSSL) {
                data = GGlobal.modelYSSL.task_data;
            }
            else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
                data = GGlobal.modelYSSL.qcyl_task_data;
            }
            var data1 = data[a.id];
            var data2 = data[b.id];
            var a_weight = a.id + getWeight(data1.st);
            var b_weight = b.id + getWeight(data2.st);
            return a_weight < b_weight ? -1 : 1;
        });
        function getWeight(s) {
            if (s == 1)
                return -4000;
            if (s == 0)
                return -1000;
            if (s == 2)
                return 1000;
            return 0;
        }
        self._lstDta = data;
        self.n13.numItems = data.length;
        // let priceCFG = m.getPriceByType(self.selectIndex + 1);
        // let today_recharge_val = m.today_recharge_val;
        var color = today_recharge_val >= priceCFG.rmb ? Color.GREENSTR : Color.REDSTR;
        self.lbPro.text = BroadCastManager.reTxt("活动期间累计充值{0}元可激活异兽激活礼<font color='{1}'>({2}/{3})</font>", priceCFG.rmb, color, today_recharge_val, priceCFG.rmb);
        // self.n11.visible = m.act_data[self.selectIndex + 1] != 0 ? false : true;
        // self.n11.checkNotice = m.today_recharge_val >= priceCFG.rmb;
        self.updateReddot();
    };
    ViewYSSL.prototype.actHD = function () {
        var self = this;
        var m = GGlobal.modelYSSL;
        // let priceCFG = m.getPriceByType(self.selectIndex + 1);
        // let today_recharge_val = m.today_recharge_val;
        var priceCFG;
        var today_recharge_val;
        if (self._curActVo.id == UIConst.YSSL) {
            priceCFG = m.getPriceByType(self.selectIndex + 1);
            today_recharge_val = m.today_recharge_val;
        }
        else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
            priceCFG = m.getPriceByType1(self.selectIndex + 1);
            today_recharge_val = m.qcyl_recharge_val;
        }
        if (m.act_data[self.selectIndex] == 1 || today_recharge_val >= priceCFG.rmb) {
            if (self._curActVo.id == UIConst.YSSL) {
                GGlobal.modelYSSL.CG_SpecialAnimalSendGift_active_9221(self.selectIndex + 1);
            }
            else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
                GGlobal.modelYSSL.CG_YCWW_QCYL_active(self.selectIndex + 1);
            }
        }
        else {
            ViewChongZhi.tryToOpenCZ();
        }
    };
    ViewYSSL.prototype.timeUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.lbTime.text = t_dateStr;
    };
    ViewYSSL.prototype.openPanel = function (pData) {
        var self = this;
        var arr = [];
        if (pData) {
            self._curActVo = pData;
            if (self._curActVo.id == UIConst.YSSL) {
                for (var key in Config.yssljh_018) {
                    var vo = Config.yssljh_018[key];
                    if (vo.qishu == self._curActVo.qs) {
                        arr.push(vo);
                    }
                }
            }
            else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
                GGlobal.modelYSSL.qcyl_qs = self._curActVo.qs;
                for (var key in Config.qcyljh_327) {
                    var vo = Config.qcyljh_327[key];
                    if (vo.qishu == self._curActVo.qs) {
                        arr.push(vo);
                    }
                }
            }
        }
        // self.selectIndex = 0;
        self.selectIndex = arr[0].dengji - 1;
        self._tabs = [self.n6, self.n7, self.n8, self.n9];
        for (var i = 0; i < 4; i++) {
            self._tabs[i].setIdx(arr[i].dengji - 1, self._curActVo.id);
        }
        for (var i = 0; i < 4; i++) {
            self._tabs[i].addClickListener(self.onTabClick, self);
        }
        GGlobal.modelEightLock.CG4571(self._curActVo.id);
        self.n11.addClickListener(self.actHD, self);
        Timer.instance.listen(self.timeUpdate, self);
        if (self._curActVo.id == UIConst.YSSL) {
            IconUtil.setImg(self.n1, Enum_Path.ACTCOM_URL + "yssl.jpg");
            GGlobal.control.listen(ModelYSSL.OPEN, self.updateView, self);
        }
        else if (self._curActVo.id == UIConst.YUNCHOUWEIWO_QCYL) {
            IconUtil.setImg(self.n1, Enum_Path.ACTCOM_URL + "yssl.jpg");
            GGlobal.control.listen(ModelYSSL.QCYL_OPEN, self.updateView, self);
        }
        self.setTabSelected();
        self.updateReddot();
        self.updateView();
    };
    ViewYSSL.prototype.closePanel = function (pData) {
        var self = this;
        for (var i = 0; i < 4; i++) {
            self._tabs[i].removeClickListener(self.onTabClick, self);
        }
        self.n13.numItems = 0;
        self.n11.removeClickListener(self.actHD, self);
        Timer.instance.remove(self.timeUpdate, self);
        IconUtil.setImg(self.n1, null);
        GGlobal.control.remove(ModelYSSL.OPEN, self.updateView, self);
        GGlobal.control.remove(ModelYSSL.QCYL_OPEN, self.updateView, self);
    };
    ViewYSSL.URL = "ui://sbm40ly4ln000";
    /** 设置包名（静态属性） */
    ViewYSSL.pkg = "yssl";
    return ViewYSSL;
}(fairygui.GComponent));
__reflect(ViewYSSL.prototype, "ViewYSSL", ["IPanel"]);
