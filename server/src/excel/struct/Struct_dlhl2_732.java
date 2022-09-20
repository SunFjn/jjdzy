package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_732_新登录豪礼2.xlsx
 */
public class Struct_dlhl2_732 {
    /**序号*/
    private int id;
    /**星期
	 * jingyu:
	 * 星期x：
	 * x:1,2,3,4,5,6,7*/
    private int xq;
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
     * 星期
	 * jingyu:
	 * 星期x：
	 * x:1,2,3,4,5,6,7
     */
    public int getXq() {
        return xq;
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
    public Struct_dlhl2_732(int id,int xq,int type,String reward,int jiankong) {
        this.id = id;
        this.xq = xq;
        this.type = type;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}