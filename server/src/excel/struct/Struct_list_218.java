package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_218_商城道具表.xlsx
 */
public class Struct_list_218 {
    /**索引id*/
    private int id;
    /**道具归类
	 * Administrator:
	 * 1=神秘商店
	 * 2=功勋商店
	 * 3=VIP商店*/
    private int store;
    /**玩家转生刷新范围
	 * jingyu:
	 * 转生id*/
    private int[][] sz;
    /**位置
	 * jingyu:
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
    /**购买条件
	 * Administrator:
	 * 0=无条件
	 * [A,B]
	 * A=类型
	 *   1：VIP等级
	 * B=参数*/
    private int[][] condition;
    /**刷新概率（十万分比）*/
    private int pro;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 道具归类
	 * Administrator:
	 * 1=神秘商店
	 * 2=功勋商店
	 * 3=VIP商店
     */
    public int getStore() {
        return store;
    }
    /**
     * 玩家转生刷新范围
	 * jingyu:
	 * 转生id
     */
    public int[][] getSz() {
        return sz;
    }
    /**
     * 位置
	 * jingyu:
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
     * 购买条件
	 * Administrator:
	 * 0=无条件
	 * [A,B]
	 * A=类型
	 *   1：VIP等级
	 * B=参数
     */
    public int[][] getCondition() {
        return condition;
    }
    /**
     * 刷新概率（十万分比）
     */
    public int getPro() {
        return pro;
    }
    public Struct_list_218(int id,int store,String sz,int wz,String name,String item,String money,String oldmoney,int off,int time,String condition,int pro) {
        this.id = id;
        this.store = store;
        this.sz = ExcelJsonUtils.toObj(sz,int[][].class);
        this.wz = wz;
        this.name = name;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.off = off;
        this.time = time;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
        this.pro = pro;
    }
}