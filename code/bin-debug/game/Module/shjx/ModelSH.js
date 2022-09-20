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
var ModelSH = (function (_super) {
    __extends(ModelSH, _super);
    function ModelSH() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //幻形数据
        _this.huanXObj = {};
        return _this;
    }
    ModelSH.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(868, this.GC868, this);
        wsm.regHand(866, this.GC866, this);
        wsm.regHand(864, this.GC864, this);
        wsm.regHand(862, this.GC862, this);
        wsm.regHand(860, this.GC860, this);
        wsm.regHand(858, this.GC858, this);
        wsm.regHand(856, this.GC856, this);
        wsm.regHand(852, this.GC852, this);
        wsm.regHand(5692, this.GC5692, this);
        wsm.regHand(5694, this.GC5694, this);
        //幻化
        wsm.regHand(5696, this.GCHXUI_5696, this);
        wsm.regHand(5698, this.GCBUY_5698, this);
        wsm.regHand(5700, this.GCWEAR_5700, this);
    };
    /**5691	印记替换 B:兽灵类型S:装备位置 */
    ModelSH.prototype.CG5691 = function (type, equipPos) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        this.sendSocket(5691, bytes);
    };
    /**5693	一键升星 I:兽灵类型1青龙2白虎3朱雀4玄武 I:洗练装备位置I:当前星级 */
    ModelSH.prototype.CG5693 = function (type, pos, starLv) {
        var self = this;
        var bytes = self.getBytes();
        bytes.writeInt(type);
        bytes.writeInt(pos);
        bytes.writeInt(starLv);
        self.sendSocket(5693, bytes);
    };
    /**5692	印记替换结果 B:结果：0：失败，1：成功B:失败（0：无可替换印记），成功：兽灵类型S:装备位置 */
    ModelSH.prototype.GC5692 = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 1) {
            var type = bytes.readByte();
            var pos = bytes.readShort();
            var data = ModelSH.servDatas[type];
            for (var i = 0; i < data.datas.length; i++) {
                if (data.datas[i].position == pos) {
                    data.datas[i].datas = data.datas[i].thdatas;
                    data.datas[i].thdatas = [];
                    if (data.datas[i].suitVal == 0) {
                        if (ModelSH.hasJH4Attr(Config.shjx_266[pos], 1))
                            data.datas[i].suitVal = 4;
                    }
                    var minStarLv = 1000;
                    var yinJiInfos = data.datas[i].datas;
                    for (var j = 0; j < yinJiInfos.length; j++) {
                        var yinJi = yinJiInfos[j];
                        if (Config.shjxstar_266[yinJi.starID].star < minStarLv && yinJi.type == type) {
                            minStarLv = Config.shjxstar_266[yinJi.starID].star;
                        }
                        if (yinJi.type != type)
                            minStarLv = 0;
                    }
                    if (minStarLv == 1000) {
                        minStarLv = 0;
                    }
                    if (minStarLv > data.datas[i].suitStar) {
                        data.datas[i].suitStar = minStarLv;
                    }
                    break;
                }
            }
            self.notify(ModelSH.msg_xilian);
            self.notify(ModelSH.msg_notice);
        }
    };
    /**5694	一键升星 B:0没有此兽灵 1道具不足 2成功I:一键升星增加的洗练次数 */
    ModelSH.prototype.GC5694 = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        }
        else if (result == 1) {
            ViewCommonWarn.text("道具不足");
        }
        else if (result == 2) {
            var count = bytes.readInt();
            ViewCommonWarn.text("洗练成功");
            self.notify(ModelSH.msg_yijianxilian, { count: count });
        }
    };
    /**打开兽魂化形界面 B:类型 1青龙2白虎3朱雀4玄武 */
    ModelSH.prototype.CGHXUI_5695 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(5695, bytes);
    };
    /**打开兽魂化形界面 B:0没拥有此兽灵 1没激活兽魂 2成功[I:兽魂模型idI:0未化形 1已化形 2激活]兽魂化形数据 */
    ModelSH.prototype.GCHXUI_5696 = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            // ViewCommonWarn.text("没有此兽魂");
        }
        else if (result == 1) {
            // ViewCommonWarn.text("没激活兽魂");
        }
        else if (result == 2) {
            var type = bytes.readByte();
            var len = bytes.readShort();
            self.huanXObj[type] = [];
            for (var i = 0; i < len; i++) {
                var id = bytes.readInt();
                var st = bytes.readInt();
                self.huanXObj[type].push({ id: id, st: st });
            }
            self.notify(ModelSH.msg_huanx_ui);
            self.notify(ModelSH.msg_huanx_red);
        }
    };
    /**购买皮肤 兽灵化形 B:类型 1青龙2白虎3朱雀4玄武I:兽魂化形表的id */
    ModelSH.prototype.CGBUY_5697 = function (type, id) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeInt(id);
        this.sendSocket(5697, bytes);
    };
    /**打开兽魂化形界面 B:0没拥有此兽灵 1没激活兽魂 2成功I:0未化形 1已化形 2激活 */
    ModelSH.prototype.GCBUY_5698 = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        }
        else if (result == 1) {
            ViewCommonWarn.text("没激活兽魂");
        }
        else if (result == 2) {
            ViewCommonWarn.text("幻化失败");
        }
        else if (result == 3) {
            ViewCommonWarn.text("元宝不足");
        }
        else if (result == 4) {
            ViewCommonWarn.text("幻化成功");
            var type = bytes.readByte();
            var id = bytes.readInt();
            var arr = self.huanXObj[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].st = 1;
                }
                else if (arr[i].st == 1) {
                    arr[i].st = 2;
                }
            }
            //自动穿上  自动战斗  
            for (var key in ModelSH.servDatas) {
                var data = ModelSH.servDatas[key];
                if (Number(key) == type) {
                    data.pifu = id;
                    data.isOnBat = 1;
                    self.curOnBatDt = data;
                    Model_player.voMine.shouHun = id;
                }
                else {
                    data.isOnBat = 0;
                }
            }
            self.notify(ModelSH.msg_huanx_buy);
            self.notify(ModelSH.msg_onbat);
            self.notify(ModelSH.msg_huanx_red);
        }
    };
    /**穿戴皮肤 兽灵化形 B:类型 1青龙2白虎3朱雀4玄武I:兽魂化形表的id */
    ModelSH.prototype.CGWEAR_5699 = function (type, id) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeInt(id);
        this.sendSocket(5699, bytes);
    };
    /**穿戴皮肤 B:0没拥有此兽灵 1没激活兽魂 2成功I:0未化形 1已化形 2激活 */
    ModelSH.prototype.GCWEAR_5700 = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            ViewCommonWarn.text("没有此兽魂");
        }
        else if (result == 1) {
            ViewCommonWarn.text("没激活兽魂");
        }
        else if (result == 2) {
            ViewCommonWarn.text("幻化失败");
        }
        else if (result == 3) {
            ViewCommonWarn.text("幻化成功");
            var type = bytes.readByte();
            var id = bytes.readInt();
            var arr = self.huanXObj[type];
            for (var i = 0; i < arr.length; i++) {
                var v = arr[i];
                if (v.id == id) {
                    v.st = 1;
                }
                else if (v.st == 1) {
                    v.st = 2; //把原来已幻形的 还原未幻形
                }
            }
            //自动穿上  自动战斗  
            for (var key in ModelSH.servDatas) {
                var data = ModelSH.servDatas[key];
                if (Number(key) == type) {
                    data.pifu = id;
                    data.isOnBat = 1;
                    self.curOnBatDt = data;
                    Model_player.voMine.shouHun = id;
                }
                else {
                    data.isOnBat = 0;
                }
            }
            self.notify(ModelSH.msg_huanx_buy);
            self.notify(ModelSH.msg_onbat);
        }
    };
    /**返回界面信息 [B:兽灵类型I:兽灵等级I:星宿等级I:星宿当前阶数B:是否激活（0：未激活，1：激活）B:是否出战（0：未出战，1：出战）
     * [S:装位置I:装备idI:已洗练次数[B:印记位置I:印记idB:印记类型B:是否上锁（0：未上锁，1：上锁）]印记数据
     * [B:替换印记位置I:替换印记idB:替换印记类型B:替换印记是否上锁（0：未上锁，1：上锁）]替换印记数据]兽灵装备数据]兽灵数据*/
    ModelSH.prototype.GC852 = function (self, bytes) {
        Model_ShouLing.isFirst = true;
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var data = ModelSH.servDatas[type] || (ModelSH.servDatas[type] = {});
            data.type = type;
            data.level = bytes.readInt(); //兽灵等级
            Model_ShouLing.slArr[Math.floor(data.level / 1000) - 1] = data.level; //兼容一下以前的数据
            data.suLv = bytes.readInt(); //星宿等级
            data.suJie = bytes.readInt(); //星宿阶数
            data.state = bytes.readByte(); //是否激活（1是，0否）
            data.isOnBat = bytes.readByte(); //是否出战（1是，0否）
            data.pifu = bytes.readInt(); //幻形id
            if (data.isOnBat == 1) {
                self.curOnBatDt = data;
            }
            var datas = data.datas || (data.datas = []);
            datas.length = 0;
            var len2 = bytes.readShort();
            for (var j = 0; j < len2; j++) {
                var tempDt = {};
                tempDt.position = bytes.readShort();
                tempDt.equipID = bytes.readInt();
                tempDt.xiLianNum = bytes.readInt();
                tempDt.suitVal = bytes.readInt();
                tempDt.suitStar = bytes.readInt();
                tempDt.datas = tempDt.datas || (tempDt.datas = []);
                tempDt.thdatas = tempDt.thdatas || (tempDt.thdatas = []);
                tempDt.thdatas.length = tempDt.datas.length = 0;
                var len3 = bytes.readShort();
                for (var k = 0; k < len3; k++) {
                    var tempDt2 = {};
                    tempDt2.position = bytes.readByte();
                    tempDt2.starID = bytes.readInt();
                    tempDt2.type = bytes.readByte();
                    tempDt2.isLock = bytes.readByte(); //（1是，0否)
                    tempDt.datas.push(tempDt2);
                }
                var len4 = bytes.readShort();
                for (var n = 0; n < len4; n++) {
                    var tempDt2 = {};
                    tempDt2.position = bytes.readByte();
                    tempDt2.starID = bytes.readInt();
                    tempDt2.type = bytes.readByte();
                    tempDt2.isLock = bytes.readByte(); //（1是，0否)
                    tempDt.thdatas.push(tempDt2);
                }
                datas.push(tempDt);
            }
        }
        ModelSH.updateNotAll();
        self.notify(ModelSH.msg_ui);
        self.notify(ModelSH.msg_notice);
    };
    /**星宿升阶 */
    ModelSH.prototype.CG867 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(867, bytes);
    };
    ModelSH.prototype.GC868 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var curJie = bytes.readInt();
            var info = ModelSH.servDatas[type];
            if (info) {
                info.suJie = curJie;
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xingUpJie);
            self.notify(ModelSH.msg_notice);
        }
        else {
            //1:已经最高，2：未满足条件
            ViewCommonWarn.text(["", "已经最高", "未满足条件"][type]);
        }
    };
    /**出战 */
    ModelSH.prototype.CG865 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(865, bytes);
    };
    ModelSH.prototype.GC866 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var data = ModelSH.servDatas[type];
            if (data) {
                if (self.curOnBatDt) {
                    self.curOnBatDt.isOnBat = 0;
                }
                data.isOnBat = 1;
                self.curOnBatDt = data;
            }
            self.notify(ModelSH.msg_onbat);
            Model_player.voMine.shouHun = data.pifu;
        }
        else {
            ViewCommonWarn.text(["", "未激活"][type]);
        }
    };
    /**锁定印记 type: 类型 equipPos: 装备位置(110 111这些) yjPos:印记位置(1-4) operType: 1锁*/
    ModelSH.prototype.CG863 = function (type, equipPos, yjPos, operType) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        bytes.writeByte(yjPos);
        bytes.writeByte(operType);
        this.sendSocket(863, bytes);
    };
    ModelSH.prototype.GC864 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var equipPos = bytes.readShort();
            var yjPos = bytes.readByte();
            var isLock = bytes.readByte();
            var info = ModelSH.servDatas[type];
            if (info) {
                var datas = info.datas;
                for (var i = 0; i < datas.length; i++) {
                    var tempDt = datas[i];
                    if (tempDt.position == equipPos) {
                        for (var j = 0; j < tempDt.datas.length; j++) {
                            if (tempDt.datas[j].position == yjPos) {
                                tempDt.datas[j].isLock = isLock;
                                break;
                            }
                        }
                        for (var j = 0; j < tempDt.thdatas.length; j++) {
                            if (tempDt.thdatas[j].position == yjPos) {
                                tempDt.thdatas[j].isLock = isLock;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            ModelSH.isLockBack = true;
            self.notify(ModelSH.msg_lock);
        }
        else {
            //1：未洗练到印记不用锁定，2：已锁定，3：消耗道具不足
            ViewCommonWarn.text(["", "未洗练到印记不用锁定", "已锁定", "消耗道具不足"][type]);
        }
    };
    /**兽灵激活 */
    ModelSH.prototype.CG861 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(861, bytes);
    };
    ModelSH.prototype.GC862 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var info = ModelSH.servDatas[type];
            if (info) {
                info.state = 1;
                info.pifu = type;
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_enable);
            self.notify(ModelSH.msg_notice);
            //激活后 显示幻形红点
            GGlobal.modelSHJX.CGHXUI_5695(type);
        }
        else {
            ViewCommonWarn.text(["", "对应类型印记数量不足"][type]);
        }
    };
    /**升级星宿 */
    ModelSH.prototype.CG859 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(859, bytes);
    };
    ModelSH.prototype.GC860 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var info = ModelSH.servDatas[type];
            if (info) {
                info.suLv = bytes.readInt();
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xingSuUp);
            self.notify(ModelSH.msg_notice);
        }
        else {
            //1：已达最高等级，2：道具不足，3：未激活
            ViewCommonWarn.text(["", "已达最高级", "道具不足", "未激活"][type]);
        }
    };
    /**洗练 */
    ModelSH.prototype.CG857 = function (type, equipPos, itemId) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        bytes.writeInt(itemId);
        this.sendSocket(857, bytes);
    };
    /**洗练结果返回 B:结果：0：失败，1：成功B:失败：（1：没穿装备不能洗练，2：不是对应类型的印记，3：印记道具不足，4：洗练石不足，5：洗练锁不足）；成功：
     * 兽灵类型S:装备位置I:洗练次数[I:印记星级idB:位置B:印记类型B:是否上锁（是：1，否：0）]印记数据 */
    ModelSH.prototype.GC858 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var equipPos = bytes.readShort();
            var xiLianNum = bytes.readInt();
            var len = bytes.readShort();
            var arr = [];
            for (var i = 0; i < len; i++) {
                var tempDt = {};
                tempDt.starID = bytes.readInt();
                tempDt.position = bytes.readByte();
                tempDt.type = bytes.readByte();
                tempDt.isLock = bytes.readByte();
                arr.push(tempDt);
            }
            var info = ModelSH.servDatas[type];
            var preTZDatas = null;
            if (info) {
                for (var i = 0; info.datas && i < info.datas.length; i++) {
                    var data = info.datas[i];
                    if (data.position == equipPos) {
                        preTZDatas = data.datas.concat();
                        data.thdatas = arr;
                        data.xiLianNum = xiLianNum;
                        break;
                    }
                }
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_xilian);
            self.notify(ModelSH.msg_notice);
            var preTZLv = self.calcutTZLv(preTZDatas, type);
            var curTZLv = self.calcutTZLv(arr, type);
            var view = GGlobal.layerMgr.getView(UIConst.SHJXXILIAN);
            if (view) {
                view.checkShowEff(preTZLv, curTZLv);
            }
        }
        else {
            //1：没穿装备不能洗练，2：不是对应类型的印记，3：印记道具不足，4：洗练石不足，5：洗练锁不足
            ViewCommonWarn.text(["", "没穿装备不能洗练", "不是对应类型的印记", "消耗道具不足", "洗练石不足", "洗练锁不足"][type]);
        }
    };
    /**穿戴 */
    ModelSH.prototype.CG855 = function (type, equipPos) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        bytes.writeShort(equipPos);
        this.sendSocket(855, bytes);
    };
    ModelSH.prototype.GC856 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readByte();
        if (state == 1) {
            var equipPos = bytes.readShort();
            var equipID = bytes.readInt();
            var len = bytes.readShort();
            var arr = [];
            for (var i = 0; i < len; i++) {
                var pos = bytes.readByte();
                var eqId = bytes.readInt();
                var type_1 = bytes.readByte();
                var isLock = bytes.readByte();
                arr.push({ position: pos, starID: eqId, type: type_1, isLock: isLock });
            }
            var info = ModelSH.servDatas[type];
            if (info) {
                var datas = info.datas || (info.datas = []);
                var indata = false;
                for (var i = 0; i < datas.length; i++) {
                    var data = datas[i];
                    if (data.position == equipPos) {
                        data.equipID = equipID;
                        data.datas = arr;
                        indata = true;
                    }
                }
                if (!indata) {
                    datas.push({ position: equipPos, equipID: equipID, datas: arr, xiLianNum: 0, thdatas: [], suitVal: 0, suitStar: 0 });
                }
            }
            ModelSH.updateNotAll();
            self.notify(ModelSH.msg_chuanDai);
            self.notify(ModelSH.msg_notice);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(410052));
        }
    };
    ModelSH.prototype.calcutTZLv = function (param, type) {
        var minStarLv = 1000;
        var count = 0;
        for (var i = 0; i < param.length; i++) {
            var tempData = param[i];
            if (tempData.type == type) {
                count++;
                if (Config.shjxstar_266[tempData.starID].star < minStarLv) {
                    minStarLv = Config.shjxstar_266[tempData.starID].star;
                }
            }
        }
        return count >= 4 ? minStarLv : 0;
    };
    /**判断某部位装备是否属性满星 */
    ModelSH.hasFullStar = function (attrs) {
        var fullStar = 10;
        var fullCnt = 0;
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            var cfg = Config.shjxstar_266[attr.starID];
            if (cfg && cfg.star >= fullStar) {
                fullCnt++;
            }
        }
        return fullCnt >= 4;
    };
    /**获取相应印记 */
    ModelSH.hasYinJi = function (type) {
        var lib = Config.shjxyj_266;
        for (var key in lib) {
            var cfg = lib[key];
            if (cfg.yj == type) {
                if (Model_Bag.getItemCount(cfg.id) > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    ModelSH.getOrigDatas = function () {
        if (!this._oriDatas) {
            this._oriDatas = {};
            var lib = Config.shjx_266;
            for (var key in lib) {
                var cfg = lib[key];
                var arr = this._oriDatas[cfg.yj] || (this._oriDatas[cfg.yj] = []);
                arr.push(cfg);
            }
        }
        return this._oriDatas;
    };
    ModelSH.getTotalPower = function (type) {
        var power = 0;
        var info = this.servDatas[type];
        if (info) {
            var datas = info.datas;
            for (var i = 0; datas && i < datas.length; i++) {
                var data = datas[i];
                if (data.equipID) {
                    power += Config.zhuangbei_204[data.equipID].zhanli; //装备总战力
                }
                var minStarLv = 1000;
                var sameT = true;
                for (var j = 0; data.datas && j < data.datas.length; j++) {
                    var tempDt = data.datas[j];
                    if (tempDt) {
                        power += Config.shjxstar_266[tempDt.starID].power; //印记总战力
                        if (Config.shjxstar_266[tempDt.starID].star < minStarLv) {
                            minStarLv = Config.shjxstar_266[tempDt.starID].star;
                        }
                        if (type != tempDt.type) {
                            sameT = false;
                        }
                    }
                }
                // if (data && data.datas.length == 4 && sameT) {
                var cfg = this.getByMinStarLv(data.suitStar, data.position);
                // const cfg = this.getByMinStarLv(minStarLv, data.position);
                if (cfg) {
                    power += cfg.power; //套装总战力
                }
                if (data.suitVal == 4) {
                    power += Config.shjx_266[data.position].power; //套装总战力
                }
                // }
            }
            if (info.pifu > 1000) {
                power += Config.shhx_266[info.pifu].power;
            }
            // for (let key in Config.shjx_266) {
            //     const cfg = Config.shjx_266[key];
            //     if (cfg.yj == type && this.hasJH4Attr(cfg, 1)) {
            //         power += Config.shjx_266[key].power;//套装总战力
            //     }
            // }
        }
        return power;
    };
    ModelSH.hasJH4Attr = function (cfg, star) {
        var info = ModelSH.servDatas[cfg.yj];
        var counter = 0;
        if (info) {
            var equips = info.datas;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                if (equip.position == cfg.id) {
                    var attrs = equip.datas;
                    for (var j = 0; j < attrs.length; j++) {
                        var attr = attrs[j];
                        if (attr.type == cfg.yj && Config.shjxstar_266[attr.starID].star >= star) {
                            counter++;
                        }
                    }
                    break;
                }
            }
        }
        return counter >= 4;
    };
    ModelSH.getByMinStarLv = function (minStarLv, position) {
        var lib = Config.shjxstartz_266;
        var arr = this.posToCfg[position];
        if (!arr) {
            arr = this.posToCfg[position] = [];
            for (var key in lib) {
                var cfg = lib[key];
                if (cfg.bw == position) {
                    arr.push(cfg);
                }
            }
            arr.sort(function (a, b) { return a.star - b.star; });
        }
        for (var i = arr.length - 1; i >= 0; i--) {
            if (minStarLv >= arr[i].star) {
                return arr[i];
            }
        }
        return null;
    };
    /**通过某个部位获取装备id */
    ModelSH.getEquipByPos = function (type, position) {
        var info = this.servDatas[type];
        if (info) {
            var datas = info.datas;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data && data.position == position) {
                    return data;
                }
            }
        }
        return null;
    };
    ModelSH.resolveTZ = function (jie, type) {
        var arr = this.typeToTZCfg[type];
        if (!arr) {
            arr = this.typeToTZCfg[type] = [];
            var lib = Config.xjtz_266;
            for (var key in lib) {
                var cfg = lib[key];
                var tempType = ((cfg.lv / 100 >> 0) % 10 >> 0) + 1;
                if (type == tempType) {
                    var fitJie = cfg.next % 100 >> 0;
                    var jie_1 = cfg.lv % 100 >> 0;
                    arr.push({ cfg: cfg, fitJie: fitJie, jie: jie_1 });
                }
            }
            arr.sort(function (a, b) { return a.jie - b.jie; });
        }
        return arr;
    };
    /**背包是否有更好的 */
    ModelSH.hasBetterEQ = function (eqID, part) {
        var equipMap = Model_Bag.equipMap;
        var arr = [];
        for (var key in equipMap) {
            var voe = equipMap[key];
            var cfg = Config.zhuangbei_204[voe.id];
            if (cfg.part == part) {
                arr.push(voe.id);
            }
        }
        var zhuanCnt = 0;
        var power = 0;
        if (eqID != 0) {
            power = Config.zhuangbei_204[eqID].zhanli;
        }
        for (var i = 0; i < arr.length; i++) {
            var id = arr[i];
            var cfg = Config.zhuangbei_204[id];
            if (cfg) {
                var zsVal = JSON.parse(cfg.lv)[0][0];
                if (Config.zhuangbei_204[id].zhanli > power) {
                    if (Model_player.voMine.zsID >= zsVal) {
                        return true;
                    }
                    else {
                        zhuanCnt = zsVal;
                    }
                }
            }
        }
        if (zhuanCnt) {
            return { zhuanCnt: zhuanCnt, bool: false };
        }
        else {
            return false;
        }
    };
    /**升级 */
    ModelSH.checkSJ = function (type) {
        var cfg = Config.shoulin_704[Model_ShouLing.slArr[type - 1]];
        var costArr = JSON.parse(cfg.consume);
        if (costArr && costArr.length > 0) {
            var count = Model_Bag.getItemCount(costArr[0][1]);
            if (cfg.next > 0) {
                return count >= costArr[0][2];
            }
            else {
                return false;
            }
        }
        return false;
    };
    /**觉醒 */
    ModelSH.checkJX = function (type) {
        if (!ModuleManager.isOpen(UIConst.SHJX)) {
            return false;
        }
        var info = ModelSH.servDatas[type];
        if (info) {
            var equips = info.datas;
            for (var i = 0; i < 3; i++) {
                var pos = 100 + type * 10 + i;
                var equip = getEquip(pos);
                if (equip) {
                    var betJug = this.hasBetterEQ(equip.equipID, equip.position);
                    if (betJug && !betJug.zhuanCnt) {
                        return true;
                    }
                    if (equip && equip.equipID) {
                        if (!ModelSH.hasFullStar(equip.datas) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2]) {
                            return true;
                        }
                    }
                }
                else {
                    var betJug = this.hasBetterEQ(0, pos);
                    if (betJug && !betJug.zhuanCnt) {
                        return true;
                    }
                }
            }
        }
        function getEquip(pos) {
            if (info) {
                for (var i = 0; info.datas && i < info.datas.length; i++) {
                    if (info.datas[i].position == pos) {
                        return info.datas[i];
                    }
                }
            }
            return null;
        }
        return false;
    };
    /**二十八星宿 */
    ModelSH.checkXS = function (type) {
        if (!ModuleManager.isOpen(UIConst.ERBASU)) {
            return false;
        }
        var info = ModelSH.servDatas[type];
        if (info) {
            //星宿等级
            var cfg = Config.xj_266[info.suLv];
            if (cfg && cfg.cost != 0) {
                var cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
                if (Model_Bag.getItemCount(cost.id) >= cost.count) {
                    return true;
                }
            }
            //套装
            var nextCfg = info.suJie ? Config.xjtz_266[info.suJie + 1] : Config.xjtz_266[info.type * 1000 + 1];
            if (nextCfg) {
                var fitJi = nextCfg.next % 1000 >> 0;
                var ji = info.suLv ? info.suLv : info.type * 100000;
                if ((ji % 1000 >> 0) >= fitJi) {
                    return true;
                }
            }
        }
        return false;
    };
    /**checkALl */
    ModelSH.updateNotAll = function () {
        var ret = false;
        for (var i = 1; i <= 4; i++) {
            ret = this.checkSJ(i) || this.checkJX(i) || this.checkXS(i);
            if (ret == true) {
                break;
            }
        }
        ret = ret || GGlobal.reddot.checkCondition(UIConst.ACTHB_XUNBAO, 0);
        GGlobal.reddot.setCondition(UIConst.SHOULING, 0, ret);
    };
    ModelSH.prototype.checkHuanXType = function (type) {
        var info = ModelSH.servDatas[type];
        if (!info || info.state != 1) {
            return false;
        }
        if (this.huanXObj == null || this.huanXObj[type] == null) {
            return false;
        }
        var arr = this.huanXObj[type];
        for (var j = 0; j < arr.length; j++) {
            if (arr[j].st > 0)
                continue;
            var v = Config.shhx_266[arr[j].id];
            if (v.conmuse == "0")
                continue;
            var cost = Number(JSON.parse(v.conmuse)[0][2]);
            if (Model_player.voMine.yuanbao >= cost) {
                return true;
            }
        }
        return false;
    };
    ModelSH.canRongLian = function (part) {
        var info = ModelSH.servDatas[part % 100 / 10 >> 0];
        if (info) {
            var equips = info.datas;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                if (equip && equip.position == part) {
                    return Config.zhuangbei_204[equip.equipID].zhanli;
                }
            }
        }
        return 0;
    };
    ModelSH.hasJH4Attr111 = function (cfg, star) {
        var info = ModelSH.servDatas[cfg.yj];
        var counter = 0;
        if (info) {
            var equips = info.datas;
            for (var i = 0; i < equips.length; i++) {
                var equip = equips[i];
                if (equip.position == cfg.id) {
                    var attrs = equip.datas;
                    for (var j = 0; j < attrs.length; j++) {
                        var attr = attrs[j];
                        if (attr.type == cfg.yj && Config.shjxstar_266[attr.starID].star >= star) {
                            counter++;
                        }
                    }
                    break;
                }
            }
        }
        counter >= 4;
    };
    ModelSH.msg_ui = "msg_ui";
    ModelSH.msg_onbat = "msg_onbat"; //出战
    ModelSH.msg_lock = "msg_lock"; //印记上锁
    ModelSH.msg_enable = "msg_enable"; //激活
    ModelSH.msg_xingSuUp = "msg_xingSuUp"; //星宿升级
    ModelSH.msg_xingUpJie = "msg_xingUpJie"; //新宿升阶
    ModelSH.msg_xilian = "msg_xilian"; //洗练
    ModelSH.msg_chuanDai = "msg_chuanDai"; //穿戴
    ModelSH.msg_itemSel = "msg_itemSel"; //类型切换
    ModelSH.msg_notice = "msg_notice"; //红点
    /**一键洗练 */
    ModelSH.msg_yijianxilian = "msg_yijianxilian";
    /**幻形 */
    ModelSH.msg_huanx_ui = "msg_huanx_ui";
    ModelSH.msg_huanx_buy = "msg_huanx_buy";
    ModelSH.msg_huanx_red = "msg_huanx_red";
    ModelSH.servDatas = {};
    ModelSH.isLockBack = false;
    ModelSH.icUrls = ["qingLongYJ", "baiHuYJ", "zhuQueYJ", "xuanWuYJ"];
    ModelSH.icNameUrls = ["ui://4aepcdbwtu9m44", "ui://4aepcdbwtu9m47", "ui://4aepcdbwi1zl5w", "ui://4aepcdbwtu9m45"];
    /**做一个 套装表数据 部位->表元素的映射 */
    ModelSH.posToCfg = {};
    /**印记到套装表元素的映射 */
    ModelSH.typeToTZCfg = {};
    return ModelSH;
}(BaseModel));
__reflect(ModelSH.prototype, "ModelSH");
