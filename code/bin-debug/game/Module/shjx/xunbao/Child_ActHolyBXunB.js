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
var Child_ActHolyBXunB = (function (_super) {
    __extends(Child_ActHolyBXunB, _super);
    function Child_ActHolyBXunB() {
        var _this = _super.call(this) || this;
        _this.rewardGridArr = [];
        return _this;
    }
    Child_ActHolyBXunB.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "Child_ActHolyBXunB"));
    };
    Child_ActHolyBXunB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self._gridArr = [];
        for (var i = 0; i < 20; i++) {
            this._gridArr.push((self.getChild("grid" + i)));
            if (i < 4) {
                var grid = (self.getChild("grid0" + i));
                self.rewardGridArr.push(grid);
            }
        }
    };
    Child_ActHolyBXunB.prototype.initView = function (pParent) {
    };
    Child_ActHolyBXunB.prototype.openPanel = function (pData) {
        var s = this;
        var c = GGlobal.control;
        // Timer.instance.listen(s.upTimer, s, 1000);
        c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO, s.upUI, s);
        c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, s.updateReward, s);
        c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL, s.upRoll, s);
        c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.upItem, s);
        c.listen(Enum_MsgType.ZERO_RESET, s.zeroReset, s);
        GGlobal.reddot.listen(UIConst.ACTHB_XUNBAO, s.upCheck, s);
        s.btnDice.addClickListener(s.onDice, s);
        s.checkBox.selected = false;
        s.upUI();
        s.zeroReset();
        s.chooseImg.upHead();
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "bg6402.jpg");
    };
    Child_ActHolyBXunB.prototype.closePanel = function (pData) {
        var s = this;
        var c = GGlobal.control;
        c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO, s.upUI, s);
        c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL, s.upRoll, s);
        c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.upItem, s);
        c.remove(Enum_MsgType.ZERO_RESET, s.zeroReset, s);
        GGlobal.reddot.remove(UIConst.ACTHB_XUNBAO, s.upCheck, s);
        c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, s.updateReward, s);
        s.btnDice.removeClickListener(s.onDice, s);
        for (var i = 0; i < 20; i++) {
            this._gridArr[i].clean();
            if (i < 4) {
                s.rewardGridArr[i].clean();
            }
        }
        IconUtil.setImg(s.imgBg, null);
    };
    Child_ActHolyBXunB.prototype.zeroReset = function () {
        GGlobal.modelSHXunbao.CG_XUNBAO_OPENUI();
    };
    Child_ActHolyBXunB.prototype.upUI = function () {
        var s = this;
        var model = GGlobal.modelSHXunbao;
        // s.upTimer();
        s.startIndex = model.xbCurGe;
        s._preGe = model.xbCurGe;
        s.upGrid();
        s.lbQuan.text = "第" + model.xbQuan + "圈";
        s.upItem();
        s.setImgXY(s.startIndex);
        this.btnDice.touchable = true;
        s.upCheck();
        s.updateReward();
    };
    Child_ActHolyBXunB.prototype.updateReward = function () {
        var self = this;
        var model = GGlobal.modelSHXunbao;
        var curIndex = 0;
        for (var i = 0; i < 4; i++) {
            var state = 0;
            var cfg = Config.shxbmb_268[i + 1];
            if (i < GGlobal.modelSHXunbao.xbMuBiaoArr.length) {
                state = GGlobal.modelSHXunbao.xbMuBiaoArr[i].status;
            }
            if (model.xbQuan % 50 >= cfg.q) {
                curIndex = i + 1;
            }
            self.rewardGridArr[i].setVo(cfg, state);
        }
        var maxcfg = Config.shxbmb_268[4];
        var a = [0, 6, 17, 32, 50];
        var xbQuan = model.xbQuan % maxcfg.q;
        var curCfg = Config.shxbmb_268[curIndex];
        var nextCfg = Config.shxbmb_268[curIndex + 1];
        if (xbQuan >= maxcfg.q) {
            self.bar.value = maxcfg.q;
        }
        else {
            var valT = nextCfg.q - (curCfg ? curCfg.q : 0);
            self.bar.value = a[curIndex] + Math.floor((xbQuan - (curCfg ? curCfg.q : 0)) * (a[curIndex + 1] - a[curIndex]) / valT);
        }
        self.bar.max = maxcfg.q;
        self.bar._titleObject.text = xbQuan + "/" + maxcfg.q;
    };
    Child_ActHolyBXunB.prototype.upCheck = function () {
        // let s = this
        // let r = GGlobal.reddot;
        // s.btnTarget.checkNotice = r.checkCondition(UIConst.ACTHB_XUNBAO, 2);
    };
    Child_ActHolyBXunB.prototype.upTimer = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var day = date.getDay(); //0-6
        var end;
        if (day == 0) {
            end = this.oneDayTime();
        }
        else {
            end = (7 - day) * 86400000 + this.oneDayTime();
        }
        // this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(Math.floor(end / 1000))
    };
    Child_ActHolyBXunB.prototype.oneDayTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 + h0 - ms;
        return ax;
    };
    // private onRank() {
    // 	GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBRANK)
    // }
    Child_ActHolyBXunB.prototype.onTarget = function () {
        GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBMUBIAO);
    };
    Child_ActHolyBXunB.prototype.onDice = function () {
        var ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM);
        if (ct <= 0) {
            View_QuickBuy_Panel.show(VoItem.create(Model_SHXunBao.XB_ITEM));
            // ViewCommonWarn.text("道具不足")
            return;
        }
        if (!this.btnDice.touchable) {
            return;
        }
        GGlobal.modelSHXunbao.CG_XUNBAO_ROLL();
        this.btnDice.touchable = false;
    };
    Child_ActHolyBXunB.prototype.upRoll = function () {
        var s = this;
        var model = GGlobal.modelSHXunbao;
        if (s.checkBox.selected) {
            //跳过动画
            // let gird = s._gridArr[s.startIndex]
            // if (gird.vo) {
            // 	AnimationUtil.gridToBag([gird.grid])
            // }
            GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBSHOW, model.xbRewArr);
            s.upUI();
            return;
        }
        var ge = model.xbCurGe - s._preGe;
        if (ge < 0) {
            ge += 20;
        }
        s._preGe = model.xbCurGe;
        s.imgRoll.visible = false;
        s._eff = EffectMgr.addEff("uieff/10034", s.displayListContainer, s.imgRoll.x + s.imgRoll.width / 2 + 29, s.imgRoll.y + s.imgRoll.height / 2 + 31, 200, 600, true);
        s._eff.mc.scaleX = 2;
        s._eff.mc.scaleY = 2;
        if (ge > 6) {
            ge = 6;
        }
        s.imgRoll.url = fairygui.UIPackage.getItemURL("shouhunJX", "roll" + ge);
        setTimeout(function () {
            Timer.instance.listen(s.startEff, s, 200);
        }, 800);
        setTimeout(function () {
            s.imgRoll.visible = true;
        }, 600);
    };
    Child_ActHolyBXunB.prototype.startEff = function () {
        var s = this;
        s.startIndex++;
        if (s.startIndex >= s._gridArr.length) {
            s.startIndex = 0;
        }
        var gird = s._gridArr[s.startIndex];
        if (gird.vo) {
            AnimationUtil.gridToBag([gird.grid]);
        }
        gird.vo = null;
        s.setImgXY(s.startIndex);
        if (s.startIndex == 0) {
            s.showEff();
            s.upGrid();
        }
        var ge = GGlobal.modelSHXunbao.xbCurGe;
        if (s.startIndex == ge) {
            Timer.instance.remove(s.startEff, s);
            setTimeout(function () {
                // GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBSHOW, GGlobal.modelActHolyB.xbRewArr)
                s.upUI();
            }, 200);
        }
        else if (s.startIndex == 0) {
            //停留2秒
            Timer.instance.remove(s.startEff, s);
            setTimeout(function () {
                Timer.instance.listen(s.startEff, s, 200);
            }, 1000);
        }
    };
    Child_ActHolyBXunB.prototype.showEff = function () {
        for (var i = 1; i < this._gridArr.length; i++) {
            var gd = this._gridArr[i].grid;
            gd.alpha = 0;
            EffectMgr.addEff("uieff/10007", gd.displayListContainer, gd.width / 2, gd.height / 2, 400, 400, false);
            egret.Tween.get(gd).to({ alpha: 1 }, 800);
        }
    };
    Child_ActHolyBXunB.prototype.setImgXY = function (cur) {
        var grid = this._gridArr[cur];
        this.chooseImg.setXY(grid.x + 42, grid.y - 36);
    };
    Child_ActHolyBXunB.prototype.upGrid = function () {
        var s = this;
        var model = GGlobal.modelSHXunbao;
        s._gridArr[0].vo = null;
        for (var i = 0; i < model.xbArr.length; i++) {
            if (i < s.startIndex) {
                s._gridArr[i + 1].vo = null;
            }
            else {
                s._gridArr[i + 1].vo = model.xbArr[i];
            }
        }
    };
    Child_ActHolyBXunB.prototype.upItem = function () {
        var s = this;
        var ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM);
        s.lbCt.text = "" + ct;
        s.btnDice.checkNotice = ct > 0;
    };
    Child_ActHolyBXunB.URL = "ui://4aepcdbwwg9y4n";
    return Child_ActHolyBXunB;
}(fairygui.GComponent));
__reflect(Child_ActHolyBXunB.prototype, "Child_ActHolyBXunB", ["IPanel"]);
