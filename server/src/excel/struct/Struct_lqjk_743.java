package excel.struct;
/**
 * L_743_领取限制.xlsx
 */
public class Struct_lqjk_743 {
    /**编号*/
    private int Index;
    /**系统ID*/
    private int xtID;
    /**奖励ID
	 * 
	 * 
	 * 为对应系统配置表里的奖励编号，注意一个系统多个表的情况
	 * 
	 * 编号为0，则读取系统常数ID*/
    private int jlID;
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
    /**
     * 编号
     */
    public int getIndex() {
        return Index;
    }
    /**
     * 系统ID
     */
    public int getXtID() {
        return xtID;
    }
    /**
     * 奖励ID
	 * 
	 * 
	 * 为对应系统配置表里的奖励编号，注意一个系统多个表的情况
	 * 
	 * 编号为0，则读取系统常数ID
     */
    public int getJlID() {
        return jlID;
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
    public Struct_lqjk_743(int Index,int xtID,int jlID,int csID,int jlcishu,int zhouqi) {
        this.Index = Index;
        this.xtID = xtID;
        this.jlID = jlID;
        this.csID = csID;
        this.jlcishu = jlcishu;
        this.zhouqi = zhouqi;
    }
}