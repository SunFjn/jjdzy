package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_298_宴会礼物表.xlsx
 */
public class Struct_partylw_298 {
    /**礼物id*/
    private int id;
    /**赠送元宝消耗*/
    private int[][] consume;
    /**主人可获得奖励*/
    private int[][] reward;
    /**可提升氛围值*/
    private int fw;
    /**
     * 礼物id
     */
    public int getId() {
        return id;
    }
    /**
     * 赠送元宝消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 主人可获得奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 可提升氛围值
     */
    public int getFw() {
        return fw;
    }
    public Struct_partylw_298(int id,String consume,String reward,int fw) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.fw = fw;
    }
}