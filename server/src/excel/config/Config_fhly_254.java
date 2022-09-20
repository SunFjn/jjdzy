package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fhly_254;
public class Config_fhly_254 extends ConfigBase<Struct_fhly_254> {
    private static Config_fhly_254 ins = null;
    public static Config_fhly_254 getIns(){
        if(ins==null){
            ins = new Config_fhly_254();
        }
        return ins;
    }
    private Config_fhly_254(){
        put(1,new Struct_fhly_254(1,1,0,"[[1,400880,1]]",60,"[[1,400879,1]]",125,10,3));
        put(2,new Struct_fhly_254(2,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
        put(3,new Struct_fhly_254(3,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
        put(4,new Struct_fhly_254(4,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
        put(5,new Struct_fhly_254(5,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
        put(6,new Struct_fhly_254(6,3,1,"[[1,400883,1]]",20,"0",0,10,99));
        put(7,new Struct_fhly_254(7,3,2,"[[1,400883,1]]",20,"0",0,10,99));
        put(8,new Struct_fhly_254(8,3,3,"[[1,400883,1]]",20,"0",0,10,99));
        put(9,new Struct_fhly_254(9,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
        put(10,new Struct_fhly_254(10,2,0,"[[1,400882,1]]",40,"[[1,400881,1]]",80,10,5));
    }
    public void reset(){
        ins = null;
    }
}