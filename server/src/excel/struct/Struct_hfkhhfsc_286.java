package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_合服首充表.xlsx
 */
public class Struct_hfkhhfsc_286 {
    /**id*/
    private int id;
    /**充值商品id*/
    private int cz;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 充值商品id
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
    public Struct_hfkhhfsc_286(int id,int cz,String reward) {
        this.id = id;
        this.cz = cz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}