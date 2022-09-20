package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_735_新超值元宝返利2.xlsx
 */
public class Struct_ybfl2_735 {
    /**索引id*/
    private int id;
    /**星期
	 * jingyu:
	 * x：1,2,3,4,5,6,7，
	 * */
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
	 * jingyu:
	 * x：1,2,3,4,5,6,7，
	 * 
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
    public Struct_ybfl2_735(int id,int week,String consume,String reward,int jiankong) {
        this.id = id;
        this.week = week;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}