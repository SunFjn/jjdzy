package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_767跨服试炼-战斗表.xlsx
 */
public class Struct_slzd_767 {
    /**id
	 * 战斗层id*/
    private int id;
    /**普通奖励试炼点*/
    private int ptsld;
    /**普通奖励试炼券*/
    private int[][] ptslq;
    /**困难奖励试炼点*/
    private int knsld;
    /**困难奖励试炼券*/
    private int[][] knslq;
    /**噩梦奖励试炼点*/
    private int emsld;
    /**噩梦奖励试炼券*/
    private int[][] emslq;
    /**普通战力区间
	 * [[a,b]],a,为十万分比
	 * 最后确定的战力区间为
	 * a*基础参数X<对手<b*基础参数X
	 * 
	 * 基础参数读取系统常数表*/
    private int[][] ptqj;
    /**困难战力区间
	 * [[a,b]],a,为十万分比
	 * 最后确定的战力区间为
	 * a*基础参数X<对手<b*基础参数X*/
    private int[][] knqj;
    /**噩梦战力区间*/
    private int[][] emqj;
    /**战斗地图*/
    private int dt;
    /**
     * id
	 * 战斗层id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖励试炼点
     */
    public int getPtsld() {
        return ptsld;
    }
    /**
     * 普通奖励试炼券
     */
    public int[][] getPtslq() {
        return ptslq;
    }
    /**
     * 困难奖励试炼点
     */
    public int getKnsld() {
        return knsld;
    }
    /**
     * 困难奖励试炼券
     */
    public int[][] getKnslq() {
        return knslq;
    }
    /**
     * 噩梦奖励试炼点
     */
    public int getEmsld() {
        return emsld;
    }
    /**
     * 噩梦奖励试炼券
     */
    public int[][] getEmslq() {
        return emslq;
    }
    /**
     * 普通战力区间
	 * [[a,b]],a,为十万分比
	 * 最后确定的战力区间为
	 * a*基础参数X<对手<b*基础参数X
	 * 
	 * 基础参数读取系统常数表
     */
    public int[][] getPtqj() {
        return ptqj;
    }
    /**
     * 困难战力区间
	 * [[a,b]],a,为十万分比
	 * 最后确定的战力区间为
	 * a*基础参数X<对手<b*基础参数X
     */
    public int[][] getKnqj() {
        return knqj;
    }
    /**
     * 噩梦战力区间
     */
    public int[][] getEmqj() {
        return emqj;
    }
    /**
     * 战斗地图
     */
    public int getDt() {
        return dt;
    }
    public Struct_slzd_767(int id,int ptsld,String ptslq,int knsld,String knslq,int emsld,String emslq,String ptqj,String knqj,String emqj,int dt) {
        this.id = id;
        this.ptsld = ptsld;
        this.ptslq = ExcelJsonUtils.toObj(ptslq,int[][].class);
        this.knsld = knsld;
        this.knslq = ExcelJsonUtils.toObj(knslq,int[][].class);
        this.emsld = emsld;
        this.emslq = ExcelJsonUtils.toObj(emslq,int[][].class);
        this.ptqj = ExcelJsonUtils.toObj(ptqj,int[][].class);
        this.knqj = ExcelJsonUtils.toObj(knqj,int[][].class);
        this.emqj = ExcelJsonUtils.toObj(emqj,int[][].class);
        this.dt = dt;
    }
}