package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图神符兑换.xlsx
 */
public class Struct_bztsf_261 {
    /**id*/
    private int id;
    /**兑换神符id*/
    private int sf;
    /**消耗*/
    private int[][] consume;
    /**兑换上限*/
    private int shangxian;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 兑换神符id
     */
    public int getSf() {
        return sf;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 兑换上限
     */
    public int getShangxian() {
        return shangxian;
    }
    public Struct_bztsf_261(int id,int sf,String consume,int shangxian) {
        this.id = id;
        this.sf = sf;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.shangxian = shangxian;
    }
}