package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ssshzpcz_268;
public class Config_ssshzpcz_268 extends ConfigBase<Struct_ssshzpcz_268> {
    private static Config_ssshzpcz_268 ins = null;
    public static Config_ssshzpcz_268 getIns(){
        if(ins==null){
            ins = new Config_ssshzpcz_268();
        }
        return ins;
    }
    private Config_ssshzpcz_268(){
        put(1,new Struct_ssshzpcz_268(1,30,"[[1,440015,1]]",1));
        put(2,new Struct_ssshzpcz_268(2,100,"[[1,410058,288]]",0));
        put(3,new Struct_ssshzpcz_268(3,500,"[[1,400911,1]]",1));
        put(4,new Struct_ssshzpcz_268(4,1000,"[[1,410051,188]]",0));
        put(5,new Struct_ssshzpcz_268(5,3500,"[[1,433012,1]]",1));
        put(6,new Struct_ssshzpcz_268(6,6000,"[[1,410053,30]]",0));
        put(7,new Struct_ssshzpcz_268(7,10000,"[[1,432004,1]]",1));
        put(8,new Struct_ssshzpcz_268(8,15000,"[[1,400911,1]]",1));
    }
    public void reset(){
        ins = null;
    }
}