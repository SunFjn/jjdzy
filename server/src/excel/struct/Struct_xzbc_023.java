package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 血战到底补偿.xlsx
 */
public class Struct_xzbc_023 {
    /**通关数*/
    private int tongguan;
    /**补偿*/
    private int[][] buchang;
    /**
     * 通关数
     */
    public int getTongguan() {
        return tongguan;
    }
    /**
     * 补偿
     */
    public int[][] getBuchang() {
        return buchang;
    }
    public Struct_xzbc_023(int tongguan,String buchang) {
        this.tongguan = tongguan;
        this.buchang = ExcelJsonUtils.toObj(buchang,int[][].class);
    }
}