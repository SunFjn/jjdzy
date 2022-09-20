package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_316_消费转盘消费表.xlsx
 */
public class Struct_xfzpxf_316 {
    /**次数*/
    private int id;
    /**消耗元宝*/
    private int[][] yb;
    /**
     * 次数
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗元宝
     */
    public int[][] getYb() {
        return yb;
    }
    public Struct_xfzpxf_316(int id,String yb) {
        this.id = id;
        this.yb = ExcelJsonUtils.toObj(yb,int[][].class);
    }
}