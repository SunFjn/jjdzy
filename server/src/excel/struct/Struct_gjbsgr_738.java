package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_738_国家boss个人排名.xlsx
 */
public class Struct_gjbsgr_738 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward1;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_gjbsgr_738(int id,String rank,String reward1) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}