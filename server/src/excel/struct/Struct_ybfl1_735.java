package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_735_新超值元宝返利1.xlsx
 */
public class Struct_ybfl1_735 {
    /**索引id*/
    private int id;
    /**天数
	 * jingyu:
	 * x：1,2,3,4,5,6,7，
	 * 第x天：开服第x天*/
    private int day;
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
     * 天数
	 * jingyu:
	 * x：1,2,3,4,5,6,7，
	 * 第x天：开服第x天
     */
    public int getDay() {
        return day;
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
    public Struct_ybfl1_735(int id,int day,String consume,String reward,int jiankong) {
        this.id = id;
        this.day = day;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}