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
/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildShaoZhuPig = (function (_super) {
    __extends(ChildShaoZhuPig, _super);
    function ChildShaoZhuPig() {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this._taskType = 0; //0淫猪 1金猪
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.lbTask, EventUtil.TOUCH, self.checkTask, self);
            event(t, self.btnGo0, EventUtil.TOUCH, self.goPage0, self);
            event(t, self.btnGo1, EventUtil.TOUCH, self.goPage1, self);
            event(t, self.btnBuy0, EventUtil.TOUCH, self.buy0, self);
            event(t, self.btnBuy1, EventUtil.TOUCH, self.buy1, self);
            event(t, self.btnLq, EventUtil.TOUCH, self.lqHeadHD, self);
            event(t, self.lbTask1, EventUtil.TOUCH, self.checkTask1, self);
            event(t, self.tab0, EventUtil.TOUCH, self.checkPage0, self);
            event(t, self.tab1, EventUtil.TOUCH, self.checkPage1, self);
            event(t, self.c1, fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        };
        return _this;
    }
    Object.defineProperty(ChildShaoZhuPig, "instance", {
        get: function () {
            var sf = this;
            if (!sf._instance) {
                sf._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuPig"));
            }
            return sf._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuPig.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n16.callbackThisObj = self;
        self.n16.itemRenderer = self.taskRender;
        self.n16.setVirtual();
        self.setCfgDta();
    };
    ChildShaoZhuPig.prototype.setCfgDta = function () {
        var sf = this;
        var chongzhiCFG = Config.shop_011;
        sf.btnBuy0.text = chongzhiCFG[42].explain;
        sf.btnBuy1.text = chongzhiCFG[43].explain;
        var pigCFG = Config.pig_272[1];
        sf.lbyuanbao0.text = BroadCastManager.reTxt("购买立返<font color='{0}'>{1}</font>", Color.TEXT_YELLOW, JSON.parse(pigCFG.reward)[0][2]);
        sf.lbadd0.text = "完成任务再送";
        var pigCFG1 = Config.pig_272[2];
        sf.lbyuanbao1.text = BroadCastManager.reTxt("购买立返<font color='{0}'>{1}</font>", Color.TEXT_YELLOW, JSON.parse(pigCFG1.reward)[0][2]);
        sf.lbadd1.text = "完成任务再送";
    };
    ChildShaoZhuPig.prototype.decideToClose = function () {
        var sf = this;
        if (sf.c1.selectedIndex == 1) {
            sf.backToMain();
            return false;
        }
        return true;
    };
    ChildShaoZhuPig.prototype.taskRender = function (idx, obj) {
        var sf = this;
        var item = obj;
        item.setdata(sf._data[idx]);
    };
    ChildShaoZhuPig.prototype.backToMain = function () {
        var n = this;
        n.c1.selectedIndex = 0;
        n.updateView(0);
    };
    ChildShaoZhuPig.prototype.goPage0 = function () {
        var n = this;
        n._taskType = 0;
        n.updateView(n._taskType);
    };
    ChildShaoZhuPig.prototype.checkTask = function (e) {
        var n = this;
        n._taskType = 0;
        e.stopImmediatePropagation();
        n.c1.selectedIndex = 1;
    };
    ChildShaoZhuPig.prototype.checkTask1 = function (e) {
        var n = this;
        n._taskType = 1;
        e.stopImmediatePropagation();
        n.c1.selectedIndex = 1;
    };
    ChildShaoZhuPig.prototype.goPage1 = function () {
        var n = this;
        n._taskType = 1;
        n.updateView(n._taskType);
    };
    ChildShaoZhuPig.prototype.checkPage0 = function () {
        var sf = this;
        sf._taskType = 0;
        sf.updateView(1);
    };
    ChildShaoZhuPig.prototype.checkPage1 = function () {
        var sf = this;
        sf._taskType = 1;
        sf.updateView(1);
    };
    ChildShaoZhuPig.prototype.buy0 = function () {
        GGlobal.modelchongzhi.CG_CHONGZHI_135(42);
    };
    ChildShaoZhuPig.prototype.buy1 = function () {
        GGlobal.modelchongzhi.CG_CHONGZHI_135(43);
    };
    ChildShaoZhuPig.prototype.lqHeadHD = function () {
        if (GGlobal.modelShaoZhuAct.headst == 1) {
            GGlobal.modelShaoZhuAct.CG_GETHEAD_PIG();
        }
        else {
            ViewCommonWarn.text("尚未达到领取条件");
        }
    };
    ChildShaoZhuPig.prototype.updateView = function (page) {
        var n = this;
        var m = GGlobal.modelShaoZhuAct;
        var cfg = Config.pig_272;
        n.n16.scrollToView(0);
        n.n16.selectedIndex = 0;
        if (n._taskType == 0) {
            n.tab0.selected = true;
            n.tab1.selected = false;
            n._data = m.silverPigtask_data;
            IconUtil.setImg(n.imgBanner, Enum_Path.IMAGE_URL + "shaozhuact/yingzhu.jpg");
            n.lbBuff.text = BroadCastManager.reTxt("元宝增幅：<font color='#15f234'>{0}%</font>", m.yuanbaoAddsilver);
            var yb = (m.yuanbaoAddsilver + 100) / 100 * (JSON.parse(cfg[1].cun)[0][2]) >> 0;
            n.lbAwards.text = yb + "";
            n.lbPro.text = "完成任务：<font color='#15f234'>" + m.silverCompleteCount + "/" + m.maxTask + "</font>";
        }
        else {
            n.tab0.selected = false;
            n.tab1.selected = true;
            n._data = m.GodPigtask_data;
            IconUtil.setImg(n.imgBanner, Enum_Path.IMAGE_URL + "shaozhuact/jingzhu.jpg");
            n.lbBuff.text = BroadCastManager.reTxt("元宝增幅：<font color='#15f234'>{0}%</font>", m.yuanbaoAddGod);
            var yb = ((m.yuanbaoAddGod + 100) / 100 * (JSON.parse(cfg[2].cun)[0][2])) >> 0;
            n.lbAwards.text = yb + "";
            n.lbPro.text = "完成任务：<font color='#15f234'>" + m.goldompleteCount + "/" + m.maxTask + "</font>";
        }
        n.n16.numItems = n._data.length;
    };
    ChildShaoZhuPig.prototype.selectPage = function () {
        var sf = this;
        sf.updateView(sf._taskType);
    };
    ChildShaoZhuPig.prototype.updateShow = function () {
        var m = GGlobal.modelShaoZhuAct;
        var n = this;
        n.btnGo0.visible = m.silverst != 0;
        n.btnGo1.visible = m.goldst != 0;
        n.btnBuy0.visible = m.silverst == 0;
        n.btnBuy1.visible = m.goldst == 0;
        n.headYlq.visible = m.headst == 2;
        n.btnLq.visible = m.headst != 2;
        n.btnLq.checkNotice = m.headst == 1;
        n.btnBuy0.checkNotice = true;
        n.btnBuy1.checkNotice = true;
        var bool1 = false;
        var bool2 = false;
        var len = m.silverPigtask_data.length;
        for (var i = 0; i < len; i++) {
            var data = m.silverPigtask_data[i];
            bool1 = data.st == 1;
            if (bool1)
                break;
        }
        len = m.GodPigtask_data.length;
        for (var i = 0; i < len; i++) {
            var data = m.GodPigtask_data[i];
            bool2 = data.st == 1;
            if (bool2)
                break;
        }
        n.btnGo0.checkNotice = n.tab0.checkNotice = bool1 && m.silverst == 1;
        n.btnGo1.checkNotice = n.tab1.checkNotice = bool2 && m.goldst == 1;
        n.updateView(n._taskType);
    };
    ChildShaoZhuPig.prototype.onUpdate = function () {
        var sf = this;
        var datas = GGlobal.modelEightLock.getDatas();
        var act = ModelEightLock.originalDatas[UIConst.SHAOZHU_PIG];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            sf.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            sf.lbTime.text = "00:00:00";
        }
    };
    ChildShaoZhuPig.prototype.disposePanel = function () {
        var n = this;
        n.eventFunction(0);
        n._taskType = 0;
        n.n16.numItems = 0;
        GGlobal.control.remove(UIConst.SHAOZHU_PIG, n.updateShow, n);
        IconUtil.setImg(n.n27, null);
        IconUtil.setImg(n.n28, null);
        IconUtil.setImg(n.imgBanner, null);
        IconUtil.setImg(n.frameIcon, null);
        IconUtil.setImg(n.headIcon, null);
    };
    ChildShaoZhuPig.prototype.show = function () {
        var n = this;
        var cfg = Config.xtcs_004[6202];
        var headcfg = Config.shezhi_707[cfg.num];
        IconUtil.setImg(n.headIcon, Enum_Path.HEAD_URL + headcfg.picture + ".png");
        IconUtil.setImg(n.frameIcon, Enum_Path.HEAD_URL + 2002 + ".png");
        n.eventFunction(1);
        GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_PIG);
        GGlobal.control.listen(UIConst.SHAOZHU_PIG, n.updateShow, n);
        n.c1.selectedIndex = 0;
        IconUtil.setImg(n.n27, Enum_Path.IMAGE_URL + "shaozhuact/pig1.png");
        IconUtil.setImg(n.n28, Enum_Path.IMAGE_URL + "shaozhuact/pig2.png");
    };
    ChildShaoZhuPig.URL = "ui://w5ll6n5jhsa2f";
    return ChildShaoZhuPig;
}(fairygui.GComponent));
__reflect(ChildShaoZhuPig.prototype, "ChildShaoZhuPig");
