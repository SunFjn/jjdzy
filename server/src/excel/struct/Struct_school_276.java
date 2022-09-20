package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_276_少主学堂表.xlsx
 */
public class Struct_school_276 {
    /**id*/
    private int id;
    /**品质*/
    private int pz;
    /**每20分钟队长奖励*/
    private int[][] reward;
    /**每20分钟陪读奖励*/
    private int[][] reward1;
    /**学习时间（秒）*/
    private int time;
    /**初始刷新概率*/
    private int gl;
    /**刷新概率*/
    private int[][] up;
    /**捣乱资源*/
    private int[][] qd;
    /**骚扰资源*/
    private int[][] ss;
    /**阈值，满值升级必定成功*/
    private int yz;
    /**升级时失败增加*/
    private int addyz;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 每20分钟队长奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 每20分钟陪读奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 学习时间（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 初始刷新概率
     */
    public int getGl() {
        return gl;
    }
    /**
     * 刷新概率
     */
    public int[][] getUp() {
        return up;
    }
    /**
     * 捣乱资源
     */
    public int[][] getQd() {
        return qd;
    }
    /**
     * 骚扰资源
     */
    public int[][] getSs() {
        return ss;
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
    public Struct_school_276(int id,int pz,String reward,String reward1,int time,int gl,String up,String qd,String ss,int yz,int addyz) {
        this.id = id;
        this.pz = pz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.time = time;
        this.gl = gl;
        this.up = ExcelJsonUtils.toObj(up,int[][].class);
        this.qd = ExcelJsonUtils.toObj(qd,int[][].class);
        this.ss = ExcelJsonUtils.toObj(ss,int[][].class);
        this.yz = yz;
        this.addyz = addyz;
    }
}