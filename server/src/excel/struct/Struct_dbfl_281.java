package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_281_新活动-单笔返利表.xlsx
 */
public class Struct_dbfl_281 {
    /**索引id*/
    private int id;
    /**充值商品id*/
    private int cz;
    /**元宝钥匙奖励（用于抽奖）*/
    private int[][] reward;
    /**可领次数*/
    private int time;
    /**基础元宝奖励*/
    private int[][] yb;
    /**转盘概率
	 * A,B
	 * A=转盘表id
	 * B=概率（十万比）*/
    private int[][] zp;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 充值商品id
     */
    public int getCz() {
        return cz;
    }
    /**
     * 元宝钥匙奖励（用于抽奖）
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 可领次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 基础元宝奖励
     */
    public int[][] getYb() {
        return yb;
    }
    /**
     * 转盘概率
	 * A,B
	 * A=转盘表id
	 * B=概率（十万比）
     */
    public int[][] getZp() {
        return zp;
    }
    public Struct_dbfl_281(int id,int cz,String reward,int time,String yb,String zp) {
        this.id = id;
        this.cz = cz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.time = time;
        this.yb = ExcelJsonUtils.toObj(yb,int[][].class);
        this.zp = ExcelJsonUtils.toObj(zp,int[][].class);
    }
}