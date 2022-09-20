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
var ChildShaoZhuHongBao = (function (_super) {
    __extends(ChildShaoZhuHongBao, _super);
    function ChildShaoZhuHongBao() {
        var _this = _super.call(this) || this;
        _this.currentDay = 1;
        _this._bigAwards = [];
        _this._defaultAwards = [];
        return _this;
    }
    Object.defineProperty(ChildShaoZhuHongBao, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuHongBao"));
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuHongBao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n0.callbackThisObj = self;
        self.n0.itemRenderer = self.dayTabHD;
        self.list0.callbackThisObj = self;
        self.list0.itemRenderer = self.bigAwardsHD;
        self.list1.callbackThisObj = self;
        self.list1.itemRenderer = self.defaultAwardsHD;
    };
    ChildShaoZhuHongBao.prototype.dayTabHD = function (idx, obj) {
        var a = this;
        var tab = obj;
        tab.data = idx + 1;
        tab.text = BroadCastManager.reTxt("第{0}天", idx + 1);
        var m = GGlobal.modelShaoZhuAct;
        var currentDay = m.hongbaoDay;
        var data = m.hongbao_data[idx + 1];
        if (data) {
            tab.getChild("noticeImg").visible = currentDay >= idx + 1 && data.st == 1;
            tab.getChild("imgYlq").visible = data.st == 2;
            tab.enabled = idx + 1 <= currentDay;
        }
    };
    ChildShaoZhuHongBao.prototype.bigAwardsHD = function (idx, obj) {
        var item = obj;
        item.grid.isShowEff = true;
        item.tipEnabled = true;
        var vo = ConfigHelp.makeItem(this._bigAwards[idx]);
        vo.extra = 5;
        item.vo = vo;
    };
    ChildShaoZhuHongBao.prototype.defaultAwardsHD = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = ConfigHelp.makeItem(this._defaultAwards[idx]);
    };
    ChildShaoZhuHongBao.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
    };
    ChildShaoZhuHongBao.prototype.updateChildShow = function (day) {
        var a = this;
        a.currentDay = day;
        a.n13.url = ["", "ui://w5ll6n5jpdzwl", "ui://w5ll6n5jpdzwo", "ui://w5ll6n5jpdzwn", "ui://w5ll6n5jpdzwr", "ui://w5ll6n5jpdzwp", "ui://w5ll6n5jpdzwq", "ui://w5ll6n5jpdzwm"][day];
        this.n0.numItems = 7;
        var m = GGlobal.modelShaoZhuAct;
        var data = m.hongbao_data[day];
        if (!data)
            return;
        if (data.st == 2) {
            this.c1.selectedIndex = 1;
            var totalArr = data.items;
            a._bigAwards = [];
            a._defaultAwards = [];
            var ii = 0;
            var len = totalArr.length;
            for (ii = 0; ii < len; ii++) {
                var item = totalArr[ii];
                if (item[3] == 1) {
                    a._bigAwards.push(item);
                }
                else {
                    a._defaultAwards.push(item);
                }
            }
            this.list0.numItems = a._bigAwards.length;
            this.list1.numItems = a._defaultAwards.length;
        }
        else {
            this.c1.selectedIndex = 0;
        }
        this.n18.visible = data.st == 1;
        this.updatelog();
    };
    ChildShaoZhuHongBao.prototype.GC_LQ = function (a) {
        var arr = [];
        var len = a.length;
        for (var i = 0; i < len; i++) {
            var vo = {};
            vo['item'] = ConfigHelp.makeItem(a[i]);
            vo["isBig"] = a[i][3] == 1;
            arr.push(vo);
        }
        GGlobal.layerMgr.open(UIConst.SHAOZHU_HONGBAO_AWARDS, arr);
        this.updateChildShow(this.currentDay);
    };
    ChildShaoZhuHongBao.prototype.GC_OPEN = function () {
        var self = this;
        self.currentDay = GGlobal.modelShaoZhuAct.hongbaoDay;
        self.n0.selectedIndex = self.currentDay - 1;
        self.n0.scrollToView(self.currentDay - 1);
        self.updateChildShow(self.currentDay);
    };
    ChildShaoZhuHongBao.prototype.updatelog = function () {
        var n = this;
        var str = '';
        var m = GGlobal.modelShaoZhuAct;
        var len = m.hongbao_log.length;
        for (var i = 0; i < len; i++) {
            var item = m.hongbao_log[i];
            var name_1 = ConfigHelp.getItemColorName(item[2]);
            str += BroadCastManager.reTxt("<font color='{0}'>{1}</font> 开启红包获得了惊喜大奖 {2}*{3}", Color.YELLOWSTR, item[0], name_1, item[3]);
            if (i < len - 1) {
                str += "\n";
            }
        }
        n.n3.setText(str);
        n.n3.reScroll();
    };
    ChildShaoZhuHongBao.prototype.CG_GET = function () {
        GGlobal.modelShaoZhuAct.CG_GET_HONGBAO(this.currentDay);
    };
    ChildShaoZhuHongBao.prototype.onUpdate = function () {
        var datas = GGlobal.modelEightLock.getDatas();
        var act = ModelEightLock.originalDatas[UIConst.SHAOZHU_HONGBAO];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    ChildShaoZhuHongBao.prototype.disposePanel = function () {
        var self = this;
        self.n0.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        GGlobal.control.remove(UIConst.SHAOZHU_HONGBAO_AWARDS, self.GC_LQ, self);
        GGlobal.control.remove(UIConst.SHAOZHU_HONGBAO, self.GC_OPEN, self);
        self.btnChai.removeClickListener(self.CG_GET, self);
        self.n0.numItems = 0;
        self.list0.numItems = 0;
        self.list1.numItems = 0;
        IconUtil.setImg(self.n12, null);
        IconUtil.setImg(self.btnChai, null);
    };
    ChildShaoZhuHongBao.prototype.show = function () {
        var self = this;
        self.n0.numItems = 7;
        GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_HONGBAO);
        self.n0.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        GGlobal.control.listen(UIConst.SHAOZHU_HONGBAO_AWARDS, self.GC_LQ, self);
        GGlobal.control.listen(UIConst.SHAOZHU_HONGBAO, self.GC_OPEN, self);
        self.btnChai.addClickListener(this.CG_GET, this);
        IconUtil.setImg(self.n12, Enum_Path.IMAGE_URL + "shaozhuact/hongbaobg.png");
        IconUtil.setImg(self.btnChai, Enum_Path.IMAGE_URL + "shaozhuact/hongbaochai.jpg");
    };
    ChildShaoZhuHongBao.URL = "ui://w5ll6n5jhsa2h";
    return ChildShaoZhuHongBao;
}(fairygui.GComponent));
__reflect(ChildShaoZhuHongBao.prototype, "ChildShaoZhuHongBao");
