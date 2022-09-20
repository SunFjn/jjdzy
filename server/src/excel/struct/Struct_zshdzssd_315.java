package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_315_专属活动-专属商店.xlsx
 */
public class Struct_zshdzssd_315 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**位置*/
    private int wz;
    /**道具名*/
    private String name;
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
    /**购买次数
	 * Administrator:
	 * 0=无限
	 * */
    private int time;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 道具名
     */
    public String getName() {
        return name;
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
     * 购买次数
	 * Administrator:
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    public Struct_zshdzssd_315(int id,int qs,int wz,String name,String item,String money,int time) {
        this.id = id;
        this.qs = qs;
        this.wz = wz;
        this.name = name;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.time = time;
    }
}