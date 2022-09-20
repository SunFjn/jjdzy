class VO_DeLuYouJiang
{
    public constructor(){

    }
    /**登录天数*/
    day : number;
    /**活动期数*/
    qs : number;
    /**奖励*/
    reward : any[];
    /**索引id*/
    id : number;
    /**领取状态（0：不可领取，1：可领取，2：已领取） */
    state : number;
    /**已登陆天数 */
    loginDay : number;

    public init(cfg)
    {
        this.day = cfg.day;
        this.qs = cfg.qs;
        this.reward = cfg.reward;
        this.id = cfg.id;
    }

    public getSortIndex(){
        let ret = this.id;
        if(this.state == 1){
            ret -= 10000;
        } else if(this.state == 2){
            ret += 10000;
        }
        return ret;
    }
}
