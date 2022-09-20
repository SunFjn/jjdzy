package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽寻宝目标表.xlsx
 */
public class Struct_ssshxbmb_268 {
    /**id*/
    private int id;
    /**需要圈数*/
    private int q;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 需要圈数
     */
    public int getQ() {
        return q;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ssshxbmb_268(int id,int q,String reward) {
        this.id = id;
        this.q = q;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}