package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_502_新活动_超级弹珠商城表.xlsx
 */
public class Struct_cjdzstore_502 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**宝库道具*/
    private int[][] item;
    /**位置
	 * ShuHen LIU:
	 * 1：1等奖奖池
	 * 2：2等奖奖池
	 * 以此类推*/
    private int wz;
    /**消耗*/
    private int[][] consume;
    /**限购数量*/
    private int xg;
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
     * 宝库道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 位置
	 * ShuHen LIU:
	 * 1：1等奖奖池
	 * 2：2等奖奖池
	 * 以此类推
     */
    public int getWz() {
        return wz;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 限购数量
     */
    public int getXg() {
        return xg;
    }
    public Struct_cjdzstore_502(int id,int qs,String item,int wz,String consume,int xg) {
        this.id = id;
        this.qs = qs;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.wz = wz;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.xg = xg;
    }
}