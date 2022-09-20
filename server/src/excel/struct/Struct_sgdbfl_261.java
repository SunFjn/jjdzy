package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-单笔返利表.xlsx
 */
public class Struct_sgdbfl_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**充值id*/
    private int cz;
    /**奖励*/
    private int[][] reward;
    /**可领次数*/
    private int time;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 充值id
     */
    public int getCz() {
        return cz;
    }
    /**
     * 奖励
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
    public Struct_sgdbfl_261(int id,int qs,int cz,String reward,int time) {
        this.id = id;
        this.qs = qs;
        this.cz = cz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.time = time;
    }
}