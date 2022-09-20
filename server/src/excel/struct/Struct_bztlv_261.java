package excel.struct;
/**
 * B_261_八阵图升级表.xlsx
 */
public class Struct_bztlv_261 {
    /**阵符等级*/
    private int id;
    /**绿品升级所需数量
	 * 写死id 410044
	 * 后同*/
    private int exp2;
    /**蓝品升级所需经验*/
    private int exp3;
    /**紫品升级所需经验*/
    private int exp4;
    /**橙品升级所需经验*/
    private int exp5;
    /**红品升级所需经验*/
    private int exp6;
    /**神品升级所需经验*/
    private int exp8;
    /**绿品分解数量*/
    private int fj2;
    /**蓝品分解数量*/
    private int fj3;
    /**紫品分解数量*/
    private int fj4;
    /**橙品分解数量*/
    private int fj5;
    /**红品分解数量*/
    private int fj6;
    /**神品分解数量*/
    private int fj8;
    /**
     * 阵符等级
     */
    public int getId() {
        return id;
    }
    /**
     * 绿品升级所需数量
	 * 写死id 410044
	 * 后同
     */
    public int getExp2() {
        return exp2;
    }
    /**
     * 蓝品升级所需经验
     */
    public int getExp3() {
        return exp3;
    }
    /**
     * 紫品升级所需经验
     */
    public int getExp4() {
        return exp4;
    }
    /**
     * 橙品升级所需经验
     */
    public int getExp5() {
        return exp5;
    }
    /**
     * 红品升级所需经验
     */
    public int getExp6() {
        return exp6;
    }
    /**
     * 神品升级所需经验
     */
    public int getExp8() {
        return exp8;
    }
    /**
     * 绿品分解数量
     */
    public int getFj2() {
        return fj2;
    }
    /**
     * 蓝品分解数量
     */
    public int getFj3() {
        return fj3;
    }
    /**
     * 紫品分解数量
     */
    public int getFj4() {
        return fj4;
    }
    /**
     * 橙品分解数量
     */
    public int getFj5() {
        return fj5;
    }
    /**
     * 红品分解数量
     */
    public int getFj6() {
        return fj6;
    }
    /**
     * 神品分解数量
     */
    public int getFj8() {
        return fj8;
    }
    public Struct_bztlv_261(int id,int exp2,int exp3,int exp4,int exp5,int exp6,int exp8,int fj2,int fj3,int fj4,int fj5,int fj6,int fj8) {
        this.id = id;
        this.exp2 = exp2;
        this.exp3 = exp3;
        this.exp4 = exp4;
        this.exp5 = exp5;
        this.exp6 = exp6;
        this.exp8 = exp8;
        this.fj2 = fj2;
        this.fj3 = fj3;
        this.fj4 = fj4;
        this.fj5 = fj5;
        this.fj6 = fj6;
        this.fj8 = fj8;
    }
}