package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_332-新活动-三国战令商店表.xlsx
 */
public class Struct_sgzlshop_332 {
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
    /**期数*/
    private int qs;
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
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_sgzlshop_332(int id,int wz,String item,String money,int time,int qs) {
        this.id = id;
        this.wz = wz;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.time = time;
        this.qs = qs;
    }
}