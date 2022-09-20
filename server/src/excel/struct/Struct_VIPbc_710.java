package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * V_710_VIP补偿表.xlsx
 */
public class Struct_VIPbc_710 {
    /**VIP等级*/
    private int level;
    /**补偿奖励*/
    private int[][] bc;
    /**
     * VIP等级
     */
    public int getLevel() {
        return level;
    }
    /**
     * 补偿奖励
     */
    public int[][] getBc() {
        return bc;
    }
    public Struct_VIPbc_710(int level,String bc) {
        this.level = level;
        this.bc = ExcelJsonUtils.toObj(bc,int[][].class);
    }
}