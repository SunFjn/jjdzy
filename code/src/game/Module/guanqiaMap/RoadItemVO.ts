class RoadItemVO implements Idgq_205{
    constructor(){
        
    }

    /**名称*/mingcheng;
    /**通关奖励*/jiangli;
    /**小关卡数*/guanqia;
    /**关卡图片*/tupian;
    /**地图ID*/ditu;
    /**序号*/ID;
 
    /**当前关卡 */
    public curGQ:number;
    /**当前光卡 item 的序号 */
    public index : number;

    public init(cfg){
        this.mingcheng = cfg.mingcheng;
        this.jiangli = cfg.jiangli;
        this.guanqia = cfg.guanqia;
        this.tupian = cfg.tupian;
        this.ditu = cfg.ditu;
        this.ID = cfg.ID;
    }

}