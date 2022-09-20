package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_506_登峰造极决赛刷新表.xlsx
 */
public class Struct_dfzjjs2_261 {
    /**位置id*/
    private int id;
    /**刷新范围*/
    private int[][] fw;
    /**
     * 位置id
     */
    public int getId() {
        return id;
    }
    /**
     * 刷新范围
     */
    public int[][] getFw() {
        return fw;
    }
    public Struct_dfzjjs2_261(int id,String fw) {
        this.id = id;
        this.fw = ExcelJsonUtils.toObj(fw,int[][].class);
    }
}