package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-登录有奖表.xlsx
 */
public class Struct_sgdlyj_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**登录天数*/
    private int day;
    /**奖励*/
    private int[][] reward;
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
     * 登录天数
     */
    public int getDay() {
        return day;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_sgdlyj_261(int id,int qs,int day,String reward) {
        this.id = id;
        this.qs = qs;
        this.day = day;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}