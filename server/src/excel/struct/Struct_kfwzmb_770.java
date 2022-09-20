package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_770_跨服王者-目标表.xlsx
 */
public class Struct_kfwzmb_770 {
    /**序号*/
    private int id;
    /**胜利场次*/
    private int cs;
    /**转生区间*/
    private int zs;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 胜利场次
     */
    public int getCs() {
        return cs;
    }
    /**
     * 转生区间
     */
    public int getZs() {
        return zs;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_kfwzmb_770(int id,int cs,int zs,String jl) {
        this.id = id;
        this.cs = cs;
        this.zs = zs;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}