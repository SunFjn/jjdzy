package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_740_宝物现世.xlsx
 */
public class Struct_bwxs_740 {
    /**编号*/
    private int id;
    /**boss*/
    private int[][] boss;
    /**奖励*/
    private String jiangli;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * boss
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 奖励
     */
    public String getJiangli() {
        return jiangli;
    }
    public Struct_bwxs_740(int id,String boss,String jiangli) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.jiangli = jiangli;
    }
}