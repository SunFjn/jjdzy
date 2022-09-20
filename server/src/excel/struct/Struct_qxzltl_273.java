package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_273_群雄逐鹿体力购买表.xlsx
 */
public class Struct_qxzltl_273 {
    /**购买次数*/
    private int id;
    /**消耗*/
    private int[][] conmuse;
    /**购买数量*/
    private int tl;
    /**
     * 购买次数
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 购买数量
     */
    public int getTl() {
        return tl;
    }
    public Struct_qxzltl_273(int id,String conmuse,int tl) {
        this.id = id;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.tl = tl;
    }
}