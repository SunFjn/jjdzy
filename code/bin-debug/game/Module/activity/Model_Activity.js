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
var Model_Activity = (function (_super) {
    __extends(Model_Activity, _super);
    function Model_Activity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**活动信息 */
        _this.actionInfo = {};
        return _this;
    }
    /** 打开活动界面 I:活动类型*/
    Model_Activity.prototype.CG_OPENUI = function (type) {
        var ba = this.getBytes();
        ba.writeInt(type);
        this.sendSocket(2251, ba);
    };
    /** 请求某活动数据 I:活动id*/
    Model_Activity.prototype.CG_OPENACT = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(2253, ba);
    };
    Model_Activity.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(2250, s.GC_LOGIN_SEND, s);
        mgr.regHand(2252, s.GC_OPENUI, s);
        mgr.regHand(2256, s.GC_ACTOPENSTATE, s);
    };
    /**	登录发送类型活动数据 [I:活动类型[I:活动序号I:活动idI:活动期数I:开始时间I:结束时间]]活动数据*/
    Model_Activity.prototype.GC_LOGIN_SEND = function (s, d) {
        console.log("开始打印登录活动数据++++++++++++++++++++");
        for (var i = 0, len = d.readShort(); i < len; i++) {
            var groupId = d.readInt();
            console.log("大活动编号：" + groupId);
            for (var j = 0, len2 = d.readShort(); j < len2; j++) {
                s.append(groupId, d.readInt(), d.readInt(), d.readInt(), d.readInt(), d.readInt());
            }
            if (len2 > 0)
                GGlobal.mainUICtr.addIconWithListener(groupId);
        }
        console.log("开始打印登录活动数据结束+++++++++++++++++++++++++++");
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_LOGIN_SEND);
    };
    /**	活动界面信息返回 I:活动类型[I:活动序号I:活动idI:活动期数I:开始时间I:结束时间]活动数据*/
    Model_Activity.prototype.GC_OPENUI = function (s, d) {
        var groupId = d.readInt();
        for (var i = 0, len = d.readShort(); i < len; i++) {
            s.append(groupId, d.readInt(), d.readInt(), d.readInt(), d.readInt(), d.readInt());
        }
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
    };
    /**活动开启 I:活动类型I:活动序号I:活动idI:期数I:开始时间I:结束时间B:开启状态：0：关闭，1：开启*/
    Model_Activity.prototype.GC_ACTOPENSTATE = function (s, d) {
        var info = { groupId: d.readInt(), index: d.readInt(), id: d.readInt(), qishu: d.readInt(), start: d.readInt(), end: d.readInt() };
        var state = d.readByte();
        if (state == 0) {
            s.castOff(info.groupId, info.id, info.qishu);
            var group = GGlobal.modelActivity.getGroup(info.groupId);
            if (!group) {
                GGlobal.mainUICtr.removeIcon(info.groupId);
            }
        }
        else {
            s.append(info.groupId, info.index, info.id, info.qishu, info.start, info.end);
            GGlobal.mainUICtr.addIconWithListener(info.groupId);
        }
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
    };
    /**
     * @groupId活动组ID @index子活动索引 @id子活动id @qishu子活动期数 @start子活动开始时间 @end子活动结束时间
     */
    Model_Activity.prototype.append = function (groupId, index, id, qishu, start, end) {
        if (index === void 0) { index = -1; }
        if (id === void 0) { id = 0; }
        if (qishu === void 0) { qishu = 0; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        var self = this;
        var actGroup = self.actionInfo[groupId]; //获取相应活动组
        if (!actGroup) {
            actGroup = self.actionInfo[groupId] = [];
        }
        console.log("子活动index：" + index + "子活动id：" + id + "子活动期数：" + qishu);
        var act = self.getChildInGroup(id, actGroup);
        if (!act) {
            act = Vo_Activity.create();
            act.status = 1; //设置活动开启状态
            actGroup.push(act);
        }
        act.setData(groupId, index, id, qishu, start, end);
    };
    Model_Activity.prototype.castOff = function (groupId, id, qishu) {
        var group = this.actionInfo[groupId];
        if (group) {
            for (var i = 0, len_1 = group.length; i < len_1; i++) {
                var child = group[i];
                if (child.id == id && child.qs == qishu) {
                    // child.recover(); //不用对象池了，会有bug by lujiahao 2019.9.7
                    child.status = 0; //设置活动关闭
                    group.splice(i, 1);
                    break;
                }
            }
            var len = group.length;
            if (len <= 0) {
                this.offGroup(groupId);
            }
        }
    };
    Model_Activity.prototype.offGroup = function (groupId) {
        var group = this.actionInfo[groupId];
        if (group) {
            delete this.actionInfo[groupId];
        }
    };
    Model_Activity.prototype.get = function (groupId, id, qishu) {
        if (qishu === void 0) { qishu = undefined; }
        var self = this;
        var group = self.actionInfo[groupId];
        if (group) {
            for (var i = 0, len = group.length; i < len; i++) {
                var child = group[i];
                if (qishu === undefined) {
                    if (child.id == id) {
                        return child;
                    }
                }
                else {
                    if (child.id == id && child.qs == qishu) {
                        return child;
                    }
                }
            }
        }
        return null;
    };
    Model_Activity.prototype.getGroup = function (groupid) {
        return this.actionInfo[groupid];
    };
    Model_Activity.prototype.getChildInGroup = function (id, actGroup) {
        var len = actGroup && actGroup.length;
        for (var i = 0; i < len; i++) {
            var tempAct = actGroup[i];
            if (tempAct.id == id) {
                return tempAct;
            }
        }
        return null;
    };
    Model_Activity.prototype.getActivityByID = function (id) {
        var self = this;
        for (var key in self.actionInfo) {
            var actGroup = self.actionInfo[key];
            for (var i = 0; i < actGroup.length; i++) {
                var tempAct = actGroup[i];
                if (tempAct.id == id) {
                    return tempAct;
                }
            }
        }
        return null;
    };
    Model_Activity.activityObj = {};
    return Model_Activity;
}(BaseModel));
__reflect(Model_Activity.prototype, "Model_Activity");
