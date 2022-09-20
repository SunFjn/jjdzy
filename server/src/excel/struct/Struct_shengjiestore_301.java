package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-301升阶商店表.xlsx
 */
public class Struct_shengjiestore_301 {
    /**id
	 * 1XXX：武将相关商品
	 * 2XXX：宝物相关商品
	 * 3XXX：天书相关商品
	 * 4XXX：神剑相关商品
	 * 5XXX：异宝相关商品
	 * 6XXX：战甲相关商品
	 * 7XXX：兵法相关商品
	 * */
    private int id;
    /**天数*/
    private int day;
    /**位置*/
    private int wz;
    /**商品
	 * Administrator:
	 * 类型，道具id，数量
	 * */
    private int[][] item;
    /**价格
	 * Administrator:
	 * 类型，ID,数量
	 * */
    private int[][] money;
    /**原价*/
    private int[][] oldmoney;
    /**折扣*/
    private int off;
    /**购买次数
	 * Administrator:
	 * 0=无限
	 * */
    private int time;
    /**对应系统升阶等级*/
    private int lv;
    /**
     * id
	 * 1XXX：武将相关商品
	 * 2XXX：宝物相关商品
	 * 3XXX：天书相关商品
	 * 4XXX：神剑相关商品
	 * 5XXX：异宝相关商品
	 * 6XXX：战甲相关商品
	 * 7XXX：兵法相关商品
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 天数
     */
    public int getDay() {
        return day;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 商品
	 * Administrator:
	 * 类型，道具id，数量
	 * 
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 价格
	 * Administrator:
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
     * 折扣
     */
    public int getOff() {
        return off;
    }
    /**
     * 购买次数
	 * Administrator:
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    /**
     * 对应系统升阶等级
     */
    public int getLv() {
        return lv;
    }
    public Struct_shengjiestore_301(int id,int day,int wz,String item,String money,String oldmoney,int off,int time,int lv) {
        this.id = id;
        this.day = day;
        this.wz = wz;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.off = off;
        this.time = time;
        this.lv = lv;
    }
}