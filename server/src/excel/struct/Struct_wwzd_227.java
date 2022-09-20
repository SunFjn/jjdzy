package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_227_王位争夺表.xlsx
 */
public class Struct_wwzd_227 {
    /**id*/
    private int id;
    /**匹配场次*/
    private int num;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 匹配场次
     */
    public int getNum() {
        return num;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wwzd_227(int id,int num,String reward) {
        this.id = id;
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}