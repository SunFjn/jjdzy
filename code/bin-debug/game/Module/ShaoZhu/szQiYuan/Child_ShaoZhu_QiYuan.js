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
var Child_ShaoZhu_QiYuan = (function (_super) {
    __extends(Child_ShaoZhu_QiYuan, _super);
    function Child_ShaoZhu_QiYuan() {
        var _this = _super.call(this) || this;
        _this._cost1 = 0;
        _this._cost10 = 0;
        _this._first = false;
        return _this;
    }
    Child_ShaoZhu_QiYuan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.girdArr = [s.gird0, s.gird1, s.gird2, s.gird3];
        s._rewardArr = [s.reward0, s.reward1, s.reward2];
        s.list.itemRenderer = s.renderItem;
        s.list.callbackThisObj = s;
        s.list.setVirtualAndLoop();
        s.list.touchable = false;
        for (var i = 0; i < s._rewardArr.length; i++) {
            s._rewardArr[i].visible = false;
        }
        s.qyItem = VoItem.create(Model_SZQiYuan.qiyuanId);
        s.lbShuoMing.text = HtmlUtil.createLink("玩法说明");
    };
    Child_ShaoZhu_QiYuan.prototype.openShuoM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_QIYUAN);
    };
    Child_ShaoZhu_QiYuan.prototype.open = function (vo) {
        var s = this;
        if (!s._first) {
            GGlobal.modelSZQiYuan.CG_OPENUI();
            s._first = true;
            var c = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6103))[0][2]);
            s.labBuy1.text = "购买" + c + "铜币";
            s.labBuy10.text = "购买" + (c * 10) + "铜币";
            s.addListen();
            s.overDraw();
        }
        s.update();
    };
    Child_ShaoZhu_QiYuan.prototype.close = function () {
        var s = this;
        s.removeListen();
        s._first = false;
    };
    Child_ShaoZhu_QiYuan.prototype.addListen = function () {
        var s = this;
        s.btnBuy1.addClickListener(s.onBuy1, s);
        s.btnBuy10.addClickListener(s.onBuy10, s);
        s.checkBox.addClickListener(s.onCheck, s);
        s.lbShuoMing.addEventListener(egret.TextEvent.LINK, s.openShuoM, s);
        for (var i = 0; i < 4; i++) {
            s.girdArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, s.onGetPoint, s);
        }
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_OPEN_UI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_GET_POINT, s.update, s);
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY, s.update, s);
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, s.startDraw, s);
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_PRAY_OVER, s.overDraw, s);
        Timer.instance.listen(s.scrollComp1, s, 100);
        s.btnBuy1.touchable = s.btnBuy10.touchable = true;
        var key = Model_player.voMine.id + "szQiYuanCheck";
        var val = egret.localStorage.getItem(key);
        Model_SZQiYuan.skipTween = val == "1" ? true : false;
        s.checkBox.selected = Model_SZQiYuan.skipTween;
        s.vres10.setType(1);
        s.vres1.setType(1);
    };
    Child_ShaoZhu_QiYuan.prototype.removeListen = function () {
        var s = this;
        s.btnBuy1.removeClickListener(s.onBuy1, s);
        s.btnBuy10.removeClickListener(s.onBuy10, s);
        s.checkBox.removeClickListener(s.onCheck, s);
        s.lbShuoMing.removeEventListener(egret.TextEvent.LINK, s.openShuoM, s);
        for (var i = 0; i < 4; i++) {
            s.girdArr[i].clean();
            s.girdArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onGetPoint, s);
        }
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_OPEN_UI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_GET_POINT, s.update, s);
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY, s.update, s);
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, s.startDraw, s);
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_PRAY_OVER, s.overDraw, s);
        Timer.instance.remove(s.scrollComp1, s);
        Timer.instance.remove(s.upDraw, s);
        s.list.numItems = 0;
    };
    Child_ShaoZhu_QiYuan.prototype.update = function () {
        var s = this;
        var model = GGlobal.modelSZQiYuan;
        //奖励展示
        var cfg = Config.sonqy_267[1];
        if (cfg) {
            s.showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show));
        }
        else {
            s.showArr = [];
        }
        s.list.numItems = s.showArr.length;
        //积分奖励
        var pointMax = 0;
        if (model.pointArr.length > 0) {
            for (var i = 0; i < model.pointArr.length; i++) {
                var pointCfg = Config.sonpoint_267[model.pointArr[i].id];
                s.girdArr[i].setVo(model.pointArr[i], this.base);
                if (pointMax < Number(pointCfg.point)) {
                    pointMax = Number(pointCfg.point);
                }
            }
        }
        else {
            for (var i = 0; i < s.girdArr.length; i++) {
                s.girdArr[i].setVo(null, 0);
            }
        }
        var bs = Math.floor(model.myPoint / pointMax);
        this.base = pointMax * bs;
        this.expBar.max = pointMax;
        // this.expBar.value = model.myPoint - this.base;
        // this.expBar.text = (model.myPoint - this.base) + "/" + pointMax;
        if (model.pointArr.length > 0) {
            var $val = model.myPoint - this.base;
            var $id = 0;
            for (var i = 0; i < model.pointArr.length; i++) {
                var t = Config.sonpoint_267[model.pointArr[i].id].point;
                if ($val >= t) {
                    $id = model.pointArr[i].id;
                }
            }
            var a = [0, 300, 1000, 2000, 3000]; //对应0 500 1000 1500 2000
            var curP = Config.sonpoint_267[$id] ? Config.sonpoint_267[$id].point : 0;
            var nextP = Config.sonpoint_267[$id + 1] ? Config.sonpoint_267[$id + 1].point : 2000;
            if ($id == 4) {
                this.expBar.value = pointMax;
            }
            else {
                var valT = nextP - curP; //0,10...
                this.expBar.value = a[$id] + Math.floor(($val - curP) * (a[$id + 1] - a[$id]) / valT);
            }
        }
        else {
            this.expBar.value = 0;
        }
        this.expBar._titleObject.text = (model.myPoint - this.base) + "/" + pointMax;
        //花费
        if (this._cost1 == 0) {
            this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6101))[0][2]);
        }
        if (this._cost10 == 0) {
            this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6102))[0][2]);
        }
        if (model.qyCount > 0) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + s.qyItem.icon + ".png", s.vres1.getChild("icon").asLoader);
            this.vres1.text = "" + model.qyCount + "/1";
            this.vres1.color = Color.WHITEINT;
            this.btnBuy1.checkNotice = true;
        }
        else {
            s.vres1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            this.vres1.text = "" + this._cost1;
            if (Model_player.voMine.yuanbao >= this._cost1) {
                this.vres1.color = Color.GREENINT;
            }
            else {
                this.vres1.color = Color.REDINT;
            }
            this.btnBuy1.checkNotice = false;
        }
        if (model.qyCount > 9) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + s.qyItem.icon + ".png", s.vres10.getChild("icon").asLoader);
            this.vres10.text = "" + model.qyCount + "/10";
            this.vres10.color = Color.WHITEINT;
            this.btnBuy10.checkNotice = true;
        }
        else {
            s.vres10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            this.vres10.text = "" + this._cost10;
            if (Model_player.voMine.yuanbao >= this._cost10) {
                this.vres10.color = Color.GREENINT;
            }
            else {
                this.vres10.color = Color.REDINT;
            }
            this.btnBuy10.checkNotice = false;
        }
    };
    Child_ShaoZhu_QiYuan.prototype.onBuy1 = function () {
        var model = GGlobal.modelSZQiYuan;
        if (model.qyCount > 0) {
            model.CG_PRAY(1);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost1) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            model.CG_PRAY(1);
            this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        }
    };
    Child_ShaoZhu_QiYuan.prototype.onBuy10 = function () {
        var model = GGlobal.modelSZQiYuan;
        if (model.qyCount > 9) {
            model.CG_PRAY(10);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            model.CG_PRAY(10);
            this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        }
    };
    Child_ShaoZhu_QiYuan.prototype.onGetPoint = function (e) {
        var v = e.currentTarget;
        var vPoint = v.vo;
        if (vPoint == null)
            return;
        var pointCfg = Config.sonpoint_267[vPoint.id];
        var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward));
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_REWARD, { award: rewardArr, type: 1, vo: vPoint, base: this.base });
    };
    Child_ShaoZhu_QiYuan.prototype.renderItem = function (index, obj) {
        var v = obj;
        v.isShowEff = true;
        v.vo = this.showArr[index];
    };
    Child_ShaoZhu_QiYuan.prototype.onCheck = function (e) {
        Model_SZQiYuan.skipTween = this.checkBox.selected;
        var key = Model_player.voMine.id + "szQiYuanCheck";
        var val = Model_SZQiYuan.skipTween ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    Child_ShaoZhu_QiYuan.prototype.startDraw = function (dropArr) {
        var s = this;
        if (Model_SZQiYuan.skipTween) {
            s.btnBuy1.touchable = s.btnBuy10.touchable = true;
            return;
        }
        s._dropArr = dropArr;
        // for (let i = 0; i < 3; i++) {
        // 	s._rewardArr[i].vo = dropArr[i].item
        // 	s._rewardArr[i].visible = true;
        // 	s._rewardArr[i].alpha = 0;
        // 	egret.Tween.get(s._rewardArr[i]).to({ alpha: 1 }, 1000)
        // }
        // setTimeout(function () {
        // 	for (let i = 0; i < 3; i++) {
        // 		s._rewardArr[i].visible = false;
        // 	}
        // }, 1200);
        s._t = 0;
        for (var i = 0; i < 3; i++) {
            var v = s._rewardArr[i];
            v.visible = true;
            v.isShowEff = true;
            v.vo = s.showArr[Math.floor(Math.random() * s.showArr.length)];
        }
        Timer.instance.listen(s.upDraw, s, 100);
    };
    Child_ShaoZhu_QiYuan.prototype.upDraw = function () {
        var s = this;
        s._t++;
        for (var i = 0; i < 3; i++) {
            var grid = s._rewardArr[i];
            if (s._t < 9) {
                if (s._t == 8) {
                    if (i == 0) {
                        grid.vo = s._dropArr[i].item;
                        EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
                        continue;
                    }
                }
            }
            else {
                if (i == 0)
                    continue;
                if (s._t < 15) {
                    if (s._t == 14) {
                        if (i == 1) {
                            grid.vo = s._dropArr[i].item;
                            EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
                            continue;
                        }
                    }
                }
                else {
                    if (i == 1)
                        continue;
                    if (s._t < 21) {
                        if (s._t == 20) {
                            if (i == 2) {
                                grid.vo = s._dropArr[i].item;
                                EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
                                continue;
                            }
                        }
                    }
                    else {
                        if (i == 2)
                            continue;
                    }
                }
            }
            grid.vo = s.showArr[Math.floor(Math.random() * s.showArr.length)];
        }
        if (s._t > 20) {
            Timer.instance.remove(s.upDraw, s);
        }
    };
    Child_ShaoZhu_QiYuan.prototype.overDraw = function () {
        var s = this;
        s.btnBuy1.touchable = s.btnBuy10.touchable = true;
        for (var i = 0; i < 3; i++) {
            s._rewardArr[i].visible = false;
            s.clean();
        }
    };
    Child_ShaoZhu_QiYuan.prototype.scrollComp1 = function () {
        var s = this;
        var pos = s.list.scrollPane.posX + 5;
        s.list.scrollPane.setPosX(pos, true);
    };
    Child_ShaoZhu_QiYuan.URL = "ui://p83wyb2bsr6c15";
    return Child_ShaoZhu_QiYuan;
}(fairygui.GComponent));
__reflect(Child_ShaoZhu_QiYuan.prototype, "Child_ShaoZhu_QiYuan", ["ChildShaoZhu"]);
