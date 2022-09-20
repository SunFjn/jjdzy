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
var ChildCaoCao = (function (_super) {
    __extends(ChildCaoCao, _super);
    function ChildCaoCao() {
        var _this = _super.call(this) || this;
        _this.requstTime = 0;
        _this.yulanWards = [];
        _this.lastWards = [];
        return _this;
    }
    ChildCaoCao.createInstance = function () {
        return (fairygui.UIPackage.createObject("CaoCaoLaiXi", "ChildCaoCao"));
    };
    ChildCaoCao.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildCaoCao.prototype.openPanel = function (vo) {
        var self = this;
        self.vo = vo;
        self.setdata();
        self.listen();
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.uiparent = self.roleIcon.displayObject;
            self.awatar.setPos(self.roleIcon.width / 2, self.roleIcon.height);
            self.awatar.setScaleXY(1.5, 1.5);
        }
        var cfg = Config.cclx_754[1];
        var lb = Config.NPC_200[JSON.parse(cfg.boss)[0][1]];
        self.awatar.setBody(lb.mod);
        if (lb.weapon) {
            self.awatar.setWeapon(lb.mod);
        }
        self.awatar.onAdd();
        if (vo.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(vo.getSurTime());
            Timer.instance.listen(self.timeHandler, self);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
        }
        GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
        // IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "frameBg3.jpg");
    };
    ChildCaoCao.prototype.timeHandler = function () {
        var self = this;
        if (self.vo.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
            Timer.instance.listen(self.timeHandler, self);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    ChildCaoCao.prototype.closePanel = function (pData) {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        self.removelis();
        self.clearGrid();
        Timer.instance.remove(self.timeHandler, self);
        // IconUtil.setImg(self.backIcon, null);
        GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RANK);
    };
    ChildCaoCao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.com = new fairygui.GComponent;
        this.addChild(self.com);
        self.com.setScale(0.8, 0.8);
    };
    ChildCaoCao.prototype.onTxTClick = function (e) {
        e.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_RANK, 0);
    };
    ChildCaoCao.prototype.onFight = function () {
        if (TimeUitl.cool("ChildCaoCao", 1000)) {
            GGlobal.modelCaoCao.CG_CaoCaoCome_join_8513();
        }
    };
    ChildCaoCao.prototype.updateTime = function () {
        var s = this;
        var m = GGlobal.modelCaoCao;
        var t = Model_GlobalMsg.getServerTime();
        if (m.ccSt == 1) {
            if (m.CDEnter <= 0) {
                s.lbTime.text = "";
            }
            else {
                m.CDEnter--;
                s.lbTime.text = "进入冷却时间：" + m.CDEnter + "秒";
            }
            s.lbTimelimit.visible = false;
        }
        else {
            s.lbTime.text = "";
            s.lbTimelimit.visible = true;
            var data = JSON.parse(ConfigHelp.getSystemDesc(7020));
            var nowData = new Date(t);
            var hour = nowData.getHours();
            var min = nowData.getMinutes();
            var sec = nowData.getSeconds();
            var nextIndex = -1;
            for (var i = 0; i < 3; i++) {
                if (hour == data[i][0]) {
                    if (min >= data[i][1]) {
                        s.lbTimelimit.text = "<font color='#ffc334'>曹操已被击败</font>";
                        return;
                    }
                }
                if (hour < data[i][0] || (hour == data[i][0] && min < data[i][1])) {
                    nextIndex = i;
                    break;
                }
            }
            var time = void 0;
            if (nextIndex == -1) {
                time = (23 - hour + data[0][0]) * 3600 + (59 - min + data[0][1]) * 60 + 59 - sec;
            }
            else {
                time = (data[nextIndex][0] - hour) * 3600 + (data[nextIndex][1] - min) * 60 - sec;
            }
            s.lbTimelimit.text = "<font color='#fe0000'>BOSS刷新倒计时：</font>\n" + TimeUitl.getRemainingTime(time * 1000, 0, { hour: ":", minute: ":", second: " " });
            var now = egret.getTimer();
            if (time < 2 && now - s.requstTime > 2000) {
                s.requstTime = now;
                GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
            }
        }
    };
    ChildCaoCao.prototype.setdata = function () {
        var s = this;
        var lib = Config.cclx_754[1];
        var m = GGlobal.modelCaoCao;
        var bid = JSON.parse(lib.boss)[0][1];
        var bossname = Config.NPC_200[bid]["name"];
        s.lbName.text = bossname.replace("·", "\n·\n");
        ;
        if (m.ccSt == 1) {
            s.progress.visible = true;
            s.g2.visible = false;
            s.progress.max = m.bossMaxHp;
            s.progress.value = m.bossHp;
        }
        else {
            s.progress.visible = false;
            s.g2.visible = true;
        }
        s.clearGrid();
        var join = lib.jlyl;
        var kill = lib.zhyj;
        join = JSON.parse(join);
        kill = JSON.parse(kill);
        s.yulanWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(join), s.com, 85, 510, true, true, 2, 113);
        s.lastWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(kill), s.com, 85, 820, true, true, 2, 113);
        s.promptLb.text = "下轮曹操生命提高<font color='#15f234'>" + m.qmHpMul * 100 + "%</font>";
    };
    ChildCaoCao.prototype.clearGrid = function () {
        var s = this;
        ConfigHelp.cleanGridview(s.yulanWards);
        ConfigHelp.cleanGridview(s.lastWards);
    };
    ChildCaoCao.prototype.reqData = function () {
        GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
    };
    ChildCaoCao.prototype.listen = function () {
        var s = this;
        Timer.instance.listen(s.updateTime, s, 1000);
        s.lbRank.addClickListener(s.onTxTClick, s);
        s.btnFight.addClickListener(s.onFight, s);
        GGlobal.control.listen(UIConst.CAOCAO_LAIXI, s.setdata, s);
    };
    ChildCaoCao.prototype.removelis = function () {
        var s = this;
        s.btnFight.removeClickListener(s.onFight, s);
        s.lbRank.removeClickListener(s.onTxTClick, s);
        Timer.instance.remove(s.updateTime, s);
        GGlobal.control.remove(UIConst.CAOCAO_LAIXI, s.setdata, s);
    };
    ChildCaoCao.URL = "ui://n6fub9ddeq410";
    ChildCaoCao.pkg = "CaoCaoLaiXi";
    return ChildCaoCao;
}(fairygui.GComponent));
__reflect(ChildCaoCao.prototype, "ChildCaoCao", ["IPanel"]);
