package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jdskill_021;
public class Config_jdskill_021 extends ConfigBase<Struct_jdskill_021> {
    private static Config_jdskill_021 ins = null;
    public static Config_jdskill_021 getIns(){
        if(ins==null){
            ins = new Config_jdskill_021();
        }
        return ins;
    }
    private Config_jdskill_021(){
        put(20001,new Struct_jdskill_021("20001",80000,10000));
        put(20002,new Struct_jdskill_021("20002",90000,30000));
        put(20003,new Struct_jdskill_021("20003",100000,50000));
        put(21001,new Struct_jdskill_021("21001",10000,0));
        put(21002,new Struct_jdskill_021("21002",25000,0));
        put(21003,new Struct_jdskill_021("21003",40000,0));
    }
    public void reset(){
        ins = null;
    }
}