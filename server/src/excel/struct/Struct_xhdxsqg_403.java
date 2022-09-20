package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X-403_新活动限时抢购.xlsx
 */
public class Struct_xhdxsqg_403 {
    /**id*/
    private int ID;
    /**期数
	 * 第x期vip折扣*/
    private int qx;
    /**开始时间
	 * 数字为时间，24小时计算*/
    private int opentime;
    /**现价*/
    private int[][] money;
    /**原价*/
    private int[][] oldmoney;
    /**道具
	 * 道具种类可配置,上限不要写死*/
    private int[][] item;
    /**折扣
	 * 显示/10，例如8显示0.8折*/
    private int off;
    /**个人限购次数
	 * 0=无限
	 * */
    private int time;
    /**总个数
	 * 0=无限
	 * */
    private int max;
    /**
     * id
     */
    public int getID() {
        return ID;
    }
    /**
     * 期数
	 * 第x期vip折扣
     */
    public int getQx() {
        return qx;
    }
    /**
     * 开始时间
	 * 数字为时间，24小时计算
     */
    public int getOpentime() {
        return opentime;
    }
    /**
     * 现价
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
     * 道具
	 * 道具种类可配置,上限不要写死
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 折扣
	 * 显示/10，例如8显示0.8折
     */
    public int getOff() {
        return off;
    }
    /**
     * 个人限购次数
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    /**
     * 总个数
	 * 0=无限
	 * 
     */
    public int getMax() {
        return max;
    }
    public Struct_xhdxsqg_403(int ID,int qx,int opentime,String money,String oldmoney,String item,int off,int time,int max) {
        this.ID = ID;
        this.qx = qx;
        this.opentime = opentime;
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.off = off;
        this.time = time;
        this.max = max;
    }
}