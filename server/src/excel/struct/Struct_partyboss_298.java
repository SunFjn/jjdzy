package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_298_宴会BOSS表.xlsx
 */
public class Struct_partyboss_298 {
    /**bossid*/
    private int id;
    /**开启元宝消耗*/
    private int[][] consume;
    /**主人可获得奖励*/
    private int[][] reward;
    /**击败奖励*/
    private int[][] reward1;
    /**可提升氛围值*/
    private int fw;
    /**坐标*/
    private int[][] position;
    /**
     * bossid
     */
    public int getId() {
        return id;
    }
    /**
     * 开启元宝消耗
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
     * 击败奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 可提升氛围值
     */
    public int getFw() {
        return fw;
    }
    /**
     * 坐标
     */
    public int[][] getPosition() {
        return position;
    }
    public Struct_partyboss_298(int id,String consume,String reward,String reward1,int fw,String position) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.fw = fw;
        this.position = ExcelJsonUtils.toObj(position,int[][].class);
    }
}