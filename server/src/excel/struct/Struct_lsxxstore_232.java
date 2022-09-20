package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_232_乱世枭雄宝藏表.xlsx
 */
public class Struct_lsxxstore_232 {
    /**商品id*/
    private int id;
    /**商品*/
    private int[][] store;
    /**价格*/
    private int[][] price;
    /**挑战xx次解锁购买（含XX）*/
    private int time;
    /**
     * 商品id
     */
    public int getId() {
        return id;
    }
    /**
     * 商品
     */
    public int[][] getStore() {
        return store;
    }
    /**
     * 价格
     */
    public int[][] getPrice() {
        return price;
    }
    /**
     * 挑战xx次解锁购买（含XX）
     */
    public int getTime() {
        return time;
    }
    public Struct_lsxxstore_232(int id,String store,String price,int time) {
        this.id = id;
        this.store = ExcelJsonUtils.toObj(store,int[][].class);
        this.price = ExcelJsonUtils.toObj(price,int[][].class);
        this.time = time;
    }
}