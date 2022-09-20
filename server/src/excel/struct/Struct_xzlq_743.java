package excel.struct;
/**
 * L_743_限制监控领取.xlsx
 */
public class Struct_xzlq_743 {
    /**监控ID*/
    private int id;
    /**系统名称*/
    private String mingcheng;
    /**系统常数ID
	 * 
	 * 若系统有其他通过系统常数表配置的奖励，奖励编号为系统常数表ID
	 * 
	 * 没有则填0*/
    private int csID;
    /**每项奖励限领次数
	 * 
	 * 每项奖励限制可领取或购买、兑换的次数
	 * 注意：以背包实际接收到奖励为准
	 * 
	 * 
	 * */
    private int jlcishu;
    /**领取周期
	 * 
	 * 达到限领次数后，若可在下次活动时继续领取，则填写活动周期时间，
	 * 单位：s
	 * 
	 * 若达到限领次数后不可再领取的，则填0
	 * 
	 * */
    private int zhouqi;
    /**类型
	 * 1：活动周期
	 * 2：每日（不填时间）
	 * 3：一次性（不用填时间）*/
    private int leixing;
    /**
     * 监控ID
     */
    public int getId() {
        return id;
    }
    /**
     * 系统名称
     */
    public String getMingcheng() {
        return mingcheng;
    }
    /**
     * 系统常数ID
	 * 
	 * 若系统有其他通过系统常数表配置的奖励，奖励编号为系统常数表ID
	 * 
	 * 没有则填0
     */
    public int getCsID() {
        return csID;
    }
    /**
     * 每项奖励限领次数
	 * 
	 * 每项奖励限制可领取或购买、兑换的次数
	 * 注意：以背包实际接收到奖励为准
	 * 
	 * 
	 * 
     */
    public int getJlcishu() {
        return jlcishu;
    }
    /**
     * 领取周期
	 * 
	 * 达到限领次数后，若可在下次活动时继续领取，则填写活动周期时间，
	 * 单位：s
	 * 
	 * 若达到限领次数后不可再领取的，则填0
	 * 
	 * 
     */
    public int getZhouqi() {
        return zhouqi;
    }
    /**
     * 类型
	 * 1：活动周期
	 * 2：每日（不填时间）
	 * 3：一次性（不用填时间）
     */
    public int getLeixing() {
        return leixing;
    }
    public Struct_xzlq_743(int id,String mingcheng,int csID,int jlcishu,int zhouqi,int leixing) {
        this.id = id;
        this.mingcheng = mingcheng;
        this.csID = csID;
        this.jlcishu = jlcishu;
        this.zhouqi = zhouqi;
        this.leixing = leixing;
    }
}