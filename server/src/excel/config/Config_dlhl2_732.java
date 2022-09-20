package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dlhl2_732;
public class Config_dlhl2_732 extends ConfigBase<Struct_dlhl2_732> {
    private static Config_dlhl2_732 ins = null;
    public static Config_dlhl2_732 getIns(){
        if(ins==null){
            ins = new Config_dlhl2_732();
        }
        return ins;
    }
    private Config_dlhl2_732(){
        put(1,new Struct_dlhl2_732(1,1,1,"[[4,0,1488]]",8001));
        put(2,new Struct_dlhl2_732(2,1,2,"[[4,0,1488],[1,411001,5]]",8002));
        put(3,new Struct_dlhl2_732(3,1,3,"[[4,0,4488],[1,411001,10],[1,411001,10]]",8003));
        put(4,new Struct_dlhl2_732(4,1,4,"[[4,0,2488],[1,411001,10]]",8004));
        put(5,new Struct_dlhl2_732(5,2,1,"[[4,0,1488]]",8005));
        put(6,new Struct_dlhl2_732(6,2,2,"[[4,0,1488],[1,411002,5]]",8006));
        put(7,new Struct_dlhl2_732(7,2,3,"[[4,0,4488],[1,411002,10],[1,411002,10]]",8007));
        put(8,new Struct_dlhl2_732(8,2,4,"[[4,0,2488],[1,411002,10]]",8008));
        put(9,new Struct_dlhl2_732(9,3,1,"[[4,0,1488]]",8009));
        put(10,new Struct_dlhl2_732(10,3,2,"[[4,0,1488],[1,411003,5]]",8010));
        put(11,new Struct_dlhl2_732(11,3,3,"[[4,0,4488],[1,411003,10],[1,411003,10]]",8011));
        put(12,new Struct_dlhl2_732(12,3,4,"[[4,0,2488],[1,411003,10]]",8012));
        put(13,new Struct_dlhl2_732(13,4,1,"[[4,0,1488]]",8013));
        put(14,new Struct_dlhl2_732(14,4,2,"[[4,0,1488],[1,411008,5]]",8014));
        put(15,new Struct_dlhl2_732(15,4,3,"[[4,0,4488],[1,411008,10],[1,411008,10]]",8015));
        put(16,new Struct_dlhl2_732(16,4,4,"[[4,0,2488],[1,411008,10]]",8016));
        put(17,new Struct_dlhl2_732(17,5,1,"[[4,0,1488]]",8017));
        put(18,new Struct_dlhl2_732(18,5,2,"[[4,0,1488],[1,411007,5]]",8018));
        put(19,new Struct_dlhl2_732(19,5,3,"[[4,0,4488],[1,411007,10],[1,411007,10]]",8019));
        put(20,new Struct_dlhl2_732(20,5,4,"[[4,0,2488],[1,411007,10]]",8020));
        put(21,new Struct_dlhl2_732(21,6,1,"[[4,0,1488]]",8021));
        put(22,new Struct_dlhl2_732(22,6,2,"[[4,0,1488],[1,411005,5]]",8022));
        put(23,new Struct_dlhl2_732(23,6,3,"[[4,0,4488],[1,411005,10],[1,411005,10]]",8023));
        put(24,new Struct_dlhl2_732(24,6,4,"[[4,0,2488],[1,411005,10]]",8024));
        put(25,new Struct_dlhl2_732(25,7,1,"[[4,0,1488]]",8025));
        put(26,new Struct_dlhl2_732(26,7,2,"[[4,0,1488],[1,411004,5]]",8026));
        put(27,new Struct_dlhl2_732(27,7,3,"[[4,0,4488],[1,411004,10],[1,411004,10]]",8027));
        put(28,new Struct_dlhl2_732(28,7,4,"[[4,0,2488],[1,411004,10]]",8028));
    }
    public void reset(){
        ins = null;
    }
}