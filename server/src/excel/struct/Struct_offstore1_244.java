package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_244_折扣商店1表.xlsx
 */
public class Struct_offstore1_244 {
    /**id*/
    private int id;
    /**天数*/
    private int day;
    /**位置*/
    private int wz;
    /**道具
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
    /**vip条件*/
    private int vip;
    /**
     * id
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
     * 道具
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
     * vip条件
     */
    public int getVip() {
        return vip;
    }
    public Struct_offstore1_244(int id,int day,int wz,String item,String money,String oldmoney,int off,int time,int vip) {
        this.id = id;
        this.day = day;
        this.wz = wz;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.off = off;
        this.time = time;
        this.vip = vip;
    }
}