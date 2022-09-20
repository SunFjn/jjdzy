package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_750_专属神兵-打造目标表.xlsx
 */
public class Struct_sbdzmb_750 {
    /**id*/
    private int id;
    /**打造次数*/
    private int cishu;
    /**必中奖励
	 * Windows 用户:
	 * [[类型，道具id，道具数量]]*/
    private int[][] jiangli;
    /**期数*/
    private int qs;
    /**下一期*/
    private int xq;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 打造次数
     */
    public int getCishu() {
        return cishu;
    }
    /**
     * 必中奖励
	 * Windows 用户:
	 * [[类型，道具id，道具数量]]
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 下一期
     */
    public int getXq() {
        return xq;
    }
    public Struct_sbdzmb_750(int id,int cishu,String jiangli,int qs,int xq) {
        this.id = id;
        this.cishu = cishu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.qs = qs;
        this.xq = xq;
    }
}