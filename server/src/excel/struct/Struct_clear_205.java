package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_关卡扫荡表.xlsx
 */
public class Struct_clear_205 {
    /**编号*/
    private int bh;
    /**消耗*/
    private int[][] xh;
    /**
     * 编号
     */
    public int getBh() {
        return bh;
    }
    /**
     * 消耗
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_clear_205(int bh,String xh) {
        this.bh = bh;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}