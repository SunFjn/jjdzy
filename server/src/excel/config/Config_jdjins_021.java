package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jdjins_021;
public class Config_jdjins_021 extends ConfigBase<Struct_jdjins_021> {
    private static Config_jdjins_021 ins = null;
    public static Config_jdjins_021 getIns(){
        if(ins==null){
            ins = new Config_jdjins_021();
        }
        return ins;
    }
    private Config_jdjins_021(){
        put(1,new Struct_jdjins_021(1,2,601001,0,"[[102,0],[104,0],[103,0]]",0,"[[1,416087,2]]","[[20001]]"));
        put(2,new Struct_jdjins_021(2,3,601002,0,"[[102,320000],[104,8000],[103,16000]]",200000,"[[1,416087,8]]","[[20002]]"));
        put(3,new Struct_jdjins_021(3,4,601003,0,"[[102,1600000],[104,40000],[103,80000]]",1000000,"[[1,416087,20]]","[[20003]]"));
        put(4,new Struct_jdjins_021(4,5,600001,0,"[[102,4800000],[104,120000],[103,240000]]",3000000,"[[1,416087,30]]","[[20003],[21001]]"));
        put(5,new Struct_jdjins_021(5,6,600002,0,"[[102,9600000],[104,240000],[103,480000]]",6000000,"[[1,416087,40]]","[[20003],[21002]]"));
        put(6,new Struct_jdjins_021(6,0,600003,0,"[[102,16000000],[104,400000],[103,800000]]",10000000,"[[1,416087,0]]","[[20003],[21003]]"));
    }
    public void reset(){
        ins = null;
    }
}