package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_269_快速购买.xlsx
 */
public class Struct_buy_269 {
    /**id*/
    private int id;
    /**购买商品*/
    private int[][] store;
    /**消耗*/
    private int[][] conmuse;
    /**每日购买上限*/
    private int max;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 购买商品
     */
    public int[][] getStore() {
        return store;
    }
    /**
     * 消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 每日购买上限
     */
    public int getMax() {
        return max;
    }
    public Struct_buy_269(int id,String store,String conmuse,int max) {
        this.id = id;
        this.store = ExcelJsonUtils.toObj(store,int[][].class);
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.max = max;
    }
}