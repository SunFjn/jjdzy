package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_298_宴会敬酒表.xlsx
 */
public class Struct_party9_298 {
    /**酒id*/
    private int id;
    /**敬酒元宝消耗*/
    private int[][] consume;
    /**每场可敬次数*/
    private int time;
    /**开启奖励*/
    private int[][] reward;
    /**全场奖励*/
    private int[][] reward1;
    /**提升氛围值*/
    private int fw;
    /**
     * 酒id
     */
    public int getId() {
        return id;
    }
    /**
     * 敬酒元宝消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 每场可敬次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 开启奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 全场奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 提升氛围值
     */
    public int getFw() {
        return fw;
    }
    public Struct_party9_298(int id,String consume,int time,String reward,String reward1,int fw) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.fw = fw;
    }
}