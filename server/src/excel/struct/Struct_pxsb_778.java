package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_778_新活动-貔貅散宝.xlsx
 */
public class Struct_pxsb_778 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**大奖对应*/
    private int dy;
    /**消费
	 * 单位：元宝*/
    private int xf;
    /**天数
	 * 累计消费的天数*/
    private int ts;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
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
     * 大奖对应
     */
    public int getDy() {
        return dy;
    }
    /**
     * 消费
	 * 单位：元宝
     */
    public int getXf() {
        return xf;
    }
    /**
     * 天数
	 * 累计消费的天数
     */
    public int getTs() {
        return ts;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_pxsb_778(int id,int qs,int dy,int xf,int ts,String jl) {
        this.id = id;
        this.qs = qs;
        this.dy = dy;
        this.xf = xf;
        this.ts = ts;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}