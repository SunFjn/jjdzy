package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_726_超值转盘目标.xlsx
 */
public class Struct_czzpbox_726 {
    /**序号*/
    private int id;
    /**消费元宝*/
    private int coin;
    /**宝箱奖励*/
    private int[][] reward;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 消费元宝
     */
    public int getCoin() {
        return coin;
    }
    /**
     * 宝箱奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_czzpbox_726(int id,int coin,String reward) {
        this.id = id;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}