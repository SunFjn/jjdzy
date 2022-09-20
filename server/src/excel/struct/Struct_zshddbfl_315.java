package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_315_专属活动-单笔返利表.xlsx
 */
public class Struct_zshddbfl_315 {
    /**序号
	 * 1XXX：第1期
	 * 2XXX：第2期
	 * */
    private int xh;
    /**期数*/
    private int qs;
    /**金额
	 * jjjjyyy:
	 * RMB*/
    private int je;
    /**奖励
	 * [A,B,C]
	 * A=类型，1道具，4元宝
	 * B=道具ID，0是元宝，其他读【道具表】
	 * C=数量
	 * */
    private int[][] jl;
    /**领取次数*/
    private int cs;
    /**
     * 序号
	 * 1XXX：第1期
	 * 2XXX：第2期
	 * 
     */
    public int getXh() {
        return xh;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 金额
	 * jjjjyyy:
	 * RMB
     */
    public int getJe() {
        return je;
    }
    /**
     * 奖励
	 * [A,B,C]
	 * A=类型，1道具，4元宝
	 * B=道具ID，0是元宝，其他读【道具表】
	 * C=数量
	 * 
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
    public Struct_zshddbfl_315(int xh,int qs,int je,String jl,int cs) {
        this.xh = xh;
        this.qs = qs;
        this.je = je;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.cs = cs;
    }
}