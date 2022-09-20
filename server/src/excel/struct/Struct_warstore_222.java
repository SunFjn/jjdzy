package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_222_三国战神宝藏表.xlsx
 */
public class Struct_warstore_222 {
    /**商品id*/
    private int id;
    /**商品*/
    private int[][] store;
    /**价格*/
    private int[][] price;
    /**排名前XX解锁（含XX）*/
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
     * 排名前XX解锁（含XX）
     */
    public int getTime() {
        return time;
    }
    public Struct_warstore_222(int id,String store,String price,int time) {
        this.id = id;
        this.store = ExcelJsonUtils.toObj(store,int[][].class);
        this.price = ExcelJsonUtils.toObj(price,int[][].class);
        this.time = time;
    }
}