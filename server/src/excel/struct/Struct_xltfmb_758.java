package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_758_修炼天赋目标奖.xlsx
 */
public class Struct_xltfmb_758 {
    /**id*/
    private int id;
    /**抽奖次数*/
    private int cs;
    /**奖励
	 * 道具类型，道具id，道具数量，*/
    private int[][] jl;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 抽奖次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
	 * 道具类型，道具id，道具数量，
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_xltfmb_758(int id,int cs,String jl) {
        this.id = id;
        this.cs = cs;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}