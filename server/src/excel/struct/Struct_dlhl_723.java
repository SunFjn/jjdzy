package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 废弃_723_登录豪礼.xlsx
 */
public class Struct_dlhl_723 {
    /**序号*/
    private int id;
    /**类型
	 * jingyu:
	 * 1.今日登录
	 * 2.VIP等级
	 * 3.充值任意金额
	 * 4.至尊卡可额外领取*/
    private int type;
    /**期数
	 * jingyu:
	 * 对应活动表*/
    private int qs;
    /**奖励*/
    private int[][] reward;
    /**
     * 序号
     */
    public int getId() {
        return id;
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
     * 期数
	 * jingyu:
	 * 对应活动表
     */
    public int getQs() {
        return qs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_dlhl_723(int id,int type,int qs,String reward) {
        this.id = id;
        this.type = type;
        this.qs = qs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}