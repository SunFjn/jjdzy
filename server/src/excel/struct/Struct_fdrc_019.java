package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸日常表.xlsx
 */
public class Struct_fdrc_019 {
    /**序号*/
    private int id;
    /**奖励*/
    private int[][] award;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    public Struct_fdrc_019(int id,String award) {
        this.id = id;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
    }
}