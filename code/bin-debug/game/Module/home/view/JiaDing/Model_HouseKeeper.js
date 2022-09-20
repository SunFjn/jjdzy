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
/**
 * Model_HouseKeeper
 * 家丁
 */
var Model_HouseKeeper = (function (_super) {
    __extends(Model_HouseKeeper, _super);
    function Model_HouseKeeper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jdID = 0;
        _this.jdLv = 0;
        _this.jdExp = 0;
        _this.hasData = false;
        return _this;
    }
    //协议处理
    Model_HouseKeeper.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11352, this.GC_HouseKeeper_openUI_11352, this);
        mgr.regHand(11354, this.GC_HouseKeeper_upHouseKeeper_11354, this);
        mgr.regHand(11356, this.GC_HouseKeeper_upHouseKeeperLevel_11356, this);
    };
    /**11351  打开界面 */
    Model_HouseKeeper.prototype.CG_HouseKeeper_openUI_11351 = function () {
        var bates = this.getBytes();
        this.sendSocket(11351, bates);
    };
    /**11352 I-I-I 打开界面返回 I:家丁ididI:家丁等级levelI:家丁当前经验curExp*/
    Model_HouseKeeper.prototype.GC_HouseKeeper_openUI_11352 = function (self, data) {
        self.jdID = data.readInt();
        self.jdLv = data.readInt();
        self.jdExp = data.readInt();
        self.hasData = true;
        self.checkNotice();
        GGlobal.control.notify(UIConst.HOME_JIADING);
    };
    /**11353  晋升家丁 */
    Model_HouseKeeper.prototype.CG_HouseKeeper_upHouseKeeper_11353 = function () {
        var bates = this.getBytes();
        this.sendSocket(11353, bates);
    };
    /**11354 B-I 晋升家丁返回 B:状态 0成功 1达到上限 2条件不足 3需要的道具不足stateI:家丁idindex*/
    Model_HouseKeeper.prototype.GC_HouseKeeper_upHouseKeeper_11354 = function (self, data) {
        var result = data.readByte();
        var arg2 = data.readInt();
        if (result == 0) {
            self.jdID = arg2;
            self.checkNotice();
            GGlobal.control.notify(UIConst.HOME_JIADING);
            self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
        }
    };
    /**11355 B 升级家丁 B:类型 1升级 2一键type*/
    Model_HouseKeeper.prototype.CG_HouseKeeper_upHouseKeeperLevel_11355 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(11355, bates);
    };
    /**11356 B-I-I 升级家丁返回 B:0成功 1级数已满级 2材料不足stateI:家丁等级levelI:家丁当前经验curLevel*/
    Model_HouseKeeper.prototype.GC_HouseKeeper_upHouseKeeperLevel_11356 = function (self, data) {
        var result = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        if (result == 0) {
            self.jdLv = arg2;
            self.jdExp = arg3;
            self.checkNotice();
            GGlobal.control.notify(UIConst.HOME_JIADING);
        }
    };
    Model_HouseKeeper.prototype.checkNotice = function () {
        var s = this;
        if (!s.hasData) {
            return;
        }
        var reddot = GGlobal.reddot;
        var red1 = s.checkUpJie();
        var red2 = s.checkJinSheng();
        reddot.setCondition(UIConst.HOME_JIADING, 0, red1 || red2);
        reddot.setCondition(UIConst.HOME_JIADING, 1, red1);
        reddot.setCondition(UIConst.HOME_JIADING, 2, red2);
        reddot.notify(UIConst.HOME_JIADING);
    };
    Model_HouseKeeper.prototype.checkUpJie = function () {
        var cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
        var model = this;
        if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
            return false;
        }
        var count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
        if (count <= 0) {
            return false;
        }
        return true;
    };
    Model_HouseKeeper.prototype.checkJinSheng = function () {
        var model = this;
        var cfg = Config.jdjins_021[model.jdID];
        if (cfg.next > 0 && model.jdLv >= cfg.tiaojian) {
            var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
            var count = Model_Bag.getItemCount(costItem.id);
            if (count >= costItem.count) {
                return true;
            }
        }
        return false;
    };
    Model_HouseKeeper.costID = 410450;
    return Model_HouseKeeper;
}(BaseModel));
__reflect(Model_HouseKeeper.prototype, "Model_HouseKeeper");
