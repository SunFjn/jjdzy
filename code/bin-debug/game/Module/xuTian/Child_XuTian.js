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
var Child_XuTian = (function (_super) {
    __extends(Child_XuTian, _super);
    function Child_XuTian() {
        var _this = _super.call(this) || this;
        _this._endTime = 0; //倒计时
        _this.vHuntArr = [];
        _this._buf0 = 0;
        _this._bufTime0 = 0; //冰冻
        _this._buf1 = 0;
        _this._bufTime1 = 0; //减速
        _this._bufDep1 = 0;
        _this._buf2 = 0;
        _this._bufTime2 = 0; //加速射击
        _this._bufDep2 = 0;
        _this._buf3 = 0;
        _this._bufTime3 = 0; //概率提升
        _this._addPox = 0;
        _this._curTime = 0;
        _this._preTime = 0;
        _this._preWith = 0;
        return _this;
    }
    Child_XuTian.createInstance = function () {
        return (fairygui.UIPackage.createObject("xuTian", "Child_XuTian"));
    };
    Child_XuTian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.listRew.callbackThisObj = s;
        s.listRew.itemRenderer = s.renderRew;
    };
    Child_XuTian.prototype.openPanel = function (pData) {
        var s = this;
        s.cfgSpe = ConfigHelp.getSystemNum(8215);
        var m = GGlobal.model_XuTian;
        // m.CG_OPENUI();
        s.zeroReset();
        m.st = 0;
        s._endTime = 0;
        IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "xutian.jpg");
        s.registerEvent(true);
        s.upView();
        s.rewArr = ConfigHelp.makeItemListArr(ConfigHelp.getSystemDesc(8213));
        s.listRew.numItems = s.rewArr.length;
        Timer.instance.listen(s.onTimer, s, 1000);
    };
    Child_XuTian.prototype.closePanel = function (pData) {
        var s = this;
        IconUtil.setImg(s.backImg, null);
        s.registerEvent(false);
        Timer.instance.remove(s.onTimer, s);
        s.listRew.numItems = 0;
        var m = GGlobal.model_XuTian;
        s.cleanHunt();
        if (m.st == 1) {
            GGlobal.model_XuTian.CG_END_HUNT();
        }
        m.st = 0;
    };
    Child_XuTian.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.model_XuTian.register(pFlag, Model_XuTian.OPENUI, self.upView, self);
        GGlobal.model_XuTian.register(pFlag, Model_XuTian.START_HUNT, self.startHunt, self);
        GGlobal.model_XuTian.register(pFlag, Model_XuTian.END_HUNT, self.endHunt, self);
        GGlobal.model_XuTian.register(pFlag, Model_XuTian.WIN_HUNT, self.winHunt, self);
        EventUtil.register(pFlag, self.startBt, egret.TouchEvent.TOUCH_TAP, self.onStart, self);
        EventUtil.register(pFlag, self.btnCanKu, egret.TouchEvent.TOUCH_TAP, self.onCanKu, self);
        EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
        EventUtil.register(pFlag, self.smBt, egret.TouchEvent.TOUCH_TAP, self.onSM, self);
        for (var i = 0; i < 4; i++) {
            EventUtil.register(pFlag, self["imgBuf" + i], egret.TouchEvent.TOUCH_TAP, self.onBufTip, self);
        }
        GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
    };
    Child_XuTian.prototype.zeroReset = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        m.CG_OPENUI();
        var servTime = Model_GlobalMsg.getServerTime();
        var date = new Date(servTime);
        date.setHours(12);
        date.setMinutes(0);
        date.setSeconds(0);
        var t12 = date.getTime();
        s._reset12 = t12 - servTime > 0 ? t12 - servTime + egret.getTimer() : 0;
        date.setHours(18);
        date.setMinutes(0);
        date.setSeconds(0);
        var t18 = date.getTime();
        s._reset18 = t18 - servTime > 0 ? t18 - servTime + egret.getTimer() : 0;
    };
    Child_XuTian.prototype.onTimer = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        if (s._endTime > 0) {
            var end = Math.floor((s._endTime - egret.getTimer()) / 1000);
            if (end < 0) {
                s.lbTime.text = "已结束";
                s._endTime = 0;
                m.CG_END_HUNT();
            }
            else {
                s.lbTime.text = "剩余时间：" + end + "秒";
            }
        }
        if (s._reset12 > 0) {
            var end = Math.floor((s._reset12 - egret.getTimer()) / 1000);
            if (end < 0) {
                m.CG_OPENUI();
                s._reset12 = 0;
            }
        }
        if (s._reset18 > 0) {
            var end = Math.floor((s._reset18 - egret.getTimer()) / 1000);
            if (end < 0) {
                m.CG_OPENUI();
                s._reset18 = 0;
            }
        }
    };
    Child_XuTian.prototype.onSM = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.XU_TIAN);
    };
    Child_XuTian.prototype.onCanKu = function () {
        GGlobal.layerMgr.open(UIConst.XU_TIAN_CANKU);
    };
    Child_XuTian.prototype.renderRew = function (index, obj) {
        obj.tipEnabled = true;
        obj.isShowEff = true;
        obj.vo = this.rewArr[index];
    };
    Child_XuTian.prototype.onStart = function () {
        var m = GGlobal.model_XuTian;
        var itemCt = Model_Bag.getItemCount(Model_XuTian.ITEM_BATCT);
        if (m.lastCt <= 0 && itemCt <= 0) {
            ViewCommonWarn.text("挑战次数不足");
            return;
        }
        GGlobal.model_XuTian.CG_START_HUNT();
    };
    Child_XuTian.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        var itemCt = Model_Bag.getItemCount(Model_XuTian.ITEM_BATCT);
        if (m.lastCt == 0 && itemCt > 0) {
            s.lbCt.text = "";
            s.btnAdd.visible = false;
            s.groupItem.visible = true;
            s.itemLb.text = "狩猎令：";
            s.itemCt.text = "" + itemCt;
            var icon = Config.daoju_204[Model_XuTian.ITEM_BATCT].icon;
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", s.itemIcon);
        }
        else {
            s.lbCt.text = "挑战次数：" + HtmlUtil.fontNoSize(m.lastCt + "/" + ConfigHelp.getSystemNum(8210), m.lastCt > 0 ? Color.GREENSTR : Color.REDSTR);
            s.btnAdd.visible = true;
            s.groupItem.visible = false;
        }
        //状态
        if (m.st == 0) {
            s.boxTime.visible = false;
            s.btnCanKu.visible = false;
            s.boxRew.visible = true;
            s.boxBuf.visible = false;
            s.lbHunt.visible = false;
            s.startBt.visible = true;
            s.startBt.checkNotice = m.lastCt > 0;
            s.boxArrow.visible = false;
        }
        else {
            s.boxTime.visible = true;
            s.btnCanKu.visible = true;
            s.boxRew.visible = false;
            s.lbHunt.visible = true;
            s.startBt.visible = false;
            s.showArrCt();
            s.boxArrow.visible = true;
        }
    };
    Child_XuTian.prototype.onAdd = function () {
        var m = GGlobal.model_XuTian;
        var s = this;
        var cfg = Config.xtwlcs_776[m.hasBuy + 1];
        if (!cfg) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        View_XuTian_Buy.show(m.hasBuy, m.maxBuy, Handler.create(null, s.okHandle));
    };
    Child_XuTian.prototype.okHandle = function (count) {
        GGlobal.model_XuTian.CG_BUY_HUNT(count);
    };
    Child_XuTian.prototype.startHunt = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        s._endTime = ConfigHelp.getSystemNum(8214) * 1000 + egret.getTimer();
        s.onTimer();
        s.upView();
        s.vHuntArr = [];
        s._addPox = 0;
        s._preWith = 0;
        s._preTime = egret.getTimer();
        Timer.instance.listen(s.onTimerHunt, s, 50);
        s.backImg.addClickListener(s.clickHunt, s);
    };
    Child_XuTian.prototype.endHunt = function () {
        var s = this;
        s.upView();
        s.cleanHunt();
    };
    Child_XuTian.prototype.cleanHunt = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        for (var i = 0; i < s.vHuntArr.length; i++) {
            var v = s.vHuntArr[i];
            if (v) {
                v.clean();
                v.removeFromParent();
            }
        }
        s.vHuntArr = [];
        Timer.instance.remove(s.onTimerHunt, s);
        s.backImg.removeClickListener(s.clickHunt, s);
        s._buf0 = 0;
        s._bufTime0 = 0; //冰冻
        s._buf1 = 0;
        s._bufTime1 = 0; //减速
        s._bufDep1 = 0;
        s._buf2 = 0;
        s._bufTime2 = 0; //加速射击
        s._bufDep2 = 0;
        s._buf3 = 0;
        s._bufTime3 = 0; //概率提升
        s._endTime = 0;
    };
    Child_XuTian.prototype.clickHunt = function (e) {
        var m = GGlobal.model_XuTian;
        if (m.yuCt <= 0) {
            ViewCommonWarn.text("羽箭不足");
            return;
        }
        var xp = e.stageX;
        var yp = e.stageY;
        var s = this;
        //发射
        // s.btnArrow.fireClick()
        var imgFire = new fairygui.GLoader();
        imgFire.touchable = false;
        imgFire.setPivot(0.5, 0, true);
        imgFire.setScale(0.5, 0.5);
        imgFire.url = "ui://j0lk55yeg53ad";
        s.addChild(imgFire);
        imgFire.x = s.btnArrow.x - 10;
        imgFire.y = s.btnArrow.y;
        imgFire.rotation = Math.atan((xp - imgFire.x) / (imgFire.y - yp)) * 180 / Math.PI;
        var endTime = ConfigHelp.getSystemNum(8212);
        var now = egret.getTimer();
        if (s._bufTime2 > now) {
            endTime = endTime * (1 - (s._bufDep2 / 100000));
        }
        egret.Tween.get(imgFire).to({ x: xp, y: yp }, endTime, egret.Ease.sineIn).call(s.fireEnd, s, [xp, yp, imgFire]);
        //弓箭特效
        EffectMgr.addEff("uieff/10097", s.displayListContainer, s.btnArrow.x, s.btnArrow.y + s.btnArrow.height / 2, 400, 400, false);
    };
    Child_XuTian.prototype.fireEnd = function (x, y, imgFire) {
        var s = this;
        // EffectMgr.addEff("uieff/10007", s.displayListContainer, x, y, 400, 400, false);
        imgFire.removeFromParent();
        //找到坐标
        for (var i = 0; i < s.vHuntArr.length; i++) {
            var v = s.vHuntArr[i];
            if (!v || !v.awatar)
                continue;
            // let hit = v.displayListContainer.hitTestPoint(x, y);
            var hit = v.awaUI.displayObject.hitTestPoint(x, y);
            if (hit) {
                GGlobal.model_XuTian.CG_HUNT(v.vo.type, v.vo.id);
                //击中特效
                EffectMgr.addEff("uieff/10098", s.displayListContainer, x, y, 400, 400, false);
                return;
            }
        }
        GGlobal.model_XuTian.CG_HUNT(-1, -1);
    };
    Child_XuTian.prototype.winHunt = function (obj) {
        var s = this;
        s.showArrCt();
        if (obj.type == -1 || obj.id == -1) {
            return;
        }
        for (var i = 0; i < s.vHuntArr.length; i++) {
            var v = s.vHuntArr[i];
            if (!v) {
                continue;
            }
            if (v.vo.type == obj.type && v.vo.id == obj.id) {
                if (obj.res == 1) {
                    if (obj.type == 1) {
                        s.popRew(v);
                    }
                    else {
                        s.popBuf(v);
                    }
                    v.removeFromParent();
                    v.clean();
                    s.vHuntArr[i] = null;
                    EffectMgr.addEff("uieff/10099", s.displayListContainer, v.x + v.width / 2, v.y + v.height + 100, 400, 400, false);
                }
                else {
                    //闪避
                    var s_1 = this;
                    var hp = VXuTianHp.create();
                    hp.init(v.x + v.width / 2, v.y + v.height + 100, 0, false, false, false, false);
                    hp.onAdd(s_1);
                }
                break;
            }
        }
    };
    //飘奖励
    Child_XuTian.prototype.popRew = function (vRew) {
        var s = this;
        var v = ViewGrid.create();
        v.tipEnabled = v.isShowEff = false;
        v.touchable = false;
        var hunt = Config.xtwl_776[vRew.vo.cfgId];
        var item = ConfigHelp.makeItemListArr(JSON.parse(hunt.jl))[0];
        v.vo = item;
        this.addChild(v);
        v.x = vRew.x;
        v.y = vRew.y;
        //飘入
        egret.Tween.get(v).to({ x: s.btnCanKu.x + s.btnCanKu.width / 2, y: s.btnCanKu.y }, 400, egret.Ease.sineIn).call(s.popRewEnd, s, [v]);
    };
    Child_XuTian.prototype.popRewEnd = function (v) {
        var s = this;
        v.clean();
        v.removeFromParent();
    };
    Child_XuTian.prototype.popBuf = function (vRew) {
        var s = this;
        var v = new fairygui.GLoader();
        v.touchable = false;
        var buf = Config.xtwlbf_776[vRew.vo.cfgId];
        v.url = CommonManager.getUrl("xuTian", "buf" + buf.lx);
        s.addChild(v);
        v.x = vRew.x;
        v.y = vRew.y;
        if (buf.lx == 1) {
            var b = new fairygui.GLoader();
            IconUtil.setImg(b, Enum_Path.BACK_URL + "xut_bing.png");
            b.setXY(0, s.backImg.y);
            b.setScale(2, 2);
            b.touchable = false;
            s.addChild(b);
            b.alpha = 0;
            egret.Tween.get(b).to({ alpha: 1 }, 400, egret.Ease.sineIn).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(s.popBufEnd, s, [b]);
        }
        //飘入
        if (buf.lx == 3) {
            egret.Tween.get(v).to({ x: s.boxArrow.x + s.boxArrow.width / 2, y: s.boxArrow.y }, 400, egret.Ease.sineIn).call(s.popBufEnd, s, [v]);
        }
        else {
            egret.Tween.get(v).to({ x: s.boxBuf.x + s.boxBuf.width / 2, y: s.boxBuf.y }, 400, egret.Ease.sineIn).call(s.popBufEnd, s, [v]);
        }
        s.onBuf(buf);
    };
    Child_XuTian.prototype.onBuf = function (cfg) {
        var s = this;
        var arr = JSON.parse(cfg.buff);
        var time = Number(arr[0][2]) * 1000 + egret.getTimer();
        var dep = Number(arr[0][0]);
        var now = egret.getTimer();
        if (cfg.lx == 1) {
            if (now > s._bufTime0 || cfg.id >= s._buf0) {
                s._buf0 = cfg.id;
                s._bufTime0 = time;
                s.imgBuf0.data = s._buf0;
            }
        }
        else if (cfg.lx == 2) {
            if (now > s._bufTime1 || cfg.id >= s._buf1) {
                s._buf1 = cfg.id;
                s._bufTime1 = time;
                s._bufDep1 = dep;
                s.imgBuf1.data = s._buf1;
            }
        }
        else if (cfg.lx == 4) {
            if (now > s._bufTime2 || cfg.id >= s._buf2) {
                s._buf2 = cfg.id;
                s._bufTime2 = time;
                s._bufDep2 = dep;
                s.imgBuf2.data = s._buf2;
            }
        }
        else if (cfg.lx == 5) {
            if (now > s._bufTime3 || cfg.id >= s._buf3) {
                s._buf3 = cfg.id;
                s._bufTime3 = time;
                s.imgBuf3.data = s._buf3;
            }
        }
    };
    Child_XuTian.prototype.onBufTip = function (e) {
        var img = e.currentTarget;
        GGlobal.layerMgr.open(UIConst.XU_TIAN_TIP, img.data);
    };
    Child_XuTian.prototype.popBufEnd = function (v) {
        var s = this;
        v.removeFromParent();
    };
    Child_XuTian.prototype.showArrCt = function () {
        var m = GGlobal.model_XuTian;
        var s = this;
        s.lbArrCt.text = m.yuCt + "/" + ConfigHelp.getSystemNum(8211);
    };
    Child_XuTian.prototype.onTimerHunt = function () {
        var s = this;
        var time = egret.getTimer();
        var addPox = s.cfgSpe * (time - s._preTime) / 1000;
        s._preTime = time;
        var m = GGlobal.model_XuTian;
        if (s._bufTime0 > time) {
            addPox = 0;
            for (var i = 0; i < s.vHuntArr.length; i++) {
                var v = s.vHuntArr[i];
                if (v)
                    v.setFrozen();
            }
        }
        else {
            for (var i = 0; i < s.vHuntArr.length; i++) {
                var v = s.vHuntArr[i];
                if (v)
                    v.unFrozen();
            }
            if (s._bufTime1 > time) {
                addPox = addPox * (1 - s._bufDep1 / 100000);
            }
        }
        s._addPox += addPox;
        if (s._addPox >= s._preWith) {
            s.createNew();
            s._addPox = 0;
        }
        for (var i = 0; i < s.vHuntArr.length; i++) {
            var v = s.vHuntArr[i];
            if (!v) {
                s.vHuntArr.splice(i, 1);
                i--;
                continue;
            }
            v.x += addPox;
            if (v.x >= 640 + 200) {
                m.huntArr.push(v.vo); //加入循环
                v.clean();
                v.removeFromParent();
                s.vHuntArr.splice(i, 1);
                i--;
            }
        }
        if (time - s._curTime < 1000) {
            return;
        }
        s._curTime = time;
        //buf
        var bufObj = {};
        var bufLen = 0;
        if (s._bufTime0 > time) {
            bufObj[0] = 1;
            bufLen++;
        }
        if (s._bufTime1 > time) {
            bufObj[1] = 1;
            bufLen++;
        }
        if (s._bufTime2 > time) {
            bufObj[2] = 1;
            bufLen++;
        }
        if (s._bufTime3 > time) {
            bufObj[3] = 1;
            bufLen++;
        }
        if (bufLen == 0) {
            s.boxBuf.visible = false;
        }
        else {
            s.boxBuf.visible = true;
            var j = 0;
            for (var i = 0; i < 4; i++) {
                var img = s["imgBuf" + i];
                var lb = s["lbBuf" + i];
                if (bufObj[i]) {
                    var ypot = s.imgBufBg.y + 10 + j * 77;
                    j++;
                    img.visible = true;
                    img.y = ypot;
                    lb.visible = true;
                    lb.y = ypot + 20;
                    lb.text = "" + Math.floor((s["_bufTime" + i] - time) / 1000);
                }
                else {
                    img.visible = false;
                    lb.visible = false;
                }
            }
            s.imgBufBg.height = 77 * bufLen + 10;
        }
    };
    Child_XuTian.prototype.createNew = function () {
        var s = this;
        var m = GGlobal.model_XuTian;
        if (m.huntArr.length <= 0) {
            return;
        }
        var data = m.huntArr.shift();
        var v = VXuTianHunt.createInstance();
        s.addChild(v);
        v.touchable = false;
        v.setVo(data);
        s.vHuntArr.push(v);
        v.x = -200;
        v.y = 235 + Math.floor(Math.random() * 200);
        s._preWith = v.cfgWith ? v.cfgWith : 300;
    };
    Child_XuTian.URL = "ui://j0lk55yeg53a1";
    return Child_XuTian;
}(fairygui.GComponent));
__reflect(Child_XuTian.prototype, "Child_XuTian");
