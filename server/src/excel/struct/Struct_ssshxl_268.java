package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽洗练表.xlsx
 */
public class Struct_ssshxl_268 {
    /**id*/
    private int id;
    /**洗练次数*/
    private int time;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 洗练次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ssshxl_268(int id,int time,String reward) {
        this.id = id;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}