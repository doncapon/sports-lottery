import moment from 'moment'
export const getNextPlayDate=(daysOffset, hoursToGo)=>{
    const i = 6;
    const d = new Date();
    d.setTime(d.getTime() + (hoursToGo *60*60*1000));
    //next saturday
    d.setDate(d.getDate() + (i + 7 - d.getDay()) % 7);
    d.setDate(d.getDate() + daysOffset);
    return moment(d).format("YYYY-MM-DD");
}


export function uuid() {
    let d = moment(Date.now()).format("SSSSS-MMssDD-HHYYYYmm");
    let str = Math.floor(Math.random() * 10000);
    d += "-" + str
    return d;
  }

  export function addCommaToAmounts(nStr){
 
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1,$2');
    }
    let num = x1+x2;
    if(num.includes("."))
    num = num.substr(0, num.indexOf(".") + 3)
    if(num.includes(".") && num.substr(num.indexOf('.')+1, num.length).length === 1){
        num += "0";
    }
    return (num);
  }
 export const calculateAge = (dob1) => {
    const today = new Date();
    const birthDate = new Date(dob1+ "T00:00:00Z");  // create a date object directly from `dob1` argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return age_now;
  }

  export const dateInYYYYMMDD=(date) =>{
      let y = date.split("-");
      let q = y[2] + "-" + y[1]+ "-" + y[0];
      return q;
  }

  export const capitalizeFirstLetter =(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
