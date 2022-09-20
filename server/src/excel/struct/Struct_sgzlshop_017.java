package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_017-三国战令商店表.xlsx
 */
public class Struct_sgzlshop_017 {
    /**索引id*/
    private int id;
    /**位置*/
    private int wz;
    /**道具
	 * 类型，道具id，数量
	 * */
    private int[][] item;
    /**价格
	 * 类型，ID,数量
	 * */
    private int[][] money;
    /**购买次数
	 * 0=无限
	 * */
    private int time;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 道具
	 * 类型，道具id，数量
	 * 
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 价格
	 * 类型，ID,数量
	 * 
     */
    public int[][] getMoney() {
        return money;
    }
    /**
     * 购买次数
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    public Struct_sgzlshop_017(int id,int wz,String item,String money,int time) {
        this.id = id;
        this.wz = wz;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.time = time;
    }
}