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
var Model_SZQiYuan = (function (_super) {
    __extends(Model_SZQiYuan, _super);
    function Model_SZQiYuan() {
        var _this = _super.call(this) || this;
        //祈愿符数量
        _this.qyCount = 0;
        //个人积分
        _this.myPoint = 0;
        _this.pointArr = [];
        return _this;
    }
    /**2221 打开界面 */
    Model_SZQiYuan.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(5391, bates);
    };
    /**祈祷 B:祈祷次数,1次或10次 */
    Model_SZQiYuan.prototype.CG_PRAY = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(5393, bates);
    };
    /**领取积分宝箱 I:少主祈愿积分表id */
    Model_SZQiYuan.prototype.CG_GET_SCORE_AWARD = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(5395, bates);
    };
    //协议处理
    Model_SZQiYuan.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(5392, this.GC_OPENUI5392, this);
        mgr.regHand(5394, this.GC_PRAY5394, this);
        mgr.regHand(5396, this.GC_GET_SCORE_AWARD, this);
    };
    //打开界面返回 I:祈愿符数量[I:少主祈愿积分表idI:可领取个数]积分奖励可领取个数I:个人积分
    Model_SZQiYuan.prototype.GC_OPENUI5392 = function (self, data) {
        self.qyCount = data.readInt();
        var len = data.readShort();
        self.pointArr = [];
        for (var i = 0; i < len; i++) {
            var vp = { id: data.readInt(), ct: data.readInt() };
            self.pointArr.push(vp);
        }
        self.myPoint = data.readInt();
        GGlobal.control.notify(Enum_MsgType.SZQIYUAN_OPEN_UI);
        GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED);
    };
    //祈祷返回 B:状态，1：成功，2：祈愿符不足，3：元宝不足I:祈愿符数量I:个人积分[B:奖品类型I:奖品idI:奖品数量B:是否额外]抽取的奖品列表
    Model_SZQiYuan.prototype.GC_PRAY5394 = function (self, data) {
        var rs = data.readByte();
        if (rs == 1) {
            self.qyCount = data.readInt();
            self.myPoint = data.readInt();
            var len = data.readShort();
            var dropArr = [];
            for (var i = 0; i < len; i++) {
                dropArr.push({ item: ConfigHelp.parseItemBa(data), isBig: data.readByte() });
            }
            var dTime = Model_SZQiYuan.skipTween ? 0 : 3000;
            setTimeout(function () {
                GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_SHOW, dropArr);
                var arrGet = [];
                for (var i = 0; i < dropArr.length; i++) {
                    var it = dropArr[i].item;
                    if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
                        arrGet.push(it);
                    }
                }
                if (arrGet) {
                    ViewCommonPrompt.textItemList(arrGet);
                }
            }, dTime);
            GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY);
            GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, dropArr);
            GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED);
        }
        else if (rs == 2) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_SZQiYuan.qiyuanId));
        }
        else if (rs == 3) {
            ModelChongZhi.guideToRecharge();
        }
        else {
            ViewCommonWarn.text("祈愿失败");
        }
    };
    //领取积分宝箱返回 B:状态,0:领取成功,1:失败,-1:更新状态I:少主祈愿积分表idI:剩余领取个数 -1领取完了
    Model_SZQiYuan.prototype.GC_GET_SCORE_AWARD = function (self, data) {
        var result = data.readByte();
        var pointId = data.readInt();
        var status = data.readInt();
        if (result == 0 || result == -1) {
            for (var i = 0; i < self.pointArr.length; i++) {
                var vo = self.pointArr[i];
                if (vo.id == pointId) {
                    vo.ct = status;
                    GGlobal.control.notify(Enum_MsgType.SZQIYUAN_GET_POINT, vo);
                    break;
                }
            }
            if (result == 0) {
                ViewCommonWarn.text("领取成功");
            }
            GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_SZQiYuan.prototype.checkNotice = function () {
        var ct = Model_Bag.getItemCount(Model_SZQiYuan.qiyuanId);
        if (ct > 0) {
            return true;
        }
        var s = this;
        for (var i = 0; i < s.pointArr.length; i++) {
            var vo = s.pointArr[i];
            if (vo.ct > 0) {
                return true;
            }
        }
        return false;
    };
    //祈愿符  道具id
    Model_SZQiYuan.qiyuanId = 410069;
    //跳过动画
    Model_SZQiYuan.skipTween = false;
    return Model_SZQiYuan;
}(BaseModel));
__reflect(Model_SZQiYuan.prototype, "Model_SZQiYuan");
