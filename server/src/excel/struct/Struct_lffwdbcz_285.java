package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_285_龙飞凤舞_单笔充值表.xlsx
 */
public class Struct_lffwdbcz_285 {
    /**序号*/
    private int xh;
    /**天数*/
    private int xq;
    /**期数*/
    private int qs;
    /**金额
	 * jingyu:
	 * RMB*/
    private int je;
    /**奖励*/
    private int[][] jl;
    /**领取次数*/
    private int cs;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 天数
     */
    public int getXq() {
        return xq;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 金额
	 * jingyu:
	 * RMB
     */
    public int getJe() {
        return je;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 领取次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_lffwdbcz_285(int xh,int xq,int qs,int je,String jl,int cs,int jiankong) {
        this.xh = xh;
        this.xq = xq;
        this.qs = qs;
        this.je = je;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.cs = cs;
        this.jiankong = jiankong;
    }
}