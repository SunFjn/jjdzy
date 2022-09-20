package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_334_新活动-节日商城折扣表.xlsx
 */
public class Struct_jrsczkb_334 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**当前折扣（显示/100）*/
    private int zk;
    /**初始刷新概率*/
    private int gl;
    /**阈值，满值升级必定成功*/
    private int yz;
    /**升级时失败增加*/
    private int addyz;
    /**成功概率（万分比）*/
    private int cg;
    /**跳级概率*/
    private int[][] tj;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 当前折扣（显示/100）
     */
    public int getZk() {
        return zk;
    }
    /**
     * 初始刷新概率
     */
    public int getGl() {
        return gl;
    }
    /**
     * 阈值，满值升级必定成功
     */
    public int getYz() {
        return yz;
    }
    /**
     * 升级时失败增加
     */
    public int getAddyz() {
        return addyz;
    }
    /**
     * 成功概率（万分比）
     */
    public int getCg() {
        return cg;
    }
    /**
     * 跳级概率
     */
    public int[][] getTj() {
        return tj;
    }
    public Struct_jrsczkb_334(int id,int qs,int zk,int gl,int yz,int addyz,int cg,String tj) {
        this.id = id;
        this.qs = qs;
        this.zk = zk;
        this.gl = gl;
        this.yz = yz;
        this.addyz = addyz;
        this.cg = cg;
        this.tj = ExcelJsonUtils.toObj(tj,int[][].class);
    }
}