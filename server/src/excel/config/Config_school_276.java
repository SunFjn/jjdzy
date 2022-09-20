package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_school_276;
public class Config_school_276 extends ConfigBase<Struct_school_276> {
    private static Config_school_276 ins = null;
    public static Config_school_276 getIns(){
        if(ins==null){
            ins = new Config_school_276();
        }
        return ins;
    }
    private Config_school_276(){
        put(1,new Struct_school_276(1,2,"[[4,0,50],[1,400941,3]]","[[4,0,25],[1,400941,2]]",14400,50000,"[[1,0],[2,100000],[3,0],[4,0],[5,0]]","[[4,0,75],[1,400941,6]]","[[4,0,50],[1,400941,3]]",10000,10000));
        put(2,new Struct_school_276(2,3,"[[4,0,100],[1,400942,3]]","[[4,0,75],[1,400942,2]]",14400,50000,"[[1,0],[2,70000],[3,30000],[4,0],[5,0]]","[[4,0,175],[1,400942,6]]","[[4,0,100],[1,400942,3]]",10000,2000));
        put(3,new Struct_school_276(3,4,"[[4,0,200],[1,400943,3]]","[[4,0,125],[1,400943,2]]",14400,0,"[[1,0],[2,0],[3,90000],[4,10000],[5,0]]","[[4,0,325],[1,400943,6]]","[[4,0,200],[1,400943,3]]",10000,667));
        put(4,new Struct_school_276(4,5,"[[4,0,650],[1,400944,3]]","[[4,0,400],[1,400944,2]]",14400,0,"[[1,0],[2,0],[3,0],[4,97000],[5,3000]]","[[4,0,1000],[1,400944,6]]","[[4,0,600],[1,400944,3]]",10000,334));
        put(5,new Struct_school_276(5,6,"[[4,0,1200],[1,400945,3]]","[[4,0,700],[1,400945,2]]",14400,0,"0","[[4,0,1825],[1,400945,6]]","[[4,0,1100],[1,400945,3]]",0,0));
    }
    public void reset(){
        ins = null;
    }
}