package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_506_登峰造极海选次数表.xlsx
 */
public class Struct_dfzjhx3_261 {
    /**id*/
    private int id;
    /**消耗*/
    private int[][] consume;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_dfzjhx3_261(int id,String consume) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}