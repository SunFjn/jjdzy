/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var ChildSuperMarbles = (function (_super) {
    __extends(ChildSuperMarbles, _super);
    function ChildSuperMarbles() {
        var _this = _super.call(this) || this;
        _this.clickPre = function () {
            GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_POOL);
        };
        _this.clickShop = function () {
            GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_SHOP);
        };
        _this.clickDesc = function () {
            GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOMCJDZ);
        };
        _this.clickRest = function () {
            GGlobal.modelSuperMarbles.CG_reset();
        };
        _this.clickShot1 = function () {
            _this.playType = 1;
            GGlobal.modelSuperMarbles.CG_reOptAwards(1);
        };
        _this.clickShot5 = function () {
            _this.playType = 5;
            GGlobal.modelSuperMarbles.CG_reOptAwards(2);
        };
        _this.price = 0;
        _this.temp = [];
        _this.tempLen = 0;
        _this.update = function (data) {
            var self = _this;
            if (self.inAnimation) {
                return;
            }
            var model = GGlobal.modelSuperMarbles;
            if (data) {
                self.cleanTween();
                self.inAnimation = 1;
                self.animationData = data[0];
                self.tempLen = self.animationData.length;
                self.temp = data[1];
                Timer.listen(self.doAnimation, self, 50);
                self.btnShot5.enabled = false;
                self.btnShot1.enabled = false;
                for (var i = 0; i < self.cards.length; i++) {
                    self.cards[i].touchable = false;
                }
            }
            else {
                var data_1 = model.pools;
                for (var i = 0; i < self.cards.length; i++) {
                    self.cards[i].setdata(data_1[i], i);
                }
            }
            var priceContent = JSON.parse(ConfigHelp.getSystemDesc(7910));
            var price = priceContent[model.closeNum];
            self.price = price[1];
            self.lbPrice0.text = self.price + "";
            self.lbPrice1.text = (self.price * 5) + "";
            self.lbScore.text = model.score + "";
            self.lbTips.text = "屏蔽奖励后，弹珠不会掉落到该品质奖励槽中\n再抽取" + (5 - model.shotTime) + "/5次重置奖池";
            var content = ConfigHelp.getSystemDesc(7912);
            self.lbreset.text = JSON.parse(content)[0][2] + "";
        };
        _this.inAnimation = 0;
        _this.speed = 3;
        _this.doAnimation = function () {
            var self = _this;
            if (!self.animationData.length) {
                return;
            }
            var data = self.animationData.shift();
            var ball0 = new fairygui.GLoader();
            ball0.url = "ui://gf2tw9lz77k99";
            var idx = self.ball1.parent.getChildIndex(self.ball1);
            self.ball1.parent.addChildAt(ball0, idx);
            var pos = data.idx;
            var path = self.paths[pos - 1].concat();
            var len = path.length;
            var node = path.shift();
            ball0.data = path;
            ball0.setXY(node.x, node.y);
            self.tweenBalls.push(ball0);
            self.ballMoveComplete(ball0);
        };
        _this.playType = 1;
        _this.eventFun = function (v) {
            var self = _this;
            var fun = EventUtil.register;
            fun(v, self.btnPre, EventUtil.TOUCH, self.clickPre, self);
            fun(v, self.btnShop, EventUtil.TOUCH, self.clickShop, self);
            fun(v, self.btnDesc, EventUtil.TOUCH, self.clickDesc, self);
            fun(v, self.btnReset, EventUtil.TOUCH, self.clickRest, self);
            fun(v, self.btnShot1, EventUtil.TOUCH, self.clickShot1, self);
            fun(v, self.btnShot5, EventUtil.TOUCH, self.clickShot5, self);
            fun(v, self.linkLb, EventUtil.TOUCH, self.openGaiLV, self);
        };
        _this.animationData = [];
        _this._timerFlag = 0;
        return _this;
    }
    ChildSuperMarbles.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "ChildSuperMarbles"));
    };
    ChildSuperMarbles.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(SuperMarblesItem.URL, SuperMarblesItem);
        f(SuperMarblesPoolItem.URL, SuperMarblesPoolItem);
        f(SMCard.URL, SMCard);
    };
    ChildSuperMarbles.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ChildSuperMarbles.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.paths = [];
        self.paths[0] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball6, self.ball16, self.ball15, self.ball33];
        self.paths[1] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball6, self.ball16, self.ball17, self.ball34];
        self.paths[12] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball8, self.ball19, self.ball18, self.ball35];
        self.paths[2] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball8, self.ball19, self.ball20, self.ball36];
        self.paths[24] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball9, self.ball22, self.ball21, self.ball37];
        self.paths[3] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball9, self.ball22, self.ball23, self.ball38];
        self.paths[36] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball11, self.ball25, self.ball24, self.ball39];
        self.paths[4] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball11, self.ball25, self.ball26, self.ball40];
        self.paths[48] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball12, self.ball28, self.ball27, self.ball41];
        self.paths[5] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball12, self.ball28, self.ball29, self.ball42];
        self.paths[51] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball14, self.ball31, self.ball30, self.ball43];
        self.paths[6] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball14, self.ball31, self.ball32, self.ball44];
    };
    ChildSuperMarbles.prototype.initView = function (pParent) {
    };
    ChildSuperMarbles.prototype.onUpdate = function () {
        var end = this._vo ? this._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    ChildSuperMarbles.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 12);
    };
    ChildSuperMarbles.prototype.ballMoveComplete = function (ball0) {
        var self = this;
        var path = ball0.data; //存路径以及方向
        if (!path || path.length == 0) {
            self.tempLen--;
            var idx = self.tweenBalls.indexOf(ball0);
            self.tweenBalls.splice(idx, 1);
            if (self.tweenBalls.length == 0 && self.tempLen <= 0) {
                if (self.playType == 1) {
                    ViewSuperMarblesShow.show(UIConst.ACTCOM, self.playType, Handler.create(self, self.clickShot1), self.temp, self.price, 0, 0);
                }
                else {
                    ViewSuperMarblesShow.show(UIConst.ACTCOM, self.playType, Handler.create(self, self.clickShot5), self.temp, self.price, 0, 0);
                }
                self.inAnimation = 0;
                self.cleanTween();
                self.update();
            }
            return;
        }
        self.inAnimation = 1;
        var target = path.shift();
        var dist = MathUtil.dist(ball0.x, ball0.y, target.x, target.y);
        var time = Math.sqrt(dist) / self.speed * 10;
        egret.Tween.get(ball0).to({ x: target.x, y: target.y }, time).call(self.ballMoveComplete, self, [ball0]);
    };
    ChildSuperMarbles.prototype.cleanTween = function () {
        var self = this;
        self.animationData = [];
        self.btnShot5.enabled = true;
        self.btnShot1.enabled = true;
        while (self.tweenBalls && self.tweenBalls.length) {
            var ball = self.tweenBalls.shift();
            egret.Tween.removeTweens(ball);
            ball.removeFromParent();
        }
        for (var i = 0; i < self.cards.length; i++) {
            self.cards[i].touchable = true;
        }
        self.tempLen = 0;
        self.tweenBalls = [];
    };
    ChildSuperMarbles.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        GGlobal.modelSuperMarbles.newQS = pData.qs;
        GGlobal.modelSuperMarbles.createCfg();
        self.cards = [self.card0, self.card1, self.card2, self.card3, self.card4, self.card5, self.card6];
        IconUtil.setImg(self.n15, Enum_Path.ACTCOM_URL + "cjdzbg.png");
        IconUtil.setImg(self.n16, Enum_Path.ACTCOM_URL + "cjdzbg1.png");
        self.eventFun(1);
        GGlobal.control.listen(UIConst.ACTCOMCJDZ, self.update, self);
        GGlobal.reddot.setCondition(UIConst.ACTCOMCJDZ, 0, false);
        GGlobal.reddot.notify(UIConst.ACTCOM);
        Timer.instance.listen(self.onUpdate, self, 1000);
    };
    /**销毁 */
    ChildSuperMarbles.prototype.closePanel = function () {
        var self = this;
        self.eventFun(0);
        Timer.instance.remove(self.onUpdate, self);
        Timer.remove(self.doAnimation, self);
        IconUtil.setImg(self.n15, null);
        IconUtil.setImg(self.n16, null);
        while (self.cards && self.cards.length) {
            self.cards.shift().clean();
        }
        self.cleanTween();
        GGlobal.control.remove(UIConst.ACTCOMCJDZ, self.update, self);
        self.inAnimation = 0;
    };
    ChildSuperMarbles.URL = "ui://gf2tw9lz7jlm0";
    ChildSuperMarbles.pkg = "superMarbles";
    return ChildSuperMarbles;
}(fairygui.GComponent));
__reflect(ChildSuperMarbles.prototype, "ChildSuperMarbles");
