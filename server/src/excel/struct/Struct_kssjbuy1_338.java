package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_338_犒赏三军购买表.xlsx
 */
public class Struct_kssjbuy1_338 {
    /**key
	 * 期数*100+购买次数*/
    private int key;
    /**购买次数*/
    private int id;
    /**购买消耗*/
    private int[][] consume;
    /**期数*/
    private int qs;
    /**
     * key
	 * 期数*100+购买次数
     */
    public int getKey() {
        return key;
    }
    /**
     * 购买次数
     */
    public int getId() {
        return id;
    }
    /**
     * 购买消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_kssjbuy1_338(int key,int id,String consume,int qs) {
        this.key = key;
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.qs = qs;
    }
}