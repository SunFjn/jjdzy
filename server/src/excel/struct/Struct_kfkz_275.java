package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_275_跨服矿藏表.xlsx
 */
public class Struct_kfkz_275 {
    /**id*/
    private int id;
    /**品质*/
    private int pz;
    /**每20分钟矿主奖励*/
    private int[][] reward;
    /**每20分钟矿工奖励*/
    private int[][] reward1;
    /**采集时间（秒）*/
    private int time;
    /**初始刷新概率*/
    private int gl;
    /**刷新概率*/
    private int[][] up;
    /**抢夺资源*/
    private int[][] qd;
    /**顺手资源*/
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
     * 每20分钟矿主奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 每20分钟矿工奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 采集时间（秒）
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
     * 抢夺资源
     */
    public int[][] getQd() {
        return qd;
    }
    /**
     * 顺手资源
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
    public Struct_kfkz_275(int id,int pz,String reward,String reward1,int time,int gl,String up,String qd,String ss,int yz,int addyz) {
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