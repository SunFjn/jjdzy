package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_010_BOSS战场商店.xlsx
 */
public class Struct_bosslist_010 {
    /**索引id*/
    private int id;
    /**位置
	 * 神秘商店的位置（共8个格子）
	 * 1=上面4个格子
	 * 2=下面4个格子
	 * 
	 * 功勋商店的位置（共8个格子）
	 * 固定8个商品，按1-8的id从左往右从上至下依次排列
	 * 
	 * VIP商店的位置（共16个格子）
	 * 固定16个商品，按1-16的id从左往右从上至下依次排列*/
    private int wz;
    /**道具名*/
    private String name;
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
	 * 神秘商店的位置（共8个格子）
	 * 1=上面4个格子
	 * 2=下面4个格子
	 * 
	 * 功勋商店的位置（共8个格子）
	 * 固定8个商品，按1-8的id从左往右从上至下依次排列
	 * 
	 * VIP商店的位置（共16个格子）
	 * 固定16个商品，按1-16的id从左往右从上至下依次排列
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
    public Struct_bosslist_010(int id,int wz,String name,String item,String money,int time) {
        this.id = id;
        this.wz = wz;
        this.name = name;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.time = time;
    }
}