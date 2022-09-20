/**血战到底 */
class ModelWarToDead extends BaseModel {
    public static readonly msg_datas = "msg_datas";
    public static readonly msg_jlDrop = "msg_jlDrop";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        const self = this;
        wsm.regHand(2802, self.GC2802, self);
        wsm.regHand(2804, self.servCha, self);
        wsm.regHand(2806, self.servAwards, self);
        wsm.regHand(2832, self.GC2832, self);
        wsm.regHand(2834, self.servCha, self);
        wsm.regHand(2836, self.servAwards, self);

        wsm.regHand(4750, self.GC4750, self);
        wsm.regHand(4752, self.servCha, self);
        wsm.regHand(4754, self.servAwards, self);
    }
    public highestLayer: number;//已通过最高层
    public batLayer: number;//进入战斗的层
    public dropLayer: number;//掉落层
    public awards: any[];//掉落奖励
    public qiShu: number;//期数
    public batState: number;// 战斗结果
    /**打开UI */
    public openUI() {
        const self = this;
        var bool = TimeUitl.isIn7Days();
        if (bool) {//7日内
            self.sendSocket(2801, self.getBytes());
        } else {
            self.sendSocket(2831, self.getBytes());
        }
    }

    /**UI数据 */
    private GC2802(self: ModelWarToDead, bytes: Readonly<BaseBytes>) {
        self.highestLayer = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD_7IN, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    }
    /**UI数据 */
    private GC2832(self: ModelWarToDead, bytes: Readonly<BaseBytes>) {
        self.qiShu = bytes.readInt();
        self.highestLayer = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD_7OUT, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    }

    /**4750 返回界面信息 I:已通过最高层数I:已挑战idI:期数  */
    private GC4750(self: ModelWarToDead, bytes: Readonly<BaseBytes>) {
        self.highestLayer = bytes.readInt();
        let hasBatt = bytes.readInt();
        self.qiShu = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD1, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    }

    /**挑战 */
    public challenge() {
        const self = this;
        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
            var bool = TimeUitl.isIn7Days();
            if (bool) {
                self.sendSocket(2803, self.getBytes());
            } else {
                self.sendSocket(2833, self.getBytes());
            }
        } else {
            ViewCommonWarn.text("副本中，不能挑战!");
        }
    }

    /**挑战 */
    public CG4751() {
        const self = this;
        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
            self.sendSocket(4751, self.getBytes());
        } else {
            ViewCommonWarn.text("副本中，不能挑战!");
        }
    }


    /**挑战返回 */
    private servCha(self: ModelWarToDead, bytes: Readonly<BaseBytes>) {
        var state: number = bytes.readByte();
        if (state == 0) {//成功
            self.batLayer = bytes.readInt();
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                bytes.readInt();
            }
            var batState: number = bytes.readByte() + 1;//战斗结果
            if (batState > 2) {
                batState = 0;
            }
            self.batState = batState;
            GGlobal.mapscene.enterScene(SceneCtrl.WARTODEAD);
            GGlobal.layerMgr.close2(UIConst.CHAOZHIFL);
        } else if (state == 1) {
            ViewCommonWarn.text("挑战失败");
        } else if (state == 2) {
            Model_RongLian.ALERT_ONEKEY();
        }
    }
    /**获取奖励 */
    public applyAwards() {
        const self = this;
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            self.sendSocket(2805, self.getBytes());
        } else {
            self.sendSocket(2835, self.getBytes());
        }
    }

    /**获取奖励 */
    public CG4753() {
        const self = this;
        self.sendSocket(4753, self.getBytes());
    }
    /**奖励返回 */
    private servAwards(self: ModelWarToDead, bytes: Readonly<BaseBytes>) {
        self.dropLayer = bytes.readInt();
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            bytes.readInt();
        }
        self.awards = [];
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            self.awards.push([bytes.readByte(), bytes.readInt(), bytes.readInt()]);
        }
        self.notify(ModelWarToDead.msg_jlDrop);
    }
    private dayHasChange() {
        return Model_GlobalMsg.kaifuDay != this.$day;
    }
    private $day: number;//记录开服天数是否有变化
    private $datas: any[];
    private maxLayer: number = 0;
    public getAllDatas() {
        if (!this.dayHasChange() && this.$datas && this.$datas.length) {
            return this.$datas;
        } else {
            const self = this;
            self.maxLayer = 0;
            const lib1 = Config.xzdd1_252;
            const lib2 = Config.xzdd2_252;
            const lib3 = Config.xzdd3_252;
            var bool = TimeUitl.isIn7Days();
            var ret = [];
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {

                let qishu = this.qiShu;
                for (let key in lib3) {
                    let cfg = lib3[key];
                    if (cfg.qs == qishu) {
                        ret.push(cfg);
                    }
                    if (cfg.id > self.maxLayer) {
                        self.maxLayer = cfg.id;
                    }
                }
            } else if (bool) {
                for (let key in lib1) {
                    const c = lib1[key];
                    if (c.id > this.maxLayer) {
                        this.maxLayer = c.id;
                    }
                    ret.push(c);
                }
            } else {
                let act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
                if(act){
                    let qishu = this.qiShu;
                    for (let key in lib2) {
                        let cfg = lib2[key];
                        if (cfg.qs == qishu) {
                            ret.push(cfg);
                        }
                        if (cfg.id > self.maxLayer) {
                            self.maxLayer = cfg.id;
                        }
                    }
                }else{
                    self.maxLayer = 0
                }
               
            }
            this.$day = Model_GlobalMsg.kaifuDay;
            return this.$datas = ret;
        }
    }

    public checkNotice() {
        const self = this;
        var ret: boolean | undefined = undefined;
        var bool = TimeUitl.isIn7Days();
        if(bool){

        }else if(ModelEightLock.originalDatas[UIConst.WARTODEAD1]){

        }else{
            let act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
            if(!act){
                return;
            }
        }
        var datas = self.getAllDatas();
        var tarLayer = self.highestLayer;
        if (tarLayer >= self.maxLayer) {
            ret = false;
        } else {
            for (let i = 0; datas && i < datas.length; i++) {
                var data = datas[i];
                // if (tarLayer == 0) {
                //     tarLayer = TimeUitl.isIn7Days() ? 0 : (self.qiShu - 1) * 1000;
                // }
                let gua = data.id
                if (self.qiShu >= 2) { gua = gua - (self.qiShu - 1) * 1000; }
                if (gua == tarLayer + 1) {
                    ret = data.power <= Model_player.voMine.str;
                    break;
                }
            }
        }
        return ret;
    }
    public warHasEnd() {
        var bool = true;
        if (TimeUitl.isIn7Days()) {
            return false;
        } else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            return false;
        }
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL);//Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (let i = 0; arr && i < arr.length; i++) {
            var temp: Vo_Activity = arr[i];
            if (temp.id == UIConst.WARTODEAD_7OUT) {
                bool = false;
                break;
            }
        }
        if (bool) {
            ViewCommonWarn.text("活动已结束");
        }
        return bool;
    }
}