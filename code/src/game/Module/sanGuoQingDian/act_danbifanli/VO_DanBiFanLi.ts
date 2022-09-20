class VO_DanBiFanLi
{
    public constructor(){

    }
    /**充值id*/
    cz : number;
    /**活动期数*/
    qs : number;
    /**奖励*/
    reward : any;
    /**可领次数*/
    time : number;
    /**索引id*/ 
    id : number;
    /**可领取次数 */
    count : number;
    /**剩余次数 */
    lastNum : number;
    lib : any;
    public init(cfg) 
    {
        this.cz = cfg.cz;
        this.qs = cfg.qs;
        this.reward = cfg.reward; 
        this.time = cfg.time; 
        this.id = cfg.id;
    }
  
    public getSortIndex(){
        let ret = this.id;
        if(this.lastNum < 1 && this.count == 0) { //剩余充值次数为0，并且没有可以领取的次数，放到最后面
            ret += 1000000; 
        } else if(this.count == 0){
            ret -= 10000;
        } else if(this.count > 0){
            ret -= 1000000;
        }
        return ret;
    }
}