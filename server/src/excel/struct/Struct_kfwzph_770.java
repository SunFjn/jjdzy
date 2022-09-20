package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_770_跨服王者-排行表.xlsx
 */
public class Struct_kfwzph_770 {
    /**序号*/
    private int id;
    /**转生区间
	 * Windows 用户:
	 * 读区间表的id*/
    private int zs;
    /**排名*/
    private int[][] pm;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 转生区间
	 * Windows 用户:
	 * 读区间表的id
     */
    public int getZs() {
        return zs;
    }
    /**
     * 排名
     */
    public int[][] getPm() {
        return pm;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_kfwzph_770(int id,int zs,String pm,String jl) {
        this.id = id;
        this.zs = zs;
        this.pm = ExcelJsonUtils.toObj(pm,int[][].class);
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}