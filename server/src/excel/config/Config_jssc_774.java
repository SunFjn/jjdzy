package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jssc_774;
public class Config_jssc_774 extends ConfigBase<Struct_jssc_774> {
    private static Config_jssc_774 ins = null;
    public static Config_jssc_774 getIns(){
        if(ins==null){
            ins = new Config_jssc_774();
        }
        return ins;
    }
    private Config_jssc_774(){
        put(1,new Struct_jssc_774(1,0,"[[4,0,2500]]",10000,15000));
        put(2,new Struct_jssc_774(2,6,"[[4,0,5000]]",20000,30000));
        put(3,new Struct_jssc_774(3,30,"[[4,0,25000]]",75000,125000));
        put(4,new Struct_jssc_774(4,98,"[[4,0,50000]]",150000,250000));
        put(5,new Struct_jssc_774(5,188,"[[4,0,150000]]",300000,450000));
        put(6,new Struct_jssc_774(6,328,"[[4,0,150000]]",300000,450000));
        put(7,new Struct_jssc_774(7,648,"[[4,0,250000]]",500000,750000));
        put(8,new Struct_jssc_774(8,998,"[[4,0,250000]]",500000,750000));
        put(9,new Struct_jssc_774(9,1688,"[[4,0,500000]]",1000000,1400000));
        put(10,new Struct_jssc_774(10,2888,"[[4,0,500000]]",1000000,1400000));
        put(11,new Struct_jssc_774(11,3888,"[[4,0,750000]]",1500000,1875000));
        put(12,new Struct_jssc_774(12,4888,"[[4,0,750000]]",1500000,1875000));
        put(13,new Struct_jssc_774(13,5888,"[[4,0,750000]]",1500000,1875000));
        put(14,new Struct_jssc_774(14,6888,"[[4,0,1000000]]",2000000,2500000));
        put(15,new Struct_jssc_774(15,7888,"[[4,0,1000000]]",2000000,2500000));
        put(16,new Struct_jssc_774(16,8888,"[[4,0,1000000]]",1800000,2200000));
        put(17,new Struct_jssc_774(17,9888,"[[4,0,1500000]]",2400000,2700000));
        put(18,new Struct_jssc_774(18,10888,"[[4,0,1500000]]",2400000,2700000));
        put(19,new Struct_jssc_774(19,11888,"[[4,0,2000000]]",3000000,3200000));
        put(20,new Struct_jssc_774(20,12888,"[[4,0,2000000]]",3000000,3200000));
    }
    public void reset(){
        ins = null;
    }
}