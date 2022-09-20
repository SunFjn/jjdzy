package excel.struct;
/**
 * Y_018-异兽送礼激活表.xlsx
 */
public class Struct_yssljh_018 {
    /**编号*/
    private int bianhao;
    /**送礼类型
	 * 1.异兽激活礼
	 * 2.异兽进阶礼
	 * 3.异兽战力礼
	 * 4.异兽抽奖礼
	 * */
    private int dengji;
    /**期数*/
    private int qishu;
    /**目标RMB*/
    private int rmb;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 送礼类型
	 * 1.异兽激活礼
	 * 2.异兽进阶礼
	 * 3.异兽战力礼
	 * 4.异兽抽奖礼
	 * 
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 目标RMB
     */
    public int getRmb() {
        return rmb;
    }
    public Struct_yssljh_018(int bianhao,int dengji,int qishu,int rmb) {
        this.bianhao = bianhao;
        this.dengji = dengji;
        this.qishu = qishu;
        this.rmb = rmb;
    }
}