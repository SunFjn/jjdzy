package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shxlpm_268;
public class Config_shxlpm_268 extends ConfigBase<Struct_shxlpm_268> {
    private static Config_shxlpm_268 ins = null;
    public static Config_shxlpm_268 getIns(){
        if(ins==null){
            ins = new Config_shxlpm_268();
        }
        return ins;
    }
    private Config_shxlpm_268(){
        put(1,new Struct_shxlpm_268(1,"[[1,1]]","[[1,410049,388],[1,410050,40],[1,410019,10]]","[[1,430008,1],[1,410019,100]]"));
        put(2,new Struct_shxlpm_268(2,"[[2,2]]","[[1,410049,388],[1,410050,35]]","[[1,430008,1],[1,410019,80]]"));
        put(3,new Struct_shxlpm_268(3,"[[3,3]]","[[1,410049,288],[1,410050,25]]","[[1,430008,1],[1,410019,40]]"));
        put(4,new Struct_shxlpm_268(4,"[[4,10]]","[[1,410049,288],[1,410050,25],[1,410019,5]]","[[1,430008,1]]"));
        put(5,new Struct_shxlpm_268(5,"[[11,20]]","[[1,410049,188],[1,410050,10],[1,410019,3]]","[[1,410019,20]]"));
    }
    public void reset(){
        ins = null;
    }
}