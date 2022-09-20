package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_770_跨服王者-区间表.xlsx
 */
public class Struct_kfwzqj_770 {
    /**id*/
    private int id;
    /**转生区间*/
    private int[][] zs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 转生区间
     */
    public int[][] getZs() {
        return zs;
    }
    public Struct_kfwzqj_770(int id,String zs) {
        this.id = id;
        this.zs = ExcelJsonUtils.toObj(zs,int[][].class);
    }
}