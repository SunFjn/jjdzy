package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_232_乱世枭雄跨服表.xlsx
 */
public class Struct_lsxxkf_232 {
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
    public Struct_lsxxkf_232(int id,String zs) {
        this.id = id;
        this.zs = ExcelJsonUtils.toObj(zs,int[][].class);
    }
}