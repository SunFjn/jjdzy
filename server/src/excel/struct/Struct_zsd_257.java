package excel.struct;
/**
 * Z_257_直升丹表.xlsx
 */
public class Struct_zsd_257 {
    /**id*/
    private int id;
    /**对应系统*/
    private int day;
    /**直升丹道具*/
    private int item;
    /**XX级以前使用可升阶（不含），前端转换为显示用阶数*/
    private int up;
    /**推荐使用阶数（前端转换为显示用阶数）*/
    private int tj;
    /**开服第X天有引导*/
    private int kf;
    /**跳转界面*/
    private int open;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 对应系统
     */
    public int getDay() {
        return day;
    }
    /**
     * 直升丹道具
     */
    public int getItem() {
        return item;
    }
    /**
     * XX级以前使用可升阶（不含），前端转换为显示用阶数
     */
    public int getUp() {
        return up;
    }
    /**
     * 推荐使用阶数（前端转换为显示用阶数）
     */
    public int getTj() {
        return tj;
    }
    /**
     * 开服第X天有引导
     */
    public int getKf() {
        return kf;
    }
    /**
     * 跳转界面
     */
    public int getOpen() {
        return open;
    }
    public Struct_zsd_257(int id,int day,int item,int up,int tj,int kf,int open) {
        this.id = id;
        this.day = day;
        this.item = item;
        this.up = up;
        this.tj = tj;
        this.kf = kf;
        this.open = open;
    }
}