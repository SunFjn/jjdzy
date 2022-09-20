package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_expup_200;
public class Config_expup_200 extends ConfigBase<Struct_expup_200> {
    private static Config_expup_200 ins = null;
    public static Config_expup_200 getIns(){
        if(ins==null){
            ins = new Config_expup_200();
        }
        return ins;
    }
    private Config_expup_200(){
        put(1,new Struct_expup_200(1,1,34,20));
        put(2,new Struct_expup_200(2,1,35,20));
        put(3,new Struct_expup_200(3,1,36,20));
        put(4,new Struct_expup_200(4,1,37,10));
        put(5,new Struct_expup_200(5,1,38,10));
        put(6,new Struct_expup_200(6,1,39,10));
        put(7,new Struct_expup_200(7,1,40,10));
        put(8,new Struct_expup_200(8,1,41,10));
        put(9,new Struct_expup_200(9,1,42,10));
        put(10,new Struct_expup_200(10,1,43,5));
        put(11,new Struct_expup_200(11,2,1,10));
        put(12,new Struct_expup_200(12,2,2,20));
        put(13,new Struct_expup_200(13,2,3,40));
    }
    public void reset(){
        ins = null;
    }
}