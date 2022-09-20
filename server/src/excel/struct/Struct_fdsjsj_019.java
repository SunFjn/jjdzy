package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸随机事件.xlsx
 */
public class Struct_fdsjsj_019 {
    /**事件ID*/
    private int sjid;
    /**关联装饰
	 * 强盗入侵为NPC  ID，
	 * 其他为装饰类型*/
    private int guanlian;
    /**事件冷却
	 * 单位：秒
	 * 时间为区间范围*/
    private int[][] lengque;
    /**奖励*/
    private int[][] jiangli;
    /**
     * 事件ID
     */
    public int getSjid() {
        return sjid;
    }
    /**
     * 关联装饰
	 * 强盗入侵为NPC  ID，
	 * 其他为装饰类型
     */
    public int getGuanlian() {
        return guanlian;
    }
    /**
     * 事件冷却
	 * 单位：秒
	 * 时间为区间范围
     */
    public int[][] getLengque() {
        return lengque;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    public Struct_fdsjsj_019(int sjid,int guanlian,String lengque,String jiangli) {
        this.sjid = sjid;
        this.guanlian = guanlian;
        this.lengque = ExcelJsonUtils.toObj(lengque,int[][].class);
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
    }
}