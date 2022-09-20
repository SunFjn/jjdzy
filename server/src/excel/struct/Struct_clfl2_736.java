package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_736_新超值材料返利2.xlsx
 */
public class Struct_clfl2_736 {
    /**索引id*/
    private int id;
    /**星期*/
    private int week;
    /**消耗*/
    private int[][] consume;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
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
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_clfl2_736(int id,int week,String consume,String reward,int jiankong) {
        this.id = id;
        this.week = week;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}