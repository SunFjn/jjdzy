package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tjhbsys_296;
public class Config_tjhbsys_296 extends ConfigBase<Struct_tjhbsys_296> {
    private static Config_tjhbsys_296 ins = null;
    public static Config_tjhbsys_296 getIns(){
        if(ins==null){
            ins = new Config_tjhbsys_296();
        }
        return ins;
    }
    private Config_tjhbsys_296(){
        put(1,new Struct_tjhbsys_296(1,2,"10:00:00","[[4,0,94888]]",30,0));
        put(2,new Struct_tjhbsys_296(2,3,"12:00:00","[[4,0,194888]]",30,0));
        put(3,new Struct_tjhbsys_296(3,4,"14:00:00","[[4,0,94888]]",30,0));
        put(4,new Struct_tjhbsys_296(4,5,"16:00:00","[[4,0,94888]]",30,0));
        put(5,new Struct_tjhbsys_296(5,6,"18:00:00","[[4,0,194888]]",30,0));
        put(6,new Struct_tjhbsys_296(6,7,"20:00:00","[[4,0,94888]]",30,0));
        put(7,new Struct_tjhbsys_296(7,0,"22:00:00","[[4,0,194888]]",30,1));
    }
    public void reset(){
        ins = null;
    }
}