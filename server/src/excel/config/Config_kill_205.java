package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kill_205;
public class Config_kill_205 extends ConfigBase<Struct_kill_205> {
    private static Config_kill_205 ins = null;
    public static Config_kill_205 getIns(){
        if(ins==null){
            ins = new Config_kill_205();
        }
        return ins;
    }
    private Config_kill_205(){
        put(1,new Struct_kill_205(1,10,"[[6,0,400000],[9,0,30000],[1,400017,1]]",1));
        put(2,new Struct_kill_205(2,50,"[[6,0,400000],[9,0,30000],[1,400017,1]]",1));
        put(3,new Struct_kill_205(3,200,"[[6,0,400000],[9,0,30000],[1,400017,1]]",1));
        put(4,new Struct_kill_205(4,400,"[[6,0,400000],[9,0,30000],[1,400017,1]]",30));
        put(5,new Struct_kill_205(5,600,"[[6,0,400000],[9,0,30000],[1,400017,1]]",50));
        put(6,new Struct_kill_205(6,800,"[[6,0,800000],[9,0,60000],[1,400017,2]]",150));
        put(7,new Struct_kill_205(7,1000,"[[6,0,800000],[9,0,60000],[1,400017,2]]",180));
        put(8,new Struct_kill_205(8,1200,"[[6,0,800000],[9,0,60000],[1,400017,2]]",220));
        put(9,new Struct_kill_205(9,1400,"[[6,0,800000],[9,0,60000],[1,400017,2]]",280));
        put(10,new Struct_kill_205(10,1600,"[[6,0,800000],[9,0,60000],[1,400017,2]]",350));
        put(11,new Struct_kill_205(11,1800,"[[6,0,1200000],[9,0,90000],[1,400017,3]]",450));
        put(12,new Struct_kill_205(12,2000,"[[6,0,1200000],[9,0,90000],[1,400017,3]]",550));
        put(13,new Struct_kill_205(13,2200,"[[6,0,1200000],[9,0,90000],[1,400017,3]]",650));
        put(14,new Struct_kill_205(14,2400,"[[6,0,1200000],[9,0,90000],[1,400017,3]]",750));
        put(15,new Struct_kill_205(15,2600,"[[6,0,1200000],[9,0,90000],[1,400017,3]]",850));
    }
    public void reset(){
        ins = null;
    }
}