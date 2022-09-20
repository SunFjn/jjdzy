package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_732_新登录豪礼(8-28).xlsx
 */
public class Struct_dlhl3_732 {
    /**序号*/
    private int id;
    /**天数
	 * jingyu:
	 * 第x天：开服第x天
	 * */
    private int ts;
    /**类型
	 * jingyu:
	 * 1.今日登录
	 * 2.VIP等级
	 * 3.充值任意金额
	 * 4.至尊卡可额外领取*/
    private int type;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 天数
	 * jingyu:
	 * 第x天：开服第x天
	 * 
     */
    public int getTs() {
        return ts;
    }
    /**
     * 类型
	 * jingyu:
	 * 1.今日登录
	 * 2.VIP等级
	 * 3.充值任意金额
	 * 4.至尊卡可额外领取
     */
    public int getType() {
        return type;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_dlhl3_732(int id,int ts,int type,String reward,int jiankong) {
        this.id = id;
        this.ts = ts;
        this.type = type;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}