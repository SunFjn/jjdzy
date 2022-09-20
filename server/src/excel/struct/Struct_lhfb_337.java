package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_337_轮回副本表.xlsx
 */
public class Struct_lhfb_337 {
    /**id
	 * X001
	 * X=X世轮回副本
	 * */
    private int id;
    /**星数*/
    private int xs;
    /**实际掉落
	 * 格式规则同d*/
    private String diaoluo;
    /**初始星数概率*/
    private int cs;
    /**刷新奖励概率
	 * [A,B]
	 * A=品质
	 * B=概率*/
    private int[][] up;
    /**升星刷新阈值*/
    private int yz;
    /**阈值增加*/
    private int addyz;
    /**boss*/
    private int boss;
    /**
     * id
	 * X001
	 * X=X世轮回副本
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 星数
     */
    public int getXs() {
        return xs;
    }
    /**
     * 实际掉落
	 * 格式规则同d
     */
    public String getDiaoluo() {
        return diaoluo;
    }
    /**
     * 初始星数概率
     */
    public int getCs() {
        return cs;
    }
    /**
     * 刷新奖励概率
	 * [A,B]
	 * A=品质
	 * B=概率
     */
    public int[][] getUp() {
        return up;
    }
    /**
     * 升星刷新阈值
     */
    public int getYz() {
        return yz;
    }
    /**
     * 阈值增加
     */
    public int getAddyz() {
        return addyz;
    }
    /**
     * boss
     */
    public int getBoss() {
        return boss;
    }
    public Struct_lhfb_337(int id,int xs,String diaoluo,int cs,String up,int yz,int addyz,int boss) {
        this.id = id;
        this.xs = xs;
        this.diaoluo = diaoluo;
        this.cs = cs;
        this.up = ExcelJsonUtils.toObj(up,int[][].class);
        this.yz = yz;
        this.addyz = addyz;
        this.boss = boss;
    }
}