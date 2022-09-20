package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_767跨服试炼-宝箱表.xlsx
 */
public class Struct_slbx_767 {
    /**id
	 * 宝箱层id*/
    private int id;
    /**宝箱奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
	 * 
	 * []为一组，支持多组配置，即一次可开出多样奖励*/
    private String jl;
    /**开启消耗
	 * */
    private int[][] xh;
    /**次数上限*/
    private int sx;
    /**
     * id
	 * 宝箱层id
     */
    public int getId() {
        return id;
    }
    /**
     * 宝箱奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
	 * 
	 * []为一组，支持多组配置，即一次可开出多样奖励
     */
    public String getJl() {
        return jl;
    }
    /**
     * 开启消耗
	 * 
     */
    public int[][] getXh() {
        return xh;
    }
    /**
     * 次数上限
     */
    public int getSx() {
        return sx;
    }
    public Struct_slbx_767(int id,String jl,String xh,int sx) {
        this.id = id;
        this.jl = jl;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
        this.sx = sx;
    }
}