package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * x_336_新活动_刮刮乐表.xlsx
 */
public class Struct_ggl_336 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**实际奖励和预览，预览由上到下最多显示6个
	 * 道具类型，道具id，道具数量，概率，是否广播
	 * 每次抽奖入库的几率（比如奖励A，随机3个A入库的概率）*/
    private int[][] jl;
    /**概率*/
    private int gl;
    /**是否大奖*/
    private int dj;
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
     * 实际奖励和预览，预览由上到下最多显示6个
	 * 道具类型，道具id，道具数量，概率，是否广播
	 * 每次抽奖入库的几率（比如奖励A，随机3个A入库的概率）
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 概率
     */
    public int getGl() {
        return gl;
    }
    /**
     * 是否大奖
     */
    public int getDj() {
        return dj;
    }
    public Struct_ggl_336(int id,int qs,String jl,int gl,int dj) {
        this.id = id;
        this.qs = qs;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.gl = gl;
        this.dj = dj;
    }
}