package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 废弃_242_超值元宝返利表.xlsx
 */
public class Struct_rebateyb_242 {
    /**索引id*/
    private int id;
    /**星期*/
    private int week;
    /**消耗*/
    private int[][] consume;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 星期
     */
    public int getWeek() {
        return week;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_rebateyb_242(int id,int week,String consume,String reward) {
        this.id = id;
        this.week = week;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}