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
var ChildRolePanel = (function (_super) {
    __extends(ChildRolePanel, _super);
    function ChildRolePanel() {
        var _this = _super.call(this) || this;
        //索引为装备的部件位置
        _this.equipGridArr = [];
        fairygui.UIObjectFactory.setPackageItemExtension(ViewBagOpenGrid.URL, ViewBagOpenGrid);
        return _this;
    }
    ChildRolePanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ChildRolePanel"));
    };
    ChildRolePanel.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildRolePanel.prototype.openPanel = function (pData) {
        this.onOpen();
    };
    ChildRolePanel.prototype.closePanel = function (pData) {
        this.onClose();
    };
    ChildRolePanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        for (var i = 0; i < 10; i++) {
            s.equipGridArr[i] = s["grid" + i];
            s.equipGridArr[i].grid.gridSource = ViewGrid.ROLE;
        }
    };
    ChildRolePanel.prototype.oneKeyWear = function (event) {
        var bo = false;
        var arr = [];
        for (var i = 0; i < this.equipGridArr.length; i++) {
            var evo = this.equipGridArr[i];
            if (evo.showNotice) {
                bo = true;
                arr.push(evo.data.sid);
            }
        }
        if (bo) {
            var vo = Model_player.voMine;
            GGlobal.modelEquip.CGPutOnEquip(arr);
        }
        else {
            ViewCommonWarn.text("没有装备可换");
        }
        // GuideManager.checkTaskGuide(GuideManager.TYPE_EQUIPGUIDE, 2);
    };
    ChildRolePanel.prototype.openJiangHunHandle = function () {
        // GGlobal.layerMgr.open(UIConst.JIANGHUN);
        //宝物
        GGlobal.layerMgr.open(UIConst.BAOWU);
    };
    ChildRolePanel.prototype.shenjianHandle = function () {
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
    };
    ChildRolePanel.prototype.openXTHandler = function () {
        GGlobal.layerMgr.open(UIConst.XING_TU);
    };
    /**打开轮回系统*/
    ChildRolePanel.prototype.openLHHandler = function () {
        GGlobal.layerMgr.open(UIConst.LUNHUI);
    };
    ChildRolePanel.prototype.openBingFaHandler = function () {
        GGlobal.layerMgr.open(UIConst.BINGFA);
    };
    ChildRolePanel.prototype.openTuJian = function () {
        // GGlobal.layerMgr.open(UIConst.TUJIAN);
        //天书
        GGlobal.layerMgr.open(UIConst.TIANSHU);
    };
    ChildRolePanel.prototype.openSZHandler = function () {
        GGlobal.layerMgr.open(UIConst.ZHAN_JIA);
        // ViewCommonWarn.text("功能暂未开放");
    };
    ChildRolePanel.prototype.openYiBao = function () {
        GGlobal.layerMgr.open(UIConst.YIBAO);
    };
    ChildRolePanel.prototype.openShuXing = function () {
        GGlobal.layerMgr.open(UIConst.ROLESHUXING);
    };
    ChildRolePanel.prototype.onOpen = function () {
        var s = this;
        var f = GGlobal.reddot;
        s.onXianShi();
        s.updateEquip();
        var job = Model_player.voMine.job;
        // ImageLoader.instance.loader(Enum_Path.JUESE_URL + job + ".png", s.imgRole);
        IconUtil.setImg(s.imgRole, Enum_Path.JUESE_URL + job + ".png");
        s.btnSX.addClickListener(s.openShuXing, s);
        s.btnOneKey.addClickListener(s.oneKeyWear, s);
        s.btnBF.addClickListener(s.openBingFaHandler, s);
        s.btnYB.addClickListener(s.openYiBao, s);
        s.btnSZ.addClickListener(s.openSZHandler, s);
        s.btnTJ.addClickListener(s.openTuJian, s);
        s.btnSJ.addClickListener(s.shenjianHandle, s);
        s.btnJH.addClickListener(s.openJiangHunHandle, s);
        s.btnLH.addClickListener(s.openLHHandler, s);
        // s.btnLH.visible = false;
        s.checkBingFa();
        s.checkRolelNotice();
        s.checkZhanJia();
        s.checkBaoWu();
        s.checkTianShu();
        f.listen(ReddotEvent.CHECK_ROLE, s.checkRolelNotice, s);
        f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
        f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.listen(UIConst.JUEXING, s.check_juexing, s);
        GGlobal.control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.updateEquip, s);
        IconUtil.setImg(s.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
    };
    ChildRolePanel.prototype.check_juexing = function () {
        var s = this;
        s.checkBingFa();
        s.checkRolelNotice();
        s.checkZhanJia();
        s.checkBaoWu();
        s.checkTianShu();
    };
    ChildRolePanel.prototype.onClose = function () {
        IconUtil.setImg(this.bgImg, null);
        var s = this;
        var f = GGlobal.reddot;
        s.removeEffe();
        s.btnSX.removeClickListener(s.openShuXing, s);
        s.btnYB.removeClickListener(s.openYiBao, s);
        s.btnBF.removeClickListener(s.openBingFaHandler, s);
        s.btnTJ.removeClickListener(s.openTuJian, s);
        s.btnSJ.removeClickListener(s.shenjianHandle, s);
        s.btnJH.removeClickListener(s.openJiangHunHandle, s);
        s.btnSZ.removeClickListener(s.openSZHandler, s);
        s.btnOneKey.removeClickListener(s.oneKeyWear, s);
        s.btnLH.removeClickListener(s.openLHHandler, s);
        f.remove(ReddotEvent.CHECK_ROLE, s.checkRolelNotice, s);
        f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
        f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.remove(UIConst.JUEXING, s.check_juexing, s);
        GGlobal.control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.updateEquip, s);
        IconUtil.setImg(s.imgRole, null);
    };
    ChildRolePanel.prototype.checkRolelNotice = function () {
        var ret = false;
        var s = this;
        var r = GGlobal.reddot;
        s.btnOneKey.checkNotice = r.checkCondition(UIConst.ROLE, 1);
        s.updateNotice();
        s.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
        s.btnYB.checkNotice = r.checkCondition(UIConst.YIBAO) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
        s.btnLH.checkNotice = r.checkCondition(UIConst.LUNHUI) || r.checkCondition(UIConst.TIANMING) || Model_LunHui.checkSWNotice();
    };
    ChildRolePanel.prototype.checkZhanJia = function () {
        var r = GGlobal.reddot;
        this.btnSZ.checkNotice = r.checkCondition(UIConst.ZHAN_JIA) || r.checkCondition(UIConst.JUEXING, 6);
    };
    ChildRolePanel.prototype.checkBaoWu = function () {
        var r = GGlobal.reddot;
        this.btnJH.checkNotice = r.checkCondition(UIConst.BAOWU) || r.checkCondition(UIConst.BAOWU, 1) || r.checkCondition(UIConst.BAOWU, 2) || r.checkCondition(UIConst.JUEXING, 1);
    };
    ChildRolePanel.prototype.checkTianShu = function () {
        var s = this;
        s.btnTJ.checkNotice = false;
        var r = GGlobal.reddot;
        var ret = false;
        if (ModuleManager.isOpen(UIConst.TIANSHU)) {
            for (var i = 0; i < 6; i++) {
                ret = r.checkCondition(UIConst.TIANSHU, i);
                if (ret)
                    break;
            }
            if (!ret) {
                ret = r.checkCondition(UIConst.JUEXING, 4);
            }
            s.btnTJ.checkNotice = ret;
        }
    };
    ChildRolePanel.prototype.checkBingFa = function () {
        var ret = false;
        for (var i = 0; i < 4; i++) {
            ret = GGlobal.reddot.checkCondition(UIConst.BINGFA, i);
            if (ret)
                break;
        }
        if (!ret)
            ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5);
        this.btnBF.checkNotice = ret;
    };
    ChildRolePanel.prototype.updatePower = function () {
        var vo = Model_player.voMine;
        if (vo)
            this.lbPower.text = vo.str.toString();
    };
    /**检测可以更新的装备 */
    ChildRolePanel.prototype.updateNotice = function () {
        var self = this;
        var vo = Model_player.voMine;
        var grid;
        var bo;
        for (var i = 0; i < self.equipGridArr.length; i++) {
            grid = self.equipGridArr[i];
            var vo_1 = Model_Equip.checkNoticeReplace(i);
            var ret = false;
            if (vo_1) {
                ret = true;
            }
            grid.showNotice = ret;
            grid.data = vo_1;
        }
    };
    ChildRolePanel.prototype.updateEquip = function () {
        this.updateGrid();
        this.updatePower();
        this.updateNotice();
    };
    ChildRolePanel.prototype.updateGrid = function () {
        var self = this;
        var vo = Model_player.voMine;
        var grid;
        for (var i = 0; i < self.equipGridArr.length; i++) {
            grid = self.equipGridArr[i];
            var gindex = i;
            if (vo.equipData[gindex]) {
                grid.vo = vo.equipData[gindex];
                grid.grid.showEff(true);
                grid.grid.tipEnabled = true;
            }
            else {
                grid.grid.showEff(false);
                grid.vo = null;
                grid.grid.tipEnabled = false;
            }
        }
    };
    ChildRolePanel.prototype.removeEffe = function () {
        var self = this;
        var vo = Model_player.voMine;
        var grid;
        for (var i = 0; i < self.equipGridArr.length; i++) {
            grid = self.equipGridArr[i];
            grid.grid.showEff(false);
        }
    };
    ChildRolePanel.prototype.onXianShi = function () {
        var arr = [];
        var boo;
        //宝物
        boo = ModuleManager.isXianShi(UIConst.BAOWU);
        this.btnJH.visible = boo;
        if (boo) {
            arr.push(this.btnJH);
        }
        //天书
        boo = ModuleManager.isXianShi(UIConst.TIANSHU);
        this.btnTJ.visible = boo;
        if (boo) {
            arr.push(this.btnTJ);
        }
        //神剑
        boo = ModuleManager.isXianShi(UIConst.SHEN_JIAN);
        this.btnSJ.visible = boo;
        if (boo) {
            arr.push(this.btnSJ);
        }
        //异宝
        boo = ModuleManager.isXianShi(UIConst.YIBAO);
        this.btnYB.visible = boo;
        if (boo) {
            arr.push(this.btnYB);
        }
        //战甲
        boo = ModuleManager.isXianShi(UIConst.ZHAN_JIA);
        this.btnSZ.visible = boo;
        if (boo) {
            arr.push(this.btnSZ);
        }
        //兵法
        boo = ModuleManager.isXianShi(UIConst.BINGFA);
        this.btnBF.visible = boo;
        if (boo) {
            arr.push(this.btnBF);
        }
        //按钮居中
        var jg = 15;
        var ww = 640;
        var w = 76;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            arr[i].x = (ww - len * w - (len - 1) * jg) / 2 + i * (w + jg);
        }
    };
    //>>>>end
    ChildRolePanel.URL = "ui://3tzqotadua8b2";
    return ChildRolePanel;
}(fairygui.GComponent));
__reflect(ChildRolePanel.prototype, "ChildRolePanel", ["IPanel"]);
