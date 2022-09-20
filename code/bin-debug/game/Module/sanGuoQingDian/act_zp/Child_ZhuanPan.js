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
/**转盘 */
var Child_ZhuanPan = (function (_super) {
    __extends(Child_ZhuanPan, _super);
    function Child_ZhuanPan() {
        var _this = _super.call(this) || this;
        _this.isMovie = false;
        _this._costOne = 0;
        _this._costTen = 0;
        _this._first = true;
        _this._intRota = 206;
        return _this;
    }
    Child_ZhuanPan.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_ZhuanPan"));
    };
    Child_ZhuanPan.setExtends = function () {
    };
    Child_ZhuanPan.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_ZhuanPan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.items = [];
        self.imgs = [];
        for (var i = 0; i < 8; i++) {
            var item = self["grid" + i];
            self.items.push(item);
            var img = self["img" + i];
            self.imgs.push(img);
        }
        self.listLog.itemRenderer = self.renderLog;
        self.listLog.callbackThisObj = self;
        self.listLog.touchable = false;
        self["n46"].visible = false;
        self["n47"].visible = false;
    };
    Child_ZhuanPan.prototype.onOpenTarget = function () {
        GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_TARGET_REWARD);
    };
    Child_ZhuanPan.prototype.openPanel = function (pData) {
        var s = this;
        s.vo = pData;
        s.btnOne.addClickListener(s.onBuyOne, s);
        s.btnTen.addClickListener(s.onBuyTen, s);
        s.btnRank.addClickListener(s.onOpenRank, s);
        s.btnTarget.addClickListener(s.onOpenTarget, s);
        s.checkBox.addClickListener(s.onCheck, s);
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_zhuanpan, s.onUpdate, s);
        GGlobal.modelSGQD.listen(ModelSGQD.msg_buy_zhuanpan, s.doMovie, s);
        GGlobal.modelSGQD.listen(ModelSGQD.msg_buy_zhuanpan_fail, s.doFail, s);
        GGlobal.reddot.listen(UIConst.SG_ZHUANPAN, s.onUpdate, s);
        s.listLog.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, s.scrollComp, s);
        Timer.instance.listen(s.updateX, s, 1000);
        GGlobal.modelSGQD.CGOpenUI4121();
        GGlobal.modelActivity.CG_OPENACT(UIConst.SG_ZHUANPAN);
        s.checkBox.selected = ModelSGQD.skipTween;
        s._rota = s.imgArrow.rotation = s._intRota;
        for (var i = 0; i < s.imgs.length; i++) {
            s.imgs[i].visible = false;
        }
        s.isMovie = false;
        s._first = true;
        s.onUpdate();
        IconUtil.setImg(s.zhuanPanImg, Enum_Path.BACK_URL + "zhaunpan.png");
        GGlobal.control.listen(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.checkTargetBtNotice, s);
        GGlobal.modelSGQD.CGOpenUI4121();
    };
    Child_ZhuanPan.prototype.closePanel = function () {
        var s = this;
        s.btnOne.removeClickListener(s.onBuyOne, s);
        s.btnTen.removeClickListener(s.onBuyTen, s);
        s.btnTarget.removeClickListener(s.onOpenTarget, s);
        s.btnRank.removeClickListener(s.onOpenRank, s);
        s.checkBox.removeClickListener(s.onCheck, s);
        s.listLog.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, s.scrollComp, s);
        Timer.instance.remove(s.updateX, s);
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_zhuanpan, s.onUpdate, s);
        GGlobal.modelSGQD.remove(ModelSGQD.msg_buy_zhuanpan, s.doMovie, s);
        GGlobal.modelSGQD.remove(ModelSGQD.msg_buy_zhuanpan_fail, s.doFail, s);
        GGlobal.reddot.remove(UIConst.SG_ZHUANPAN, s.onUpdate, s);
        for (var i = 0; i < s.items.length; i++) {
            s.items[i].vo = null;
            s.items[i].tipEnabled = false;
            s.items[i].showEff(false);
        }
        egret.Tween.removeTweens(s.imgArrow);
        Timer.instance.remove(s.doMovie1, s);
        GGlobal.control.remove(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.checkTargetBtNotice, s);
        s.listLog.numItems = 0;
        IconUtil.setImg(s.zhuanPanImg, null);
        clearTimeout(s._timeOut);
    };
    Child_ZhuanPan.prototype.checkTargetBtNotice = function () {
        this.btnTarget.checkNotice = false;
        for (var i = 0; i < ModelSGQD.zpRewardArr.length; i++) {
            if (ModelSGQD.zpRewardArr[i].state == 1) {
                this.btnTarget.checkNotice = true;
                break;
            }
        }
    };
    Child_ZhuanPan.prototype.onUpdate = function () {
        var s = this;
        s.btnTarget.checkNotice = GGlobal.reddot.checkCondition(UIConst.SG_ZHUANPAN, 0);
        var voAct = null;
        var group = GGlobal.modelActivity.getGroup(UIConst.SANGUOQD);
        for (var i = 0, len_1 = group.length; i < len_1; i++) {
            var act = group[i];
            if (act.id == UIConst.SG_ZHUANPAN) {
                var time = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
                if ((act.end - time > 0) && (time - act.start > 0)) {
                    voAct = act;
                    break;
                }
            }
        }
        if (!voAct) {
            return;
        }
        ModelSGQD.zpQs = voAct.qs;
        s._act = voAct;
        var str = "";
        var len = ModelSGQD.zpLogArr ? ModelSGQD.zpLogArr.length : 0;
        if (len > 3 && this._first) {
            this._first = false;
            s.listLog.setVirtualAndLoop();
            s.listLog.numItems = len;
            s.listLog.scrollPane.scrollDown(1, true);
        }
        else {
            s.listLog.numItems = len;
        }
        if (s._costOne == 0) {
            s._costOne = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4601))[0][2];
            this.lbOne.text = "" + s._costOne;
        }
        if (s._costTen == 0) {
            s._costTen = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4602))[0][2];
            this.lbTen.text = "" + s._costTen;
        }
        var cfg = Config.sghlzp_261[voAct.qs];
        var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show));
        for (var i = 0; i < arr.length; i++) {
            this.items[i].vo = arr[i];
            this.items[i].tipEnabled = true;
            this.items[i].showEff(true);
        }
        s.updateX();
        s.upCost();
    };
    Child_ZhuanPan.prototype.upCost = function () {
        if (Model_player.voMine.yuanbao < this._costTen) {
            this.lbTen.color = Color.REDINT;
        }
        else {
            this.lbTen.color = Color.GREENINT;
        }
        if (Model_player.voMine.yuanbao < this._costOne) {
            this.lbOne.color = Color.REDINT;
        }
        else {
            this.lbOne.color = Color.GREENINT;
        }
    };
    Child_ZhuanPan.prototype.onBuyOne = function (e) {
        if (this.isMovie) {
            return;
        }
        if (Model_player.voMine.yuanbao < this._costOne) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelSGQD.CGBuy4123(1);
        this.isMovie = true;
    };
    Child_ZhuanPan.prototype.onBuyTen = function (e) {
        if (this.isMovie) {
            return;
        }
        if (Model_player.voMine.yuanbao < this._costTen) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelSGQD.CGBuy4123(2);
        this.isMovie = true;
    };
    Child_ZhuanPan.prototype.onOpenRank = function (e) {
        GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_REWARD);
    };
    Child_ZhuanPan.prototype.onCheck = function (e) {
        ModelSGQD.skipTween = this.checkBox.selected;
    };
    Child_ZhuanPan.prototype.updateX = function () {
        if (this._act) {
            var d = this._act.getSurTime();
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_ZhuanPan.prototype.doMovie = function () {
        if (!ModelSGQD.skipTween) {
            this.isMovie = true;
            if (ModelSGQD.zpBuyArr.length > 0) {
                var igrid = ModelSGQD.zpBuyArr[ModelSGQD.zpBuyArr.length - 1].item;
                var scrTo = -1;
                var endRot = 0;
                for (var i = 0; i < 8; i++) {
                    if (igrid.id == this.items[i].vo.id) {
                        scrTo = i;
                        break;
                    }
                }
                if (scrTo == -1) {
                    scrTo = 0;
                }
                endRot = Math.floor((this._rota - this._intRota) / 360) * 360 + 22.5 + scrTo * 45 + 360 * 2 + this._intRota;
                this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
                Timer.instance.listen(this.doMovie1, this, 50);
                this.doMovie1();
            }
        }
        else {
            this.isMovie = false;
        }
        this.upCost();
    };
    Child_ZhuanPan.prototype.doFail = function () {
        this.isMovie = false;
    };
    Child_ZhuanPan.prototype.closeHand = function (endRot) {
        this._rota = endRot;
        Timer.instance.remove(this.doMovie1, this);
        this.doMovie1();
        this.isMovie = false;
    };
    Child_ZhuanPan.prototype.doMovie1 = function () {
        var index = Math.floor((this.imgArrow.rotation - this._intRota) % 360 / 45);
        for (var i = 0; i < this.imgs.length; i++) {
            if (index == i) {
                this.imgs[i].visible = true;
            }
            else {
                this.imgs[i].visible = false;
            }
        }
    };
    Child_ZhuanPan.prototype.renderLog = function (index, obj) {
        var v = obj;
        v.vo = ModelSGQD.zpLogArr[index];
    };
    Child_ZhuanPan.prototype.scrollComp = function () {
        var s = this;
        clearTimeout(s._timeOut);
        s._timeOut = setTimeout(function () {
            s.listLog.scrollPane.scrollDown(1, true);
        }, 1000);
    };
    Child_ZhuanPan.pkg = "sanGuoQingDian";
    Child_ZhuanPan.URL = "ui://kdt501v2to1mu";
    return Child_ZhuanPan;
}(fairygui.GComponent));
__reflect(Child_ZhuanPan.prototype, "Child_ZhuanPan", ["IPanel"]);
