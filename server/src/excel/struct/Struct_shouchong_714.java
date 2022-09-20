package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_714_首充.xlsx
 */
public class Struct_shouchong_714 {
    /**序号*/
    private int ID;
    /**奖励*/
    private int[][] AWARD;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    public Struct_shouchong_714(int ID,String AWARD) {
        this.ID = ID;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
    }
}