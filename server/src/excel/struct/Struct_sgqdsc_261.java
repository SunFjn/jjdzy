package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-庆典商城表.xlsx
 */
public class Struct_sgqdsc_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**道具
	 * 类型，道具id，数量
	 * */
    private int[][] item;
    /**价格
	 * 类型，ID,数量
	 * */
    private int[][] money;
    /**原价*/
    private int[][] oldmoney;
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
     * 活动期数
     */
    public int getQs() {
        return qs;
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
     * 原价
     */
    public int[][] getOldmoney() {
        return oldmoney;
    }
    /**
     * 购买次数
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    public Struct_sgqdsc_261(int id,int qs,String item,String money,String oldmoney,int time) {
        this.id = id;
        this.qs = qs;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.time = time;
    }
}